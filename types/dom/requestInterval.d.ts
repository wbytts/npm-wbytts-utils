/**
 * A setInterval which focuses on performance.
 *
 * @param {Function} fn
 * @param {number} delay
 * @returns
 */
declare const requestInterval: (fn: Function, delay: number) => {
    value: number;
};
export default requestInterval;
