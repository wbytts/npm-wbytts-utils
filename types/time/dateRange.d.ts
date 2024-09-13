/**
 * Creates a generator, that generates all dates in the given range using the given step.
 * @param start
 * @param end
 * @param step
 */
declare const dateRange: (start: Date, end: Date, step?: number) => Generator<Date, void, unknown>;
export default dateRange;
