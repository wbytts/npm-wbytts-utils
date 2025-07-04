import { LogLevel } from '../types';

/**
 * 日志转运器接口 - 处理日志输出目标
 */
export interface LogTransport {
  /**
   * 日志输出方法
   * @param level 日志级别
   * @param message 日志消息
   * @param meta 元数据
   */
  log(level: LogLevel, message: string, meta?: any): void;
}
