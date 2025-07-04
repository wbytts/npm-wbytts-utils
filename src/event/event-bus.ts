/**
 * 事件监听器类型
 */
export type EventListener<T = any> = (event: T) => void;

/**
 * 事件总线选项
 */
export interface EventBusOptions {
  /**
   * 是否允许打印调试日志
   */
  debug?: boolean;
  
  /**
   * 是否捕获事件处理器中的错误（避免一个处理器出错影响其他处理器）
   */
  captureErrors?: boolean;
  
  /**
   * 默认的最大监听器数量
   */
  maxListeners?: number;
}

/**
 * 事件对象接口
 */
export interface EventObject {
  /**
   * 事件名称
   */
  name: string;
  
  /**
   * 事件数据
   */
  data?: any;
  
  /**
   * 事件触发时间
   */
  timestamp: number;
  
  /**
   * 事件源
   */
  source?: any;
}

/**
 * 事件总线 - 支持类型安全的发布订阅模式
 */
export class ByEventBus<EventMap extends Record<string, any> = Record<string, any>> {
  /**
   * 事件监听器映射
   * @private
   */
  private listeners: Map<keyof EventMap, Set<EventListener<any>>> = new Map();
  
  /**
   * 一次性事件监听器映射
   * @private
   */
  private onceListeners: Map<keyof EventMap, Set<EventListener<any>>> = new Map();
  
  /**
   * 最大监听器数量
   * @private
   */
  private maxListeners: number;
  
  /**
   * 是否启用调试日志
   * @private
   */
  private debug: boolean;
  
  /**
   * 是否捕获事件处理器中的错误
   * @private
   */
  private captureErrors: boolean;
  
  /**
   * 创建事件总线实例
   * @param options 事件总线选项
   */
  constructor(options: EventBusOptions = {}) {
    this.maxListeners = options.maxListeners || 10;
    this.debug = options.debug || false;
    this.captureErrors = options.captureErrors !== false;
  }
  
  /**
   * 获取某个事件的所有监听器
   * @param eventName 事件名称
   * @returns 监听器数组
   */
  private getListeners<K extends keyof EventMap>(eventName: K): Set<EventListener<EventMap[K]>> {
    if (!this.listeners.has(eventName)) {
      this.listeners.set(eventName, new Set());
    }
    return this.listeners.get(eventName) as Set<EventListener<EventMap[K]>>;
  }
  
  /**
   * 获取某个事件的所有一次性监听器
   * @param eventName 事件名称
   * @returns 一次性监听器数组
   */
  private getOnceListeners<K extends keyof EventMap>(eventName: K): Set<EventListener<EventMap[K]>> {
    if (!this.onceListeners.has(eventName)) {
      this.onceListeners.set(eventName, new Set());
    }
    return this.onceListeners.get(eventName) as Set<EventListener<EventMap[K]>>;
  }
  
  /**
   * 检查是否超出最大监听器数量限制
   * @param eventName 事件名称
   * @private
   */
  private checkMaxListeners(eventName: keyof EventMap): void {
    const listenersCount = 
      (this.listeners.get(eventName)?.size || 0) + 
      (this.onceListeners.get(eventName)?.size || 0);
      
    if (listenersCount > this.maxListeners) {
      const warning = `警告: 事件 "${String(eventName)}" 的监听器数量 (${listenersCount}) 超出了最大限制 (${this.maxListeners})`;
      console.warn(warning);
    }
  }
  
  /**
   * 注册事件监听器
   * @param eventName 事件名称
   * @param listener 事件监听器函数
   * @returns 当前实例，支持链式调用
   */
  on<K extends keyof EventMap>(eventName: K, listener: EventListener<EventMap[K]>): this {
    const listeners = this.getListeners(eventName);
    listeners.add(listener);
    
    if (this.debug) {
      console.log(`[ByEventBus] 添加事件监听器: "${String(eventName)}"`);
    }
    
    this.checkMaxListeners(eventName);
    return this;
  }
  
  /**
   * 注册事件监听器（on 方法的别名）
   * @param eventName 事件名称
   * @param listener 事件监听器函数
   * @returns 当前实例，支持链式调用
   */
  subscribe<K extends keyof EventMap>(eventName: K, listener: EventListener<EventMap[K]>): this {
    return this.on(eventName, listener);
  }
  
  /**
   * 注册一次性事件监听器，触发一次后自动移除
   * @param eventName 事件名称
   * @param listener 事件监听器函数
   * @returns 当前实例，支持链式调用
   */
  once<K extends keyof EventMap>(eventName: K, listener: EventListener<EventMap[K]>): this {
    const onceListeners = this.getOnceListeners(eventName);
    onceListeners.add(listener);
    
    if (this.debug) {
      console.log(`[ByEventBus] 添加一次性事件监听器: "${String(eventName)}"`);
    }
    
    this.checkMaxListeners(eventName);
    return this;
  }
  
