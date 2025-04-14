/**
 * Convert vw to px.
 *
 * @param {number} vw
 * @returns {number}
 */
export const vw2px = (vw: number): number => {
  const w = Math.min(window.innerWidth, document.documentElement.clientWidth);
  return (vw * w) / 100;
};

