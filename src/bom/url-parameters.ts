/**
 * URL 参数对象类型，键为字符串，值为字符串或字符串数组
 */
export type URLParamsObject = {
  [key: string]: string | string[];
};

/**
 * 从 URL 中获取查询参数对象
 * 
 * @param {string} url - 需要解析的 URL 字符串，如果不提供则使用当前页面 URL
 * @returns {URLParamsObject} 包含所有查询参数的对象
 * @example
 * // 返回: { id: '123', name: 'test' }
 * getURLParameters('https://example.com?id=123&name=test');
 */
export const getURLParameters = (url?: string): URLParamsObject => {
  try {
    // 如果没有提供 URL，使用当前页面的 URL
    const urlString = url || (typeof window !== 'undefined' ? window.location.href : '');
    
    // 提取查询字符串部分
    const queryString = urlString.includes('?') 
      ? urlString.split('?')[1].split('#')[0] // 移除锚点部分
      : '';
    
    if (!queryString) {
      return {};
    }
    
    const params: URLParamsObject = {};
    
    // 使用 URLSearchParams API (现代浏览器支持)
    if (typeof URLSearchParams !== 'undefined') {
      const searchParams = new URLSearchParams(queryString);
      
      searchParams.forEach((value, key) => {
        // 处理重复的参数键
        if (key in params) {
          if (Array.isArray(params[key])) {
            (params[key] as string[]).push(value);
          } else {
            params[key] = [params[key] as string, value];
          }
        } else {
          params[key] = value;
        }
      });
      
      return params;
    } 
    
    // 回退方法：手动解析查询字符串
    return queryString
      .split('&')
      .reduce((result, param) => {
        if (!param) return result;
        
        const [key, value] = param.split('=');
        const decodedKey = decodeURIComponent(key);
        const decodedValue = value ? decodeURIComponent(value) : '';
        
        // 处理重复的参数键
        if (decodedKey in result) {
          if (Array.isArray(result[decodedKey])) {
            (result[decodedKey] as string[]).push(decodedValue);
          } else {
            result[decodedKey] = [result[decodedKey] as string, decodedValue];
          }
        } else {
          result[decodedKey] = decodedValue;
        }
        
        return result;
      }, {} as URLParamsObject);
  } catch (error) {
    console.error('解析 URL 参数时出错:', error);
    return {};
  }
};

/**
 * 获取指定查询参数的值
 * 
 * @param {string} name - 参数名
 * @param {string} [url] - URL 字符串，如不提供则使用当前页面 URL
 * @returns {string | string[] | null} 参数值，不存在则返回 null
 * @example
 * // 返回: '123'
 * getURLParameter('id', 'https://example.com?id=123');
 */
export const getURLParameter = (name: string, url?: string): string | string[] | null => {
  const params = getURLParameters(url);
  return name in params ? params[name] : null;
};

/**
 * 通过对象形式构建 URL 查询字符串
 * 
 * @param {Record<string, string | number | boolean | string[]>} params - 参数对象
 * @param {boolean} [encode=true] - 是否对参数进行 URL 编码
 * @returns {string} 格式化后的查询字符串，以 ? 开头
 * @example
 * // 返回: '?id=123&name=test'
 * buildQueryString({ id: 123, name: 'test' });
 */
export const buildQueryString = (
  params: Record<string, string | number | boolean | string[]>,
  encode: boolean = true
): string => {
  if (!params || typeof params !== 'object' || Object.keys(params).length === 0) {
    return '';
  }

  const parts = Object.entries(params).flatMap(([key, value]) => {
    if (value === undefined || value === null) {
      return [];
    }
    
    if (Array.isArray(value)) {
      return value.map(item => 
        `${encode ? encodeURIComponent(key) : key}=${encode ? encodeURIComponent(String(item)) : String(item)}`
      );
    }
    
    return [`${encode ? encodeURIComponent(key) : key}=${encode ? encodeURIComponent(String(value)) : String(value)}`];
  });
  
  return parts.length > 0 ? `?${parts.join('&')}` : '';
};
