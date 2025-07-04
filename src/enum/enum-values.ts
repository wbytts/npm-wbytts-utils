import { localize as globalLocalize } from './constants';
import type { EnumItemClass } from './enum-item';
import type {
  BooleanFirstOptionConfig,
  BuiltInLocaleKeys,
  ColumnFilterItem,
  EnumInit,
  EnumItemOptionData,
  EnumItemOptions,
  EnumKey,
  EnumValue,
  IEnumValues,
  MenuItemOption,
  ObjectFirstOptionConfig,
  ToSelectConfig,
  ValueMap,
  ValueTypeFromSingleInit,
} from './types';

/**
 * 枚举项数组，主要是 EnumCollectionClass 的简单包装器
 *
 * @template T 枚举集合初始化数据的类型
 *
 * @class EnumValuesArray
 *
 * @extends {EnumItemClass<T, K, V>[]}
 *
 * @export
 *
 * @implements {IEnumValues<T, K, V>}
 */
export class EnumValuesArray<
    T extends EnumInit<K, V>,
    K extends EnumKey<T> = EnumKey<T>,
    V extends EnumValue = ValueTypeFromSingleInit<T[K], K>,
  >
  extends Array<EnumItemClass<T[K], K, V>>
  implements IEnumValues<T, K, V>
{
  #raw: T;
  #localize: NonNullable<EnumItemOptions['localize']>;
  #optionsConfigDefaults: ToSelectConfig & BooleanFirstOptionConfig<V> = { firstOption: false };

  /**
   * 实例化一个枚举项数组
   *
   * @memberof EnumValuesArray
   *
   * @param {T} raw 原始初始化数据对象
   * @param {EnumItemOptions} options 选项
   * @param {...EnumItemClass<T[K], K, V>[]} items 枚举项实例数组
   */
  constructor(raw: T, options: EnumItemOptions | undefined, ...items: EnumItemClass<T[K], K, V>[]) {
    super(...items);
    this.#raw = raw;
    this.#localize = (content: string | undefined) => {
      const localizeFunc = options?.localize ?? globalLocalize;
      if (typeof localizeFunc === 'function') {
        return localizeFunc(content);
      }
      return content;
    };
  }

  /**
   * 获取枚举项的标签
   * @param keyOrValue 枚举项的键或值
   * @returns 枚举项的标签
   */
  label(keyOrValue?: string | number): string | undefined {
    // 先按值查找，然后按键查找
    return (this.find((i) => i.value === keyOrValue) ?? this.find((i) => i.key === keyOrValue))?.label;
  }

  /**
   * 获取枚举项的键
   * @param value 枚举项的值
   * @returns 枚举项的键
   */
  key(value?: string | number): K | undefined {
    return this.find((i) => i.value === value)?.key;
  }

  /**
   * 检查枚举项是否存在
   * @param keyOrValue 枚举项的键或值
   * @returns 是否存在
   */
  has(keyOrValue?: string | number): boolean {
    return this.some((i) => i.value === keyOrValue || i.key === keyOrValue);
  }

  /**
   * 将枚举项转换为下拉选项数据
   */
  toSelect(): EnumItemOptionData<K, V>[];
  /**
   * 将枚举项转换为下拉选项数据，带有布尔值的第一个选项
   * @param config 配置选项
   */
  toSelect(config?: ToSelectConfig & BooleanFirstOptionConfig<V>): EnumItemOptionData<K | '', V | ''>[];
  /**
   * 将枚举项转换为下拉选项数据，带有对象的第一个选项
   * @param config 配置选项
   */
  toSelect<FK = never, FV = never>(
    config?: ToSelectConfig & ObjectFirstOptionConfig<FK, FV>
  ): EnumItemOptionData<K | (FK extends never ? FV : FK), V | (FV extends never ? V : FV)>[];
  /**
   * 将枚举项转换为下拉选项数据
   * @param config 配置选项
   */
  toSelect<FK = never, FV = never>(
    config: ToSelectConfig & (BooleanFirstOptionConfig<V> | ObjectFirstOptionConfig<FK, FV>) = this
      .#optionsConfigDefaults
  ): EnumItemOptionData<K | FK, V | FV>[] {
    const { firstOption = this.#optionsConfigDefaults.firstOption } = config;
    if (firstOption) {
      if (firstOption === true) {
        // 默认选项
        const value = ('firstOptionValue' in config ? config.firstOptionValue : undefined) ?? ('' as V);
        const label =
          ('firstOptionLabel' in config ? config.firstOptionLabel : undefined) ??
          ('enum-plus.options.all' as BuiltInLocaleKeys);
        return [{ key: '' as K, value, label: this.#localize(label) as string }, ...this];
      } else {
        return [
          {
            ...firstOption,
            key: firstOption.key ?? (firstOption.value as unknown as K),
            label: this.#localize(firstOption.label) as string,
          },
          ...this,
        ];
      }
    } else {
      return this;
    }
  }
  /** @deprecated 请使用 `toSelect` 代替 */
  options(): EnumItemOptionData<K, V>[];
  /** @deprecated 请使用 `toSelect` 代替 */
  options(config?: ToSelectConfig & BooleanFirstOptionConfig<V>): EnumItemOptionData<K | '', V | ''>[];
  /** @deprecated 请使用 `toSelect` 代替 */
  options<FK = never, FV = never>(
    config?: ToSelectConfig & ObjectFirstOptionConfig<FK, FV>
  ): EnumItemOptionData<K | (FK extends never ? FV : FK), V | (FV extends never ? V : FV)>[];
  /** @deprecated 请使用 `toSelect` 代替 */
  options<FK = never, FV = never>(
    config?: ToSelectConfig & (BooleanFirstOptionConfig<V> | ObjectFirstOptionConfig<FK, FV>)
  ): EnumItemOptionData<K | FK, V | FV>[] {
    return this.toSelect(config as ToSelectConfig & BooleanFirstOptionConfig<V>) as EnumItemOptionData<
      K | FK,
      V | FV
    >[];
  }

  /**
   * 将枚举项转换为值映射数据
   */
  toValueMap() {
    const itemsMap = {} as ValueMap<V>;
    for (let i = 0; i < this.length; i++) {
      const { value, label } = this[i];
      itemsMap[value as keyof typeof itemsMap] = { text: label };
    }
    return itemsMap;
  }
  /** @deprecated 请使用 `toValueMap` 代替 */
  valuesEnum() {
    return this.toValueMap();
  }

  /**
   * 将枚举项转换为菜单选项数据
   */
  toMenu(): MenuItemOption<V>[] {
    return this.map(({ value, label }) => ({ key: value, label }));
  }
  /** @deprecated 请使用 `toMenu` 代替 */
  menus() {
    return this.toMenu();
  }

  /**
   * 将枚举项转换为过滤选项数据
   */
  toFilter(): ColumnFilterItem<V>[] {
    return this.map(({ value, label }) => ({ text: label, value }));
  }
  /** @deprecated 请使用 `toFilter` 代替 */
  filters() {
    return this.toFilter();
  }

  /**
   * 获取原始枚举数据
   */
  raw(): T;
  /**
   * 获取原始枚举数据，根据键或值
   * @param keyOrValue 枚举项的键或值
   */
  raw(keyOrValue: V | K): T[K];
  /**
   * 获取原始枚举数据，根据值
   * @param value 枚举项的值
   */
  raw(value: unknown): T[K] | undefined;
  /**
   * 获取原始枚举数据
   * @param value 枚举项的值
   */
  raw(value?: V | K): T | T[K] | undefined {
    if (value == null) {
      // 返回原始初始化对象
      return this.#raw;
    } else {
      if (Object.keys(this.#raw).some((k) => k === (value as string))) {
        // 按键查找
        return this.#raw[value as K];
      }
      // 按值查找
      const itemByValue = this.find((i) => i.value === value);
      if (itemByValue) {
        return itemByValue.raw;
      } else {
        return undefined;
      }
    }
  }

  /** @deprecated 存根方法，仅用于类型声明，不能在运行时调用 */
  get valueType(): V {
    throw new Error(
      '枚举的 valueType 属性只允许用于声明 ts 类型，不能在运行时访问！请在 ts 类型中使用 `typeof` 运算符，例如：typeof Week.valueType'
    );
  }
  /** @deprecated 存根方法，仅用于类型声明，不能在运行时调用 */
  get keyType(): K {
    throw new Error(
      '枚举的 keyType 属性只允许用于声明 ts 类型，不能在运行时访问！请在 ts 类型中使用 `typeof` 运算符，例如：typeof Week.keyType'
    );
  }

  /** @deprecated 存根方法，仅用于类型声明，不能在运行时调用 */
  get rawType(): T[K] {
    throw new Error(
      '枚举的 rawType 属性只允许用于声明 ts 类型，不能在运行时访问！请在 ts 类型中使用 `typeof` 运算符，例如：typeof Week.rawType'
    );
  }
}
