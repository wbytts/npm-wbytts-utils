/**
 * 等待一段时间
 *
 * @param {number} time
 */
export const sleep = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time))
}

