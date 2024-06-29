import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  lat: null,
  lng: null,
  currentMarkerId: null,
};

export const mapSlice = createSlice({
  name: "MAP_EVENTS",
  initialState,
  reducers: {
    click: (state, action) => {
      state.lat = action.payload.lat;
      state.lng = action.payload.lng;
      state.currentMarkerId = null;
    },
    markerClick: (state, action) => {
      state.currentMarkerId = action.payload.id;
    },
  },
});

export const actions = mapSlice.actions;

export default mapSlice.reducer;
