import type { EnumItemClass } from './enum-item';
import { type ITEMS, type KEYS, type VALUES } from './index';

/**
 * 枚举初始化选项
 */
export type EnumInitOptions<
  T extends EnumInit<K, V>,
  K extends EnumKey<T> = EnumKey<T>,
  V extends EnumValue = ValueTypeFromSingleInit<T[K], K>,
> = {
  /**
   * 枚举项的value字段名，或者获取key值的函数，默认为 `value`
   */
  getValue?: keyof T | ((item: T) => V);
  /**
   * 枚举项的label字段名，或者获取key值的函数，默认为 `label`
   */
  getLabel?: keyof T | ((item: T) => string);
  /**
   * 枚举项的key字段名，或者获取key值的函数，默认为 `key`
   */
  getKey?: keyof T | ((item: T) => string);
} & EnumItemOptions;

export interface EnumItemOptions {
  /**
   * 本地化函数，用于把枚举项文本转换为本地化文本
   *
   * @param content 原始文本
   *
   * @returns 本地化文本，可以返回任意类型
   */
  localize?: (content: EnumLocaleExtends['LocaleKeys'] | (string & {}) | undefined) => any;
}

/**
 * 枚举集合接口
 *
 * 本来可以直接使用`EnumClass`, 但是TS不允许`class`中自定义索引访问器，只能使用`type`
 */
export type IEnum<
  T extends EnumInit<K, V>,
  K extends EnumKey<T> = EnumKey<T>,
  V extends EnumValue = ValueTypeFromSingleInit<T[K], K>,
> = IEnumValues<T, K, V> & {
  // 初始化对象里的枚举字段
  [key in K]: ValueTypeFromSingleInit<T[key], key, T[K] extends number | undefined ? number : key>;
} & (T extends { items: any }
    ? {
        // 防止values名称冲突
        [ITEMS]: EnumItemClass<T[K], K, V>[] & IEnumValues<T, K, V>;
      }
    : {
        /**
         * 所有枚举项的数组，可以直接作为AntDesign组件的数据源
         *
         * 仅支持 ReadonlyArray<T> 中的只读方法，不支持push、pop等任何修改的方法
         */
        items: EnumItemClass<T[K], K, V>[] & IEnumValues<T, K, V>;
      }) &
  (T extends { values: any }
    ? {
        // 防止values名称冲突
        [VALUES]: EnumItemClass<T[K], K, V>[] & IEnumValues<T, K, V>;
      }
    : {
        /** @deprecated 请使用 `items` 代替 */
        values: EnumItemClass<T[K], K, V>[] & IEnumValues<T, K, V>;
      }) &
  (T extends { keys: any }
    ? {
        // 防止keys名称冲突
        [KEYS]: K[];
      }
    : {
        /**
         * 获取枚举项的key列表
         *
         * 仅支持 ReadonlyArray<T> 中的只读方法，不支持push、pop等任何修改的方法
         *
         * 常在typescript作为类型声明使用，例如： `type Props = { week: typeof Week['keys'] }`
         */
        keys: K[];
      });

/**
 * 枚举项集合接口，不包含从数组集成的成员
 *
 * @template T 枚举集合初始化数据的类型
 *
 * @export
 *
 * @interface IEnumValues
 */
export interface IEnumValues<
  T extends EnumInit<K, V>,
  K extends EnumKey<T> = EnumKey<T>,
  V extends EnumValue = ValueTypeFromSingleInit<T[K], K>,
