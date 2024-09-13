/**
 * Convert vh to px.
 *
 * @param {number} vh
 * @returns {number}
 */
export const vh2px = (vh: number): number => {
  const h = Math.min(window.innerHeight, document.documentElement.clientHeight);
  return (vh * h) / 100;
};

