import { describe, expect, test } from '@jest/globals';
import { getWeekOfYear } from './get-week-of-year';

describe('getWeekOfYear', () => {
  test('2025-01-01', () => expect(getWeekOfYear(new Date(2025, 0, 1))).toBe(1));
  test('2025-01-04', () => expect(getWeekOfYear(new Date(2025, 0, 4))).toBe(1));
  test('2025-01-05', () => expect(getWeekOfYear(new Date(2025, 0, 5))).toBe(2));
  test('2025-12-31', () => expect(getWeekOfYear(new Date(2024, 11, 31))).toBe(0));

  test('2023-01-01', () => expect(getWeekOfYear(new Date(2023, 0, 1))).toBe(1));
  test('2028-01-01', () => expect(getWeekOfYear(new Date(2028, 0, 1))).toBe(1));

  test('2028-12-30', () => expect(getWeekOfYear(new Date(2028, 11, 30))).toBe(53));
  test('2028-12-31', () => expect(getWeekOfYear(new Date(2028, 11, 31))).toBe(0));
});
