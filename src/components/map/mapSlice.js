import { createSlice } from '@reduxjs/toolkit'

const initialState = {};

export const eventsSlice = createSlice({
  name: 'MAP_EVENTS',
  initialState,
  reducers: {
    click: () => {},
    markerClick: () => {},
  },
});

export const actions = eventsSlice.actions

export default eventsSlice.reducer
