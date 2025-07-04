import { BaseSSE, BaseSSEOptions } from './base-sse';
import { ByLogger } from '../logger/by-logger';
import { LogLevel } from '../logger/types';

declare var wx: any; // 让TS知道有全局wx

/**
 * 微信小程序环境下的 SSE（Server-Sent Events）工具类实现，继承BaseSSE
 * 说明：
 * - 利用 wx.request 的 responseType: 'text' 实现流式接收
 * - 支持自动重连、事件监听、日志输出
 * - 兼容服务端标准SSE格式（以 "data:" 开头，两个换行符分隔消息）
 * - 详细中文注释
 */

type WxSSEEventHandler = (data: string, rawEvent?: any) => void;

export interface WxMiniSSEOptions extends BaseSSEOptions {
  wx?: any;
  headers?: Record<string, string>;
  onMessage?: WxSSEEventHandler;
}

export class WxMiniSSE extends BaseSSE<WxMiniSSEOptions> {
  private requestTask: any = null;
  private wx: any;
  private buffer: string = '';

  constructor(url: string, options: WxMiniSSEOptions = {}) {
    super(url, options);
    this.wx = options.wx || (typeof wx !== 'undefined' ? wx : null);
  }

  /**
   * 建立SSE连接
   */
  public connect() {
    if (!this.wx) {
      throw new Error('未检测到微信小程序wx对象');
    }
    if (this.requestTask) {
      this.close();
    }
    this.manuallyClosed = false;
    this.buffer = '';
    if (this.options.debug) {
      this.logger.debug(`尝试连接到: ${this.url}`);
    }
    this.requestTask = this.wx.request({
      url: this.url,
      method: 'GET',
      enableChunked: true,
      responseType: 'text',
      header: Object.assign({ Accept: 'text/event-stream' }, this.options.headers || {}),
      success: () => {
        // 仅代表请求成功建立，数据流在 onChunkReceived/onHeadersReceived 里处理
      },
      fail: (err: any) => {
        if (this.options.debug) {
          this.logger.error('连接失败', err);
        }
        this.options.onError?.(err);
        if (!this.manuallyClosed && (this.options.autoReconnect ?? true)) {
          this.reconnect();
        }
      },
    });

    // 监听数据流
    if (this.requestTask && this.requestTask.onChunkReceived) {
      this.requestTask.onChunkReceived((res: any) => {
        const chunk = typeof res.data === 'string' ? res.data : '';
        if (chunk) {
          this.handleChunk(chunk);
        }
      });
    }
    // 连接建立
    this.options.onOpen?.();
    if (this.options.debug) {
      this.logger.info('连接已建立');
    }
  }

  /**
   * 处理服务端推送的chunk数据
   */
  private handleChunk(chunk: string) {
    this.buffer += chunk;
    // 按SSE协议，消息以两个换行符分隔
    let idx;
    while ((idx = this.buffer.indexOf('\n\n')) !== -1) {
      const rawMsg = this.buffer.slice(0, idx);
      this.buffer = this.buffer.slice(idx + 2);
      // 只处理data:开头的行
      const match = rawMsg.match(/^data:(.*)$/m);
      if (match) {
        const data = match[1].trim();
        this.options.onMessage?.(data, rawMsg);
        if (this.options.debug) {
          this.logger.debug('收到消息: ' + data);
        }
      }
    }
  }

  /**
   * 主动关闭SSE连接
   */
  public close() {
    this.manuallyClosed = true;
    if (this.requestTask && this.requestTask.abort) {
      this.requestTask.abort();
      this.requestTask = null;
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
    return !!this.requestTask;
  }
}