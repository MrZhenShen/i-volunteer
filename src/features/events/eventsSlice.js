import { createSlice } from '@reduxjs/toolkit'

import { reducers, extraReducers } from './reducers';

const initialState = {
  loading: false,
  data: [],
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
