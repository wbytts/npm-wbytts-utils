/**
 * Creates a generator, that generates all values in the given range using the given step.
 * @param start
 * @param end
 * @param step
 */
declare const range: (start: number, end: number, step?: number) => Generator<number, void, unknown>;
export default range;
