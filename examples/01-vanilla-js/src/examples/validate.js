// 数据验证示例
import { isIdCard, isPhoneNumber, isUrl } from '@wbytts/utils/validate';

export function initValidateExamples() {
  console.log('✅ 初始化数据验证示例');
  
  // 身份证验证示例
  initIdCardValidation();
  
  // 手机号验证示例
  initPhoneValidation();
  
  // URL验证示例
  initUrlValidation();
}

// 身份证验证示例
function initIdCardValidation() {
  const idCardInput = document.getElementById('id-card-input');
  const validateButton = document.getElementById('validate-id-card');
  const resultDiv = document.getElementById('id-card-result');
  
  if (!idCardInput || !validateButton || !resultDiv) return;
  
  validateButton.addEventListener('click', () => {
    const idCard = idCardInput.value.trim();
    
    if (!idCard) {
      resultDiv.innerHTML = '<span class="error">请输入身份证号码</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    try {
      const isValid = isIdCard(idCard);
      
      if (isValid) {
        // 解析身份证信息
        const year = idCard.substring(6, 10);
        const month = idCard.substring(10, 12);
        const day = idCard.substring(12, 14);
        const genderCode = parseInt(idCard.substring(16, 17));
        const gender = genderCode % 2 === 0 ? '女' : '男';
        
        resultDiv.innerHTML = `
          <div class="code-output">
            <strong>✅ 身份证验证通过</strong><br>
            身份证号: ${idCard}<br>
            出生日期: ${year}-${month}-${day}<br>
            性别: ${gender}<br>
            长度: ${idCard.length} 位
          </div>
        `;
        resultDiv.className = 'result success mt-2';
        
        console.log('✅ 身份证验证通过:', { idCard, year, month, day, gender });
        
      } else {
        resultDiv.innerHTML = `
          <span class="error">❌ 身份证验证失败</span><br>
          <small>请检查身份证号码格式是否正确</small>
        `;
        resultDiv.className = 'result error mt-2';
        
        console.log('❌ 身份证验证失败:', idCard);
      }
      
    } catch (error) {
      console.error('身份证验证出错:', error);
      resultDiv.innerHTML = `<span class="error">验证出错: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 支持回车键验证
  idCardInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      validateButton.click();
    }
  });
  
  // 实时输入格式化
  idCardInput.addEventListener('input', (event) => {
    let value = event.target.value.replace(/[^0-9Xx]/g, '');
    if (value.length > 18) {
      value = value.substring(0, 18);
    }
    event.target.value = value.toUpperCase();
    
    // 实时验证提示
    if (value.length === 18) {
      const isValid = isIdCard(value);
      if (isValid) {
        event.target.style.borderColor = '#27ae60';
      } else {
        event.target.style.borderColor = '#e74c3c';
      }
    } else {
      event.target.style.borderColor = '';
    }
  });
  
  // 添加示例身份证号
  const exampleIds = [
    '11010519491231002X',
    '440524188001010014',
    '110105199001011234'
  ];
  
  const exampleContainer = document.createElement('div');
  exampleContainer.style.marginTop = '12px';
  exampleContainer.innerHTML = '<strong>示例身份证:</strong>';
  
  exampleIds.forEach((id, index) => {
    const button = document.createElement('button');
    button.textContent = `示例 ${index + 1}`;
    button.className = 'btn btn-sm';
    button.style.margin = '4px';
    button.style.fontSize = '12px';
    button.style.padding = '4px 8px';
    
    button.addEventListener('click', () => {
      idCardInput.value = id;
      validateButton.click();
    });
    
    exampleContainer.appendChild(button);
  });
  
  idCardInput.parentNode.appendChild(exampleContainer);
}

// 手机号验证示例
function initPhoneValidation() {
  const phoneInput = document.getElementById('phone-input');
  const validateButton = document.getElementById('validate-phone');
  const resultDiv = document.getElementById('phone-result');
  
  if (!phoneInput || !validateButton || !resultDiv) return;
  
  validateButton.addEventListener('click', () => {
    const phone = phoneInput.value.trim();
    
    if (!phone) {
      resultDiv.innerHTML = '<span class="error">请输入手机号码</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    try {
      const isValid = isPhoneNumber(phone);
      
      if (isValid) {
        // 识别运营商
        const getCarrier = (phone) => {
          const num = phone.replace(/\D/g, '');
          if (/^1[34578]/.test(num)) {
            if (/^1[34578][0-9]/.test(num)) {
              const prefix = num.substring(0, 3);
              if (['130', '131', '132', '155', '156', '185', '186', '145', '175', '176'].includes(prefix)) {
                return '中国联通';
              } else if (['133', '153', '180', '181', '189', '177', '173'].includes(prefix)) {
                return '中国电信';
              } else {
                return '中国移动';
              }
            }
          }
          return '未知运营商';
        };
        
        const carrier = getCarrier(phone);
        
        resultDiv.innerHTML = `
          <div class="code-output">
            <strong>✅ 手机号验证通过</strong><br>
            手机号: ${phone}<br>
            运营商: ${carrier}<br>
            长度: ${phone.replace(/\D/g, '').length} 位
          </div>
        `;
        resultDiv.className = 'result success mt-2';
        
        console.log('✅ 手机号验证通过:', { phone, carrier });
        
      } else {
        resultDiv.innerHTML = `
          <span class="error">❌ 手机号验证失败</span><br>
          <small>请检查手机号码格式是否正确</small>
        `;
        resultDiv.className = 'result error mt-2';
        
        console.log('❌ 手机号验证失败:', phone);
      }
      
    } catch (error) {
      console.error('手机号验证出错:', error);
      resultDiv.innerHTML = `<span class="error">验证出错: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 支持回车键验证
  phoneInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      validateButton.click();
    }
  });
  
  // 实时输入格式化
  phoneInput.addEventListener('input', (event) => {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 11) {
      value = value.substring(0, 11);
    }
    
    // 格式化显示
    if (value.length > 3 && value.length <= 7) {
      value = value.substring(0, 3) + '-' + value.substring(3);
    } else if (value.length > 7) {
      value = value.substring(0, 3) + '-' + value.substring(3, 7) + '-' + value.substring(7);
    }
    
    event.target.value = value;
    
    // 实时验证提示
    const cleanValue = value.replace(/\D/g, '');
    if (cleanValue.length === 11) {
      const isValid = isPhoneNumber(cleanValue);
      if (isValid) {
        event.target.style.borderColor = '#27ae60';
      } else {
        event.target.style.borderColor = '#e74c3c';
      }
    } else {
      event.target.style.borderColor = '';
    }
  });
  
  // 添加示例手机号
  const examplePhones = [
    '13800138000',
    '15912345678',
    '18888888888'
  ];
  
  const exampleContainer = document.createElement('div');
  exampleContainer.style.marginTop = '12px';
  exampleContainer.innerHTML = '<strong>示例手机号:</strong>';
  
  examplePhones.forEach((phone, index) => {
    const button = document.createElement('button');
    button.textContent = `示例 ${index + 1}`;
    button.className = 'btn btn-sm';
    button.style.margin = '4px';
    button.style.fontSize = '12px';
    button.style.padding = '4px 8px';
    
    button.addEventListener('click', () => {
      phoneInput.value = phone;
      validateButton.click();
    });
    
    exampleContainer.appendChild(button);
  });
  
  phoneInput.parentNode.appendChild(exampleContainer);
}

