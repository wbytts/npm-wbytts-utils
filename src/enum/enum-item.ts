import { localize as globalLocalize } from './constants';
import type { EnumItemInit, EnumItemOptions, EnumKey, EnumValue, ValueTypeFromSingleInit } from './types';

/**
 * 枚举项类
 *
 * @template V 值的通用类型
 * @template K 键的通用类型
 * @template T 枚举项的初始化对象
 */
export class EnumItemClass<
  T extends EnumItemInit<V>,
  K extends EnumKey<any> = string,
  V extends EnumValue = ValueTypeFromSingleInit<T, K>,
> {
  /** 枚举项值 */
  readonly value: V;

  /** 枚举项标签（或称显示名称） */
  readonly label: string;

  /** 枚举项键 */
  readonly key: K;

  /** 原始初始化对象 */
  readonly raw: T;

  #localize: NonNullable<EnumItemOptions['localize']>;
  #localizedProxy = new Proxy(this, {
    get: (target, prop) => {
      const origin = target[prop as keyof typeof this];
      if (prop === 'label') {
        return target.toString();
      } else if (typeof origin === 'function') {
        return origin.bind(target);
      }
      return origin;
    },
    // 不允许编辑
    set: (_, prop) => {
      console.error(
        `无法修改 EnumItem 上的属性"${String(prop)}"。EnumItem 实例是只读的，不应被改变。`
      );
      return true;
    },
    defineProperty: (_, prop) => {
      console.error(
        `无法修改 EnumItem 上的属性"${String(prop)}"。EnumItem 实例是只读的，不应被改变。`
      );
      return true;
    },
    deleteProperty: (_, prop) => {
      console.error(
        `无法修改 EnumItem 上的属性"${String(prop)}"。EnumItem 实例是只读的，不应被改变。`
      );
      return true;
    },
    setPrototypeOf: () => {
      console.error('无法更改 EnumItem 的原型。EnumItem 实例是不可变的。');
      return true;
    },
  });

  /**
   * 实例化一个枚举项
   *
   * @param key 枚举项键
   * @param value 枚举项值
   * @param label 枚举项显示名称
   * @param raw 原始初始化对象
   * @param options 构造选项
   */
  constructor(key: K, value: V, label: string, raw: T, options?: EnumItemOptions) {
    this.key = key;
    this.value = value;
    this.label = label;
    this.raw = raw;
    this.#localize = (content: string | undefined) => {
      const localizeFunc = options?.localize ?? globalLocalize;
      if (typeof localizeFunc === 'function') {
        return localizeFunc(content);
      }
      return content;
    };

    // 重写一些系统方法
    // @ts-expect-error: 因为重写Object.toString方法以更友好地显示类型
    this[Symbol.toStringTag] = 'EnumItem';
    // @ts-expect-error: 因为重写Object.toPrimitive方法以返回枚举值
    this[Symbol.toPrimitive] = (hint: 'number' | 'string' | 'default'): V | string => {
      if (hint === 'number') {
        // 用于像 Number(value) 或 +value 这样的情况
        return this.valueOf();
      } else if (hint === 'string') {
        // 用于像 String(value), `${value}` 这样的情况
        return this.toString();
      }
      // 用于像 '' + value, value == 1 这样的情况
      return this.valueOf();
    };
    // Object.freeze(this);
  }
  /**
   * 返回只读版本
   */
  readonly() {
    return this.#localizedProxy;
  }
  /**
   * 转换为字符串
   */
  toString() {
    return this.#localize(this.label) ?? this.label;
  }
  /**
   * 转换为本地化字符串
   */
  toLocaleString() {
    return this.toString();
  }
  /**
   * 返回值
   */
  valueOf() {
    return this.value;
  }
}
