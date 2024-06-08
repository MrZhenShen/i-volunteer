import axiosInstance from "../utils/axios";

const EVENTS_PATH = "/events";

/**
 * @enum {string}
 */
export const EventType = {
  FIRE: "FIRE",
  FLOOD: "FLOOD",
  EARTHQUAKE: "EARTHQUAKE",
  MEDICAL_EMERGENCY: "MEDICAL_EMERGENCY",
  SEARCH_AND_RESCUE: "SEARCH_AND_RESCUE",
  NATURAL_DISASTER: "NATURAL_DISASTER",
  OTHER: "OTHER",
};

export const EventTypeDetails = {
  [EventType.FIRE]: { text: "Пожежа" },
  [EventType.FLOOD]: { text: "Повінь" },
  [EventType.EARTHQUAKE]: { text: "Землетрус" },
  [EventType.MEDICAL_EMERGENCY]: { text: "Медична невідкладна допомога" },
  [EventType.SEARCH_AND_RESCUE]: { text: "Пошук і рятування" },
  [EventType.NATURAL_DISASTER]: { text: "Природна катастрофа" },
  [EventType.OTHER]: { text: "Інше" },
};

/**
 * @enum {string}
 */
export const EventStatus = {
  CREATED: "CREATED",
  IN_PROGRESS: "IN_PROGRESS",
  FINISHED: "FINISHED",
};

export const EventStatusDetails = {
  [EventStatus.CREATED]: { text: "Створено", color: "green" },
  [EventStatus.IN_PROGRESS]: { text: "Триває", color: "red" },
  [EventStatus.FINISHED]: { text: "Завершено", color: "gray" },
};

/**
 * @typedef {Object} Pageable
 * @property {number} page - The number of page (required)
 * @property {number} size - The max amount of items in page (required)
 * @property {string} [sortBy] - The field by which list content will be sorted (optional)
 * @property {string} [sortOrder] - The sorting order (optional)
 * @property {string} [filter] - The string by which items are filtered (optional)
 * @property {string} [city]
 * @property {string} [state]
 * @property {string} [eventType]
 * @property {string} [date]
 */

/**
 * @typedef {Object} EventRequest
 * @property {number} id - The unique identifier for the event.
 * @property {EventType} eventType - The type of the event.
 * @property {string} zipCode
 * @property {string} street
 * @property {string} apartmentNumber
 * @property {string} city
 * @property {string} state
 * @property {number} latitude - The latitude coordinate of the event location.
 * @property {number} longitude - The longitude coordinate of the event location.
 * @property {string} description - The description of the event.
 * @property {number} requiredVolunteers - The number of required volunteers for the event.
 * @property {string} dateTime - The date and time of the event.
 */

/**
 * @typedef {Object} UpdateEventStatusRequest
 * @property {EventStatus} status
 */

/**
 * @typedef {Object} EventDTO
 * @property {number} id - The unique identifier for the event.
 * @property {EventType} eventType - The type of the event.
 * @property {import('./shared.facade').Address} address
 * @property {import('./volunteer.facade').Volunteer[]} volunteers
 * @property {string} description - The description of the event.
 * @property {EventStatus} status - The status of the event.
 */

/**
 * Fetches all events.
 * @param {Pageable} pageable
 * @returns {Promise<Page<EventDTO>>} - A promise that resolves to an array of event objects.
 */
export const getAllEvents = async (pageable) => {
  const { page = 1, size = 10, sortBy, sortOrder } = pageable;

  const queryParams = new URLSearchParams({
    page,
    size,
    ...(sortBy && { sortBy }),
    ...(sortBy && sortOrder && { sortOrder }),
  });

  const response = await axiosInstance.get(`${EVENTS_PATH}?${queryParams}`);
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

/**
 * Update an event by ID
 * @param {number} id
 * @param {UpdateEventStatusRequest} data
 * @return {Promise<EventDTO>}
 */
export const updateStatus = async (id, data) => {
  const response = await axiosInstance.put(`${EVENTS_PATH}/${id}`, data);
  return response.data;
};
