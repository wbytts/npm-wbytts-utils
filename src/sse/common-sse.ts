import { BaseSSE, BaseSSEOptions } from './base-sse';
import { ByLogger } from '../logger/by-logger';
import { LogLevel } from '../logger/types';

/**
 * 通用SSE（Server-Sent Events）管理工具类，继承BaseSSE
 * 支持自动重连、事件监听、心跳检测等功能
 */
type EventHandler = (event: MessageEvent) => void;
type ErrorHandler = (event: Event | ErrorEvent) => void;

export interface CommonSSEOptions extends BaseSSEOptions {
  /** 自定义事件类型及回调 */
  eventHandlers?: Record<string, EventHandler>;
}

export class CommonSSE extends BaseSSE<CommonSSEOptions> {
  private eventSource: EventSource | null = null;

  constructor(url: string, options: CommonSSEOptions = {}) {
    super(url, options);
    this.logger = new ByLogger({
      name: 'CommonSSE',
      level: options.debug ? LogLevel.DEBUG : LogLevel.WARN,
    });
  }

  /**
   * 建立SSE连接
   */
  public connect() {
    if (this.eventSource) {
      this.close();
    }
    this.manuallyClosed = false;
    this.eventSource = new EventSource(this.url);

    if (this.options.debug) {
      this.logger.debug(`尝试连接到: ${this.url}`);
    }

    this.eventSource.onopen = () => {
      if (this.options.debug) {
        this.logger.info('连接已建立');
      }
      this.options.onOpen?.();
    };

    this.eventSource.onerror = (event) => {
      if (this.options.debug) {
        this.logger.error('连接发生错误', event);
      }
      this.options.onError?.(event);
      // 连接断开时自动重连
      if (!this.manuallyClosed && (this.options.autoReconnect ?? true)) {
        this.reconnect();
      }
    };

    this.eventSource.onmessage = (event) => {
      if (this.options.debug) {
        this.logger.debug(`收到消息: ${event.data}`);
      }
      this.options.onMessage?.(event);
    };

    // 注册自定义事件处理器
    if (this.options.eventHandlers) {
      for (const [eventType, handler] of Object.entries(this.options.eventHandlers)) {
        this.eventSource.addEventListener(eventType, handler);
      }
    }
  }

  /**
   * 主动关闭SSE连接
   */
  public close() {
    this.manuallyClosed = true;
    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
      this.options.onClose?.();
      if (this.options.debug) {
        this.logger.info('连接已关闭');
      }
    }
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
  }

  /**
   * 判断当前是否已连接
   */
  public isConnected(): boolean {
    return !!this.eventSource && this.eventSource.readyState === EventSource.OPEN;
  }

  /**
   * 添加自定义事件监听器
   * @param eventType 事件类型
   * @param handler 事件处理函数
   */
  public addEventListener(eventType: string, handler: EventHandler) {
    this.eventSource?.addEventListener(eventType, handler);
  }

  /**
   * 移除自定义事件监听器
   * @param eventType 事件类型
   * @param handler 事件处理函数
   */
  public removeEventListener(eventType: string, handler: EventHandler) {
    this.eventSource?.removeEventListener(eventType, handler);
  }
}