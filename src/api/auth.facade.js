import axiosInstance from "../utils/axios";

const AUTH_PATH = "/auth";

/**
 * @typedef {Object} RegisterRequest
 * @property {string} email - The email of the user.
 * @property {string} password - The password of the user.
 * @property {string} userName - The username of the user.
 * @property {string} rnokpp - RNOKPP
*/

/**
  * @typedef {Object} User
  * @property {number} id - The id of the user.
  * @property {string} username - The username of the user.
  * @property {string} password - The password of the user.
  * @property {string} email - The email of the user.
  * @property {string} rnokpp - RNOKPP
  * @property {string} role - The role of the user.
  * @property {boolean} enabled - The enabled of the user.
  * @property {Array<{authority: string}>} authorities - The authorities of the user.
  * @property {boolean} accountNonExpired - The accountNonExpired of the user.
  * @property {boolean} accountNonLocked - The accountNonLocked of the user.
  * @property {boolean} credentialsNonExpired - The credentialsNonExpired of the user.
  */

/**
  * @typedef {Object} LoginRequest
  * @property {string} username - The username of the user.
  * @property {string} password - The password of the user.
  */

/**
 * Register
 * @param {RegisterRequest} data - The data to create the user.
 * @returns {Promise<User>} - The user created.
 */
export const register = async (data) => {
  const response = await axiosInstance.post(`${AUTH_PATH}/register`, data);
  return response.data;
};

/**
  * Refresh token
  * @param {string} token - The token to refresh.
  * @returns {Promise} - TODO: describe response when ready.
  */
export const refresh = async (token) => {
  const response = await axiosInstance.post(`${AUTH_PATH}/refresh`, token);
  return response.data;
}

/**
  * Login
  * @param {LoginRequest} data - The data to login.
  * @returns {Promise<string>} - The user logged in.
  */
export const login = async (data) => {
  const response = await axiosInstance.post(`${AUTH_PATH}/login`, data);
  return response.data;
}

