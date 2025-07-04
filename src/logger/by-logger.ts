import { LogTransport, ConsoleTransport } from './transports';
import { LogFormatter, DefaultFormatter } from './formatters';
import { LogLevel, LOG_LEVEL_WEIGHT, LoggerOptions } from './types';

/**
 * ByLogger - 功能完善的日志类
 */
export class ByLogger {
  /** 日志级别 */
  private level: LogLevel;
  /** 日志名称 */
  private name: string;
  /** 是否启用 */
  private enabled: boolean;
  /** 日志格式化器 */
  private formatter: LogFormatter;
  /** 日志转运器列表 */
  private transports: LogTransport[];

  /**
   * 创建日志记录器实例
   * @param options 日志配置选项
   */
  constructor(options?: LoggerOptions) {
    this.level = options?.level || LogLevel.INFO;
    this.name = options?.name || 'default';
    this.enabled = options?.enabled !== false;
    this.formatter = options?.formatter || new DefaultFormatter();
    
    // 如果没有提供转运器，默认使用控制台转运器
    this.transports = options?.transports || [new ConsoleTransport()];
  }

  /**
   * 日志记录方法
   * @param level 日志级别
   * @param message 日志消息
   * @param meta 元数据
   */
  log(level: LogLevel, message: string, meta?: any): void {
    if (this.enabled && LOG_LEVEL_WEIGHT[level] >= LOG_LEVEL_WEIGHT[this.level]) {
      const formattedMessage = this.formatter.format(level, message, meta);
      this.transports.forEach((transport) => transport.log(level, formattedMessage, meta));
    }
  }

  /**
   * 跟踪级别日志记录
   * @param message 日志消息
   * @param meta 元数据
   */
  trace(message: string, meta?: any): void {
    this.log(LogLevel.TRACE, message, meta);
  }

  /**
   * 调试级别日志记录
   * @param message 日志消息
   * @param meta 元数据
   */
  debug(message: string, meta?: any): void {
    this.log(LogLevel.DEBUG, message, meta);
  }

  /**
   * 信息级别日志记录
   * @param message 日志消息
   * @param meta 元数据
   */
  info(message: string, meta?: any): void {
    this.log(LogLevel.INFO, message, meta);
  }

  /**
   * 警告级别日志记录
   * @param message 日志消息
   * @param meta 元数据
   */
  warn(message: string, meta?: any): void {
    this.log(LogLevel.WARN, message, meta);
  }

  /**
   * 错误级别日志记录
   * @param message 日志消息
   * @param meta 元数据
   */
  error(message: string, meta?: any): void {
    this.log(LogLevel.ERROR, message, meta);
  }

  /**
   * 致命级别日志记录
   * @param message 日志消息
   * @param meta 元数据
   */
  fatal(message: string, meta?: any): void {
    this.log(LogLevel.FATAL, message, meta);
  }
}
