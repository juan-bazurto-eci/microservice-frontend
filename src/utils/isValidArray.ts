/**
 * Helper to check if an array is valid
 *
 * @param {*} array Array to be checked
 * @returns {boolean} true if array is valid
 */
export const isValidArray = (array: Array<any> | any): boolean => {
  // Check if the array is valid and has at least one element
  return Array.isArray(array) && array.length > 0;
};
