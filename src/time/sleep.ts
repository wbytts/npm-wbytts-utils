/**
 * Wait some time before an action.
 *
 * @param {number} time
 */
export const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

