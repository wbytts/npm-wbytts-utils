/**
 * Get the time string of a Date object.
 *
 * @param {Date} date
 * @returns {string}
 */
export const getTimeFromDate = (date: Date): string =>
  date.toTimeString().slice(0, 8).split(":").join("");

