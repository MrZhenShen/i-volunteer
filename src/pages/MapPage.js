import { useState } from 'react';

import { Menu } from '../components/Menu';
import Button from "../components/Button";
import { Map } from "../components/map/Map";
import LoadingOverlay from '../components/LoadingOverlay';
import VolunteerInfoSlideOver from '../features/volunteers/components/VolunteerInfoSlideOver';

export function MapPage() {
  const [selected, setSelected] = useState("all");
  const [showDialog, setShowDialog] = useState(true)
  const loading = false;

  const filters = [
    { label: "Всі", value: "all", icon: 'Checkmark' },
    { label: "Медики", value: "medic", icon: 'Doctor' },
    { label: "Поліцейські", value: "policement", icon: 'Police' },
  ];

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
        <Map
          markers={[
            {
              id: 1,
              type: "event",
              position: [49.84108232367849, 24.030532836914066],
              selected: false
            },
            {
              id: 2,
              type: "rescuer",
              position: [49.84047343621103, 24.045767784118652],
              selected: false
            }
          ]} />
      </div>
      {loading && <LoadingOverlay />}
      <VolunteerInfoSlideOver
        volunteer={{ status: 'AVAILABLE', correlationId: "2b69deb8-4795-43f1-936a-dc1ce43ae368", firstName: "John", lastName: "Doe", address: { city: "Lviv", street: "Під Голоском", zipCode: "Ukraine"}, latitude: 49.84108232367849, longitude: 24.030532836914066 }}
        isOpen={showDialog}
        toggle={() => setShowDialog(!showDialog)} />
    </>
  );
}
