import { LogLevel } from '../types';
import { LogTransport } from './base';

/**
 * WebSocket日志转运器配置选项
 */
export interface WebSocketTransportOptions {
  /** WebSocket服务器URL */
  url: string;
  /** 自动重连，默认为true */
  autoReconnect?: boolean;
  /** 重连间隔（毫秒），默认为5000ms */
  reconnectInterval?: number;
  /** 最大重连次数，默认为无限次 */
  maxReconnectAttempts?: number;
  /** 连接成功前缓存的最大消息数，默认为100 */
  maxBufferSize?: number;
  /** 连接超时时间（毫秒），默认为10000ms */
  connectionTimeout?: number;
  /** 是否在控制台打印连接状态信息，默认为false */
  debug?: boolean;
}

/**
 * WebSocket日志转运器 - 将日志发送到WebSocket服务
 */
export class WebSocketTransport implements LogTransport {
  /** WebSocket实例 */
  private ws: WebSocket | null = null;
  
  /** WebSocket服务器URL */
  private url: string;
  
  /** 自动重连 */
  private autoReconnect: boolean;
  
  /** 重连间隔（毫秒） */
  private reconnectInterval: number;
  
  /** 最大重连次数 */
  private maxReconnectAttempts: number;
  
  /** 当前重连尝试次数 */
  private reconnectAttempts: number = 0;
  
  /** 重连定时器 */
  private reconnectTimer: any = null;
  
  /** 连接状态 */
  private connected: boolean = false;
  
  /** 消息缓冲区 - 存储连接建立前的消息 */
  private messageBuffer: {level: LogLevel, message: string, meta?: any}[] = [];
  
  /** 最大缓冲区大小 */
  private maxBufferSize: number;
  
  /** 是否在控制台打印调试信息 */
  private debug: boolean;
  
  /** 连接超时时间 */
  private connectionTimeout: number;
  
  /** 连接超时定时器 */
  private connectionTimeoutTimer: any = null;

  /**
   * 创建WebSocket日志转运器
   * @param options 配置选项
   */
  constructor(options: WebSocketTransportOptions) {
    this.url = options.url;
    this.autoReconnect = options.autoReconnect !== false;
    this.reconnectInterval = options.reconnectInterval || 5000;
    this.maxReconnectAttempts = options.maxReconnectAttempts || Infinity;
    this.maxBufferSize = options.maxBufferSize || 100;
    this.debug = options.debug || false;
    this.connectionTimeout = options.connectionTimeout || 10000;
    
    // 立即尝试连接
    this.connect();
  }

  /**
   * 连接到WebSocket服务器
   */
  private connect(): void {
    if (this.ws) {
      this.cleanup();
    }

    try {
      this.ws = new WebSocket(this.url);
      this.setupEventHandlers();
      this.setConnectionTimeout();
      
      if (this.debug) {
        console.log(`[WebSocketTransport] 正在连接到 ${this.url}...`);
      }
    } catch (error) {
      this.handleError(error);
    }
  }

  /**
   * 设置连接超时
   */
  private setConnectionTimeout(): void {
    if (this.connectionTimeoutTimer) {
      clearTimeout(this.connectionTimeoutTimer);
    }
    
    this.connectionTimeoutTimer = setTimeout(() => {
      if (!this.connected && this.ws) {
        if (this.debug) {
          console.warn(`[WebSocketTransport] 连接超时，尝试重新连接...`);
        }
        this.ws.close();
        this.scheduleReconnect();
      }
    }, this.connectionTimeout);
  }

  /**
   * 设置WebSocket事件处理器
   */
  private setupEventHandlers(): void {
    if (!this.ws) return;

    this.ws.onopen = () => {
      this.connected = true;
      this.reconnectAttempts = 0;
      
      if (this.connectionTimeoutTimer) {
        clearTimeout(this.connectionTimeoutTimer);
        this.connectionTimeoutTimer = null;
      }
      
      if (this.debug) {
        console.log(`[WebSocketTransport] 已连接到 ${this.url}`);
      }
      
      // 发送所有缓冲消息
      this.flushMessageBuffer();
    };

    this.ws.onclose = (event) => {
      this.connected = false;
      
      if (this.debug) {
        console.log(`[WebSocketTransport] 连接已关闭: 代码 ${event.code}, 原因: ${event.reason}`);
      }
      
      if (this.autoReconnect) {
        this.scheduleReconnect();
      }
    };

    this.ws.onerror = (error) => {
      this.handleError(error);
    };
  }

