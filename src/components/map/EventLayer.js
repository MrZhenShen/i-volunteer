import { useMapEvents } from 'react-leaflet';
import { useDispatch } from 'react-redux';

import { actions } from './mapSlice';

export const EventLayer = () => {
  const dispatch = useDispatch();

  useMapEvents({
    click: e => {
      const { lat, lng } = e.latlng;
      dispatch(actions.click({ lat, lng }))
    }
  })

  return null
}
