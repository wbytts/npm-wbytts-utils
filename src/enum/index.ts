import { EnumCollectionClass, EnumExtensionClass } from './enum-collection';
import { ITEMS, KEYS, VALUES, localize, setLocalize } from './constants';
import type {
  BuiltInLocaleKeys,
  EnumInit,
  EnumInitOptions,
  EnumKey,
  EnumValue,
  IEnum,
  LabelOnlyEnumItemInit,
  StandardEnumInit,
  ValueTypeFromSingleInit,
} from './types';

export type {
  EnumInit,
  EnumItemInit,
  EnumKey,
  EnumValue,
  ValueTypeFromSingleInit,
  EnumOptionConfig,
  BuiltInLocaleKeys,
  EnumItemOptionData,
  MenuItemOption,
  ColumnFilterItem,
  EnumInitOptions,
} from './types';

export type { EnumItemClass } from './enum-item';

/**
 * 枚举`values`集合的别名。如果枚举中包含了`values`的同名字段，可以通过此Symbol作为字段名来访问
 */
export { VALUES };

/**
 * 枚举`items`集合的别名。如果枚举中包含了`items`的同名字段，可以通过此Symbol作为字段名来访问
 */
export { ITEMS };

/**
 * 枚举keys集合的别名。如果枚举中包含了`keys`的同名字段，可以通过此Symbol作为字段名来访问
 */
export { KEYS };

let enumExtensions: Record<string, unknown> | undefined;

/**
 * 生成一个枚举集合，枚举值支持`number`和`string`类型，枚举名称支持本地化方案
 *
 * @example
 *   const Week = Enum({
 *     Sunday: { value: 0, label: 'Sunday' },
 *     Monday: { value: 1, label: 'Monday' },
 *   } as const);
 *
 * @param init 初始化对象，传值方式参见使用示例
 *
 * @returns 枚举集合
 */
export function Enum<
  T extends EnumInit<K, V>,
  K extends EnumKey<T> = EnumKey<T>,
  V extends EnumValue = ValueTypeFromSingleInit<T[K], K>,
>(init: T, options?: EnumInitOptions<T, K, V>): IEnum<T, K, V> & EnumExtension<T, K, V>;
/**
 * 基于对象数组生成枚举
 *
 * @example
 *   const Week = Enum([
 *     { value: 0, label: 'Sunday', key: 'Sun' },
 *     { value: 1, label: 'Monday', key: 'Mon' },
 *   ]);
 *
 * @param init 初始化对象数组
 * @param options 生成选项
 *
 * @returns 枚举集合
 */
export function Enum<
  T extends Record<string, any>,
  K extends EnumKey<T> = EnumKey<T>,
  V extends EnumValue = ValueTypeFromSingleInit<T[K], K>,
>(
  init: T[],
  options?: EnumInitOptions<T, K, V>
): IEnum<StandardEnumInit<string, V>, string, V> & EnumExtension<T, K, V>;
export function Enum<
  T extends EnumInit<K, V>,
  K extends EnumKey<T> = EnumKey<T>,
  V extends EnumValue = ValueTypeFromSingleInit<T[K], K>,
>(init: T | T[], options?: EnumInitOptions<T, K, V>): IEnum<T, K, V> & EnumExtension<T, K, V> {
  if (Array.isArray(init)) {
    const initMap = getInitMapFromArray<T, K, V>(init, options);
    return new EnumCollectionClass<T, K, V>(initMap, options) as unknown as IEnum<T, K, V>;
  } else {
    return new EnumCollectionClass<T, K, V>(init, options) as unknown as IEnum<T, K, V>;
  }
}

/**
 * 全局本地化函数，用于把枚举项文本转换为本地化文本。只需要设置一次，全局生效。需要在项目入口处设置，且在运行任何Enum实例之前
 *
 * 如果要提供自定义的本地化函数，请务必解析并本地化以下内置资源：
 *
 * - `enum-plus.options.all` => `All`
 */
Enum.localize = localize;
/**
 * 为枚举增加全局扩展方法，所有枚举实例都会具有这些新扩展方法
 *
 * @param obj 扩展内容，必须是一个对象
 */
Enum.extends = function (obj: Record<string, unknown> | undefined) {
  if (obj !== undefined && Object.prototype.toString.call(obj) !== '[object Object]') {
    throw new Error('The extension of Enum must be an object');
  }
  enumExtensions = obj !== undefined ? obj : {};
  Object.setPrototypeOf(EnumExtensionClass.prototype, enumExtensions);
};

declare global {
  /**
   * 枚举的全局扩展，可以用来添加全局扩展方法
   */
  interface EnumExtension<
    T extends EnumInit<K, V>,
    K extends EnumKey<T> = EnumKey<T>,
    V extends EnumValue = ValueTypeFromSingleInit<T[K], K>,
  > {}
  /**
   * 枚举本地化的全局扩展
   */
  interface EnumLocaleExtends {
    /**
     * 枚举本地化文本的Key值，可以用来增强编辑器的智能提示
     */
    LocaleKeys: BuiltInLocaleKeys;
  }
}

function getInitMapFromArray<
  T extends EnumInit<K, V>,
  K extends EnumKey<T> = EnumKey<T>,
  V extends EnumValue = ValueTypeFromSingleInit<T[K], K>,
>(init: T[], options?: EnumInitOptions<T, K, V>) {
  const { getValue = 'value' as keyof T, getLabel = 'label' as keyof T, getKey = 'key' as keyof T } = options ?? {};
  return init.reduce((acc, item) => {
    const value = typeof getValue === 'function' ? getValue(item) : (item[getValue] as V);
    const label = typeof getLabel === 'function' ? getLabel(item) : item[getLabel];
    let key: K | undefined = undefined;
    if (getKey) {
      key = typeof getKey === 'function' ? (getKey(item) as K) : (item[getKey] as K);
    }
    acc[(key ?? value) as unknown as K] = {
      ...item,
      label: label || (key ?? '') || (value != null ? value.toString() : value),
      value,
    } as LabelOnlyEnumItemInit as T[K];
    return acc;
  }, {} as T);
}
