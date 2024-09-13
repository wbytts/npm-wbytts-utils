/**
 * Converts an array of objects to a CSV string that contains only the `columns` specified.
 *
 * @param {any[]} arr
 * @param {string[]} columns
 * @param {string} [delimiter=',']
 */
declare const JSONtoCSV: (arr: any[], columns: string[], delimiter?: string) => string;
export default JSONtoCSV;
