/**
 * Check whether the user has reached the bottom of the specific element.
 * @param el
 * @param offset
 * @returns
 */
export const isElBottomVisible = (el: any, offset = 0): boolean =>
  el.offsetHeight + el.scrollTop >= el.scrollHeight - offset;

