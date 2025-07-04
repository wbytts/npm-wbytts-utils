<template>
  <div class="examples-container">
    <h2>通用工具示例</h2>
    <p>展示通用工具函数在Vue.js中的使用</p>

    <!-- 设备检测 -->
    <div class="example-section">
      <h3>设备检测</h3>
      <div class="example-content">
        <div class="form-group">
          <button @click="detectDevice" class="btn btn-primary">检测设备</button>
        </div>
        
        <div v-if="deviceInfo" class="result success">
          <div class="code-output">
            <strong>设备信息:</strong><br>
            设备类型: {{ deviceInfo.type }}<br>
            平台: {{ deviceInfo.platform }}<br>
            用户代理: {{ deviceInfo.userAgent.substring(0, 100) }}...
          </div>
        </div>
      </div>
    </div>

    <!-- 字符串处理 -->
    <div class="example-section">
      <h3>字符串处理</h3>
      <div class="example-content">
        <div class="form-group">
          <label>输入文本:</label>
          <input
            v-model="stringInput"
            type="text"
            placeholder="输入要处理的文本"
            class="form-control"
            style="min-width: 300px;"
          />
          <button @click="reverseString" class="btn btn-primary">反转</button>
          <button @click="maskString" class="btn btn-success">掩码</button>
        </div>
        
        <div v-if="stringResult" class="result success">
          <div class="code-output">{{ stringResult }}</div>
        </div>
      </div>
    </div>

    <!-- 随机生成 -->
    <div class="example-section">
      <h3>随机生成</h3>
      <div class="example-content">
        <div class="form-group">
          <label>数字范围:</label>
          <input
            v-model="randomRange"
            type="text"
            placeholder="输入范围 (如: 1-100)"
            class="form-control"
          />
          <button @click="generateRandomNumber" class="btn btn-primary">生成随机数</button>
          <button @click="generateRandomColor" class="btn btn-success">生成随机颜色</button>
        </div>
        
        <div v-if="randomResults.length > 0" class="result success">
          <div class="code-output">
            <strong>最近生成的结果:</strong><br>
            <div v-for="(result, index) in randomResults.slice(-5)" :key="index">
              {{ result.type }}: {{ result.result }}
              <span v-if="result.type === 'color'" 
                    :style="{ backgroundColor: result.result, display: 'inline-block', width: '20px', height: '20px', marginLeft: '8px', border: '1px solid #ccc' }">
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 示例数据 -->
    <div class="example-section">
      <h3>示例数据</h3>
      <div class="example-content">
        <div class="mb-2">
          <strong>字符串示例:</strong>
          <div class="d-flex" style="gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
            <button
              v-for="(example, index) in exampleStrings"
              :key="index"
              @click="stringInput = example"
              class="btn btn-sm"
            >
              示例 {{ index + 1 }}
            </button>
          </div>
        </div>
        
        <div class="mb-2">
          <strong>数字范围示例:</strong>
          <div class="d-flex" style="gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
            <button
              v-for="range in exampleRanges"
              :key="range"
              @click="randomRange = range"
              class="btn btn-sm"
            >
              {{ range }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useGeneralUtils } from '../composables/useUtils'

export default {
  name: 'UtilsExamples',
  setup() {
    const { deviceInfo, randomResults, detectDevice, processString, generateRandom } = useGeneralUtils()
    
    const stringInput = ref('Hello World')
    const stringResult = ref('')
    const randomRange = ref('1-100')

    // 示例数据
    const exampleStrings = [
      'Hello World',
      '这是一个测试文本',
      '13800138000',
      'user@example.com'
    ]

    const exampleRanges = [
      '1-10',
      '1-100',
      '0-255',
      '1000-9999'
    ]

    // 检测设备
    const handleDetectDevice = () => {
      detectDevice()
      console.log('🔧 设备检测完成')
    }

    // 反转字符串
    const reverseString = () => {
      if (!stringInput.value.trim()) {
        stringResult.value = '请输入文本'
        return
      }
      
      const result = processString(stringInput.value, 'reverse')
      stringResult.value = `反转结果: "${result}"`
    }

    // 掩码字符串
    const maskString = () => {
      if (!stringInput.value.trim()) {
        stringResult.value = '请输入文本'
        return
      }
      
      const result = processString(stringInput.value, 'mask')
      stringResult.value = `掩码结果: "${result}"`
    }

    // 生成随机数
    const generateRandomNumber = () => {
      if (!randomRange.value.includes('-')) {
        return
      }
      
      const [min, max] = randomRange.value.split('-').map(n => parseInt(n.trim()))
      if (isNaN(min) || isNaN(max) || min >= max) {
        return
      }
      
      generateRandom('number', min, max)
    }

    // 生成随机颜色
    const generateRandomColor = () => {
      generateRandom('color')
    }

    onMounted(() => {
      console.log('🔧 通用工具示例组件已挂载')
    })

    return {
      deviceInfo,
      stringInput,
      stringResult,
      randomRange,
      randomResults,
      exampleStrings,
      exampleRanges,
      detectDevice: handleDetectDevice,
      reverseString,
      maskString,
      generateRandomNumber,
      generateRandomColor
    }
  }
}
</script>
