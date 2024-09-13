/**
 * Converts a CSV string to a 2D array.
 *
 * @param {string} data
 * @param {string} [delimiter=',']
 * @param {boolean} [omitFirstRow=false]
 */
declare const CSVToArray: (data: string, delimiter?: string, omitFirstRow?: boolean) => string[][];
export default CSVToArray;
