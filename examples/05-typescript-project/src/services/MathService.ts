/**
 * 数学计算服务
 * 提供类型安全的数学计算功能
 */

import { sum, average, factorial } from '@wbytts/utils/math';
import type { IMathService, MathResult, MathOperation } from '../types';
import { MathError } from '../types';
import { Logger } from '../utils/logger';

export class MathService implements IMathService {
  private readonly logger = new Logger('info');

  /**
   * 求和计算
   */
  async sum(...numbers: number[]): Promise<MathResult> {
    try {
      this.validateNumbers(numbers, 'sum');
      
      const result = sum(...numbers);
      const operation: MathOperation = {
        operation: 'sum',
        inputs: numbers,
        result
      };

      this.logger.debug(`求和计算: [${numbers.join(', ')}] = ${result}`);

      return {
        success: true,
        message: '求和计算成功',
        timestamp: new Date(),
        data: operation
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : '求和计算失败';
      this.logger.error('求和计算错误:', error);
      
      throw new MathError(message, 'sum', numbers);
    }
  }

  /**
   * 平均值计算
   */
  async average(...numbers: number[]): Promise<MathResult> {
    try {
      this.validateNumbers(numbers, 'average');
      
      const result = average(...numbers);
      const operation: MathOperation = {
        operation: 'average',
        inputs: numbers,
        result
      };

      this.logger.debug(`平均值计算: [${numbers.join(', ')}] = ${result}`);

      return {
        success: true,
        message: '平均值计算成功',
        timestamp: new Date(),
        data: operation
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : '平均值计算失败';
      this.logger.error('平均值计算错误:', error);
      
      throw new MathError(message, 'average', numbers);
    }
  }

  /**
   * 阶乘计算
   */
  async factorial(n: number): Promise<MathResult> {
    try {
      this.validateFactorialInput(n);
      
      const result = factorial(n);
      const operation: MathOperation = {
        operation: 'factorial',
        inputs: [n],
        result
      };

      this.logger.debug(`阶乘计算: ${n}! = ${result}`);

      return {
        success: true,
        message: '阶乘计算成功',
        timestamp: new Date(),
        data: operation
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : '阶乘计算失败';
      this.logger.error('阶乘计算错误:', error);
      
      throw new MathError(message, 'factorial', [n]);
    }
  }

  /**
   * 批量计算
   */
  async batchCalculate(
    numbers: number[], 
    operations: Array<'sum' | 'average'>
  ): Promise<MathResult[]> {
    const results: MathResult[] = [];

    for (const operation of operations) {
      try {
        let result: MathResult;
        
        switch (operation) {
          case 'sum':
            result = await this.sum(...numbers);
            break;
          case 'average':
            result = await this.average(...numbers);
            break;
          default:
            throw new Error(`不支持的操作: ${operation}`);
        }
        
        results.push(result);
      } catch (error) {
        this.logger.error(`批量计算中的 ${operation} 操作失败:`, error);
        // 继续处理其他操作，不中断整个批量计算
      }
    }

    return results;
  }

  /**
   * 统计计算
   */
  async statistics(numbers: number[]): Promise<{
    sum: number;
    average: number;
    min: number;
    max: number;
    count: number;
  }> {
    this.validateNumbers(numbers, 'statistics');

    const sumResult = sum(...numbers);
    const avgResult = average(...numbers);
    const minResult = Math.min(...numbers);
    const maxResult = Math.max(...numbers);

    return {
      sum: sumResult,
      average: avgResult,
      min: minResult,
      max: maxResult,
      count: numbers.length
    };
  }

  /**
   * 验证数字数组
   */
  private validateNumbers(numbers: number[], operation: string): void {
    if (!Array.isArray(numbers)) {
      throw new Error('输入必须是数字数组');
    }

    if (numbers.length === 0) {
      throw new Error('数字数组不能为空');
    }

    for (let i = 0; i < numbers.length; i++) {
      const num = numbers[i];
      if (typeof num !== 'number' || isNaN(num)) {
        throw new Error(`索引 ${i} 处的值不是有效数字: ${num}`);
      }
      if (!isFinite(num)) {
        throw new Error(`索引 ${i} 处的值不是有限数字: ${num}`);
      }
    }

    this.logger.debug(`${operation} 操作的输入验证通过: ${numbers.length} 个数字`);
  }

  /**
   * 验证阶乘输入
   */
  private validateFactorialInput(n: number): void {
    if (typeof n !== 'number' || isNaN(n)) {
      throw new Error('阶乘输入必须是数字');
    }

    if (!Number.isInteger(n)) {
      throw new Error('阶乘输入必须是整数');
    }

    if (n < 0) {
      throw new Error('阶乘输入必须是非负数');
    }

    if (n > 170) {
      throw new Error('阶乘输入过大，可能导致数值溢出');
    }

    this.logger.debug(`阶乘操作的输入验证通过: ${n}`);
  }
}