  /**
   * 移除事件监听器
   * @param eventName 事件名称
   * @param listener 要移除的监听器函数，如果不提供则移除该事件的所有监听器
   * @returns 当前实例，支持链式调用
   */
  off<K extends keyof EventMap>(eventName: K, listener?: EventListener<EventMap[K]>): this {
    if (listener) {
      // 移除指定的监听器
      const listeners = this.getListeners(eventName);
      listeners.delete(listener);
      
      const onceListeners = this.getOnceListeners(eventName);
      onceListeners.delete(listener);
      
      if (this.debug) {
        console.log(`[ByEventBus] 移除事件监听器: "${String(eventName)}"`);
      }
    } else {
      // 移除该事件的所有监听器
      this.listeners.delete(eventName);
      this.onceListeners.delete(eventName);
      
      if (this.debug) {
        console.log(`[ByEventBus] 移除事件 "${String(eventName)}" 的所有监听器`);
      }
    }
    
    return this;
  }
  
  /**
   * 移除事件监听器（off 方法的别名）
   * @param eventName 事件名称
   * @param listener 要移除的监听器函数，如果不提供则移除该事件的所有监听器
   * @returns 当前实例，支持链式调用
   */
  unsubscribe<K extends keyof EventMap>(eventName: K, listener?: EventListener<EventMap[K]>): this {
    return this.off(eventName, listener);
  }
  
  /**
   * 触发事件
   * @param eventName 事件名称
   * @param eventData 事件数据
   * @returns 当前实例，支持链式调用
   */
  emit<K extends keyof EventMap>(eventName: K, eventData: EventMap[K]): this {
    const listeners = this.getListeners(eventName);
    const onceListeners = this.getOnceListeners(eventName);
    
    const timestamp = Date.now();
    const eventObject: EventObject = {
      name: String(eventName),
      data: eventData,
      timestamp,
      source: this
    };
    
    if (this.debug) {
      console.log(`[ByEventBus] 触发事件: "${String(eventName)}"`, eventData);
    }
    
    // 处理普通监听器
    listeners.forEach(listener => {
      try {
        listener(eventData);
      } catch (error) {
        if (this.captureErrors) {
          console.error(`[ByEventBus] 事件处理器错误:`, error);
        } else {
          throw error;
        }
      }
    });
    
    // 处理一次性监听器
    if (onceListeners.size > 0) {
      // 创建副本以避免遍历时修改集合
      const onceListenersCopy = Array.from(onceListeners);
      
      // 清空一次性监听器
      this.onceListeners.delete(eventName);
      
      // 触发一次性监听器
      onceListenersCopy.forEach(listener => {
        try {
          listener(eventData);
        } catch (error) {
          if (this.captureErrors) {
            console.error(`[ByEventBus] 一次性事件处理器错误:`, error);
          } else {
            throw error;
          }
        }
      });
    }
    
    return this;
  }
  
  /**
   * 触发事件（emit 方法的别名）
   * @param eventName 事件名称
   * @param eventData 事件数据
   * @returns 当前实例，支持链式调用
   */
  publish<K extends keyof EventMap>(eventName: K, eventData: EventMap[K]): this {
    return this.emit(eventName, eventData);
  }
  
  /**
   * 判断是否有某个事件的监听器
   * @param eventName 事件名称
   * @returns 是否有监听器
   */
  hasListeners<K extends keyof EventMap>(eventName: K): boolean {
    return (
      (this.listeners.has(eventName) && this.listeners.get(eventName)!.size > 0) ||
      (this.onceListeners.has(eventName) && this.onceListeners.get(eventName)!.size > 0)
    );
  }
  
  /**
   * 获取某个事件的监听器数量
   * @param eventName 事件名称
   * @returns 监听器数量
   */
  listenerCount<K extends keyof EventMap>(eventName: K): number {
    return (
      (this.listeners.get(eventName)?.size || 0) +
      (this.onceListeners.get(eventName)?.size || 0)
    );
  }
  
  /**
   * 获取所有已注册的事件名称
   * @returns 事件名称数组
   */
  eventNames(): Array<keyof EventMap> {
    const eventNames = new Set<keyof EventMap>();
    
    // 合并普通事件和一次性事件的名称
    this.listeners.forEach((_, key) => eventNames.add(key));
    this.onceListeners.forEach((_, key) => eventNames.add(key));
    
    return Array.from(eventNames);
  }
  
  /**
   * 移除所有事件监听器
   * @returns 当前实例，支持链式调用
   */
  removeAllListeners(): this {
    this.listeners.clear();
    this.onceListeners.clear();
    
    if (this.debug) {
      console.log(`[ByEventBus] 已移除所有事件监听器`);
    }
    
    return this;
  }
  
  /**
   * 设置最大监听器数量
   * @param n 最大数量
   * @returns 当前实例，支持链式调用
   */
  setMaxListeners(n: number): this {
    this.maxListeners = n;
    return this;
  }
  
  /**
   * 获取最大监听器数量
   * @returns 最大监听器数量
   */
  getMaxListeners(): number {
    return this.maxListeners;
  }
}

// 导出默认的事件总线实例
export const eventBus = new ByEventBus();
