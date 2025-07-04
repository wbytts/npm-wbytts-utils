// DOM操作示例
import { animateNumber, disableTouchMove, enableTouchMove, previewImage } from '@wbytts/utils/dom';

export function initDOMExamples() {
  console.log('🎨 初始化DOM操作示例');
  
  // 数字动画示例
  initNumberAnimation();
  
  // 触摸事件控制示例
  initTouchControl();
  
  // 图片预览示例
  initImagePreview();
}

// 数字动画示例
function initNumberAnimation() {
  const targetInput = document.getElementById('animate-target');
  const startButton = document.getElementById('start-animate');
  const resultDiv = document.getElementById('animate-result');
  
  if (!targetInput || !startButton || !resultDiv) return;
  
  startButton.addEventListener('click', () => {
    const target = parseInt(targetInput.value) || 1000;
    
    // 重置显示
    resultDiv.textContent = '当前值: 0';
    startButton.disabled = true;
    startButton.textContent = '动画中...';
    
    // 开始动画
    animateNumber({
      from: 0,
      to: target,
      duration: 2000,
      onUpdate: (value) => {
        resultDiv.textContent = `当前值: ${Math.round(value)}`;
      },
      onComplete: () => {
        startButton.disabled = false;
        startButton.textContent = '开始动画';
        resultDiv.textContent += ' (动画完成)';
        resultDiv.classList.add('highlight');
        setTimeout(() => {
          resultDiv.classList.remove('highlight');
        }, 2000);
      }
    });
  });
}

// 触摸事件控制示例
function initTouchControl() {
  const disableButton = document.getElementById('disable-touch');
  const enableButton = document.getElementById('enable-touch');
  const statusDiv = document.getElementById('touch-status');
  
  if (!disableButton || !enableButton || !statusDiv) return;
  
  let touchDisabled = false;
  
  disableButton.addEventListener('click', () => {
    try {
      disableTouchMove();
      touchDisabled = true;
      statusDiv.textContent = '触摸滚动: 禁用';
      statusDiv.className = 'result error mt-2';
      
      disableButton.disabled = true;
      enableButton.disabled = false;
      
      console.log('✅ 触摸滚动已禁用');
    } catch (error) {
      console.error('禁用触摸滚动失败:', error);
      statusDiv.textContent = '操作失败: ' + error.message;
      statusDiv.className = 'result error mt-2';
    }
  });
  
  enableButton.addEventListener('click', () => {
    try {
      enableTouchMove();
      touchDisabled = false;
      statusDiv.textContent = '触摸滚动: 启用';
      statusDiv.className = 'result success mt-2';
      
      enableButton.disabled = true;
      disableButton.disabled = false;
      
      console.log('✅ 触摸滚动已启用');
    } catch (error) {
      console.error('启用触摸滚动失败:', error);
      statusDiv.textContent = '操作失败: ' + error.message;
      statusDiv.className = 'result error mt-2';
    }
  });
  
  // 初始状态
  enableButton.disabled = true;
}

// 图片预览示例
function initImagePreview() {
  const previewImages = document.querySelectorAll('.preview-img');
  
  if (!previewImages.length) return;
  
  previewImages.forEach((img, index) => {
    img.addEventListener('click', () => {
      try {
        // 收集所有图片URL
        const imageUrls = Array.from(previewImages).map(img => img.src);
        
        // 调用预览功能
        previewImage({
          urls: imageUrls,
          current: index,
          onClose: () => {
            console.log('图片预览已关闭');
          },
          onSwitch: (currentIndex) => {
            console.log('切换到图片:', currentIndex);
          }
        });
        
        console.log('🖼️ 打开图片预览，当前索引:', index);
      } catch (error) {
        console.error('图片预览失败:', error);
        alert('图片预览功能暂时不可用');
      }
    });
    
    // 添加键盘支持
    img.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        img.click();
      }
    });
    
    // 使图片可聚焦
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', `预览图片 ${index + 1}`);
  });
  
  console.log(`🖼️ 已初始化 ${previewImages.length} 个图片预览`);
}