> {
  /**
   * 获取某个枚举项的label显示名称
   *
   * @param value 枚举项的value或key
   *
   * @returns {string | undefined} 枚举项的label显示名称
   */
  label(keyOrValue?: string | number): string | undefined;

  /**
   * 获取某个枚举项对应的key
   */
  key(value?: string | number): K | undefined;

  /**
   * 判断某个枚举项是否存在
   *
   * @param keyOrValue 枚举项的key或value
   */
  has(keyOrValue?: string | number): boolean;

  /**
   * 生成一个对象数组，可以绑定到 Select、Radio、Checkbox 等组件的`options`，遵循 ant-design 的数据规范
   *
   * @example
   *   [
   *     { value: 0, label: 'Sunday' },
   *     { value: 1, label: 'Monday' },
   *   ];
   *
   * @see https://ant.design/components/checkbox-cn#option
   */
  toSelect(): EnumItemOptionData<K, V>[];
  /**
   * 生成一个对象数组，可以绑定到 Select、Radio、Checkbox 等组件的`options`，遵循 ant-design 的数据规范
   *
   * @example
   *   [
   *     { value: 0, label: 'Sunday' },
   *     { value: 1, label: 'Monday' },
   *   ];
   *
   * @param config 自定义选项
   *
   * @see https://ant.design/components/checkbox-cn#option
   */
  toSelect(config: ToSelectConfig & BooleanFirstOptionConfig<V>): EnumItemOptionData<K | '', V | ''>[];
  /**
   * 生成一个对象数组，可以绑定到 Select、Radio、Checkbox 等组件的`options`，遵循 ant-design 的数据规范
   *
   * @example
   *   [
   *     { value: 0, label: 'Sunday' },
   *     { value: 1, label: 'Monday' },
   *   ];
   *
   * @param config 自定义选项
   *
   * @see https://ant.design/components/checkbox-cn#option
   */
  toSelect<FK, FV>(
    config: ToSelectConfig & ObjectFirstOptionConfig<FK, FV>
  ): EnumItemOptionData<K | (FK extends never ? FV : FK), V | (FV extends never ? V : FV)>[];

  /** @deprecated 请使用 `toSelect` 代替 */
  options(): EnumItemOptionData<K, V>[];
  /** @deprecated 请使用 `toSelect` 代替 */
  options(config: ToSelectConfig & BooleanFirstOptionConfig<V>): EnumItemOptionData<K | '', V | ''>[];
  /** @deprecated 请使用 `toSelect` 代替 */
  options<FK, FV>(
    config: ToSelectConfig & ObjectFirstOptionConfig<FK, FV>
  ): EnumItemOptionData<K | (FK extends never ? FV : FK), V | (FV extends never ? V : FV)>[];

  /**
   * 生成一个对象数组，可以绑定到 Menu、Dropdown 等组件的数据源，遵循 ant-design 的数据规范
   *
   * @example
   *   [
   *     { key: 0, label: 'Sunday' },
   *     { key: 1, label: 'Monday' },
   *   ];
   *
   * @see https://ant.design/components/menu-cn#itemtype
   */
  toMenu(): MenuItemOption<V>[];

  /** @deprecated 请使用 `toMenu` 代替 */
  menus(): MenuItemOption<V>[];

  /**
   * 生成一个对象数组，可以给表格列增加筛选功能，遵循 ant-design Table 组件的数据规范
   *
   * @example
   *   [
   *     { text: 'Sunday', value: 0 },
   *     { text: 'Monday', value: 1 },
   *   ];
   *
   * @see https://ant.design/components/table-cn#components-table-demo-head
   * @see https://ant.design/components/table-cn#column
   */
  toFilter(): ColumnFilterItem<V>[];

  /** @deprecated 请使用 `toFilter` 代替 */
  filters(): ColumnFilterItem<V>[];

  /**
   * 生成一个Map对象，可以用来绑定Select、Checkbox等表单组件，遵循 ant-design-pro 的数据规范
   *
   * @example
   *   {
   *     "0": { "text": "Sunday" },
   *     "1": { "text": "Monday" }
   *   }
   *
   * @see https://procomponents.ant.design/components/schema#valueenum-1
   * @see https://procomponents.ant.design/components/field-set#proformselect
   */
  toValueMap(): ValueMap<V>;

  /** @deprecated 请使用 `toValueMap` 代替 */
  valuesEnum(): ValueMap<V>;

  /**
   * 获取枚举集合的初始化对象
   *
   * @memberof IEnumValues
   *
   * @returns {T} 枚举集合初始化对象
   */
  raw(): T;
  /**
   * 获取某个枚举项的原始初始化对象。如果在枚举项上增加了自定义字段的话，可以用这种方式获取到。
   *
   * @param keyOrValue 枚举key或value
   */
  raw(keyOrValue: V | K): T[K];
  raw(value: unknown): T[K] | undefined;

  /**
   * 所有枚举值的数据类型
   *
   * 📣 注意：仅可作为类型声明使用，不可在运行时调用
   *
   * @example
   *   // 声明变量的类型
   *   const week: typeof Week.valueType = Week.Monday; // 0
   *
   *   // 声明类型字段
   *   type Props = {
   *     week: typeof Week.valueType; // 0 | 1
   *   };
   */
  valueType: V;

  /**
   * 所有枚举key的数据类型
   *
   * 📣 注意：仅可作为类型声明使用，不可在运行时调用
   *
   * @example
   *   // 声明变量的类型
   *   const weekName: typeof Week.keyType = 'Sunday'; // "Sunday" | "Monday"
   *
   *   // 声明类型字段
   *   type Props = {
   *     weekName: typeof Week.keyType; // "Sunday" | "Monday"
   *   };
   */
  keyType: K;

  /**
   * 枚举项原始初始化对象的类型，如果在枚举项上增加了自定义字段的话，可以用这种方式获取到。
   */
  rawType: T[K];
}

