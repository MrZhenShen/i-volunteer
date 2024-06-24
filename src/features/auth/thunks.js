import { createAsyncThunk } from '@reduxjs/toolkit'

import * as facade from '../../api/auth.facade';
import { AUTH } from './constants';
import { LOGIN, REFRESH, REGISTER } from './constants';

export const register = createAsyncThunk(`${AUTH}/${REGISTER}`, async (data) => {
  return await facade.register(data);
});

export const refresh = createAsyncThunk(`${AUTH}/${REFRESH}`, async (token) => {
  return await facade.refresh(token);
});

export const login = createAsyncThunk(`${AUTH}/${LOGIN}`, async (data) => {
  return await facade.login(data);
});