  /**
   * 处理WebSocket错误
   * @param error 错误信息
   */
  private handleError(error: any): void {
    if (this.debug) {
      console.error(`[WebSocketTransport] 连接发生错误:`, error);
    }
    
    if (this.ws) {
      try {
        this.ws.close();
      } catch (e) {
        // 忽略关闭错误
      }
    }
    
    this.connected = false;
    
    if (this.autoReconnect) {
      this.scheduleReconnect();
    }
  }

  /**
   * 安排重连
   */
  private scheduleReconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }
    
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      
      if (this.debug) {
        console.log(`[WebSocketTransport] 计划在 ${this.reconnectInterval}ms 后重连，尝试 ${this.reconnectAttempts}/${this.maxReconnectAttempts === Infinity ? '∞' : this.maxReconnectAttempts}`);
      }
      
      this.reconnectTimer = setTimeout(() => {
        if (this.debug) {
          console.log(`[WebSocketTransport] 正在尝试重连...`);
        }
        this.connect();
      }, this.reconnectInterval);
    } else if (this.debug) {
      console.error(`[WebSocketTransport] 已达到最大重连次数 (${this.maxReconnectAttempts})，不再重连`);
    }
  }

  /**
   * 清理资源
   */
  private cleanup(): void {
    if (this.ws) {
      // 移除所有事件监听器
      this.ws.onopen = null;
      this.ws.onclose = null;
      this.ws.onerror = null;
      this.ws.onmessage = null;
      
      // 关闭连接
      if (this.ws.readyState === WebSocket.OPEN || this.ws.readyState === WebSocket.CONNECTING) {
        this.ws.close();
      }
      
      this.ws = null;
    }
    
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    if (this.connectionTimeoutTimer) {
      clearTimeout(this.connectionTimeoutTimer);
      this.connectionTimeoutTimer = null;
    }
  }

  /**
   * 发送所有缓冲消息
   */
  private flushMessageBuffer(): void {
    if (!this.connected || !this.ws || this.messageBuffer.length === 0) return;
    
    if (this.debug) {
      console.log(`[WebSocketTransport] 正在发送 ${this.messageBuffer.length} 条缓冲消息`);
    }
    
    while (this.messageBuffer.length > 0) {
      const item = this.messageBuffer.shift();
      if (item) {
        this.sendLogMessage(item.level, item.message, item.meta);
      }
    }
  }

  /**
   * 缓存日志消息
   * @param level 日志级别
   * @param message 日志消息
   * @param meta 元数据
   */
  private bufferMessage(level: LogLevel, message: string, meta?: any): void {
    // 如果超出最大缓冲区大小，移除最早的消息
    if (this.messageBuffer.length >= this.maxBufferSize) {
      this.messageBuffer.shift();
    }
    
    this.messageBuffer.push({ level, message, meta });
  }

  /**
   * 发送日志消息到WebSocket服务器
   * @param level 日志级别
   * @param message 日志消息
   * @param meta 元数据
   */
  private sendLogMessage(level: LogLevel, message: string, meta?: any): boolean {
    if (!this.connected || !this.ws || this.ws.readyState !== WebSocket.OPEN) {
      return false;
    }
    
    try {
      const logData = {
        timestamp: new Date().toISOString(),
        level,
        message,
        meta
      };
      
      this.ws.send(JSON.stringify(logData));
      return true;
    } catch (error) {
      if (this.debug) {
        console.error(`[WebSocketTransport] 发送消息时发生错误:`, error);
      }
      return false;
    }
  }

  /**
   * 日志输出方法
   * @param level 日志级别
   * @param message 日志消息
   * @param meta 元数据
   */
  log(level: LogLevel, message: string, meta?: any): void {
    // 如果已连接，直接发送
    if (this.connected && this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.sendLogMessage(level, message, meta);
    } 
    // 否则，将消息加入缓冲区
    else {
      this.bufferMessage(level, message, meta);
    }
  }

  /**
   * 关闭WebSocket连接
   */
  close(): void {
    if (this.debug) {
      console.log(`[WebSocketTransport] 正在关闭连接...`);
    }
    
    this.autoReconnect = false;
    this.cleanup();
  }
}
