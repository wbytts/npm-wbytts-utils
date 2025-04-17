/**
 * 前端监控系统配置接口
 */
export interface MonitorConfig {
  /** WebSocket服务器地址 */
  wsUrl: string;
  /** 应用名称，默认为 'defaultApp' */
  appName?: string;
  /** 采样率 (0-1)，默认为 1 (100%) */
  samplingRate?: number;
  /** 是否启用日志 */
  enableLog?: boolean;
}

/**
 * 日志级别枚举
 */
enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error'
}

/**
 * 日志颜色配置
 */
const LOG_COLORS = {
  [LogLevel.DEBUG]: '#7f8c8d', // 灰色
  [LogLevel.INFO]: '#2980b9',  // 蓝色
  [LogLevel.WARN]: '#f39c12',  // 橙色
  [LogLevel.ERROR]: '#c0392b', // 红色
  PREFIX: '#8e44ad'            // 紫色
};

/**
 * 扩展全局Window接口，添加第三方库的类型声明
 */
declare global {
  interface Window {
    /**
     * Vue框架构造函数
     */
    Vue?: any;
    
    /**
     * React框架对象
     */
    React?: {
      useState?: Function;
      [key: string]: any;
    };
  }
}

/**
 * 监控事件数据的基础接口
 */
interface MonitorEventBase {
  /** 事件类型 */
  type: string;
  /** 事件发生的时间戳 */
  timestamp: number;
}

/**
 * 系统信息事件数据
 */
interface SystemInfoEvent extends MonitorEventBase {
  type: 'system';
  appName: string;
  userAgent: string;
}

/**
 * 函数调用事件数据
 */
interface FunctionCallEvent extends MonitorEventBase {
  type: 'functionCall';
  callId: string;
  functionType: string;
  name: string;
  action: 'start' | 'end' | 'error';
  args?: any;
  result?: any;
  error?: any;
  stack?: string;
}

/**
 * 状态变化事件数据
 */
interface StateChangeEvent extends MonitorEventBase {
  type: 'stateChange';
  path: string;
  oldValue: any;
  newValue: any;
}

/**
 * React状态变化事件数据
 */
interface ReactStateChangeEvent extends MonitorEventBase {
  type: 'reactStateChange';
  oldState: any;
  newState: any;
}

/**
 * 全部监控事件数据类型
 */
type MonitorEventData = SystemInfoEvent | FunctionCallEvent | StateChangeEvent | ReactStateChangeEvent;

/**
 * 前端监控系统
 * 用于收集前端性能、错误和状态数据，通过WebSocket发送到服务器进行分析
 */
export class FrontendMonitor {
  /** WebSocket服务器地址 */
  private wsUrl: string;
  /** 应用名称 */
  private appName: string;
  /** 采样率 */
  private samplingRate: number;
  /** WebSocket实例 */
  private websocket: WebSocket | null;
  /** 是否启用日志 */
  private enableLog: boolean;

  /**
   * 创建前端监控系统实例
   * @param config 监控系统配置
   */
  constructor(config: MonitorConfig) {
    this.wsUrl = config.wsUrl;
    this.appName = config.appName || 'defaultApp';
    this.samplingRate = config.samplingRate || 1;
    this.enableLog = config.enableLog !== undefined ? config.enableLog : true;
    this.websocket = null;
    
    this.logInfo(`初始化前端监控系统 - 应用: ${this.appName}, 采样率: ${this.samplingRate}`);
    this.initWebSocket();
    this.initHooks();
    this.logInfo('前端监控系统初始化完成');
  }

