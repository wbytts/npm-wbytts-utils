import { describe, expect, test } from '@jest/globals';
import { getYearWeeks } from './get-year-weeks';

describe('getYearWeeks', () => {
  test('2023', () => expect(getYearWeeks(2023)).toBe(52));
  test('2024', () => expect(getYearWeeks(2024)).toBe(52));
  test('2025', () => expect(getYearWeeks(2025)).toBe(52));
  test('2026', () => expect(getYearWeeks(2026)).toBe(52));
  test('2027', () => expect(getYearWeeks(2027)).toBe(52));
  test('2028', () => expect(getYearWeeks(2028)).toBe(53));

  test('2033', () => expect(getYearWeeks(2033)).toBe(53));
  test('2039', () => expect(getYearWeeks(2039)).toBe(53));
});
