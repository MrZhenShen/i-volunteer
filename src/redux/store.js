import { configureStore } from '@reduxjs/toolkit';

import volunteersReducer from '../features/volunteers/volunteersSlice';
import eventsReducer from '../features/events/eventsSlice';
import mapEventsReducer from '../components/map/mapSlice';

export const store = configureStore({
  reducer: {
    volunteers: volunteersReducer,
    events: eventsReducer,
    map: mapEventsReducer,
  },
})
