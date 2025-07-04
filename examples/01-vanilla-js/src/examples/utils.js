// 通用工具示例
import { 
  reverseString, 
  mask, 
  detectDeviceType, 
  randomHexColorCode, 
  randomIntegerInRange 
} from '@wbytts/utils';

export function initUtilsExamples() {
  console.log('🔧 初始化通用工具示例');
  
  // 字符串处理示例
  initStringProcessing();
  
  // 设备检测示例
  initDeviceDetection();
  
  // 随机数生成示例
  initRandomGeneration();
}

// 字符串处理示例
function initStringProcessing() {
  const stringInput = document.getElementById('string-input');
  const reverseButton = document.getElementById('reverse-string');
  const maskButton = document.getElementById('mask-string');
  const resultDiv = document.getElementById('string-result');
  
  if (!stringInput || !reverseButton || !maskButton || !resultDiv) return;
  
  // 反转字符串
  reverseButton.addEventListener('click', () => {
    const input = stringInput.value.trim();
    
    if (!input) {
      resultDiv.innerHTML = '<span class="error">请输入要处理的文本</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    try {
      const reversed = reverseString(input);
      
      resultDiv.innerHTML = `
        <div class="code-output">
          <strong>字符串反转结果:</strong><br>
          原始文本: "${input}"<br>
          反转结果: "${reversed}"<br>
          原始长度: ${input.length} 字符<br>
          反转长度: ${reversed.length} 字符
        </div>
      `;
      resultDiv.className = 'result success mt-2';
      
      console.log('✅ 字符串反转完成:', { input, reversed });
      
    } catch (error) {
      console.error('字符串反转失败:', error);
      resultDiv.innerHTML = `<span class="error">处理失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 掩码处理
  maskButton.addEventListener('click', () => {
    const input = stringInput.value.trim();
    
    if (!input) {
      resultDiv.innerHTML = '<span class="error">请输入要处理的文本</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    try {
      // 不同的掩码策略
      const maskStrategies = [
        { name: '中间掩码', result: mask(input, 2, -2, '*') },
        { name: '前部掩码', result: mask(input, 0, 3, '#') },
        { name: '后部掩码', result: mask(input, -3, input.length, '•') },
        { name: '部分掩码', result: mask(input, 1, 4, '●') }
      ];
      
      let html = '<div class="code-output"><strong>掩码处理结果:</strong><br>';
      html += `原始文本: "${input}"<br><br>`;
      
      maskStrategies.forEach(({ name, result }) => {
        html += `${name}: "${result}"<br>`;
      });
      
      html += '</div>';
      
      resultDiv.innerHTML = html;
      resultDiv.className = 'result success mt-2';
      
      console.log('✅ 掩码处理完成:', { input, strategies: maskStrategies });
      
    } catch (error) {
      console.error('掩码处理失败:', error);
      resultDiv.innerHTML = `<span class="error">处理失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 支持回车键处理
  stringInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        maskButton.click();
      } else {
        reverseButton.click();
      }
    }
  });
  
  // 添加示例文本
  const exampleTexts = [
    'Hello World',
    '这是一个测试文本',
    '13800138000',
    'user@example.com',
    'JavaScript是一门编程语言'
  ];
  
  const exampleContainer = document.createElement('div');
  exampleContainer.style.marginTop = '12px';
  exampleContainer.innerHTML = '<strong>示例文本:</strong>';
  
  exampleTexts.forEach((text, index) => {
    const button = document.createElement('button');
    button.textContent = `示例 ${index + 1}`;
    button.className = 'btn btn-sm';
    button.style.margin = '4px';
    button.style.fontSize = '12px';
    button.style.padding = '4px 8px';
    
    button.addEventListener('click', () => {
      stringInput.value = text;
      stringInput.focus();
    });
    
    exampleContainer.appendChild(button);
  });
  
  stringInput.parentNode.appendChild(exampleContainer);
}

