import { LogLevel } from '../types';

/**
 * 日志格式化器接口
 */
export interface LogFormatter {
  /**
   * 格式化日志消息
   * @param level 日志级别
   * @param message 原始消息
   * @param meta 元数据
   * @returns 格式化后的消息
   */
  format(level: LogLevel, message: string, meta?: any): string;
}
