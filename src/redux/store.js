import { configureStore } from '@reduxjs/toolkit';

import volunteersReducer from '../features/volunteers/volunteersSlice';

export const store = configureStore({
  reducer: {
    volunteers: volunteersReducer,
  },
})
