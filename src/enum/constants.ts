/**
 * 枚举`values`集合的别名。如果枚举中包含了`values`的同名字段，可以通过此Symbol作为字段名来访问
 */
export const VALUES = Symbol('[values]');

/**
 * 枚举`items`集合的别名。如果枚举中包含了`items`的同名字段，可以通过此Symbol作为字段名来访问
 */
export const ITEMS = Symbol('[items]');

/**
 * 枚举keys集合的别名。如果枚举中包含了`keys`的同名字段，可以通过此Symbol作为字段名来访问
 */
export const KEYS = Symbol('[keys]');

/**
 * 默认的本地化函数
 */
export let localize: (content: string | undefined) => string | undefined = (content) => {
  if (content === 'enum-plus.options.all') {
    return 'All';
  }
  return content;
};

/**
 * 设置全局本地化函数
 * @param fn 本地化函数
 */
export function setLocalize(fn: typeof localize) {
  localize = fn;
}