export type EnumItemLabel = EnumLocaleExtends['LocaleKeys'] | (string & {});

export type EnumInit<K extends keyof any = string, V extends EnumValue = EnumValue> =
  | NumberEnumInit<K>
  | StringEnumInit<K>
  | StringNumberEnumInit<K>
  | BooleanEnumInit<K>
  | DateEnumInit<K>
  | RegExpEnumInit<K>
  | StandardEnumInit<K, V>
  | ValueOnlyEnumInit<K, V>
  | LabelOnlyEnumInit<K>
  | CompactEnumInit<K>
  | OmitEnumInit<K>;
export type NumberEnumInit<K extends keyof any> = Record<K, number>;
export type StringEnumInit<K extends keyof any> = Record<K, string>;
export type StringNumberEnumInit<K extends keyof any> = Record<K, string | number>;
export type BooleanEnumInit<K extends keyof any> = Record<K, boolean>;
export type DateEnumInit<K extends keyof any> = Record<K, Date>;
export type RegExpEnumInit<K extends keyof any> = Record<K, RegExp>;
export type StandardEnumInit<K extends keyof any, V extends EnumValue> = Record<K, StandardEnumItemInit<V>>;
export type ValueOnlyEnumInit<K extends keyof any, V extends EnumValue> = Record<K, ValueOnlyEnumItemInit<V>>;
export type LabelOnlyEnumInit<K extends keyof any> = Record<K, LabelOnlyEnumItemInit>;
export type CompactEnumInit<K extends keyof any> = Record<K, CompactEnumItemInit>;
export type OmitEnumInit<K extends keyof any> = Record<K, undefined>;

export type EnumItemInit<V extends EnumValue = EnumValue> =
  | EnumValue
  | StandardEnumItemInit<V>
  | ValueOnlyEnumItemInit<V>
  | LabelOnlyEnumItemInit
  | CompactEnumItemInit
  | undefined;
export interface StandardEnumItemInit<V extends EnumValue> {
  value: V;
  label: EnumItemLabel;
}
export interface ValueOnlyEnumItemInit<V extends EnumValue> {
  value: V;
}
export interface LabelOnlyEnumItemInit {
  label: EnumItemLabel;
}
export type CompactEnumItemInit = Record<string, never>; // 等价于{}

/** Data structure of ant-design Select options */
export interface EnumItemOptionData<K, V> {
  /** Option value */
  value: V;
  /** Option label */
  label: string;
  /** Option key, default is `value` */
  key: K;
}

