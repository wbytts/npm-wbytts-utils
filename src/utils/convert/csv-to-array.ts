/**
 * 将一个CSV字符串转换为二维数组
 *
 * @param {string} data
 * @param {string} [delimiter=',']
 * @param {boolean} [omitFirstRow=false]
 */
export const CSVToArray = (data: string, delimiter = ",", omitFirstRow = false) =>
  data
    .slice(omitFirstRow ? data.indexOf("\n") + 1 : 0)
    .split("\n")
    .map((v) => v.split(delimiter));