// URL验证示例
function initUrlValidation() {
  const urlInput = document.getElementById('url-input');
  const validateButton = document.getElementById('validate-url');
  const resultDiv = document.getElementById('url-validate-result');
  
  if (!urlInput || !validateButton || !resultDiv) return;
  
  validateButton.addEventListener('click', () => {
    const url = urlInput.value.trim();
    
    if (!url) {
      resultDiv.innerHTML = '<span class="error">请输入URL地址</span>';
      resultDiv.className = 'result error mt-2';
      return;
    }
    
    try {
      const isValid = isUrl(url);
      
      if (isValid) {
        // 解析URL信息
        const urlObj = new URL(url);
        
        resultDiv.innerHTML = `
          <div class="code-output">
            <strong>✅ URL验证通过</strong><br>
            完整URL: ${url}<br>
            协议: ${urlObj.protocol}<br>
            域名: ${urlObj.hostname}<br>
            端口: ${urlObj.port || '默认'}<br>
            路径: ${urlObj.pathname || '/'}<br>
            查询参数: ${urlObj.search || '无'}<br>
            锚点: ${urlObj.hash || '无'}
          </div>
        `;
        resultDiv.className = 'result success mt-2';
        
        console.log('✅ URL验证通过:', { url, parsed: urlObj });
        
      } else {
        resultDiv.innerHTML = `
          <span class="error">❌ URL验证失败</span><br>
          <small>请检查URL格式是否正确</small>
        `;
        resultDiv.className = 'result error mt-2';
        
        console.log('❌ URL验证失败:', url);
      }
      
    } catch (error) {
      console.error('URL验证出错:', error);
      resultDiv.innerHTML = `<span class="error">验证出错: ${error.message}</span>`;
      resultDiv.className = 'result error mt-2';
    }
  });
  
  // 支持回车键验证
  urlInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      validateButton.click();
    }
  });
  
  // 添加示例URL
  const exampleUrls = [
    'https://www.example.com',
    'http://localhost:3000/api/users?page=1',
    'https://github.com/user/repo#readme',
    'ftp://files.example.com/download'
  ];
  
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
      validateButton.click();
    });
    
    exampleContainer.appendChild(button);
  });
  
  urlInput.parentNode.appendChild(exampleContainer);
}
