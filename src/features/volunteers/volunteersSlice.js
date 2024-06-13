import { createSlice } from "@reduxjs/toolkit";

import { reducers, extraReducers } from "./reducers";

const initialState = {
  loading: false,
  data: [],
  pageDetails: {
    page: 0,
    size: 0,
    totalPages: 0,
    totalItems: 0,
    hasNext: false,
    hasPrevious: false,
  },
  current: null,
  profile: null,
  error: null,
};

export const volunteersSlice = createSlice({
  name: "volunteers",
  initialState,
  reducers,
  extraReducers,
});

export const actions = volunteersSlice.actions;

export default volunteersSlice.reducer;
