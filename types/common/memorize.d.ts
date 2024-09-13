/**
 * Returns the memoized (cached) function.
 * @param fn
 */
declare const memorize: (fn: Function) => {
    (val: any): any;
    cache: Map<any, any>;
};
export default memorize;
