import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

//! 加载语言配置
dayjs.locale("zh-cn");

//! 扩展了 dayjs().format API 以支持更多模版
import advancedFormat from "dayjs/plugin/advancedFormat";
dayjs.extend(advancedFormat);

//! 扩展了 dayjs(), dayjs.utc API 以支持数组参数
import arraySupport from "dayjs/plugin/arraySupport";
dayjs.extend(arraySupport);

//! Day.js 被设计成不可变的对象，但是为了方便一些老项目实现对 moment.js 的替换，可以使用🚨 BadMutable 🚨插件让 Day.js 转变成可变的对象
// import badMutable from "dayjs/plugin/badMutable";
// dayjs.extend(badMutable);

//! 扩展 dayjs(), dayjs.unix API 以支持 BigInt 参数
// import bigIntSupport from "dayjs/plugin/bigIntSupport";
// dayjs.extend(bigIntSupport);

//! 扩展了 dayjs().format API 以支持佛历格式化
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

//! 增加了 .calendar API 返回一个 string 来显示日历时间
import calendar from "dayjs/plugin/calendar";
dayjs.extend(calendar);

//! 拓展了 dayjs() 支持自定义时间格式
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);

//! 增加了 .dayOfYear() API 返回一个 number 来表示 Dayjs 的日期是年中第几天，或设置成是年中第几天
import dayOfYear from "dayjs/plugin/dayOfYear";
dayjs.extend(dayOfYear);

//! 可以在您使用 Day.js 时显示一些提示和警告方便开发
import devHelper from "dayjs/plugin/devHelper";
dayjs.extend(devHelper);

//! 增加了 .duration .isDuring API 来支持时间长度
import duration from "dayjs/plugin/duration";
dayjs.extend(duration);

//! 增加了 .isBetween() API 返回一个 boolean 来展示一个时间是否介于两个时间之间
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

//! 增加了 .isLeapYear API 返回一个 boolean 来展示一个 Day.js 对象的年份是不是闰年
import isLeapYear from "dayjs/plugin/isLeapYear";
dayjs.extend(isLeapYear);

//! 增加了 .isSameOrAfter() API 返回一个 boolean来展示一个时间是否和一个时间相同或在一个时间之后
import isMoment from "dayjs/plugin/isMoment";
dayjs.extend(isMoment);

//! 添加 .isoWeek() API 以获取或设置年度的 ISO 周数。 并添加 .isoWeekday() 获取或设置一周的 ISO 日和 isoWeekYear() 获取ISO 周年，并扩展 .startOf .endOf APIs 支持单位 isoWeek
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

//! 增加了 .isoWeeksInYear() API 返回一个 number 来得到依据 ISO week 标准一年中有几周
import isoWeeksInYear from "dayjs/plugin/isoWeeksInYear";
dayjs.extend(isoWeeksInYear);

//! 增加了 .isSameOrBefore() API 返回一个 boolean 来展示一个时间是否和一个时间相同或在一个时间之前
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);

//! 增加了 .isToday() API 来判断当前 Day.js 对象是否是今天
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);

//! 增加了 .isTomorrow() API 来判断当前 Day.js 对象是否是明天
import isTomorrow from "dayjs/plugin/isTomorrow";
dayjs.extend(isTomorrow);

//! 增加了 .isYesterday() API 来判断当前 Day.js 对象是否是昨天
import isYesterday from "dayjs/plugin/isYesterday";
dayjs.extend(isYesterday);

//! 增加了 dayjs().localeData API 来提供本地化数据
import localeData from "dayjs/plugin/localeData";
dayjs.extend(localeData);

//! 扩展了 dayjs().format API 以支持更多本地化的长日期格式
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);

//! 增加了 .min .max API 返回一个 dayjs 来比较传入的 Day.js 实例的大小。 它接受传入多个 Day.js实例或一个数组
import minMax from "dayjs/plugin/minMax";
dayjs.extend(minMax);

import negativeYear from "dayjs/plugin/negativeYear";
dayjs.extend(negativeYear);

//! 扩展了 dayjs(), dayjs.utc, dayjs().set, dayjs().add, dayjs().subtract API 以支持传入对象参数
import objectSupport from "dayjs/plugin/objectSupport";
dayjs.extend(objectSupport);

//! 增加了复数形式的 API .milliseconds(), .seconds(), .minutes(), .hours(), .days(), .weeks(), .isoWeeks(), .months(), .quarters(), .years(), .dates()
import pluralGetSet from "dayjs/plugin/pluralGetSet";
dayjs.extend(pluralGetSet);

//! 预解析/后格式化让您在解析前处理输入，并在格式化要输出的字符串
import preParsePostFormat from "dayjs/plugin/preParsePostFormat";
dayjs.extend(preParsePostFormat);

//!  增加了 .quarter() API 返回当前实例是哪个季度，并扩展了 .add .subtract .startOf .endOf API 来支持 quarter 季度单位
import quarterOfYear from "dayjs/plugin/quarterOfYear";
dayjs.extend(quarterOfYear);

//! 增加了 .from .to .fromNow .toNow 4 个 API 来展示相对的时间
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

//! 添加了 dayjs.tz .tz .tz.guess .tz.setDefault API，在时区之间解析或显示
import timezone from "dayjs/plugin/timezone";
dayjs.extend(timezone);

//! 增加了 .toArray() API 来返回包含时间数值的 array
import toArray from "dayjs/plugin/toArray";
dayjs.extend(toArray);

//! 增加了 .toObject() API 来返回包含时间数值的 object
import toObject from "dayjs/plugin/toObject";
dayjs.extend(toObject);

//! 增加了 .updateLocale API 来更新语言配置的属性
import updateLocale from "dayjs/plugin/updateLocale";
dayjs.extend(updateLocale);

//! 增加了 .utc .local .isUTC APIs 使用 UTC 模式来解析和展示时间
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

//! 增加了 .weekday() API 来获取或设置当前语言的星期
import weekday from "dayjs/plugin/weekday";
dayjs.extend(weekday);

//! 增加了 .week() API 返回一个 number 来表示 Day.js 的日期是年中第几周
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

//! 增加了 .weekYear() API 来获取基于当前语言的按周计算的年份
import weekYear from "dayjs/plugin/weekYear";
dayjs.extend(weekYear);

export { dayjs };