  /**
   * 输出带标识和颜色的日志
   * @param level 日志级别
   * @param message 日志消息
   * @param args 其他参数
   */
  private log(level: LogLevel, message: string, ...args: any[]): void {
    if (!this.enableLog) return;

    const prefix = `%c[前端监控]%c ${message}`;
    const prefixStyle = `color: ${LOG_COLORS.PREFIX}; font-weight: bold;`;
    const messageStyle = `color: ${LOG_COLORS[level]}; font-weight: ${level === LogLevel.ERROR ? 'bold' : 'normal'};`;

    switch (level) {
      case LogLevel.DEBUG:
        console.debug(prefix, prefixStyle, messageStyle, ...args);
        break;
      case LogLevel.INFO:
        console.info(prefix, prefixStyle, messageStyle, ...args);
        break;
      case LogLevel.WARN:
        console.warn(prefix, prefixStyle, messageStyle, ...args);
        break;
      case LogLevel.ERROR:
        console.error(prefix, prefixStyle, messageStyle, ...args);
        break;
    }
  }

  /**
   * 输出调试日志
   * @param message 日志消息
   * @param args 其他参数
   */
  private logDebug(message: string, ...args: any[]): void {
    this.log(LogLevel.DEBUG, message, ...args);
  }

  /**
   * 输出信息日志
   * @param message 日志消息
   * @param args 其他参数
   */
  private logInfo(message: string, ...args: any[]): void {
    this.log(LogLevel.INFO, message, ...args);
  }

  /**
   * 输出警告日志
   * @param message 日志消息
   * @param args 其他参数
   */
  private logWarn(message: string, ...args: any[]): void {
    this.log(LogLevel.WARN, message, ...args);
  }

  /**
   * 输出错误日志
   * @param message 日志消息
   * @param args 其他参数
   */
  private logError(message: string, ...args: any[]): void {
    this.log(LogLevel.ERROR, message, ...args);
  }

  /**
   * 初始化WebSocket连接
   */
  private initWebSocket(): void {
    this.logInfo(`正在连接WebSocket服务器: ${this.wsUrl}`);
    this.websocket = new WebSocket(this.wsUrl);

    this.websocket.onopen = () => {
      this.logInfo('WebSocket连接已建立，发送系统信息...');
      this.sendSystemInfo();
    };

    this.websocket.onerror = (error: Event) => {
      this.logError('WebSocket连接错误:', error);
    };
    
    this.websocket.onclose = (event: CloseEvent) => {
      this.logWarn(`WebSocket连接已关闭 - 代码: ${event.code}, 原因: ${event.reason || '未知'}`);
    };
  }

  /**
   * 发送系统信息
   */
  private sendSystemInfo(): void {
    this.logInfo('正在发送系统信息...');
    const info: SystemInfoEvent = {
      type: 'system',
      appName: this.appName,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
    };
    this.sendData(info);
    this.logInfo('系统信息已发送');
  }

