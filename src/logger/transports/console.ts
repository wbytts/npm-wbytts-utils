import { LogLevel, LOG_LEVEL_STYLES } from '../types';
import { LogTransport } from './base';

/**
 * 控制台日志转运器
 */
export class ConsoleTransport implements LogTransport {
  /**
   * 日志级别与控制台颜色映射
   */
  private static readonly LEVEL_COLORS = LOG_LEVEL_STYLES;

  /**
   * 重置颜色
   */
  private static readonly RESET = '\x1b[0m';

  /**
   * 将日志输出到控制台
   * @param level 日志级别
   * @param message 日志消息
   * @param meta 元数据
   */
  log(level: LogLevel, message: string, meta?: any): void {
    const color = ConsoleTransport.LEVEL_COLORS[level] || '';

    // 根据日志级别使用不同的控制台方法
    switch (level) {
      case LogLevel.TRACE:
      case LogLevel.DEBUG:
        console.debug(`${color}${message}${ConsoleTransport.RESET}`, meta);
        break;
      case LogLevel.INFO:
        console.info(`${color}${message}${ConsoleTransport.RESET}`, meta);
        break;
      case LogLevel.WARN:
        console.warn(`${color}${message}${ConsoleTransport.RESET}`, meta);
        break;
      case LogLevel.ERROR:
      case LogLevel.FATAL:
        console.error(`${color}${message}${ConsoleTransport.RESET}`, meta);
        break;
      default:
        console.log(`${color}${message}${ConsoleTransport.RESET}`, meta);
    }
  }
}
