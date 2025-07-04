// 时间处理示例
import { dayjs } from '@wbytts/utils/time';

export function initTimeExamples() {
  console.log('⏰ 初始化时间处理示例');
  
  // 时间格式化示例
  initTimeFormatting();
  
  // 时间计算示例
  initTimeCalculation();
}

// 时间格式化示例
function initTimeFormatting() {
  const formatNowButton = document.getElementById('format-now');
  const formatCustomButton = document.getElementById('format-custom');
  const resultDiv = document.getElementById('time-result');
  
  if (!formatNowButton || !formatCustomButton || !resultDiv) return;
  
  // 格式化当前时间
  formatNowButton.addEventListener('click', () => {
    try {
      const now = dayjs();
      
      const formats = [
        { name: '默认格式', format: 'YYYY-MM-DD HH:mm:ss', result: now.format('YYYY-MM-DD HH:mm:ss') },
        { name: '中文格式', format: 'YYYY年MM月DD日 HH:mm:ss', result: now.format('YYYY年MM月DD日 HH:mm:ss') },
        { name: '短日期', format: 'MM/DD/YYYY', result: now.format('MM/DD/YYYY') },
        { name: '时间戳', format: 'Unix时间戳', result: now.unix() },
        { name: 'ISO格式', format: 'ISO 8601', result: now.toISOString() },
        { name: '相对时间', format: '相对现在', result: now.fromNow() },
        { name: '星期几', format: '星期', result: now.format('dddd') },
        { name: '季度', format: '季度', result: `第${now.quarter()}季度` }
      ];
      
      let html = '<div class="code-output"><strong>当前时间格式化结果:</strong><br>';
      formats.forEach(({ name, format, result }) => {
        html += `${name} (${format}): ${result}<br>`;
      });
      html += '</div>';
      
      resultDiv.innerHTML = html;
      resultDiv.className = 'result success mt-2';
      
      console.log('✅ 时间格式化完成:', formats);
      
    } catch (error) {
      console.error('时间格式化失败:', error);
      resultDiv.innerHTML = `<span class="error">格式化失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 自定义格式化
  formatCustomButton.addEventListener('click', () => {
    try {
      const now = dayjs();
      
      const customFormats = [
        'YYYY-MM-DD',
        'DD/MM/YYYY',
        'MMM DD, YYYY',
        'HH:mm:ss',
        'h:mm A',
        'YYYY年MM月DD日 dddd',
        'MMMM Do YYYY, h:mm:ss a',
        'X' // Unix时间戳
      ];
      
      let html = '<div class="code-output"><strong>自定义格式化示例:</strong><br>';
      customFormats.forEach(format => {
        const result = format === 'X' ? now.unix() : now.format(format);
        html += `${format}: ${result}<br>`;
      });
      html += '</div>';
      
      // 添加交互式格式化
      html += `
        <div style="margin-top: 12px;">
          <strong>自定义格式:</strong><br>
          <input type="text" id="custom-format" placeholder="输入格式，如: YYYY-MM-DD HH:mm" style="width: 200px; margin-right: 8px;">
          <button id="apply-format" class="btn btn-sm btn-primary">应用格式</button>
          <div id="custom-result" style="margin-top: 8px; font-family: monospace;"></div>
        </div>
      `;
      
      resultDiv.innerHTML = html;
      resultDiv.className = 'result success mt-2';
      
      // 绑定自定义格式化事件
      const customFormatInput = document.getElementById('custom-format');
      const applyFormatButton = document.getElementById('apply-format');
      const customResultDiv = document.getElementById('custom-result');
      
      const applyCustomFormat = () => {
        const format = customFormatInput.value.trim();
        if (!format) {
          customResultDiv.innerHTML = '<span style="color: #e74c3c;">请输入格式</span>';
          return;
        }
        
        try {
          const result = now.format(format);
          customResultDiv.innerHTML = `<span style="color: #27ae60;">结果: ${result}</span>`;
        } catch (error) {
          customResultDiv.innerHTML = `<span style="color: #e74c3c;">格式错误: ${error.message}</span>`;
        }
      };
      
      applyFormatButton.addEventListener('click', applyCustomFormat);
      customFormatInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          applyCustomFormat();
        }
      });
      
      console.log('✅ 自定义格式化完成');
      
    } catch (error) {
      console.error('自定义格式化失败:', error);
      resultDiv.innerHTML = `<span class="error">格式化失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
}

// 时间计算示例
function initTimeCalculation() {
  const daysInput = document.getElementById('days-input');
  const addDaysButton = document.getElementById('add-days');
  const subtractDaysButton = document.getElementById('subtract-days');
  const resultDiv = document.getElementById('calc-time-result');
  
  if (!daysInput || !addDaysButton || !subtractDaysButton || !resultDiv) return;
  
  // 加天数
  addDaysButton.addEventListener('click', () => {
    const days = parseInt(daysInput.value) || 0;
    
    if (days === 0) {
      resultDiv.innerHTML = '<span class="error">请输入有效的天数</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    try {
      const now = dayjs();
      const future = now.add(days, 'day');
      const diffDays = future.diff(now, 'day');
      const diffWeeks = Math.floor(diffDays / 7);
      const remainingDays = diffDays % 7;
      
      resultDiv.innerHTML = `
        <div class="code-output">
          <strong>加 ${days} 天计算结果:</strong><br>
          当前时间: ${now.format('YYYY-MM-DD HH:mm:ss dddd')}<br>
          目标时间: ${future.format('YYYY-MM-DD HH:mm:ss dddd')}<br>
          时间差: ${diffDays} 天 (${diffWeeks} 周 ${remainingDays} 天)<br>
          相对时间: ${future.fromNow()}<br>
          是否同年: ${now.year() === future.year() ? '是' : '否'}<br>
          是否同月: ${now.month() === future.month() ? '是' : '否'}
        </div>
      `;
      resultDiv.className = 'result success mt-2';
      
      console.log('✅ 加天数计算完成:', { days, now: now.toISOString(), future: future.toISOString() });
      
    } catch (error) {
      console.error('加天数计算失败:', error);
      resultDiv.innerHTML = `<span class="error">计算失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 减天数
  subtractDaysButton.addEventListener('click', () => {
    const days = parseInt(daysInput.value) || 0;
    
    if (days === 0) {
      resultDiv.innerHTML = '<span class="error">请输入有效的天数</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    try {
      const now = dayjs();
      const past = now.subtract(days, 'day');
      const diffDays = now.diff(past, 'day');
      const diffWeeks = Math.floor(diffDays / 7);
      const remainingDays = diffDays % 7;
      
      resultDiv.innerHTML = `
        <div class="code-output">
          <strong>减 ${days} 天计算结果:</strong><br>
          当前时间: ${now.format('YYYY-MM-DD HH:mm:ss dddd')}<br>
          目标时间: ${past.format('YYYY-MM-DD HH:mm:ss dddd')}<br>
          时间差: ${diffDays} 天 (${diffWeeks} 周 ${remainingDays} 天)<br>
          相对时间: ${past.fromNow()}<br>
          是否同年: ${now.year() === past.year() ? '是' : '否'}<br>
          是否同月: ${now.month() === past.month() ? '是' : '否'}
        </div>
      `;
      resultDiv.className = 'result success mt-2';
      
      console.log('✅ 减天数计算完成:', { days, now: now.toISOString(), past: past.toISOString() });
      
    } catch (error) {
      console.error('减天数计算失败:', error);
      resultDiv.innerHTML = `<span class="error">计算失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 支持回车键计算
  daysInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        subtractDaysButton.click();
      } else {
        addDaysButton.click();
      }
    }
  });
  
  // 添加快速选择按钮
  const quickDays = [1, 7, 30, 90, 365];
  const quickContainer = document.createElement('div');
  quickContainer.style.marginTop = '12px';
  quickContainer.innerHTML = '<strong>快速选择:</strong>';
  
  quickDays.forEach(days => {
    const button = document.createElement('button');
    button.textContent = `${days}天`;
    button.className = 'btn btn-sm';
    button.style.margin = '4px';
    button.style.fontSize = '12px';
    button.style.padding = '4px 8px';
    
    button.addEventListener('click', () => {
      daysInput.value = days;
      daysInput.focus();
    });
    
    quickContainer.appendChild(button);
  });
  
  daysInput.parentNode.appendChild(quickContainer);
  
  // 添加更多时间计算示例
  const moreExamplesContainer = document.createElement('div');
  moreExamplesContainer.style.marginTop = '16px';
  moreExamplesContainer.innerHTML = `
    <div class="example-container">
      <h4>更多时间计算示例</h4>
      <button id="show-time-examples" class="btn btn-primary">显示示例</button>
      <div id="more-time-examples" style="margin-top: 12px;"></div>
    </div>
  `;
  
  resultDiv.parentNode.appendChild(moreExamplesContainer);
  
  document.getElementById('show-time-examples').addEventListener('click', () => {
    const now = dayjs();
    const examples = [
      { name: '本周开始', value: now.startOf('week').format('YYYY-MM-DD dddd') },
      { name: '本周结束', value: now.endOf('week').format('YYYY-MM-DD dddd') },
      { name: '本月开始', value: now.startOf('month').format('YYYY-MM-DD dddd') },
      { name: '本月结束', value: now.endOf('month').format('YYYY-MM-DD dddd') },
      { name: '本年开始', value: now.startOf('year').format('YYYY-MM-DD dddd') },
      { name: '本年结束', value: now.endOf('year').format('YYYY-MM-DD dddd') },
      { name: '是否闰年', value: now.isLeapYear() ? '是' : '否' },
      { name: '本年天数', value: now.isLeapYear() ? '366天' : '365天' },
      { name: '本月天数', value: `${now.daysInMonth()}天` },
      { name: '今年第几天', value: `第${now.dayOfYear()}天` },
      { name: '今年第几周', value: `第${now.week()}周` }
    ];
    
    let html = '<div class="code-output">';
    examples.forEach(({ name, value }) => {
      html += `${name}: ${value}<br>`;
    });
    html += '</div>';
    
    document.getElementById('more-time-examples').innerHTML = html;
  });
}
