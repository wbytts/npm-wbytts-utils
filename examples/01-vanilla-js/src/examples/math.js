// 数学计算示例
import { sum, average, factorial } from '@wbytts/utils/math';

export function initMathExamples() {
  console.log('🔢 初始化数学计算示例');
  
  // 基础数学运算示例
  initBasicMath();
  
  // 阶乘计算示例
  initFactorial();
}

// 基础数学运算示例
function initBasicMath() {
  const numbersInput = document.getElementById('numbers-input');
  const sumButton = document.getElementById('calc-sum');
  const averageButton = document.getElementById('calc-average');
  const resultDiv = document.getElementById('math-result');
  
  if (!numbersInput || !sumButton || !averageButton || !resultDiv) return;
  
  // 解析数字数组
  function parseNumbers(input) {
    return input
      .split(',')
      .map(n => n.trim())
      .filter(n => n !== '')
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n));
  }
  
  // 求和计算
  sumButton.addEventListener('click', () => {
    const input = numbersInput.value.trim();
    
    if (!input) {
      resultDiv.innerHTML = '<span class="error">请输入数字列表</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    try {
      const numbers = parseNumbers(input);
      
      if (numbers.length === 0) {
        resultDiv.innerHTML = '<span class="error">未找到有效数字</span>';
        resultDiv.className = 'result error mt-2';
        return;
      }
      
      const result = sum(...numbers);
      
      resultDiv.innerHTML = `
        <div class="code-output">
          <strong>求和计算:</strong><br>
          数字: [${numbers.join(', ')}]<br>
          数量: ${numbers.length} 个<br>
          结果: ${result}
        </div>
      `;
      resultDiv.className = 'result success mt-2';
      
      console.log('✅ 求和计算完成:', { numbers, result });
      
    } catch (error) {
      console.error('求和计算失败:', error);
      resultDiv.innerHTML = `<span class="error">计算失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 平均值计算
  averageButton.addEventListener('click', () => {
    const input = numbersInput.value.trim();
    
    if (!input) {
      resultDiv.innerHTML = '<span class="error">请输入数字列表</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    try {
      const numbers = parseNumbers(input);
      
      if (numbers.length === 0) {
        resultDiv.innerHTML = '<span class="error">未找到有效数字</span>';
        resultDiv.className = 'result error mt-2';
        return;
      }
      
      const result = average(...numbers);
      
      resultDiv.innerHTML = `
        <div class="code-output">
          <strong>平均值计算:</strong><br>
          数字: [${numbers.join(', ')}]<br>
          数量: ${numbers.length} 个<br>
          总和: ${sum(...numbers)}<br>
          平均值: ${result}
        </div>
      `;
      resultDiv.className = 'result success mt-2';
      
      console.log('✅ 平均值计算完成:', { numbers, result });
      
    } catch (error) {
      console.error('平均值计算失败:', error);
      resultDiv.innerHTML = `<span class="error">计算失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 支持回车键计算
  numbersInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        averageButton.click();
      } else {
        sumButton.click();
      }
    }
  });
  
  // 添加示例数据按钮
  const exampleData = [
    { name: '小数据', data: '1,2,3,4,5' },
    { name: '大数据', data: '10,20,30,40,50,60,70,80,90,100' },
    { name: '小数', data: '1.5,2.7,3.14,4.8,5.2' },
    { name: '负数', data: '-5,-3,0,3,5,8' }
  ];
  
  const exampleContainer = document.createElement('div');
  exampleContainer.style.marginTop = '12px';
  exampleContainer.innerHTML = '<strong>示例数据:</strong>';
  
  exampleData.forEach(({ name, data }) => {
    const button = document.createElement('button');
    button.textContent = name;
    button.className = 'btn btn-sm';
    button.style.margin = '4px';
    button.style.fontSize = '12px';
    button.style.padding = '4px 8px';
    
    button.addEventListener('click', () => {
      numbersInput.value = data;
      numbersInput.focus();
    });
    
    exampleContainer.appendChild(button);
  });
  
  numbersInput.parentNode.appendChild(exampleContainer);
}

// 阶乘计算示例
function initFactorial() {
  const factorialInput = document.getElementById('factorial-input');
  const calcButton = document.getElementById('calc-factorial');
  const resultDiv = document.getElementById('factorial-result');
  
  if (!factorialInput || !calcButton || !resultDiv) return;
  
  calcButton.addEventListener('click', () => {
    const input = factorialInput.value.trim();
    const number = parseInt(input);
    
    if (input === '' || isNaN(number)) {
      resultDiv.innerHTML = '<span class="error">请输入有效的数字</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    if (number < 0) {
      resultDiv.innerHTML = '<span class="error">阶乘不支持负数</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    if (number > 20) {
      resultDiv.innerHTML = '<span class="error">数字过大，请输入0-20之间的数字</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    try {
      const result = factorial(number);
      
      // 生成计算过程
      let process = '';
      if (number === 0 || number === 1) {
        process = `${number}! = 1`;
      } else {
        const steps = [];
        for (let i = number; i >= 1; i--) {
          steps.push(i);
        }
        process = `${number}! = ${steps.join(' × ')} = ${result}`;
      }
      
      resultDiv.innerHTML = `
        <div class="code-output">
          <strong>阶乘计算:</strong><br>
          输入: ${number}<br>
          计算过程: ${process}<br>
          结果: ${result}
        </div>
      `;
      resultDiv.className = 'result success mt-2';
      
      console.log('✅ 阶乘计算完成:', { number, result });
      
    } catch (error) {
      console.error('阶乘计算失败:', error);
      resultDiv.innerHTML = `<span class="error">计算失败: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 支持回车键计算
  factorialInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      calcButton.click();
    }
  });
  
  // 输入验证
  factorialInput.addEventListener('input', (event) => {
    const value = event.target.value;
    const number = parseInt(value);
    
    if (value && (!isNaN(number) && (number < 0 || number > 20))) {
      event.target.style.borderColor = '#e74c3c';
      if (number < 0) {
        resultDiv.innerHTML = '<span class="error">阶乘不支持负数</span>';
      } else {
        resultDiv.innerHTML = '<span class="error">数字过大，请输入0-20之间的数字</span>';
      }
      resultDiv.className = 'result error mt-2';
    } else {
      event.target.style.borderColor = '';
      if (!value || value === '0' || value === '1') {
        resultDiv.innerHTML = '';
      }
    }
  });
  
  // 添加快速选择按钮
  const quickNumbers = [0, 1, 3, 5, 7, 10];
  const quickContainer = document.createElement('div');
  quickContainer.style.marginTop = '12px';
  quickContainer.innerHTML = '<strong>快速选择:</strong>';
  
  quickNumbers.forEach(num => {
    const button = document.createElement('button');
    button.textContent = `${num}!`;
    button.className = 'btn btn-sm';
    button.style.margin = '4px';
    button.style.fontSize = '12px';
    button.style.padding = '4px 8px';
    
    button.addEventListener('click', () => {
      factorialInput.value = num;
      calcButton.click();
    });
    
    quickContainer.appendChild(button);
  });
  
  factorialInput.parentNode.appendChild(quickContainer);
}
