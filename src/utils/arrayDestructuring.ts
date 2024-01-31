import { isValidArray } from "./isValidArray";
/**
 * Helper to to get the first element in an array or a default value
 *
 * @param array Array to be checked
 * @param defaultValue default value that can be returned
 * @returns Returns the first element of the array or the default value.
 */
export const arrayDestructuring = (
  array: any[] | any,
  defaultValue: any,
  initialPosition: number = 0
) => {
  // Check if the array is valid and has at least one element
  try {
    /**
     * Check if the array is valid and has at least one element
     * and return the first element if it is valid or the default value
     */
    return (
      (isValidArray(array) ? array[initialPosition] : defaultValue) ??
      defaultValue
    );
  } catch {
    // Return the default value if the array is not valid
    return defaultValue;
  }
};
