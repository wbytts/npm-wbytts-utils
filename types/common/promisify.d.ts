/**
 * Converts an asynchronous function to return a promise.
 * @param func
 */
declare const promisify: (func: Function) => (...args: any[]) => Promise<unknown>;
export default promisify;
