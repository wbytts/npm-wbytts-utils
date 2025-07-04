// 标签导航功能
export function initTabNavigation() {
  const tabs = document.querySelectorAll('.nav-tab');
  const contents = document.querySelectorAll('.tab-content');
  
  // 切换标签
  function switchTab(targetTab) {
    // 移除所有活动状态
    tabs.forEach(tab => tab.classList.remove('active'));
    contents.forEach(content => content.classList.remove('active'));
    
    // 激活目标标签
    const targetButton = document.querySelector(`[data-tab="${targetTab}"]`);
    const targetContent = document.getElementById(`${targetTab}-examples`);
    
    if (targetButton && targetContent) {
      targetButton.classList.add('active');
      targetContent.classList.add('active');
      
      // 保存当前标签到localStorage
      localStorage.setItem('activeTab', targetTab);
    }
  }
  
  // 绑定点击事件
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      switchTab(targetTab);
    });
  });
  
  // 恢复上次选择的标签
  const savedTab = localStorage.getItem('activeTab');
  if (savedTab && document.getElementById(`${savedTab}-examples`)) {
    switchTab(savedTab);
  }
  
  // 键盘导航支持
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey && event.key >= '1' && event.key <= '6') {
      event.preventDefault();
      const tabIndex = parseInt(event.key) - 1;
      const tabNames = ['dom', 'bom', 'math', 'validate', 'time', 'utils'];
      if (tabNames[tabIndex]) {
        switchTab(tabNames[tabIndex]);
      }
    }
  });
  
  console.log('📋 标签导航初始化完成');
}
