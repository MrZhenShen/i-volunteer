import { createAsyncThunk } from '@reduxjs/toolkit'

import * as facade from '../../api/volunteer.facade';
import { VOLUNTEERS, PROFILE } from './constants';
import { FETCH_LIST, FETCH, POST, PUT, DELETE } from '../../redux/actions';

export const fetchVolunteers = createAsyncThunk(`${VOLUNTEERS}/${FETCH_LIST}`, async () => {
  return await facade.getVolunteers();
});

export const createVolunteer = createAsyncThunk(`${VOLUNTEERS}/${POST}`, async (volunteer) => {
  return await facade.postVolunteer(volunteer);
});

export const fetchVolunteer = createAsyncThunk(`${VOLUNTEERS}/${FETCH}`, async (id) => {
  return await facade.getVolunteer(id);
});

export const updateVolunteer = createAsyncThunk(`${VOLUNTEERS}/${PUT}`, async (volunteer) => {
  return await facade.putVolunteer(volunteer);
});

export const deleteVolunteer = createAsyncThunk(`${VOLUNTEERS}/${DELETE}`, async (id) => {
  return await facade.deleteVolunteer(id);
});

export const fetchVolunteerProfile = createAsyncThunk(`${VOLUNTEERS}/${PROFILE}/${FETCH}`, async (id) => {
  return await facade.getVolunteerProfileById(id);
});

export const fetchVolunteersByRegion = createAsyncThunk(`${VOLUNTEERS}/${FETCH_LIST}`, async (region) => {
  return await facade.findAllVolunteersByRegionId(region);
});
