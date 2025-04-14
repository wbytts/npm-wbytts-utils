/**
 * 计算斐波那契数（递归）
 * @param n
 */
export const factorial = (n: number): any => {
  return n < 0
    ? (() => {
        throw new TypeError("Negative numbers are not allowed!");
      })()
    : n <= 1
    ? 1
    : n * factorial(n - 1);
};

