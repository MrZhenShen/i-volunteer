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
