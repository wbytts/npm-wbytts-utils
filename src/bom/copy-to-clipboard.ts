/**
 * 复制文本到剪贴板
 * 
 * 此函数提供两种复制方式：
 * 1. 优先使用现代的 Clipboard API（navigator.clipboard）
 * 2. 对于不支持 Clipboard API 的浏览器，回退到传统的 document.execCommand('copy') 方法
 * 
 * @param text - 要复制到剪贴板的文本
 * @returns Promise<boolean> - 表示复制操作是否成功的 Promise
 */
export const copyToClipboard = async (text: string): Promise<boolean> => {
  try {
    // 方法一：使用现代的 Clipboard API (如果可用)
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    
    // 方法二：使用传统方法，针对不支持 Clipboard API 的浏览器
    // 保存用户当前选中区域（如果有）
    const selection = document.getSelection();
    const selected = selection && selection.rangeCount > 0
        ? selection.getRangeAt(0)
        : null;
    
    // 创建临时 textarea 元素
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    // 将元素设置在屏幕外，但仍在文档流中
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    // 确保 textarea 在视口内，避免在某些移动浏览器中的问题
    textArea.style.height = '1px';
    
    // 添加到文档中
    document.body.appendChild(textArea);
    // 选中文本内容
    textArea.select();
    textArea.setSelectionRange(0, textArea.value.length); // 兼容移动设备
    
    // 执行复制命令
    const successful = document.execCommand('copy');
    
    // 清理：移除临时元素
    document.body.removeChild(textArea);
    
    // 恢复用户之前的选择（如果有）
    if (selected) {
      const currentSelection = document.getSelection();
      if (currentSelection) {
        currentSelection.removeAllRanges();
        currentSelection.addRange(selected);
      }
    }
    
    return successful;
  } catch (err) {
    console.error('无法复制文本到剪贴板:', err);
    return false;
  }
};

/**
 * 复制文本到剪贴板（同步版本，兼容旧代码）
 * 
 * @deprecated 推荐使用异步版本 copyToClipboard
 * @param text - 要复制到剪贴板的文本
 * @returns boolean - 复制操作是否成功
 */
export const copyToClipboardSync = (text: string): boolean => {
  try {
    // 保存用户当前选中区域（如果有）
    const selection = document.getSelection();
    const selected = selection && selection.rangeCount > 0
      ? selection.getRangeAt(0)
      : null;
    
    // 创建临时 textarea 元素
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.setAttribute('readonly', '');
    textArea.style.position = 'absolute';
    textArea.style.left = '-9999px';
    
    // 添加到文档中
    document.body.appendChild(textArea);
    // 选中文本内容
    textArea.select();
    
    // 执行复制命令
    const successful = document.execCommand('copy');
    
    // 清理：移除临时元素
    document.body.removeChild(textArea);
    
    // 恢复用户之前的选择（如果有）
    if (selected) {
      const currentSelection = document.getSelection();
      if (currentSelection) {
        currentSelection.removeAllRanges();
        currentSelection.addRange(selected);
      }
    }
    
    return successful;
  } catch (err) {
    console.error('无法复制文本到剪贴板:', err);
    return false;
  }
};
