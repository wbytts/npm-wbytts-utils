/**
 * 示例项目的辅助工具函数
 */

/**
 * 创建示例容器
 * @param {string} title - 示例标题
 * @param {string} description - 示例描述
 * @returns {HTMLElement} 容器元素
 */
export function createExampleContainer(title, description) {
  const container = document.createElement('div');
  container.className = 'example-container fade-in';
  
  const titleEl = document.createElement('h3');
  titleEl.textContent = title;
  
  const descEl = document.createElement('p');
  descEl.textContent = description;
  descEl.style.marginBottom = '20px';
  descEl.style.color = '#666';
  
  container.appendChild(titleEl);
  container.appendChild(descEl);
  
  return container;
}

/**
 * 创建按钮
 * @param {string} text - 按钮文本
 * @param {string} type - 按钮类型 (primary, success, warning, danger)
 * @param {Function} onClick - 点击事件处理函数
 * @returns {HTMLElement} 按钮元素
 */
export function createButton(text, type = 'primary', onClick) {
  const button = document.createElement('button');
  button.textContent = text;
  button.className = `btn btn-${type}`;
  
  if (onClick) {
    button.addEventListener('click', onClick);
  }
  
  return button;
}

/**
 * 创建输入框
 * @param {string} placeholder - 占位符文本
 * @param {string} value - 初始值
 * @returns {HTMLElement} 输入框元素
 */
export function createInput(placeholder = '', value = '') {
  const input = document.createElement('input');
  input.type = 'text';
  input.className = 'form-input';
  input.placeholder = placeholder;
  input.value = value;
  
  return input;
}

/**
 * 创建结果显示区域
 * @param {string} content - 显示内容
 * @param {boolean} isError - 是否为错误信息
 * @returns {HTMLElement} 结果显示元素
 */
export function createResult(content = '', isError = false) {
  const result = document.createElement('div');
  result.className = isError ? 'error' : 'result';
  result.textContent = content;
  
  return result;
}

/**
 * 创建代码块
 * @param {string} code - 代码内容
 * @returns {HTMLElement} 代码块元素
 */
export function createCodeBlock(code) {
  const codeBlock = document.createElement('pre');
  codeBlock.className = 'code-block';
  codeBlock.textContent = code;
  
  return codeBlock;
}

/**
 * 显示通知消息
 * @param {string} message - 消息内容
 * @param {string} type - 消息类型 (success, error, warning, info)
 * @param {number} duration - 显示时长(毫秒)
 */
export function showNotification(message, type = 'info', duration = 3000) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 4px;
    color: white;
    font-weight: 500;
    z-index: 1000;
    animation: slideInRight 0.3s ease-out;
  `;
  
  // 设置背景色
  const colors = {
    success: '#2ecc71',
    error: '#e74c3c',
    warning: '#f39c12',
    info: '#3498db'
  };
  notification.style.backgroundColor = colors[type] || colors.info;
  
  document.body.appendChild(notification);
  
  // 自动移除
  setTimeout(() => {
    notification.style.animation = 'slideOutRight 0.3s ease-out';
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, duration);
}

/**
 * 格式化JSON显示
 * @param {any} data - 要格式化的数据
 * @returns {string} 格式化后的JSON字符串
 */
export function formatJSON(data) {
  return JSON.stringify(data, null, 2);
}

/**
 * 复制文本到剪贴板
 * @param {string} text - 要复制的文本
 * @returns {Promise<boolean>} 是否复制成功
 */
export async function copyToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    // 降级方案
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    const success = document.execCommand('copy');
    document.body.removeChild(textArea);
    return success;
  }
}

/**
 * 生成随机ID
 * @param {number} length - ID长度
 * @returns {string} 随机ID
 */
export function generateId(length = 8) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/**
 * 防抖函数
 * @param {Function} func - 要防抖的函数
 * @param {number} wait - 等待时间
 * @returns {Function} 防抖后的函数
 */
export function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * 节流函数
 * @param {Function} func - 要节流的函数
 * @param {number} limit - 时间限制
 * @returns {Function} 节流后的函数
 */
export function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

/**
 * 添加CSS动画样式
 */
export function addAnimationStyles() {
  if (document.getElementById('demo-animations')) return;
  
  const style = document.createElement('style');
  style.id = 'demo-animations';
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(100%);
        opacity: 0;
      }
    }
  `;
  
  document.head.appendChild(style);
}

// 初始化时添加动画样式
addAnimationStyles();
