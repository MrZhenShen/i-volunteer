import { createSlice } from '@reduxjs/toolkit'

import { reducers, extraReducers } from './reducers';

const initialState = {
  loading: false,
  data: {
    content: [],
    page: 0,
    size: 0,
    totalPages: 0,
    totalItems: 0,
    hasNext: false,
    hasPrevious: false,
  },
  current: null,
  error: null
};

export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers,
  extraReducers,
});

export const actions = eventsSlice.actions

export default eventsSlice.reducer
