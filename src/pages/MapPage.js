import { useState, useEffect, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Map } from "../components/map/Map";
import LoadingOverlay from '../components/LoadingOverlay';
import VolunteerInfoSlideOver from '../features/volunteers/components/VolunteerInfoSlideOver';
import { fetchVolunteers } from "../features/volunteers/thunks";
import { fetchEvents } from '../features/events/thunks';
import EventInfoSlideOver from '../features/events/components/EventsInfoSlideOver';
import EventCreateSlideOver from '../features/events/components/EventsCreateSlideOver';

function volunteersToMarkers(volunteers) {
  return volunteers.map((volunteer) => ({
    id: `volunteer/${volunteer.id}`,
    type: 'rescuer', // TODO: replace with volunteer.role when implemented
    position: [volunteer.longitude, volunteer.latitude],
    selected: false,
  }));
}

function eventsToMarkers(events) {
  return events.map((event) => ({
    id: `event/${event.id}`,
    type: 'event',
    position: [event.address.latitude, event.address.longitude],
    selected: false,
  }));
}

export function MapPage() {
  const dispatch = useDispatch();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, markerDispatch] = useReducer((state, action) => {
    if (action.type === 'MARKERS/add') {
      return [...state, action.payload];
    }

    if (action.type === 'MARKERS/remove') {
      return state.filter((marker) => marker.id !== action.payload.id);
    }

    if (action.type === 'MARKERS/set') {
      return action.payload;
    }
  }, []);

  const { data: volunteers, loading: volunteersLoading } =
    useSelector((state) => state.volunteers);

  const { data: events, loading: eventsLoading } =
    useSelector((state) => state.events);

  function onMapClick({ lat, lng }) {
    const marker = {
      id: 'event/new',
      type: 'event',
      position: [lat, lng],
      selected: true,
    }
    markerDispatch({ type: 'MARKERS/remove', payload: { id: 'event/new' } });
    markerDispatch({ type: 'MARKERS/add', payload: marker });
    setSelectedMarker(marker);
  }

  function onMarkerClick(marker) {
    marker.selected = true;
    setSelectedMarker(marker);
  }

  function isOpenType(type) {
    if (selectedMarker === null) return false;
    if (type === 'new' && selectedMarker.id === 'event/new') return true;
    if (selectedMarker.id !== 'event/new') {
      return selectedMarker.id.split('/')[0] === type
    }
    return false
  }

  useEffect(() => {
    const pageSettings = {
      page: 1,
      size: 100,
      sortBy: "",
      sortOrder: "",
      filter: "",
    }
    dispatch(fetchVolunteers(pageSettings));
    dispatch(fetchEvents(pageSettings));
  }, [dispatch]);

  useEffect(() => {
    const m = [
      ...volunteersToMarkers(volunteers),
      ...eventsToMarkers(events),
    ];
    markerDispatch({ type: 'MARKERS/set', payload: m });
  }, [volunteers, events])

  return (
    <>
      <div className="pt-8 flex flex-row justify-between">
        <span className="text-lg font-bold">Мапа</span>
        {/*<Button variant="secondary" icon="Add">Додати подію</Button>*/}
      </div>

    {/*<div className="pt-6">
        <span>Фільтр добровольців:</span>
        <Menu selected={selected} items={filters} onSelect={setSelected} />
      </div>*/}

      <div className="relative pt-4 flex-grow">
        <Map markers={markers} onClick={onMapClick} onMarkerClick={onMarkerClick} />
      </div>

      <EventCreateSlideOver
        position={selectedMarker?.position}
        isOpen={isOpenType('new')}
        toggle={() => {
          markerDispatch({ type: 'MARKERS/remove', payload: { id: 'event/new' } });
          setSelectedMarker(null)
        }}
      />

      <VolunteerInfoSlideOver
        volunteer={volunteers.find((volunteer) => `volunteer/${volunteer.id}` === selectedMarker?.id)}
        isOpen={isOpenType('volunteer')}
        toggle={() => setSelectedMarker(null)}
      />

      <EventInfoSlideOver
        event={events.find((event) => `event/${event.id}` === selectedMarker?.id)}
        isOpen={isOpenType('event')}
        toggle={() => setSelectedMarker(null)}
      />

      {eventsLoading && volunteersLoading && <LoadingOverlay />}
    </>
  );
}