/** Data structure of column filter items of ant-design Table */
export interface ColumnFilterItem<V> {
  /** Display name */
  text: string;
  /** Value */
  value: V;
}

/** Data structure of ant-design Menu items */
export interface MenuItemOption<V> {
  /** Key of menu item */
  key: V;
  /** Menu item text */
  label: string;
}

export type ValueMap<V extends EnumValue> = Record<`${Exclude<V, symbol | RegExp | Date>}`, { text: string }>;

/** Enum value type, support number, string, symbol */
export type EnumValue = keyof any | bigint | boolean | Date | RegExp;

/** Enum key collection */
export type EnumKey<T> = keyof T;

/** More options for the options method */
export type ToSelectConfig = object;

export interface BooleanFirstOptionConfig<V> {
  /**
   * 在头部添加一个默认选项
   *
   * - `true`：选项使用默认值，`value`为`''`，`label`为`'全部'`
   * - `false`：不添加默认选项
   *
   * @default false
   */
  firstOption: boolean;
  /**
   * 默认选项的值，默认为`''`
   *
   * @default ''
   */
  firstOptionValue?: V;
  /**
   * 默认选项的显示文本，默认为`'全部'`。如果设置了本地化方法，则会自动调用本地化方法
   */
  firstOptionLabel?: string;
}

export interface ObjectFirstOptionConfig<K, V> {
  /**
   * 首行选项的配置
   */
  firstOption?: EnumOptionConfig<K, V>;
  /**
   * 默认选项的值，默认为`''`
   */
  firstOptionValue?: never;
  /**
   * 默认选项的显示文本，默认为`'全部'`。如果设置了本地化方法，则会自动调用本地化方法
   */
  firstOptionLabel?: never;
}

/** Built-in resources */
export type BuiltInLocaleKeys = 'enum-plus.options.all';

export type EnumOptionConfig<K, V> = Omit<EnumItemOptionData<K, V>, 'key'> &
  Partial<Pick<EnumItemOptionData<K, V>, 'key'>>;

/** Infer the value type from the initialization object of the enumeration item */
export type ValueTypeFromSingleInit<T, Key = string, Fallback = Key> = T extends EnumValue // literal类型
  ? T
  : T extends StandardEnumItemInit<infer V> // typeof {value, label}
    ? V
    : T extends ValueOnlyEnumItemInit<infer V> // typeof {value}
      ? V
      : T extends LabelOnlyEnumItemInit // typeof {label}
        ? Key
        : T extends CompactEnumItemInit // typeof {}
          ? Key
          : T extends undefined // typeof undefined
            ? Fallback
            : never;

/** Infer the value type from the initialization object of the enumeration collection */
export type ValueTypeFromEnumInit<T, K extends EnumKey<T> = EnumKey<T>> =
  T extends NumberEnumInit<K> // format: { foo:1, bar:2 }
    ? number
    : T extends StringEnumInit<K> // format: { foo:'foo', bar:'bar' }
      ? string
      : T extends BooleanEnumInit<K> // format: { foo:true, bar:false }
        ? string
        : T extends StringNumberEnumInit<K> // format: { foo:'foo', bar:2 }
          ? string | number
          : T extends StandardEnumInit<K, infer V> // format: { foo:{ value:1, label:'foo'}, bar:{value:2, label:'bar'} }
            ? V
            : T extends ValueOnlyEnumInit<K, infer V> // format: { foo:{value:1}, bar:{value:2} }
              ? V
              : T extends LabelOnlyEnumInit<K> // format: { foo:{label:'foo'}, bar:{label:'bar'} }
                ? K
                : T extends CompactEnumInit<K> // format: { foo:{}, bar:{} }
                  ? K
                  : T extends OmitEnumInit<K> // format: {foo: undefined, bar: undefined}
                    ? K
                    : K; // Unknown format, use key as value
