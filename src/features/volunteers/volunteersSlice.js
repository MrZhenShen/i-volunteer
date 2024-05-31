import { createSlice } from '@reduxjs/toolkit'

import { reducers, extraReducers } from './reducers';

const initialState = {
  loading: false,
  data: [],
  current: null,
  profile: null,
  error: null
};

export const volunteersSlice = createSlice({
  name: 'volunteers',
  initialState,
  reducers,
  extraReducers,
});

export const actions = volunteersSlice.actions

export default volunteersSlice.reducer
