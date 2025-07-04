import { LogLevel } from '../types';
import { LogFormatter } from './base';

/**
 * 默认日志格式化器
 */
export class DefaultFormatter implements LogFormatter {
  /**
   * 是否包含时间戳
   */
  private includeTimestamp: boolean;

  /**
   * 构造默认格式化器
   * @param includeTimestamp 是否包含时间戳，默认为 true
   */
  constructor(includeTimestamp: boolean = true) {
    this.includeTimestamp = includeTimestamp;
  }

  /**
   * 格式化日志消息，添加时间戳
   * @param level 日志级别
   * @param message 原始消息
   * @param meta 元数据
   * @returns 格式化后的消息
   */
  format(level: LogLevel, message: string, meta?: any): string {
    if (this.includeTimestamp) {
      const timestamp = new Date().toISOString();
      return `${timestamp} [${level}] ${message}`;
    }
    return `[${level}] ${message}`;
  }
}
