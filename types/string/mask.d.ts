/**
 * Replaces all but the last num of characters with the specified mask character.
 * @param cc
 * @param num
 * @param mask
 */
declare const mask: (cc: string | number, num?: number, mask?: string) => string;
export default mask;