  /**
   * 发送数据到服务器
   * @param data 要发送的监控数据
   */
  private sendData(data: MonitorEventData): void {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify(data);
      this.logDebug(`发送数据: ${data.type}`, data);
      this.websocket.send(message);
    } else {
      this.logWarn('WebSocket未连接，无法发送数据');
    }
  }
 
  /**
   * 初始化各种钩子
   */
  private initHooks(): void {
    this.logInfo('开始初始化监控钩子...');
    this.hookFunctionCalls();
    this.hookStateChanges();
    this.logInfo('所有监控钩子初始化完成');
  }

  /**
   * 监控函数调用
   */
  private hookFunctionCalls(): void {
    this.logInfo('正在设置函数调用监控...');
    
    // 保存原始方法
    const originalSetTimeout = window.setTimeout;
    const originalSetInterval = window.setInterval;
    const originalRequestAnimationFrame = window.requestAnimationFrame;
    this.logDebug('已保存原始定时器函数的引用');

    // 创建包装函数
    const wrappedSetTimeout = (callback: TimerHandler, delay?: number, ...args: any[]): number => {
      if (typeof callback === 'string') {
        // 处理字符串回调情况
        this.logDebug(`setTimeout被调用 - 字符串回调, 延迟: ${delay}ms`);
        return originalSetTimeout(callback, delay, ...args);
      }
      this.logDebug(`setTimeout被调用 - 函数回调, 延迟: ${delay}ms`);
      return originalSetTimeout(this.wrapFunction(callback as Function, 'setTimeout'), delay, ...args);
    };

    // 创建包装函数
    const wrappedSetInterval = (callback: TimerHandler, delay?: number, ...args: any[]): number => {
      if (typeof callback === 'string') {
        // 处理字符串回调情况
        this.logDebug(`setInterval被调用 - 字符串回调, 间隔: ${delay}ms`);
        return originalSetInterval(callback, delay, ...args);
      }
      this.logDebug(`setInterval被调用 - 函数回调, 间隔: ${delay}ms`);
      return originalSetInterval(this.wrapFunction(callback as Function, 'setInterval'), delay, ...args);
    };

    // 创建包装函数
    const wrappedRequestAnimationFrame = (callback: FrameRequestCallback): number => {
      this.logDebug('requestAnimationFrame被调用');
      return originalRequestAnimationFrame(this.wrapFrameRequestCallback(callback, 'requestAnimationFrame'));
    };
    
    // 直接替换全局函数，不尝试复制任何属性
    this.logInfo('正在替换全局定时器函数以启用监控...');
    window.setTimeout = wrappedSetTimeout as typeof window.setTimeout;
    window.setInterval = wrappedSetInterval as typeof window.setInterval;
    window.requestAnimationFrame = wrappedRequestAnimationFrame as typeof window.requestAnimationFrame;
    this.logInfo('全局定时器函数已被成功替换');

    // 监听事件处理器
    // this.hookEventListeners();
  }

  /**
   * 包装帧请求回调函数
   * @param callback 原始回调函数
   * @param type 函数类型
   * @returns 包装后的回调函数
   */
  private wrapFrameRequestCallback(callback: FrameRequestCallback, type: string): FrameRequestCallback {
    const self = this;
    return function(timestamp: DOMHighResTimeStamp): void {
      const callId = Math.random().toString(36).substr(2, 9);
      const stack = new Error().stack || '';

      // 记录函数调用开始
      self.logDebug(`[${callId}] 开始执行帧回调 ${type}: ${callback.name || 'anonymous'}, 时间戳: ${timestamp}`);
      self.sendData({
        type: 'functionCall',
        callId,
        functionType: type,
        name: callback.name || 'anonymous',
        args: [timestamp],
        stack,
        action: 'start',
        timestamp: Date.now(),
      });

      try {
        callback(timestamp);

        // 记录函数调用结束
        self.logDebug(`[${callId}] 完成执行帧回调 ${type}: ${callback.name || 'anonymous'}`);
        self.sendData({
          type: 'functionCall',
          callId,
          functionType: type,
          name: callback.name || 'anonymous',
          action: 'end',
          timestamp: Date.now(),
        });
      } catch (error) {
        // 记录函数调用错误
        self.logError(`[${callId}] 帧回调执行错误 ${type}: ${callback.name || 'anonymous'}`, error);
        self.sendData({
          type: 'functionCall',
          callId,
          functionType: type,
          name: callback.name || 'anonymous',
          error: self.sanitizeData(error),
          action: 'error',
          timestamp: Date.now(),
        });

        throw error;
      }
    };
  }

  /**
   * 监听DOM事件
   * 通过重写EventTarget.prototype.addEventListener方法，
   * 实现对所有DOM事件监听器的调用进行监控
   */
  private hookEventListeners(): void {
    this.logInfo('正在设置DOM事件监听器监控...');
    // 保存原始的事件监听方法，以便在我们的包装方法中调用
    const originalAddEventListener = EventTarget.prototype.addEventListener;
    // 保存this引用，以便在新的函数作用域中访问
    const self = this;

    // 重写addEventListener方法
    // 使用泛型K来确保类型安全
    EventTarget.prototype.addEventListener = function<K extends keyof HTMLElementEventMap>(
      type: string,  // 事件类型
      listener: EventListenerOrEventListenerObject | null,  // 事件处理函数或对象
      options?: boolean | AddEventListenerOptions  // 事件选项
    ): void {
      // 如果没有监听器，直接调用原始方法并返回
      if (!listener) {
        return originalAddEventListener.call(this, type, listener, options);
      }

      // 声明包装后的监听器变量
      let wrappedListener: EventListenerOrEventListenerObject;
      
      if (typeof listener === 'function') {
        // 如果监听器是函数，直接包装它
        // 使用`event:${type}`格式的标识符来区分不同类型的事件
        self.logDebug(`包装 ${type} 事件监听器函数`);
        wrappedListener = self.wrapFunction(listener, `event:${type}`);
      } else {
        // 如果监听器是一个实现了EventListenerObject接口的对象
        // 需要特殊处理handleEvent方法
        self.logDebug(`包装 ${type} 事件监听器对象`);
        const originalHandleEvent = listener.handleEvent;
        
        // 包装handleEvent方法，使用bind确保this上下文正确
        // 使用`event:${type}:handleEvent`格式来明确标识这是一个对象型监听器的handleEvent方法
        const wrappedHandleEvent = self.wrapFunction(
          originalHandleEvent.bind(listener), 
          `event:${type}:handleEvent`
        );
        
        // 创建一个新的对象，替换原来的监听器对象
        wrappedListener = {
          // 实现新的handleEvent方法，它会调用我们包装过的handleEvent
          handleEvent: function(event: Event): void {
            wrappedHandleEvent(event);
          }
        };
      }
      
      // 使用包装后的监听器调用原始的addEventListener方法
      // 这确保了所有添加的事件监听器都会被我们的监控系统跟踪
      return originalAddEventListener.call(this, type, wrappedListener, options);
    };
    this.logInfo('DOM事件监听器监控设置完成');
  }

  /**
   * 监听状态变化
   */
  private hookStateChanges(): void {
    this.logInfo('开始设置状态变化监控...');
    // 监控全局变量变化
    this.monitorGlobalObjects();

    // 监控常见框架状态
    this.monitorFrameworkStates();
    this.logInfo('状态变化监控设置完成');
  }

  /**
   * 监听框架状态变化
   */
  private monitorFrameworkStates(): void {
    this.logInfo('开始监控框架状态变化');
    // 检查并监控Vue
    if (typeof window !== 'undefined' && 'Vue' in window) {
      this.monitorVue();
    } else {
      this.logInfo('未检测到Vue框架');
    }

    // 检查并监控React
    if (typeof window !== 'undefined' && 'React' in window) {
      this.monitorReact();
    } else {
      this.logInfo('未检测到React框架');
    }

    // 可以添加其他框架的监控
    this.logInfo('框架状态监控设置完成');
  }

  /**
   * 包装普通函数，用于监控执行
   * @param fn 原始函数
   * @param type 函数类型标识
   * @returns 包装后的函数
   */
  private wrapFunction<T extends Function>(fn: T, type: string): T {
    const self = this;
    const wrappedFn = function(this: any, ...args: any[]): any {
      const callId = Math.random().toString(36).substr(2, 9);
      const stack = new Error().stack || '';

      // 记录函数调用开始
      self.logDebug(`[${callId}] 开始执行 ${type} 函数: ${fn.name || 'anonymous'}`);
      self.sendData({
        type: 'functionCall',
        callId,
        functionType: type,
        name: fn.name || 'anonymous',
        args: self.sanitizeData(args),
        stack,
        action: 'start',
        timestamp: Date.now(),
      });

      try {
        const result = fn.apply(this, args);
        
        // 对于Promise结果，添加额外的监控
        if (result instanceof Promise) {
          self.logDebug(`[${callId}] 函数返回Promise，添加Promise监控`);
          return result.then(
            (value) => {
              // Promise成功完成
              self.logDebug(`[${callId}] Promise成功解决: ${fn.name || 'anonymous'}`);
              self.sendData({
                type: 'functionCall',
                callId,
                functionType: type,
                name: fn.name || 'anonymous',
                result: self.sanitizeData(value),
                action: 'end',
                timestamp: Date.now(),
              });
              return value;
            },
            (error) => {
              // Promise失败
              self.logError(`[${callId}] Promise失败: ${fn.name || 'anonymous'}`, error);
              self.sendData({
                type: 'functionCall',
                callId,
                functionType: type,
                name: fn.name || 'anonymous',
                error: self.sanitizeData(error),
                action: 'error',
                timestamp: Date.now(),
              });
              throw error;
            }
          );
        }

        // 记录函数调用结束
        self.logDebug(`[${callId}] 完成执行 ${type} 函数: ${fn.name || 'anonymous'}`);
        self.sendData({
          type: 'functionCall',
          callId,
          functionType: type,
          name: fn.name || 'anonymous',
          result: self.sanitizeData(result),
          action: 'end',
          timestamp: Date.now(),
        });

        return result;
      } catch (error) {
        // 记录函数调用错误
        self.logError(`[${callId}] 函数执行错误 ${type}: ${fn.name || 'anonymous'}`, error);
        self.sendData({
          type: 'functionCall',
          callId,
          functionType: type,
          name: fn.name || 'anonymous',
          error: self.sanitizeData(error),
          action: 'error',
          timestamp: Date.now(),
        });

        throw error;
      }
    };
    
    return wrappedFn as unknown as T;
  }

  /**
   * 监控全局对象变化
   */
  private monitorGlobalObjects(): void {
    this.logInfo('开始监控全局对象变化');
    // 指定要监控的全局对象
    const globalObjects: string[] = ['document'];
    this.logDebug(`将监控以下全局对象: ${globalObjects.join(', ')}`);

    try {
      globalObjects.forEach(objName => {
        if (window[objName as keyof Window]) {
          this.logDebug(`创建代理用于监控: ${objName}`);
          // 使用类型断言确保类型安全
          const obj = window[objName as keyof Window] as object;
          this.createProxy(obj, objName);
        } else {
          this.logWarn(`无法找到全局对象: ${objName}`);
        }
      });
    } catch (err) {
      this.logError('监控全局对象失败:', err);
    }
  }

  /**
   * 监控Vue框架状态变化
   */
  private monitorVue(): void {
    this.logInfo('尝试监控Vue框架状态变化');
    try {
      // 检测是否有 Vue 对象可用
      if (typeof window.Vue !== 'undefined') {
        this.logInfo('检测到Vue框架，开始设置状态监控');
        
        const originalVue = window.Vue;
        const self = this;
        
        // 替换Vue构造函数
        (window as any).Vue = function Vue(options: any): any {
          self.logDebug('Vue实例被创建');
          
          // 处理options.data
          if (options && options.data) {
            const originalData = options.data;
            
            // 劫持data函数或对象
            options.data = function(): any {
              self.logDebug('Vue data函数被调用');
              let data;
              
              if (typeof originalData === 'function') {
                data = originalData.apply(this);
              } else {
                data = originalData;
              }
              
              // 监控data返回的对象变化
              return self.createProxy(data, 'vue.data');
            };
          }
          
          self.logDebug('调用原始Vue构造函数');
          return originalVue.call(this, options);
        };
  
        this.logInfo('Vue状态监控设置完成');
        (window as any).Vue.prototype = originalVue.prototype;
      } else {
        this.logInfo('未检测到Vue框架，跳过Vue监控设置');
      }
    } catch (err) {
      this.logError('监控Vue失败:', err);
    }
  }

  /**
   * 监控React框架状态变化
   */
  private monitorReact(): void {
    this.logInfo('尝试监控React框架状态变化');
    try {
      // 检测是否有 React 和 React Hooks
      if (typeof window.React !== 'undefined' && window.React.useState) {
        this.logInfo('检测到React框架，开始设置Hooks监控');
        
        const originalUseState = window.React.useState;
        const self = this;
        
        // 替换useState Hook
        window.React.useState = function useState<S>(initialState: S | (() => S)): [S, (newState: S) => void] {
          self.logDebug('React useState被调用');
          
          // 调用原始useState
          const [state, setState] = originalUseState(initialState);
          
          // 包装setState函数
          const wrappedSetState = (newState: S): void => {
            self.logDebug('React setState被调用', {oldState: state, newState});
            
            // 记录状态变化
            self.sendData({
              type: 'reactStateChange',
              oldState: self.sanitizeData(state),
              newState: self.sanitizeData(newState),
              timestamp: Date.now(),
            });
            
            // 调用原始setState
            setState(newState);
          };
          
          self.logDebug('返回包装后的useState结果');
          return [state, wrappedSetState];
        };
        
        this.logInfo('React Hooks监控设置完成');
      } else {
        this.logInfo('未检测到React框架，跳过React监控设置');
      }
    } catch (err) {
      this.logError('监控React失败:', err);
    }
  }

  /**
   * 清理数据，防止循环引用和处理特殊对象
   * @param data 需要清理的数据
   * @returns 清理后的数据
   */
  private sanitizeData(data: any): any {
    // 防止循环引用
    const seen = new WeakSet();

    const sanitize = (value: any): any => {
      if (value === null || typeof value !== 'object') {
        return value;
      }

      if (seen.has(value)) {
        return '[Circular]';
      }

      seen.add(value);

      if (Array.isArray(value)) {
        return value.map(sanitize);
      }

      if (value instanceof Error) {
        return {
          __type: 'Error',
          name: value.name,
          message: value.message,
          stack: value.stack,
        };
      }

      if (value instanceof Date) {
        return value.toISOString();
      }

      if (value instanceof RegExp) {
        return value.toString();
      }

      const result: Record<string, any> = {};
      for (const key in value) {
        if (Object.prototype.hasOwnProperty.call(value, key)) {
          result[key] = sanitize(value[key]);
        }
      }

      return result;
    };

    return sanitize(data);
  }

  /**
   * 获取当前调用栈
   * @returns 调用栈数组
   */
  private getCallStack(): string[] {
    const stack = (new Error().stack || '').split('\n');
    // 移除前两行无关信息
    return stack.slice(2).map(line => line.trim());
  }

  /**
   * 创建属性监控代理
   * @param target 目标对象
   * @param path 属性路径
   * @returns 代理对象
   */
  private createProxy<T extends object>(target: T, path: string): T {
    const self = this;

    if (!target || typeof target !== 'object') {
      return target;
    }

    try {
      this.logDebug(`为路径 ${path} 创建属性监控代理`);
      return new Proxy(target, {
        set(obj: any, prop: string | symbol, value: any): boolean {
          if (typeof prop === 'symbol') {
            obj[prop] = value;
            return true;
          }
  
          const oldValue = obj[prop];
          obj[prop] = value;
  
          if (oldValue !== value) {
            // 只有当值发生变化时才发送数据
            self.logDebug(`属性变化: ${path}.${String(prop)}`);
            // 发送变化数据
            self.sendData({
              type: 'stateChange',
              path: `${path}.${String(prop)}`,
              oldValue: self.sanitizeData(oldValue),
              newValue: self.sanitizeData(value),
              timestamp: Date.now(),
            });
          }
  
          return true;
        },
  
        get(obj: any, prop: string | symbol): any {
          const value = obj[prop];
  
          if (typeof prop !== 'symbol' && typeof value === 'object' && value !== null) {
            return self.createProxy(value, `${path}.${String(prop)}`);
          }
  
          return value;
        },
      });
    } catch (err) {
      this.logError('创建代理失败:', err);
      return target;
    }
  }
}
