/**
 * px -> vh
 *
 * @param {number} px
 * @returns {number}
 */
export const px2vh = (px: number): number => (px / window.innerHeight) * 100;

