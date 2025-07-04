import { ByLogger } from '../logger/by-logger';
import { LogLevel } from '../logger/types';

/**
 * SSE抽象基类，封装通用逻辑（自动重连、日志、事件回调等）
 * 仅负责通用部分，不直接实现连接/关闭，需子类实现
 */
export interface BaseSSEOptions {
  autoReconnect?: boolean; // 是否自动重连
  reconnectInterval?: number; // 重连间隔（毫秒）
  debug?: boolean; // 是否打印调试日志
  onOpen?: () => void;
  onError?: (err: any) => void;
  onClose?: () => void;
  onMessage?: (data: any, rawEvent?: any) => void;
}

export abstract class BaseSSE<TOptions extends BaseSSEOptions = BaseSSEOptions> {
  protected url: string;
  protected options: TOptions;
  protected logger: ByLogger;
  protected manuallyClosed = false;
  protected reconnectTimer: any = null;

  constructor(url: string, options: TOptions = {} as TOptions) {
    this.url = url;
    this.options = options;
    this.logger = new ByLogger({
      name: this.constructor.name,
      level: options.debug ? LogLevel.DEBUG : LogLevel.WARN,
    });
  }

  /**
   * 建立连接（需子类实现）
   */
  public abstract connect(): void;

  /**
   * 主动关闭连接（需子类实现）
   */
  public abstract close(): void;

  /**
   * 自动重连逻辑
   */
  protected reconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    const interval = this.options.reconnectInterval ?? 3000;
    if (this.options.debug) {
      this.logger.warn(`${interval}ms后尝试重连...`);
    }
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, interval);
  }

  /**
   * 判断当前是否已连接（需子类实现）
   */
  public abstract isConnected(): boolean;
}