// 设备检测示例
function initDeviceDetection() {
  const detectButton = document.getElementById('detect-device');
  const resultDiv = document.getElementById('device-result');
  
  if (!detectButton || !resultDiv) return;
  
  detectButton.addEventListener('click', () => {
    try {
      const deviceType = detectDeviceType();
      
      // 获取更多设备信息
      const deviceInfo = {
        type: deviceType,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        languages: navigator.languages?.join(', ') || '不支持',
        cookieEnabled: navigator.cookieEnabled,
        onLine: navigator.onLine,
        screenWidth: screen.width,
        screenHeight: screen.height,
        screenColorDepth: screen.colorDepth,
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
        devicePixelRatio: window.devicePixelRatio || 1,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
      };
      
      // 检测特性支持
      const features = {
        localStorage: typeof Storage !== 'undefined',
        sessionStorage: typeof Storage !== 'undefined',
        webGL: !!window.WebGLRenderingContext,
        webWorker: typeof Worker !== 'undefined',
        serviceWorker: 'serviceWorker' in navigator,
        geolocation: 'geolocation' in navigator,
        notification: 'Notification' in window,
        camera: 'mediaDevices' in navigator,
        touch: 'ontouchstart' in window
      };
      
      let html = `
        <div class="code-output">
          <strong>设备检测结果:</strong><br>
          设备类型: ${deviceInfo.type}<br>
          平台: ${deviceInfo.platform}<br>
          语言: ${deviceInfo.language}<br>
          支持语言: ${deviceInfo.languages}<br>
          Cookie启用: ${deviceInfo.cookieEnabled ? '是' : '否'}<br>
          在线状态: ${deviceInfo.onLine ? '在线' : '离线'}<br>
          时区: ${deviceInfo.timezone}<br><br>
          
          <strong>屏幕信息:</strong><br>
          屏幕分辨率: ${deviceInfo.screenWidth} × ${deviceInfo.screenHeight}<br>
          窗口大小: ${deviceInfo.windowWidth} × ${deviceInfo.windowHeight}<br>
          像素比: ${deviceInfo.devicePixelRatio}<br>
          颜色深度: ${deviceInfo.screenColorDepth} 位<br><br>
          
          <strong>特性支持:</strong><br>
          本地存储: ${features.localStorage ? '✅' : '❌'}<br>
          会话存储: ${features.sessionStorage ? '✅' : '❌'}<br>
          WebGL: ${features.webGL ? '✅' : '❌'}<br>
          Web Worker: ${features.webWorker ? '✅' : '❌'}<br>
          Service Worker: ${features.serviceWorker ? '✅' : '❌'}<br>
          地理位置: ${features.geolocation ? '✅' : '❌'}<br>
          通知: ${features.notification ? '✅' : '❌'}<br>
          摄像头: ${features.camera ? '✅' : '❌'}<br>
          触摸: ${features.touch ? '✅' : '❌'}
        </div>
      `;
      
      resultDiv.innerHTML = html;
      resultDiv.className = 'result success mt-2';
      
      console.log('✅ 设备检测完成:', { deviceInfo, features });
      
    } catch (error) {
      console.error('设备检测失败:', error);
      resultDiv.innerHTML = `<span class="error">检测失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
}

// 随机数生成示例
function initRandomGeneration() {
  const rangeInput = document.getElementById('range-input');
  const generateRandomButton = document.getElementById('generate-random');
  const generateColorButton = document.getElementById('generate-color');
  const resultDiv = document.getElementById('random-result');
  
  if (!rangeInput || !generateRandomButton || !generateColorButton || !resultDiv) return;
  
  // 生成随机数
  generateRandomButton.addEventListener('click', () => {
    const range = rangeInput.value.trim();
    
    if (!range || !range.includes('-')) {
      resultDiv.innerHTML = '<span class="error">请输入有效的范围格式 (如: 1-100)</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    try {
      const [min, max] = range.split('-').map(n => parseInt(n.trim()));
      
      if (isNaN(min) || isNaN(max) || min >= max) {
        resultDiv.innerHTML = '<span class="error">请输入有效的数字范围</span>';
        resultDiv.className = 'result error mt-2';
        return;
      }
      
      // 生成多个随机数
      const randomNumbers = [];
      for (let i = 0; i < 10; i++) {
        randomNumbers.push(randomIntegerInRange(min, max));
      }
      
      resultDiv.innerHTML = `
        <div class="code-output">
          <strong>随机数生成结果:</strong><br>
          范围: ${min} - ${max}<br>
          生成数量: 10 个<br>
          结果: [${randomNumbers.join(', ')}]<br>
          最小值: ${Math.min(...randomNumbers)}<br>
          最大值: ${Math.max(...randomNumbers)}<br>
          平均值: ${(randomNumbers.reduce((a, b) => a + b, 0) / randomNumbers.length).toFixed(2)}
        </div>
      `;
      resultDiv.className = 'result success mt-2';
      
      console.log('✅ 随机数生成完成:', { range: [min, max], numbers: randomNumbers });
      
    } catch (error) {
      console.error('随机数生成失败:', error);
      resultDiv.innerHTML = `<span class="error">生成失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 生成随机颜色
  generateColorButton.addEventListener('click', () => {
    try {
      // 生成多个随机颜色
      const colors = [];
      for (let i = 0; i < 8; i++) {
        colors.push(randomHexColorCode());
      }
      
      let html = `
        <div class="code-output">
          <strong>随机颜色生成结果:</strong><br>
          生成数量: 8 个<br><br>
      `;
      
      colors.forEach((color, index) => {
        html += `
          颜色 ${index + 1}: ${color} 
          <span style="display: inline-block; width: 20px; height: 20px; background-color: ${color}; border: 1px solid #ccc; margin-left: 8px; vertical-align: middle;"></span><br>
        `;
      });
      
      html += '</div>';
      
      resultDiv.innerHTML = html;
      resultDiv.className = 'result success mt-2';
      
      console.log('✅ 随机颜色生成完成:', colors);
      
    } catch (error) {
      console.error('随机颜色生成失败:', error);
      resultDiv.innerHTML = `<span class="error">生成失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 支持回车键生成
  rangeInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      generateRandomButton.click();
    }
  });
  
  // 添加快速范围选择
  const quickRanges = ['1-10', '1-100', '0-255', '1000-9999'];
  const quickContainer = document.createElement('div');
  quickContainer.style.marginTop = '12px';
  quickContainer.innerHTML = '<strong>快速选择:</strong>';
  
  quickRanges.forEach(range => {
    const button = document.createElement('button');
    button.textContent = range;
    button.className = 'btn btn-sm';
    button.style.margin = '4px';
    button.style.fontSize = '12px';
    button.style.padding = '4px 8px';
    
    button.addEventListener('click', () => {
      rangeInput.value = range;
      rangeInput.focus();
    });
    
    quickContainer.appendChild(button);
  });
  
  rangeInput.parentNode.appendChild(quickContainer);
}
