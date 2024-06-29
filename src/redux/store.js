import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';

import volunteersReducer from '../features/volunteers/volunteersSlice';
import eventsReducer from '../features/events/eventsSlice';
import authReducer from '../features/auth/slice';
import mapEventsReducer from '../components/map/mapSlice';

const listenerMiddleware = createListenerMiddleware()

export const store = configureStore({
  reducer: {
    volunteers: volunteersReducer,
    events: eventsReducer,
    auth: authReducer,
    map: mapEventsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})
