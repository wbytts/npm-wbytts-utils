/**
 * 日志级别枚举
 */
export enum LogLevel {
  /** 跟踪级别 - 最详细的日志信息 */
  TRACE = 'TRACE',
  /** 调试级别 - 开发过程中使用的调试信息 */
  DEBUG = 'DEBUG',
  /** 信息级别 - 一般操作信息 */
  INFO = 'INFO',
  /** 警告级别 - 潜在问题警告 */
  WARN = 'WARN',
  /** 错误级别 - 错误但不影响程序继续运行 */
  ERROR = 'ERROR',
  /** 致命级别 - 导致程序终止的严重错误 */
  FATAL = 'FATAL',
  /** 关闭所有日志 */
  OFF = 'OFF'
}

/**
 * 日志级别权重映射
 * 数值越大，优先级越高
 */
export const LOG_LEVEL_WEIGHT: Record<LogLevel, number> = {
  [LogLevel.TRACE]: 0,
  [LogLevel.DEBUG]: 1,
  [LogLevel.INFO]: 2,
  [LogLevel.WARN]: 3,
  [LogLevel.ERROR]: 4,
  [LogLevel.FATAL]: 5,
  [LogLevel.OFF]: 6
};

/**
 * 日志级别样式配置
 */
export const LOG_LEVEL_STYLES: Record<LogLevel, { color: string; background?: string; bold?: boolean }> = {
  [LogLevel.TRACE]: { color: '#6c757d' },  // 灰色
  [LogLevel.DEBUG]: { color: '#17a2b8' },  // 蓝绿色
  [LogLevel.INFO]: { color: '#28a745' },   // 绿色
  [LogLevel.WARN]: { color: '#ffc107' },   // 黄色
  [LogLevel.ERROR]: { color: '#dc3545' },  // 红色
  [LogLevel.FATAL]: { color: '#fff', background: '#dc3545', bold: true }, // 白色文字，红色背景，加粗
  [LogLevel.OFF]: { color: '#000000' }     // 黑色
};

/**
 * 日志配置选项
 */
export interface LoggerOptions {
  /** 日志级别，默认为 INFO */
  level?: LogLevel;
  /** 日志名称，用于区分不同的日志实例 */
  name?: string;
  /** 是否启用，默认为 true */
  enabled?: boolean;
  /** 自定义格式化器 */
  formatter?: LogFormatter;
  /** 日志转运器列表 */
  transports?: LogTransport[];
}

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
