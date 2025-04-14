/**
 * 在执行某个操作之前等待一段时间。
 *
 * @param {number} time 等待的时间（毫秒）
 */
export const sleep = (time: number) => {
  new Promise((resolve) => setTimeout(resolve, time))
};

