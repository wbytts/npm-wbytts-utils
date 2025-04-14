/**
 * 将CSV格式的数据转换为JSON对象数组
 *
 * @param {string} data - 输入的CSV格式数据
 * @param {string} [delimiter=','] - 可选的分隔符，默认为逗号
 * @returns - 返回转换后的JSON对象数组
 */
export const CSVToJSON = (data: string, delimiter = ',') => {
  const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
  return data
    .slice(data.indexOf('\n') + 1)
    .split('\n')
    .map(v => {
      const values = v.split(delimiter);
      // @ts-ignore
      return titles.reduce((obj, title, index) => (((obj as any)[title] = values[index]), obj), {});
    });
};
