// 主入口文件
import { initTabNavigation } from './examples/navigation.js';
import { initDOMExamples } from './examples/dom.js';
import { initBOMExamples } from './examples/bom.js';
import { initMathExamples } from './examples/math.js';
import { initValidateExamples } from './examples/validate.js';
import { initTimeExamples } from './examples/time.js';
import { initUtilsExamples } from './examples/utils.js';

// 初始化应用
function initApp() {
  console.log('🚀 @wbytts/utils 原生JavaScript示例启动');
  
  // 初始化标签导航
  initTabNavigation();
  
  // 初始化各个模块的示例
  initDOMExamples();
  initBOMExamples();
  initMathExamples();
  initValidateExamples();
  initTimeExamples();
  initUtilsExamples();
  
  console.log('✅ 所有示例模块初始化完成');
}

// DOM加载完成后初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// 全局错误处理
window.addEventListener('error', (event) => {
  console.error('全局错误:', event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('未处理的Promise拒绝:', event.reason);
});
