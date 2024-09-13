/**
 * Convert px to vw.
 *
 * @param {number} px
 * @returns {number}
 */
export const px2vw = (px: number): number => (px / window.innerWidth) * 100;

