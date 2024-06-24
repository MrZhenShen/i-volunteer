import { createSlice } from '@reduxjs/toolkit'

import { reducers, extraReducers } from './reducers';

const initialState = {
  loading: false,
  user: null,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers,
  extraReducers,
});

export const actions = authSlice.actions

export default authSlice.reducer
