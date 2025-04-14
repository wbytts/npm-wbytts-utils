/**
 * Creates a Date object from a Unix timestamp.
 * @param timestamp
 */
export const fromTimestamp = (timestamp: number) => new Date(timestamp * 1000);

