import { EnumItemClass } from './enum-item';
import { EnumValuesArray } from './enum-values';
import { ITEMS, KEYS, VALUES } from './constants';
import type {
  BooleanFirstOptionConfig,
  ColumnFilterItem,
  EnumInit,
  EnumItemInit,
  EnumItemOptionData,
  EnumItemOptions,
  EnumKey,
  EnumValue,
  IEnumValues,
  MenuItemOption,
  ObjectFirstOptionConfig,
  StandardEnumItemInit,
  ToSelectConfig,
  ValueTypeFromSingleInit,
} from './types';

/**
 * 枚举集合扩展基类，用于扩展枚举
 */
export class EnumExtensionClass<
  T extends EnumInit<K, V>,
  K extends EnumKey<T> = EnumKey<T>,
  V extends EnumValue = ValueTypeFromSingleInit<T[K], K>,
> implements EnumExtension<T, K, V> {}
/**
 * 枚举项集合
 */
export class EnumCollectionClass<
    T extends EnumInit<K, V>,
    K extends EnumKey<T> = EnumKey<T>,
    V extends EnumValue = ValueTypeFromSingleInit<T[K], K>,
  >
  extends EnumExtensionClass<T, K, V>
  implements IEnumValues<T, K, V>
{
  readonly items!: EnumValuesArray<T, K, V>;
  readonly keys!: K[];

  constructor(init: T = {} as T, options?: EnumItemOptions) {
    super();
    // 排除具有"反向映射"值的数字键，这意味着那些数字枚举的"反向映射"键
    const keys = Object.keys(init).filter(
      (k) => !(/^-?\d+$/.test(k) && k === `${init[init[k as K] as K] ?? ''}`)
    ) as K[];
    const parsed = keys.map((key) => parseEnumItem<EnumItemInit<V>, K, V>(init[key], key));
    keys.forEach((key, index) => {
      const { value } = parsed[index];
      // @ts-expect-error: 因为动态定义属性
      this[key] = value;
    });
    Object.freeze(keys);
    // @ts-expect-error: 使用KEYS避免在'keys'字段名被占用的情况下的命名冲突
    this[Object.keys(init).some((k) => k === 'keys') ? KEYS : 'keys'] = keys;

    // 构建枚举项数据
    const items = new EnumValuesArray<T, K, V>(
      init,
      options,
      ...keys.map((key, index) => {
        const { value, label } = parsed[index];
        return new EnumItemClass<T[K], K, V>(key, value, label, init[key], options).readonly();
      })
    );
    // @ts-expect-error: 使用ITEMS避免在'items'字段名被占用的情况下的命名冲突
    this[Object.keys(init).some((k) => k === 'items') ? ITEMS : 'items'] = items;
    // @ts-expect-error: 使用VALUES避免在'values'字段名被占用的情况下的命名冲突
    this[Object.keys(init).some((k) => k === 'values') ? VALUES : 'values'] = items;

    // 重写一些系统方法
    // @ts-expect-error: 因为重写Object.toString方法以获得更好的类型显示
    this[Symbol.toStringTag] = 'EnumCollection';
    // 重写`instanceof`运算符规则
    // @ts-expect-error: 因为重写instanceof运算符
    this[Symbol.hasInstance] = (instance: unknown): boolean => {
      // 有意使用==支持数字和字符串格式的值
      return this.items.some(
        // eslint-disable-next-line eqeqeq
        (i) => instance == i.value || instance === i.key
      );
    };

    Object.freeze(this);
    Object.freeze(this.items);
    Object.freeze(this.keys);
  }

  /**
   * 获取枚举项的键
   * @param value 枚举项的值
   */
  key(value?: string | number) {
    return this.items.key(value);
  }
  /**
   * 获取枚举项的标签
   * @param keyOrValue 枚举项的键或值
   */
  label(keyOrValue?: string | number): string | undefined {
    return this.items.label(keyOrValue);
  }
  /**
   * 检查枚举项是否存在
   * @param keyOrValue 枚举项的键或值
   */
  has(keyOrValue?: string | number) {
    return this.items.has(keyOrValue);
  }

  /**
   * 将枚举项转换为下拉选项数据
   */
  toSelect(): EnumItemOptionData<K, V>[];
  /**
   * 将枚举项转换为下拉选项数据，带有布尔值的第一个选项
   * @param config 配置选项
   */
  toSelect(config: ToSelectConfig & BooleanFirstOptionConfig<V>): EnumItemOptionData<K | '', V | ''>[];
  /**
   * 将枚举项转换为下拉选项数据，带有对象的第一个选项
   * @param config 配置选项
   */
  toSelect<FK = never, FV = never>(
    config: ToSelectConfig & ObjectFirstOptionConfig<FK, FV>
  ): EnumItemOptionData<K | (FK extends never ? FV : FK), V | (FV extends never ? V : FV)>[];
  /**
   * 将枚举项转换为下拉选项数据
   * @param config 配置选项
   */
  toSelect<FK = never, FV = never>(
    config?: ToSelectConfig & (BooleanFirstOptionConfig<V> | ObjectFirstOptionConfig<FK, FV>)
  ): EnumItemOptionData<K | FK, V | FV>[] {
    return this.items.toSelect(config as ToSelectConfig & BooleanFirstOptionConfig<V>) as EnumItemOptionData<
      K | FK,
      V | FV
    >[];
  }
  /**
   * 将枚举项转换为下拉选项数据（已弃用，请使用`toSelect`代替）
   */
  options(): EnumItemOptionData<K, V>[];
  /**
   * 将枚举项转换为下拉选项数据，带有布尔值的第一个选项（已弃用，请使用`toSelect`代替）
   * @param config 配置选项
   */
  options(config: object & BooleanFirstOptionConfig<V>): EnumItemOptionData<'' | K, '' | V>[];
  /**
   * 将枚举项转换为下拉选项数据，带有对象的第一个选项（已弃用，请使用`toSelect`代替）
   * @param config 配置选项
   */
  options<FK, FV>(
    config: object & ObjectFirstOptionConfig<FK, FV>
  ): EnumItemOptionData<K | (FK extends never ? FV : FK), V | (FV extends never ? V : FV)>[];
  /**
   * 将枚举项转换为下拉选项数据（已弃用，请使用`toSelect`代替）
   * @param config 配置选项
   */
  options<FK = never, FV = never>(
    config?: ToSelectConfig & (BooleanFirstOptionConfig<V> | ObjectFirstOptionConfig<FK, FV>)
  ): EnumItemOptionData<K | FK, V | FV>[] {
    return this.items.options(config as ToSelectConfig & BooleanFirstOptionConfig<V>) as EnumItemOptionData<
      K | FK,
      V | FV
    >[];
  }

  /**
   * 将枚举项转换为菜单选项数据
   */
  toMenu(): MenuItemOption<V>[] {
    return this.items.toMenu();
  }
  /**
   * 将枚举项转换为菜单选项数据（已弃用，请使用`toMenu`代替）
   */
  menus(): MenuItemOption<V>[] {
    return this.items.menus();
  }

  /**
   * 将枚举项转换为过滤选项数据
   */
  toFilter(): ColumnFilterItem<V>[] {
    return this.items.toFilter();
  }
  /**
   * 将枚举项转换为过滤选项数据（已弃用，请使用`toFilter`代替）
   */
  filters(): ColumnFilterItem<V>[] {
    return this.items.filters();
  }

  /**
   * 将枚举项转换为值映射数据
   */
  toValueMap() {
    return this.items.toValueMap();
  }
  /**
   * 将枚举项转换为值映射数据（已弃用，请使用`toValueMap`代替）
   */
  valuesEnum() {
    return this.items.valuesEnum();
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
  raw(value?: unknown): T | T[K] | undefined {
    if (value !== undefined) {
      return this.items.raw(value);
    } else {
      return this.items.raw();
    }
  }

  /**
   * 获取枚举项的值类型
   */
  get valueType() {
    return this.items.valueType;
  }
  /**
   * 获取枚举项的键类型
   */
  get keyType() {
    return this.items.keyType;
  }
  /**
   * 获取枚举项的原始类型
   */
  get rawType() {
    return this.items.rawType;
  }
}

/**
 * 解析枚举项数据
 * @param init 枚举项的初始化数据
 * @param key 枚举项的键
 */
function parseEnumItem<
  T extends EnumItemInit<V>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  K extends EnumKey<any>,
  V extends EnumValue,
>(init: T, key: K): StandardEnumItemInit<V> {
  let value: V;
  let label: string;
  if (init != null) {
    if (typeof init === 'number' || typeof init === 'string' || typeof init === 'symbol') {
      value = init as V;
      label = key as string;
    } else if (typeof init === 'object') {
      // 使用对象进行初始化
      if (Object.prototype.toString.call(init) === '[object Object]') {
        if ('value' in init && Object.keys(init).some((k) => k === 'value')) {
          // {value, label}类型
          value = init.value ?? key;
          if ('label' in init && Object.keys(init).some((k) => k === 'label')) {
            label = init.label;
          } else {
            label = key as string;
          }
        } else if ('label' in init && Object.keys(init).some((k) => k === 'label')) {
          // {label}类型
          value = key as unknown as V;
          label = init.label ?? key;
        } else {
          // {}空对象
          value = key as unknown as V;
          label = key as string;
        }
      } else {
        // 可能是Date、RegExp和其他原始类型
        value = init as V;
        label = key as string;
      }
    } else {
      throw new Error(`无效的枚举项: ${JSON.stringify(init)}`);
    }
  } else {
    value = key as unknown as V;
    label = key as string;
  }
  return { value, label };
}
