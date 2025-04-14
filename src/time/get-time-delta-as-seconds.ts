/**
 * 获得毫秒数
 * @param begin
 * @param end
 * @returns
 */
export const getTimeDeltaAsSeconds = (
  begin: Date | number,
  end: Date | number
): number => {
  const beginTime = begin instanceof Date ? begin.getTime() : begin;
  const endTime = end instanceof Date ? end.getTime() : end;
  const diff = endTime - beginTime;
  const ms = Math.floor(diff);
  return ms;
};

