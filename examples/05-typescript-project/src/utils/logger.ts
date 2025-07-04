/**
 * 日志工具类
 * 提供类型安全的日志记录功能
 */

export type LogLevel = 'error' | 'warn' | 'info' | 'debug';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: unknown;
}

export class Logger {
  private readonly level: LogLevel;
  private readonly levels: Record<LogLevel, number> = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
  };

  constructor(level: LogLevel = 'info') {
    this.level = level;
  }

  /**
   * 错误日志
   */
  error(message: string, data?: unknown): void {
    this.log('error', message, data);
  }

  /**
   * 警告日志
   */
  warn(message: string, data?: unknown): void {
    this.log('warn', message, data);
  }

  /**
   * 信息日志
   */
  info(message: string, data?: unknown): void {
    this.log('info', message, data);
  }

  /**
   * 调试日志
   */
  debug(message: string, data?: unknown): void {
    this.log('debug', message, data);
  }

  /**
   * 记录日志
   */
  private log(level: LogLevel, message: string, data?: unknown): void {
    if (this.levels[level] > this.levels[this.level]) {
      return;
    }

    const timestamp = new Date();
    const entry: LogEntry = {
      level,
      message,
      timestamp,
      data
    };

    this.output(entry);
  }

  /**
   * 输出日志
   */
  private output(entry: LogEntry): void {
    const timestamp = entry.timestamp.toISOString();
    const levelStr = entry.level.toUpperCase().padEnd(5);
    const prefix = `[${timestamp}] ${levelStr}`;
    
    const logMessage = entry.data 
      ? `${prefix} ${entry.message} ${this.formatData(entry.data)}`
      : `${prefix} ${entry.message}`;

    switch (entry.level) {
      case 'error':
        console.error(logMessage);
        break;
      case 'warn':
        console.warn(logMessage);
        break;
      case 'info':
        console.info(logMessage);
        break;
      case 'debug':
        console.debug(logMessage);
        break;
    }
  }

  /**
   * 格式化数据
   */
  private formatData(data: unknown): string {
    if (data instanceof Error) {
      return `\n  Error: ${data.message}\n  Stack: ${data.stack}`;
    }
    
    if (typeof data === 'object' && data !== null) {
      try {
        return `\n  Data: ${JSON.stringify(data, null, 2)}`;
      } catch {
        return `\n  Data: [Object object]`;
      }
    }
    
    return `\n  Data: ${String(data)}`;
  }

  /**
   * 创建子日志器
   */
  child(prefix: string): Logger {
    const childLogger = new Logger(this.level);
    
    // 重写输出方法以添加前缀
    const originalOutput = childLogger['output'].bind(childLogger);
    childLogger['output'] = (entry: LogEntry) => {
      entry.message = `[${prefix}] ${entry.message}`;
      originalOutput(entry);
    };
    
    return childLogger;
  }

  /**
   * 设置日志级别
   */
  setLevel(level: LogLevel): void {
    (this as { level: LogLevel }).level = level;
  }

  /**
   * 获取当前日志级别
   */
  getLevel(): LogLevel {
    return this.level;
  }

  /**
   * 检查是否启用某个级别的日志
   */
  isEnabled(level: LogLevel): boolean {
    return this.levels[level] <= this.levels[this.level];
  }
}
