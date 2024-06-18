import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Menu } from '../components/Menu';
import Button from "../components/Button";
import { Map } from "../components/map/Map";
import LoadingOverlay from '../components/LoadingOverlay';
import VolunteerInfoSlideOver from '../features/volunteers/components/VolunteerInfoSlideOver';
import { fetchVolunteers } from "../features/volunteers/thunks";
import { fetchEvents } from '../features/events/thunks';
import EventInfoSlideOver from '../features/events/components/EventsInfoSlideOver';

function volunteersToMarkers(volunteers) {
  return volunteers.map((volunteer) => ({
    id: `volunteer/${volunteer.id}`,
    type: 'rescuer', // TODO: replace with volunteer.role when implemented
    position: [49.83002537341331, 24.06477928161621],
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
  const [selected, setSelected] = useState("all");
  const [selectedMarker, setSelectedMarker] = useState(null);

  const { data: volunteers, loading: volunteersLoading } =
    useSelector((state) => state.volunteers);

  const { data: events, loading: eventsLoading } =
    useSelector((state) => state.events);

  function onMapClick({ lat, lng }) {
    console.log('map clicked', lat, lng);
    setSelectedMarker(null);
  }

  function onMarkerClick(marker) {
    console.log('marker clicked', marker);
    marker.selected = true;
    setSelectedMarker(marker);
  }

  function isOpenType(type) {
    if (selectedMarker === null) return false;
    return selectedMarker.id.split('/')[0] === type
  }

  const markers = [
    ...volunteersToMarkers(volunteers),
    ...eventsToMarkers(events),
  ];

  useEffect(() => {
    const pageSettings = {
      page: 1,
      size: 10,
      sortBy: "",
      sortOrder: "",
      filter: "",
    }
    dispatch(fetchVolunteers(pageSettings));
    dispatch(fetchEvents(pageSettings));
  }, [dispatch]);

  const filters = [
    { label: "Всі", value: "all", icon: 'Checkmark' },
    { label: "Медики", value: "medic", icon: 'Doctor' },
    { label: "Поліцейські", value: "policement", icon: 'Police' },
  ];

  return (
    <>
      <div className="pt-8 flex flex-row justify-between">
        <span className="text-lg font-bold">Мапа</span>
        <Button variant="secondary" icon="Add">Додати подію</Button>
      </div>

      <div className="pt-6">
        <span>Фільтр добровольців:</span>
        <Menu selected={selected} items={filters} onSelect={setSelected} />
      </div>

      <div className="relative pt-4 flex-grow">
        <Map markers={markers} onClick={onMapClick} onMarkerClick={onMarkerClick} />
      </div>

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
