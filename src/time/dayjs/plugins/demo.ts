// @ts-nocheck
/**
 * Day.js 插件模板
 */
export default (option, dayjsClass, dayjsFactory) => {
  // 拓展 dayjs()
  // e.g. add dayjs().isSameOrBefore()
  dayjsClass.prototype.isSameOrBefore = function (arguments: any) {};

  // 拓展 dayjs
  // e.g. add dayjs.utc()
  dayjsFactory.utc = (arguments: any) => {};

  // 覆盖已有API
  const oldFormat = dayjsClass.prototype.format;
  dayjsClass.prototype.format = function (arguments: any) {
    // original format result
    const result = oldFormat.bind(this)(arguments);
    // return modified result
  };
};
