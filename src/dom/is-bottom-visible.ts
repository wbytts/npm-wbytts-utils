/**
 * Check whether the user has reached the bottom of the page.
 *
 * @param {number} [offset=0]
 * @returns {boolean}
 */
export const isBottomVisible = (offset = 0): boolean =>
  window.innerHeight + window.scrollY >= document.body.offsetHeight - offset;

