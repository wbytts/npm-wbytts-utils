/**
 * 通过 Unix timestamp 创建一个 Date
 * @param timestamp
 */
export const fromTimestamp = (timestamp: number) => new Date(timestamp * 1000);

