<template>
  <div class="examples-container">
    <h2>数据验证示例</h2>
    <p>展示数据验证相关的工具函数在Vue.js中的使用</p>

    <!-- 身份证验证 -->
    <div class="example-section">
      <h3>身份证验证</h3>
      <div class="example-content">
        <div class="form-group">
          <label>身份证号:</label>
          <input
            v-model="idCardInput"
            type="text"
            placeholder="输入身份证号码"
            class="form-control"
            maxlength="18"
          />
          <button @click="validateIdCard" class="btn btn-primary">验证</button>
        </div>
        
        <div v-if="validationResults.idCard" class="result" :class="validationResults.idCard.isValid ? 'success' : 'error'">
          <strong>{{ validationResults.idCard.message }}</strong>
          <div v-if="validationResults.idCard.isValid" class="mt-1">
            <small>身份证格式正确 ✅</small>
          </div>
        </div>
      </div>
    </div>

    <!-- 手机号验证 -->
    <div class="example-section">
      <h3>手机号验证</h3>
      <div class="example-content">
        <div class="form-group">
          <label>手机号:</label>
          <input
            v-model="phoneInput"
            type="tel"
            placeholder="输入手机号码"
            class="form-control"
          />
          <button @click="validatePhone" class="btn btn-primary">验证</button>
        </div>
        
        <div v-if="validationResults.phone" class="result" :class="validationResults.phone.isValid ? 'success' : 'error'">
          <strong>{{ validationResults.phone.message }}</strong>
          <div v-if="validationResults.phone.isValid" class="mt-1">
            <small>手机号格式正确 ✅</small>
          </div>
        </div>
      </div>
    </div>

    <!-- URL验证 -->
    <div class="example-section">
      <h3>URL验证</h3>
      <div class="example-content">
        <div class="form-group">
          <label>URL地址:</label>
          <input
            v-model="urlInput"
            type="url"
            placeholder="输入URL地址"
            class="form-control"
            style="min-width: 300px;"
          />
          <button @click="validateURL" class="btn btn-primary">验证</button>
        </div>
        
        <div v-if="validationResults.url" class="result" :class="validationResults.url.isValid ? 'success' : 'error'">
          <strong>{{ validationResults.url.message }}</strong>
          <div v-if="validationResults.url.isValid" class="mt-1">
            <small>URL格式正确 ✅</small>
          </div>
        </div>
      </div>
    </div>

    <!-- 示例数据 -->
    <div class="example-section">
      <h3>示例数据</h3>
      <div class="example-content">
        <div class="mb-2">
          <strong>身份证示例:</strong>
          <div class="d-flex" style="gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
            <button
              v-for="(example, index) in exampleIdCards"
              :key="index"
              @click="idCardInput = example"
              class="btn btn-sm"
            >
              示例 {{ index + 1 }}
            </button>
          </div>
        </div>
        
        <div class="mb-2">
          <strong>手机号示例:</strong>
          <div class="d-flex" style="gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
            <button
              v-for="(example, index) in examplePhones"
              :key="index"
              @click="phoneInput = example"
              class="btn btn-sm"
            >
              示例 {{ index + 1 }}
            </button>
          </div>
        </div>
        
        <div class="mb-2">
          <strong>URL示例:</strong>
          <div class="d-flex" style="gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
            <button
              v-for="(example, index) in exampleUrls"
              :key="index"
              @click="urlInput = example"
              class="btn btn-sm"
            >
              示例 {{ index + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useValidateUtils } from '../composables/useUtils'

export default {
  name: 'ValidateExamples',
  setup() {
    const { validationResults, validateIdCard, validatePhone, validateURL } = useValidateUtils()
    
    const idCardInput = ref('')
    const phoneInput = ref('')
    const urlInput = ref('')

    // 示例数据
    const exampleIdCards = [
      '11010519491231002X',
      '440524188001010014',
      '110105199001011234'
    ]

    const examplePhones = [
      '13800138000',
      '15912345678',
      '18888888888'
    ]

    const exampleUrls = [
      'https://www.example.com',
      'http://localhost:3000/api/users',
      'https://github.com/user/repo#readme'
    ]

    // 验证方法
    const handleValidateIdCard = () => {
      if (!idCardInput.value.trim()) return
      validateIdCard(idCardInput.value)
    }

    const handleValidatePhone = () => {
      if (!phoneInput.value.trim()) return
      validatePhone(phoneInput.value)
    }

    const handleValidateURL = () => {
      if (!urlInput.value.trim()) return
      validateURL(urlInput.value)
    }

    onMounted(() => {
      console.log('✅ 验证示例组件已挂载')
    })

    return {
      idCardInput,
      phoneInput,
      urlInput,
      validationResults,
      exampleIdCards,
      examplePhones,
      exampleUrls,
      validateIdCard: handleValidateIdCard,
      validatePhone: handleValidatePhone,
      validateURL: handleValidateURL
    }
  }
}
</script>
