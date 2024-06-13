import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Menu } from '../components/Menu';
import Button from "../components/Button";
import { Map } from "../components/map/Map";
import LoadingOverlay from '../components/LoadingOverlay';
import VolunteerInfoSlideOver from '../features/volunteers/components/VolunteerInfoSlideOver';
import { fetchVolunteers } from "../features/volunteers/thunks";

function volunteersToMarkers(volunteers) {
  return volunteers.map((volunteer) => ({
    id: `rescuer/${volunteer.id}`,
    type: 'rescuer', // volunteer.role,
    position: [49.83002537341331, 24.06477928161621],
    selected: false,
  }));
}

export function MapPage() {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("all");
  const [showDialog, setShowDialog] = useState(false)

  let markers = [];

  const {
    data: volunteers,
    loading,
  } = useSelector((state) => state.volunteers);

  useEffect(() => {
    dispatch(fetchVolunteers({
      page: 1,
      size: 10,
      sortBy: "",
      sortOrder: "",
      filter: "",
    }));
  }, [dispatch]);

  const filters = [
    { label: "Всі", value: "all", icon: 'Checkmark' },
    { label: "Медики", value: "medic", icon: 'Doctor' },
    { label: "Поліцейські", value: "policement", icon: 'Police' },
  ];

  if (volunteers.length > 0) {
    markers = volunteersToMarkers(volunteers);
  }

  return (
    <>
      <div className="pt-8 flex flex-row justify-between">
        <span className="text-lg font-bold">Мапа</span>
        <Button variant="secondary" icon="Add" onClick={() => setShowDialog(!showDialog)}>Додати подію</Button>
      </div>

      <div className="pt-6">
        <span>Фільтр добровольців:</span>
        <Menu selected={selected} items={filters} onSelect={setSelected} />
      </div>

      <div className="relative pt-4 flex-grow">
        <Map markers={markers} />
      </div>
      {loading && <LoadingOverlay />}
      <VolunteerInfoSlideOver
        volunteer={{ status: 'AVAILABLE', correlationId: "2b69deb8-4795-43f1-936a-dc1ce43ae368", firstName: "John", lastName: "Doe", address: { city: "Lviv", street: "Під Голоском", zipCode: "Ukraine" }, latitude: 24.06477928161621, longitude: 49.83002537341331 }}
        isOpen={showDialog}
        toggle={() => setShowDialog(!showDialog)} />
    </>
  );
}
