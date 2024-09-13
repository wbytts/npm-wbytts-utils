/**
 * 获取 location.search 对象
 *
 * @param {string} url
 * @returns {{}}
 */
export const getURLParameters = (url: string): {} => {
  // @ts-ignore
  return (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
    (a: any, v: any) => (
      ((a as any)[v.slice(0, v.indexOf("="))] = v.slice(v.indexOf("=") + 1)), a
    ),
    {}
  );
}


