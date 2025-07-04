<template>
  <div class="examples-container">
    <h2>时间处理示例</h2>
    <p>展示时间处理相关的工具函数在Vue.js中的使用</p>

    <!-- 当前时间显示 -->
    <div class="example-section">
      <h3>当前时间</h3>
      <div class="example-content">
        <div class="form-group">
          <button @click="updateTime" class="btn btn-primary">刷新时间</button>
          <button @click="startClock" class="btn btn-success">开始时钟</button>
          <button @click="stopClock" class="btn btn-warning">停止时钟</button>
        </div>
        
        <div class="result success">
          <div class="code-output">
            <strong>当前时间:</strong><br>
            标准格式: {{ formatTime(currentTime, 'YYYY-MM-DD HH:mm:ss') }}<br>
            中文格式: {{ formatTime(currentTime, 'YYYY年MM月DD日 HH:mm:ss') }}<br>
            相对时间: {{ currentTime.fromNow() }}<br>
            Unix时间戳: {{ currentTime.unix() }}
          </div>
        </div>
      </div>
    </div>

    <!-- 时间计算 -->
    <div class="example-section">
      <h3>时间计算</h3>
      <div class="example-content">
        <div class="form-group">
          <label>天数:</label>
          <input
            v-model.number="daysInput"
            type="number"
            placeholder="输入天数"
            class="form-control"
          />
          <button @click="addDays" class="btn btn-primary">加天数</button>
          <button @click="subtractDays" class="btn btn-success">减天数</button>
        </div>
        
        <div v-if="calculationResult" class="result success">
          <div class="code-output">{{ calculationResult }}</div>
        </div>
      </div>
    </div>

    <!-- 时间格式化 -->
    <div class="example-section">
      <h3>自定义格式化</h3>
      <div class="example-content">
        <div class="form-group">
          <label>格式:</label>
          <input
            v-model="customFormat"
            type="text"
            placeholder="输入时间格式 (如: YYYY-MM-DD)"
            class="form-control"
            style="min-width: 250px;"
          />
          <button @click="applyFormat" class="btn btn-primary">应用格式</button>
        </div>
        
        <div v-if="formatResult" class="result success">
          <strong>格式化结果:</strong> {{ formatResult }}
        </div>

        <!-- 常用格式 -->
        <div class="mt-2">
          <strong>常用格式:</strong>
          <div class="d-flex" style="gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
            <button
              v-for="format in commonFormats"
              :key="format"
              @click="customFormat = format"
              class="btn btn-sm"
            >
              {{ format }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { useTimeUtils } from '../composables/useUtils'

export default {
  name: 'TimeExamples',
  setup() {
    const { currentTime, updateCurrentTime, formatTime, calculateTime } = useTimeUtils()
    
    const daysInput = ref(7)
    const calculationResult = ref('')
    const customFormat = ref('YYYY-MM-DD HH:mm:ss')
    const formatResult = ref('')
    const clockInterval = ref(null)

    // 常用格式
    const commonFormats = [
      'YYYY-MM-DD',
      'DD/MM/YYYY',
      'MMM DD, YYYY',
      'HH:mm:ss',
      'h:mm A',
      'YYYY年MM月DD日'
    ]

    // 更新时间
    const updateTime = () => {
      updateCurrentTime()
      console.log('⏰ 时间已更新')
    }

    // 开始时钟
    const startClock = () => {
      if (clockInterval.value) return
      
      clockInterval.value = setInterval(() => {
        updateCurrentTime()
      }, 1000)
      
      console.log('⏰ 时钟已开始')
    }

    // 停止时钟
    const stopClock = () => {
      if (clockInterval.value) {
        clearInterval(clockInterval.value)
        clockInterval.value = null
        console.log('⏰ 时钟已停止')
      }
    }

    // 加天数
    const addDays = () => {
      const days = daysInput.value || 0
      const result = calculateTime(days, 'day')
      
      if (result) {
        calculationResult.value = `加 ${days} 天后: ${formatTime(result, 'YYYY-MM-DD HH:mm:ss dddd')}`
      }
    }

    // 减天数
    const subtractDays = () => {
      const days = -(daysInput.value || 0)
      const result = calculateTime(days, 'day')
      
      if (result) {
        calculationResult.value = `减 ${Math.abs(days)} 天后: ${formatTime(result, 'YYYY-MM-DD HH:mm:ss dddd')}`
      }
    }

    // 应用自定义格式
    const applyFormat = () => {
      if (!customFormat.value.trim()) {
        formatResult.value = '请输入格式'
        return
      }
      
      try {
        const result = formatTime(currentTime.value, customFormat.value)
        formatResult.value = result
      } catch (error) {
        formatResult.value = '格式错误'
        console.error('格式化失败:', error)
      }
    }

    onMounted(() => {
      console.log('⏰ 时间示例组件已挂载')
      updateTime()
    })

    onUnmounted(() => {
      stopClock()
      console.log('⏰ 时间示例组件已卸载')
    })

    return {
      currentTime,
      daysInput,
      calculationResult,
      customFormat,
      formatResult,
      commonFormats,
      updateTime,
      startClock,
      stopClock,
      addDays,
      subtractDays,
      applyFormat,
      formatTime
    }
  }
}
</script>
