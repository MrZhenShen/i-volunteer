import React, { useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { EventMarker, MedicMarker, PolicemanMarker, RescuerMarker } from './markers';
import { EventLayer } from './EventLayer';

/**
  * @param {Object} props
  * @param {Array<{ id: number, type: string, position: Array<number>, selected: boolean }>} props.markers
  * @returns {JSX.Element}
  * @example <Map markers={[{ id: 1, type: 'event', position: [51.500, -0.09] }]} />
  * @note The `type` can be 'event', 'medic', 'policeman', or 'rescuer'.
  * @note The parent component must have its own height
*/
export const Map = ({
  markers,
  center,
  zoom,
  onMarkerClick,
  onClick,
}) => {
  const defaultCenter = [49.84108232367849, 24.030532836914066];
  const [mapZoom, setZoom] = useState(zoom ?? 11);

  function handleZoomChange(newZoom) {
    setZoom(newZoom);
  }

  return (
    <MapContainer
      center={center ?? defaultCenter}
      zoom={zoom ?? 11}
      scrollWheelZoom={true}
      className="h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <EventLayer onMarkerClick={onMarkerClick} onClick={onClick} onZoomEnd={handleZoomChange} />
      {
        (markers ?? []).map(({ id, type, position, selected }) => {
          switch (type) {
            case 'event':
              return <EventMarker
                key={`${type}/${id}`}
                onClick={onMarkerClick}
                id={id}
                position={position}
                selected={selected}
              />
            case 'medic':
              return <MedicMarker
                key={`${type}/${id}`}
                onClick={onMarkerClick}
                id={id}
                position={position}
                selected={selected}
                zoom={mapZoom}
              />
            case 'policeman':
              return <PolicemanMarker
                key={`${type}/${id}`}
                onClick={onMarkerClick}
                id={id}
                position={position}
                selected={selected}
                zoom={mapZoom}
              />
            case 'rescuer':
              return <RescuerMarker
                key={`${type}/${id}`}
                onClick={onMarkerClick}
                id={id}
                position={position}
                selected={selected}
                zoom={mapZoom}
              />
            default:
              return null
          }
        })
      }
    </MapContainer>
  )
}
