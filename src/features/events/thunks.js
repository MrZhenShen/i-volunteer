import { createAsyncThunk } from '@reduxjs/toolkit'

import * as facade from '../../api/events.facade';
import { EVENTS } from './constants';
import { FETCH_LIST, FETCH, POST, DELETE, PUT } from '../../redux/actions';

export const createEvent = createAsyncThunk(`${EVENTS}/${POST}`, async (event) => {
  return await facade.createEvent(event);
});

export const fetchEvents = createAsyncThunk(`${EVENTS}/${FETCH_LIST}`, async (pageable) => {
  return await facade.getAllEvents(pageable);
});

export const fetchEvent = createAsyncThunk(`${EVENTS}/${FETCH}`, async (id) => {
  return await facade.getEventById(id);
});

export const updateEvent = createAsyncThunk(`${EVENTS}/${PUT}`, async (id, updateModel) => {
  return await facade.updateStatus(id, updateModel);
});

export const deleteEvent = createAsyncThunk(`${EVENTS}/${DELETE}`, async (id) => {
  return await facade.deleteEvent(id);
});

