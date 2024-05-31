import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';

import { EventMarker, MedicMarker, PolicemanMarker, RescuerMarker } from './markers';
import { EventLayer } from './EventLayer';

/**
  * @param {Object} props
  * @param {Array<{ id: number, type: string, position: Array<number> }>} props.markers
  * @returns {JSX.Element}
  * @example <Map markers={[{ id: 1, type: 'event', position: [51.500, -0.09] }]} />
  * @note The `type` can be 'event', 'medic', 'policeman', or 'rescuer'.
  * @note The parent component must have its own height
*/
export const Map = ({ markers, center, zoom }) => {
  const defaultCenter = [49.84108232367849, 24.030532836914066];
  const defaultZoom = 11;

  return (
    <MapContainer
      center={center ?? defaultCenter}
      zoom={zoom ?? defaultZoom}
      scrollWheelZoom={true}
      className="h-full">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <EventLayer />
      {
        (markers ?? []).map(({ id, type, position }) => {
          switch (type) {
            case 'event':
              return <EventMarker key={`${type}/${id}`} position={position} selected />
            case 'medic':
              return <MedicMarker key={`${type}/${id}`} position={position} selected />
            case 'policeman':
              return <PolicemanMarker key={`${type}/${id}`} position={position} selected />
            case 'rescuer':
              return <RescuerMarker key={`${type}/${id}`} position={position} selected />
            default:
              return null
          }
        })
      }
    </MapContainer>
  )
}