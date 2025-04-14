/**
 * 根据Date对象获取 Unix时间戳
 * @param date
 */
export const getTimestamp = (date = new Date(), floor = false) => {
  const timestamp = date.getTime() / 1000;
  return floor ? Math.floor(timestamp) : timestamp;
};

