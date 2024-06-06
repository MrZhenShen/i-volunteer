import axiosInstance from "../utils/axios";

const VOLONTEER_PATH = "/volunteers";

/**
 * @enum {string}
 */
export const VolunteerStatus = {
  AVAILABLE: "AVAILABLE",
  UNAVAILABLE: "UNAVAILABLE",
  ATTENDING_EVENT: "ATTENDING_EVENT",
  EN_ROUTE_TO_EVENT: "EN_ROUTE_TO_EVENT",
  REQUESTED: "REQUESTED",
};

/**
 * @typedef {Object} Pageable
 * @property {number} page - The number of page (required)
 * @property {number} size - The max amount of items in page (required)
 * @property {string} [sortBy] - The field by which list content will be sorted (optional)
 * @property {string} [sortOrder] - The sorting order (optional)
 * @property {string} [filter] - The string by which items are filtered (optional)
 */

/**
 * @typedef {Object} Page<T>
 * @property {T[]} content - The list of entities
 * @property {number} page - The number of page
 * @property {number} size - The max amount of items in page
 * @property {number} totalPages - The total amount of pages might be retrieved
 * @property {number} totalItems - The total amount of item in storage
 * @property {boolean} hasNext - The mark if there might be retrieved next page
 * @property {boolean} hasPrevious - The mark if there might be retrieved previos page
 */

/**
 * @typedef {Object} Volunteer
 * @property {number} id - The unique identifier for the Volunteer.
 * @property {number} correlationId - The correlation ID associated with the Volunteer.
 * @property {string} firstName - The first name of the Volunteer.
 * @property {string} lastName - The last name of the Volunteer.
 * @property {string} mobilePhone - The mobile phone number of the Volunteer.
 * @property {Address} address
 * @property {string} birthDate
 * @property {number} latitude - The latitude coordinate of the Volunteer's location.
 * @property {number} longitude - The longitude coordinate of the Volunteer's location.
 * @property {VolunteerStatus} status - The status of the Volunteer, e.g., "AVAILABLE".
 * @property {Token[]} tokens
 * @property {string} rnokpp
 */

/**
 * @typedef {Object} Token
 * @property {number} id - The unique identifier for the token.
 * @property {string} token - The token string.
 * @property {string} expiryDateTime - The expiration date and time of the token in ISO format.
 */

/**
 * @typedef {Object} Address
 * @property {number} id - The unique identifier for the token.
 * @property {string} street
 * @property {string} apartmentNumber
 * @property {string} buildingNumber
 * @property {string} city
 * @property {string} state
 * @property {string} zipCode
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef {Object} VolunteerContactInfo
 * @property {number} id - The unique identifier for the volunteer contact info.
 * @property {string} mobilePhone - The mobile phone number of the volunteer.
 * @property {Token[]} tokens - An array of tokens associated with the volunteer.
 */

/**
 * @typedef {Object} VolunteerProfile
 * @property {number} id - The unique identifier for the volunteer.
 * @property {number} correlationId - The correlation ID associated with the volunteer.
 * @property {number} regionZipCode - The region code of the volunteer.
 * @property {VolunteerStatus} status - The status of the volunteer (e.g., "AVAILABLE").
 * @property {VolunteerContactInfo} volunteerContactInfo - The contact information for the volunteer.
 * @property {string} rnokpp - The RNOKPP (a unique identifier, possibly a national ID or similar).
 */

/**
 * @typedef {Object} UpdateVolunteerRequest
 *
 * @property {number} region - The region code of the Volunteer.
 * @property {VolunteerStatus} status - The status of the Volunteer, e.g., "AVAILABLE".
 */

/**
 * @typedef {Object} CreateVolunteerRequest
 * @property {string} firstName - The first name of the Volunteer.
 * @property {string} lastName - The last name of the Volunteer.
 * @property {Date} birthDate - The date of birth of the Volunteer.
 * @property {VolunteerStatus} status - The status of the Volunteer, e.g., "AVAILABLE".
 * @property {number} region - The region code of the Volunteer.
 * @property {string} firebaseToken - The Firebase token of the Volunteer.
 */

/**
 * Returns a list of all volunteer.
 * @param {Pageable} pageable
 * @returns {Promise<Page<Volunteer>>}
 */
export async function getVolunteers(pageable) {
  const { page = 1, size = 10, sortBy, sortOrder, filter } = pageable;

  const queryParams = new URLSearchParams({
    page,
    size,
    ...(sortBy && { sortBy }),
    ...(sortBy && sortOrder && { sortOrder }),
    ...(filter && { filter }),
  });

  const res = await axiosInstance.get(`${VOLONTEER_PATH}?${queryParams}`);
  return res.data;
}

/**
 * Returns an object representing a Volunteer with detailed information.
 * @param {number} id
 * @returns {Promise<Volunteer>}
 */
export async function getVolunteer(id) {
  const res = await axiosInstance.get(`${VOLONTEER_PATH}/${id}`);
  return res.data;
}

/**
 * Updates the information of a volunteer.
 * @param {number} id
 * @param {UpdateVolunteerRequest} volunteer
 * @returns {Promise<Volunteer>}
 */
export async function putVolunteer(id, volunteer) {
  const res = await axiosInstance.put(`${VOLONTEER_PATH}/${id}`, volunteer);
  return res.data;
}

/**
 * Deletes a volunteer.
 * @param {number} id
 * @returns {Promise<null>}
 */
export async function deleteVolunteer(id) {
  const res = await axiosInstance.delete(`${VOLONTEER_PATH}/${id}`);
  return res.data;
}

/**
 * Creates a new volunteer.
 * @param {CreateVolunteerRequest} volunteer
 * @returns {Promise<Volunteer>}
 */
export async function postVolunteer(volunteer) {
  const res = await axiosInstance.post(VOLONTEER_PATH, volunteer);
  return res.data;
}

/**
 * Fetches a volunteer profile by ID.
 * @param {number} id - The ID of the volunteer.
 * @returns {Promise<Volunteer>} - A promise that resolves to the volunteer profile object.
 */
export const getVolunteerProfileById = async (id) => {
  const response = await axiosInstance.get(`${VOLONTEER_PATH}/${id}/profile`);
  return response.data;
};

/**
 * Finds all volunteers by zip code.
 * @param {string} zipCode
 * @returns {Promise<Volunteer[]>} - A promise that resolves to an array of volunteer objects.
 */
export const findAllVolunteersByZipCode = async (zipCode) => {
  const response = await axiosInstance.get(`${VOLONTEER_PATH}/regions/${zipCode}`);
  return response.data;
};
