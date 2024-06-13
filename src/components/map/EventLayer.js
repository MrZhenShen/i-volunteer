import { useEffect } from 'react';
import { useMapEvents, useMap } from 'react-leaflet';
import { useDispatch } from 'react-redux';

import { actions } from './mapSlice';

export const EventLayer = () => {
  const dispatch = useDispatch();
  const map = useMap()

  useEffect(() => {
    map.invalidateSize();
  }, [map, dispatch])

  useMapEvents({
    click: e => {
      const { lat, lng } = e.latlng;
      dispatch(actions.click({ lat, lng }))
    }
  })

  return null
}
