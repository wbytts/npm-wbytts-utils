/**
 * Converts an asynchronous function to return a promise.
 * @param func
 */
export const promisify =
  (func: Function) =>
  (...args: any[]) =>
    new Promise((resolve, reject) =>
      func(...args, (err: any, result: any) =>
        err ? reject(err) : resolve(result)
      )
    );

