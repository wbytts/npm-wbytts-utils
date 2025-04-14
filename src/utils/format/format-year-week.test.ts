import { describe, expect, test } from '@jest/globals';
import { formatYearWeek } from './format-year-week';

describe('formatYearWeek', () => {
  // Date 第二个参数为 月份-1 (0是第1月，11是第12月)
  test('2025-01-01', () => expect(formatYearWeek(new Date(2025, 0, 1))).toBe("2025年第1周"));
  test('2025-01-04', () => expect(formatYearWeek(new Date(2025, 0, 4))).toBe("2025年第1周"));
  test('2025-01-05', () => expect(formatYearWeek(new Date(2025, 0, 5))).toBe("2025年第2周"));
  test('2024-12-31', () => expect(formatYearWeek(new Date(2024, 11, 31))).toBe("2025年第1周"));

  test('2023-01-01', () => expect(formatYearWeek(new Date(2023, 0, 1))).toBe("2023年第1周"));
  test('2028-01-01', () => expect(formatYearWeek(new Date(2028, 0, 1))).toBe("2028年第1周"));

  test('2028-12-30', () => expect(formatYearWeek(new Date(2028, 11, 30))).toBe("2028年第53周"));
  test('2028-12-31', () => expect(formatYearWeek(new Date(2028, 11, 31))).toBe("2029年第1周"));
});
