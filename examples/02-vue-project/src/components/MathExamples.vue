<template>
  <div class="examples-container">
    <h2>数学计算示例</h2>
    <p>展示数学计算相关的工具函数在Vue.js中的使用</p>

    <!-- 基础数学运算 -->
    <div class="example-section">
      <h3>基础数学运算</h3>
      <div class="example-content">
        <div class="form-group">
          <label>数字列表:</label>
          <input
            v-model="numbersInput"
            type="text"
            placeholder="输入数字，用逗号分隔 (如: 1,2,3,4,5)"
            class="form-control"
            style="min-width: 300px;"
          />
          <button @click="calculateSum" class="btn btn-primary">求和</button>
          <button @click="calculateAverage" class="btn btn-success">平均值</button>
        </div>
        
        <div v-if="mathResult" class="result success">
          <div class="code-output">{{ mathResult }}</div>
        </div>
      </div>
    </div>

    <!-- 阶乘计算 -->
    <div class="example-section">
      <h3>阶乘计算</h3>
      <div class="example-content">
        <div class="form-group">
          <label>数字:</label>
          <input
            v-model.number="factorialInput"
            type="number"
            min="0"
            max="20"
            placeholder="输入0-20之间的数字"
            class="form-control"
          />
          <button
            @click="calculateFactorial"
            :disabled="factorialInput < 0 || factorialInput > 20"
            class="btn btn-primary"
          >
            计算阶乘
          </button>
        </div>
        
        <div v-if="factorialResult" class="result success">
          <div class="code-output">{{ factorialResult }}</div>
        </div>
      </div>
    </div>

    <!-- 计算历史 -->
    <div v-if="calculationHistory.length > 0" class="example-section">
      <h3>计算历史</h3>
      <div class="example-content">
        <button @click="clearHistory" class="btn btn-warning mb-2">清除历史</button>
        <div class="result info">
          <div v-for="(record, index) in calculationHistory.slice(-5)" :key="index" class="mb-1">
            <strong>{{ record.type }}:</strong> 
            {{ record.input.join(', ') }} = {{ record.result }}
            <small>({{ formatTime(record.timestamp) }})</small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useMathUtils } from '../composables/useUtils'

export default {
  name: 'MathExamples',
  setup() {
    const { calculationResult, calculationHistory, calculateSum, calculateAverage, calculateFactorial, clearHistory } = useMathUtils()
    
    const numbersInput = ref('1,2,3,4,5')
    const factorialInput = ref(5)
    const mathResult = ref('')
    const factorialResult = ref('')

    // 解析数字数组
    const parseNumbers = (input) => {
      return input
        .split(',')
        .map(n => n.trim())
        .filter(n => n !== '')
        .map(n => parseFloat(n))
        .filter(n => !isNaN(n))
    }

    // 求和
    const handleSum = () => {
      const numbers = parseNumbers(numbersInput.value)
      if (numbers.length === 0) {
        mathResult.value = '请输入有效的数字列表'
        return
      }
      
      const result = calculateSum(...numbers)
      mathResult.value = `求和: [${numbers.join(', ')}] = ${result}`
    }

    // 平均值
    const handleAverage = () => {
      const numbers = parseNumbers(numbersInput.value)
      if (numbers.length === 0) {
        mathResult.value = '请输入有效的数字列表'
        return
      }
      
      const result = calculateAverage(...numbers)
      mathResult.value = `平均值: [${numbers.join(', ')}] = ${result}`
    }

    // 阶乘
    const handleFactorial = () => {
      if (factorialInput.value < 0 || factorialInput.value > 20) {
        factorialResult.value = '请输入0-20之间的数字'
        return
      }
      
      const result = calculateFactorial(factorialInput.value)
      factorialResult.value = `${factorialInput.value}! = ${result}`
    }

    // 格式化时间
    const formatTime = (date) => {
      return new Date(date).toLocaleTimeString()
    }

    return {
      numbersInput,
      factorialInput,
      mathResult,
      factorialResult,
      calculationHistory,
      calculateSum: handleSum,
      calculateAverage: handleAverage,
      calculateFactorial: handleFactorial,
      clearHistory,
      formatTime
    }
  }
}
</script>
