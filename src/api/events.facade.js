import { axiosInstance } from './axiosInstance';

const EVENTS_PATH = '/events';

/**
 * @typedef {Object} EventRequest
 * @property {number} id - The unique identifier for the event.
 * @property {string} eventType - The type of the event.
 * @property {number} regionId - The region code where the event takes place.
 * @property {number} latitude - The latitude coordinate of the event location.
 * @property {number} longitude - The longitude coordinate of the event location.
 * @property {string} description - The description of the event.
 * @property {number} requiredVolunteers - The number of required volunteers for the event.
 * @property {string} dateTime - The date and time of the event.
 */

/**
 * @typedef {Object} EventDTO
 * @property {number} id - The unique identifier for the event.
 * @property {string} eventType - The type of the event.
 * @property {number} regionId - The region code where the event takes place.
 * @property {number} latitude - The latitude coordinate of the event location.
 * @property {number} longitude - The longitude coordinate of the event location.
 * @property {string} description - The description of the event.
 */

/**
 * Fetches all events.
 * @returns {Promise<EventDTO[]>} - A promise that resolves to an array of event objects.
 */
export const getAllEvents = async () => {
  const response = await axiosInstance.get(EVENTS_PATH);
  return response.data;
};

/**
 * Creates a new event.
 * @param {EventRequest} data - The data to create the event with.
 * @returns {Promise<EventDTO>} - A promise that resolves to the created event object.
 */
export const createEvent = async (data) => {
  const response = await axiosInstance.post(EVENTS_PATH, data);
  return response.data;
};

/**
 * Fetches an event by ID.
 * @param {number} id - The ID of the event.
 * @returns {Promise<EventDTO>} - A promise that resolves to the event object.
 */
export const getEventById = async (id) => {
  const response = await axiosInstance.get(`${EVENTS_PATH}/${id}`);
  return response.data;
};

/**
 * Deletes an event by ID.
 * @param {number} id - The ID of the event.
 * @returns {Promise<void>} - A promise that resolves when the event is deleted.
 */
export const deleteEvent = async (id) => {
  const response = await axiosInstance.delete(`${EVENTS_PATH}/${id}`);
  return response.data;
};
