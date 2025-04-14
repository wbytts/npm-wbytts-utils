/**
 * 定时器回调函数类型
 */
export type TimerCallback = () => void;

/**
 * 定时器接口定义
 */
export interface Timer {
  /** 启动定时器 */
  start: () => void;
  /** 停止定时器 */
  stop: () => void;
  /** 手动触发一次定时器回调 */
  tick: () => void;
  /** 是否正在运行 */
  isRunning: () => boolean;
  /** 重置定时器 */
  reset: () => void;
  /** 注册定时器回调函数 */
  onTick: (callback: TimerCallback) => void;
  /** 移除定时器回调函数 */
  offTick: (callback: TimerCallback) => void;
  /** 获取定时器名称 */
  getName: () => string;
}

/**
 * 定时器配置选项
 */
export interface TimerOptions {
  /** 步长（间隔时间），单位为毫秒，默认为1000ms */
  step?: number;
  /** 是否自动启动，默认为false */
  autoStart?: boolean;
  /** 最大执行次数，默认为无限 */
  maxTicks?: number;
  /** 定时器名称，默认随机生成 */
  name?: string;
  /** 是否开启调试日志，默认为false */
  debug?: boolean;
}

/**
 * 生成随机定时器ID
 */
function generateRandomId(): string {
  return `timer_${Math.floor(Math.random() * 100000)}`;
}

/**
 * 创建一个定时器
 * @param options 定时器配置选项
 * @returns 定时器控制接口
 */
export function createTimer(options: TimerOptions = {}): Timer {
  const {
    step = 1000,
    autoStart = false,
    maxTicks = Number.POSITIVE_INFINITY,
    name = generateRandomId(),
    debug = false
  } = options;

  let timerId: number | null = null;
  let tickCount = 0;
  let running = false;
  const callbacks: TimerCallback[] = [];

  /**
   * 打印调试日志
   */
  const log = (message: string): void => {
    if (debug) {
      console.log(`[${name}] ${message}`);
    }
  };

  /**
   * 获取定时器名称
   */
  const getName = (): string => {
    return name;
  };

  /**
   * 注册定时器回调函数
   */
  const onTick = (callback: TimerCallback): void => {
    if (typeof callback !== 'function') {
      return;
    }
    if (!callbacks.includes(callback)) {
      callbacks.push(callback);
      log(`添加回调函数，当前回调数量: ${callbacks.length}`);
    }
  };

  /**
   * 移除定时器回调函数
   */
  const offTick = (callback: TimerCallback): void => {
    const index = callbacks.indexOf(callback);
    if (index !== -1) {
      callbacks.splice(index, 1);
      log(`移除回调函数，当前回调数量: ${callbacks.length}`);
    }
  };

  /**
   * 调度下一次定时器执行
   */
  const schedule = (): void => {
    if (!running) return;

    timerId = window.setTimeout(() => {
      if (running) {
        tick();
        // 如果仍然在运行状态，则继续调度下一次执行
        if (running) {
          schedule();
        }
      }
    }, step);
  };

  /**
   * 启动定时器
   */
  const start = (): void => {
    if (running) return;
    running = true;
    tickCount = 0;
    log(`定时器启动，步长: ${step}ms`);
    schedule(); // 调度第一次执行
  };

  /**
   * 停止定时器
   */
  const stop = (): void => {
    if (!running) return;
    running = false;
    if (timerId !== null) {
      window.clearTimeout(timerId);
      timerId = null;
      log(`定时器停止，总执行次数: ${tickCount}`);
    }
  };

  /**
   * 手动触发一次定时器回调
   */
  const tick = (): void => {
    tickCount += 1;
    log(`第 ${tickCount} 次触发${maxTicks !== Number.POSITIVE_INFINITY ? `，剩余 ${Math.max(0, maxTicks - tickCount)} 次` : ''}`);

    // 调用所有注册的回调函数
    callbacks.forEach((callback, index) => {
      try {
        log(`执行回调函数 #${index + 1}`);
        callback();
      } catch (error) {
        console.error(`[${name}] 回调函数 #${index + 1} 执行出错:`, error);
      }
    });

    if (maxTicks > 0 && tickCount >= maxTicks) {
      log(`达到最大执行次数 ${maxTicks}，自动停止`);
      stop();
    }
  };

  /**
   * 判断定时器是否正在运行
   */
  const isRunning = (): boolean => {
    return running;
  };

  /**
   * 重置定时器
   */
  const reset = (): void => {
    log('重置定时器');
    stop();
    tickCount = 0;
    if (autoStart) {
      start();
    }
  };

  log('定时器创建完成');
  if (autoStart) {
    start();
  }

  return {
    start,
    stop,
    tick,
    isRunning,
    reset,
    onTick,
    offTick,
    getName
  };
}


/*
// 创建定时器
const timer = createTimer({
  step: 1000,
  name: 'MyTimer',
  debug: true
});

// 注册多个回调函数
timer.onTick(() => {
  console.log('第一个回调函数');
});

timer.onTick(() => {
  console.log('第二个回调函数');
});

timer.start();
*/
