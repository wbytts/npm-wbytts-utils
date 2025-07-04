// BOM操作示例
import { getURLParameters, copyToClipboard } from '@wbytts/utils/bom';

export function initBOMExamples() {
  console.log('🌐 初始化BOM操作示例');
  
  // URL参数解析示例
  initURLParsing();
  
  // 剪贴板操作示例
  initClipboard();
}

// URL参数解析示例
function initURLParsing() {
  const urlInput = document.getElementById('test-url');
  const parseButton = document.getElementById('parse-url');
  const resultDiv = document.getElementById('url-result');
  
  if (!urlInput || !parseButton || !resultDiv) return;
  
  parseButton.addEventListener('click', () => {
    const url = urlInput.value.trim();
    
    if (!url) {
      resultDiv.innerHTML = '<span class="error">请输入要解析的URL</span>';
      return;
    }
    
    try {
      // 解析URL参数
      const params = getURLParameters(url);
      
      // 格式化显示结果
      const formatResult = (params) => {
        if (Object.keys(params).length === 0) {
          return '<span class="error">未找到查询参数</span>';
        }
        
        let html = '<div class="code-output">';
        html += '<strong>解析结果:</strong><br>';
        html += JSON.stringify(params, null, 2);
        html += '</div>';
        
        html += '<div style="margin-top: 12px;"><strong>参数详情:</strong></div>';
        html += '<ul style="margin: 8px 0; padding-left: 20px;">';
        
        for (const [key, value] of Object.entries(params)) {
          if (Array.isArray(value)) {
            html += `<li><code>${key}</code>: [${value.map(v => `"${v}"`).join(', ')}] (数组)</li>`;
          } else {
            html += `<li><code>${key}</code>: "${value}"</li>`;
          }
        }
        
        html += '</ul>';
        return html;
      };
      
      resultDiv.innerHTML = formatResult(params);
      resultDiv.className = 'result success mt-2';
      
      console.log('✅ URL参数解析成功:', params);
      
    } catch (error) {
      console.error('URL参数解析失败:', error);
      resultDiv.innerHTML = `<span class="error">解析失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 支持回车键解析
  urlInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      parseButton.click();
    }
  });
  
  // 预设一些示例URL
  const exampleUrls = [
    'https://example.com?name=张三&age=25&hobby=读书&hobby=游戏',
    'https://test.com?id=123&category=tech&tags=js,vue,react&active=true',
    'https://shop.com?product=laptop&price=5999&color=silver&size=13inch',
    'https://blog.com?page=1&limit=10&sort=date&order=desc&author=admin'
  ];
  
  // 添加示例按钮
  const exampleContainer = document.createElement('div');
  exampleContainer.style.marginTop = '12px';
  exampleContainer.innerHTML = '<strong>示例URL:</strong>';
  
  exampleUrls.forEach((url, index) => {
    const button = document.createElement('button');
    button.textContent = `示例 ${index + 1}`;
    button.className = 'btn btn-sm';
    button.style.margin = '4px';
    button.style.fontSize = '12px';
    button.style.padding = '4px 8px';
    
    button.addEventListener('click', () => {
      urlInput.value = url;
      parseButton.click();
    });
    
    exampleContainer.appendChild(button);
  });
  
  urlInput.parentNode.appendChild(exampleContainer);
}

// 剪贴板操作示例
function initClipboard() {
  const textArea = document.getElementById('copy-text');
  const copyButton = document.getElementById('copy-btn');
  const resultDiv = document.getElementById('copy-result');
  
  if (!textArea || !copyButton || !resultDiv) return;
  
  copyButton.addEventListener('click', async () => {
    const text = textArea.value.trim();
    
    if (!text) {
      resultDiv.innerHTML = '<span class="error">请输入要复制的文本</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    // 显示加载状态
    copyButton.disabled = true;
    copyButton.textContent = '复制中...';
    resultDiv.innerHTML = '<span>正在复制到剪贴板...</span>';
    resultDiv.className = 'result mt-2';
    
    try {
      // 调用复制功能
      const success = await copyToClipboard(text);
      
      if (success) {
        resultDiv.innerHTML = `
          <span class="success">✅ 复制成功!</span><br>
          <small>已复制 ${text.length} 个字符到剪贴板</small>
        `;
        resultDiv.className = 'result success mt-2';
        
        // 显示复制的内容预览
        if (text.length > 50) {
          const preview = text.substring(0, 50) + '...';
          resultDiv.innerHTML += `<br><small>内容预览: "${preview}"</small>`;
        } else {
          resultDiv.innerHTML += `<br><small>复制内容: "${text}"</small>`;
        }
        
        console.log('✅ 文本复制成功');
        
        // 临时高亮文本框
        textArea.style.backgroundColor = '#d4edda';
        setTimeout(() => {
          textArea.style.backgroundColor = '';
        }, 1000);
        
      } else {
        throw new Error('复制操作失败');
      }
      
    } catch (error) {
      console.error('复制失败:', error);
      resultDiv.innerHTML = `<span class="error">❌ 复制失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    } finally {
      copyButton.disabled = false;
      copyButton.textContent = '复制到剪贴板';
    }
  });
  
  // 支持Ctrl+Enter快捷键复制
  textArea.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key === 'Enter') {
      event.preventDefault();
      copyButton.click();
    }
  });
  
  // 添加一些预设文本选项
  const presetTexts = [
    'Hello, @wbytts/utils!',
    '这是一个测试文本，用于演示剪贴板功能。',
    '{"name": "张三", "age": 25, "city": "北京"}',
    'console.log("Hello World");'
  ];
  
  const presetContainer = document.createElement('div');
  presetContainer.style.marginTop = '12px';
  presetContainer.innerHTML = '<strong>预设文本:</strong>';
  
  presetTexts.forEach((text, index) => {
    const button = document.createElement('button');
    button.textContent = `预设 ${index + 1}`;
    button.className = 'btn btn-sm';
    button.style.margin = '4px';
    button.style.fontSize = '12px';
    button.style.padding = '4px 8px';
    
    button.addEventListener('click', () => {
      textArea.value = text;
      textArea.focus();
    });
    
    presetContainer.appendChild(button);
  });
  
  textArea.parentNode.appendChild(presetContainer);
}
