import { createAsyncThunk } from '@reduxjs/toolkit'

import * as facade from '../../api/events.facade';
import { EVENTS } from './constants';
import { FETCH_LIST, FETCH, POST, DELETE } from '../../redux/actions';

export const fetchEvents = createAsyncThunk(`${EVENTS}/${FETCH_LIST}`, async (pageable) => {
  return await facade.getAllEvents(pageable);
});

export const createEvent = createAsyncThunk(`${EVENTS}/${POST}`, async (volunteer) => {
  return await facade.createEvent(volunteer);
});

export const fetchEvent = createAsyncThunk(`${EVENTS}/${FETCH}`, async (id) => {
  return await facade.getEventById(id);
});

export const deleteEvent = createAsyncThunk(`${EVENTS}/${DELETE}`, async (id) => {
  return await facade.deleteEvent(id);
});

