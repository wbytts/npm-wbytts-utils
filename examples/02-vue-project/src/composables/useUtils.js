// Vue组合式函数 - 封装@wbytts/utils工具包
import { ref, reactive, computed } from 'vue'

// DOM工具
import { animateNumber, disableTouchMove, enableTouchMove, previewImage } from '@wbytts/utils/dom'

// BOM工具
import { getURLParameters, copyToClipboard } from '@wbytts/utils/bom'

// 数学工具
import { sum, average, factorial } from '@wbytts/utils/math'

// 验证工具
import { isIdCard, isPhoneNumber, isUrl } from '@wbytts/utils/validate'

// 时间工具
import { dayjs } from '@wbytts/utils/time'

// 通用工具
import { 
  reverseString, 
  mask, 
  detectDeviceType, 
  randomHexColorCode, 
  randomIntegerInRange 
} from '@wbytts/utils'

/**
 * DOM操作相关的组合式函数
 */
export function useDOMUtils() {
  const animationState = reactive({
    isAnimating: false,
    currentValue: 0,
    targetValue: 1000
  })

  const touchState = ref(true) // true表示启用，false表示禁用

  // 数字动画
  const startNumberAnimation = (options = {}) => {
    const {
      from = 0,
      to = animationState.targetValue,
      duration = 2000,
      onUpdate,
      onComplete
    } = options

    animationState.isAnimating = true
    animationState.currentValue = from

    return animateNumber({
      from,
      to,
      duration,
      onUpdate: (value) => {
        animationState.currentValue = value
        onUpdate?.(value)
      },
      onComplete: () => {
        animationState.isAnimating = false
        onComplete?.()
      }
    })
  }

  // 触摸控制
  const toggleTouchMove = (enable) => {
    try {
      if (enable) {
        enableTouchMove()
        touchState.value = true
      } else {
        disableTouchMove()
        touchState.value = false
      }
      return true
    } catch (error) {
      console.error('触摸控制失败:', error)
      return false
    }
  }

  // 图片预览
  const showImagePreview = (images, currentIndex = 0) => {
    try {
      const urls = Array.isArray(images) ? images : [images]
      return previewImage({
        urls,
        current: currentIndex,
        onClose: () => console.log('图片预览关闭'),
        onSwitch: (index) => console.log('切换到图片:', index)
      })
    } catch (error) {
      console.error('图片预览失败:', error)
      return false
    }
  }

  return {
    // 状态
    animationState,
    touchState,
    
    // 方法
    startNumberAnimation,
    toggleTouchMove,
    showImagePreview
  }
}

/**
 * BOM操作相关的组合式函数
 */
export function useBOMUtils() {
  const urlParams = ref({})
  const clipboardStatus = ref('')

  // 解析URL参数
  const parseURL = (url) => {
    try {
      const params = getURLParameters(url)
      urlParams.value = params
      return params
    } catch (error) {
      console.error('URL解析失败:', error)
      return {}
    }
  }

  // 复制到剪贴板
  const copyText = async (text) => {
    try {
      const success = await copyToClipboard(text)
      clipboardStatus.value = success ? '复制成功' : '复制失败'
      
      // 3秒后清除状态
      setTimeout(() => {
        clipboardStatus.value = ''
      }, 3000)
      
      return success
    } catch (error) {
      console.error('复制失败:', error)
      clipboardStatus.value = '复制失败'
      setTimeout(() => {
        clipboardStatus.value = ''
      }, 3000)
      return false
    }
  }

  return {
    urlParams,
    clipboardStatus,
    parseURL,
    copyText
  }
}

/**
 * 数学计算相关的组合式函数
 */
export function useMathUtils() {
  const calculationResult = ref(null)
  const calculationHistory = ref([])

  // 求和
  const calculateSum = (...numbers) => {
    try {
      const result = sum(...numbers)
      calculationResult.value = result
      calculationHistory.value.push({
        type: 'sum',
        input: numbers,
        result,
        timestamp: new Date()
      })
      return result
    } catch (error) {
      console.error('求和计算失败:', error)
      return null
    }
  }

  // 平均值
  const calculateAverage = (...numbers) => {
    try {
      const result = average(...numbers)
      calculationResult.value = result
      calculationHistory.value.push({
        type: 'average',
        input: numbers,
        result,
        timestamp: new Date()
      })
      return result
    } catch (error) {
      console.error('平均值计算失败:', error)
      return null
    }
  }

  // 阶乘
  const calculateFactorial = (n) => {
    try {
      const result = factorial(n)
      calculationResult.value = result
      calculationHistory.value.push({
        type: 'factorial',
        input: [n],
        result,
        timestamp: new Date()
      })
      return result
    } catch (error) {
      console.error('阶乘计算失败:', error)
      return null
    }
  }

  // 清除历史记录
  const clearHistory = () => {
    calculationHistory.value = []
    calculationResult.value = null
  }

  return {
    calculationResult,
    calculationHistory,
    calculateSum,
    calculateAverage,
    calculateFactorial,
    clearHistory
  }
}

/**
 * 数据验证相关的组合式函数
 */
export function useValidateUtils() {
  const validationResults = reactive({
    idCard: null,
    phone: null,
    url: null
  })

  // 身份证验证
  const validateIdCard = (idCard) => {
    try {
      const isValid = isIdCard(idCard)
      validationResults.idCard = {
        input: idCard,
        isValid,
        message: isValid ? '身份证格式正确' : '身份证格式错误',
        timestamp: new Date()
      }
      return isValid
    } catch (error) {
      console.error('身份证验证失败:', error)
      validationResults.idCard = {
        input: idCard,
        isValid: false,
        message: '验证出错',
        timestamp: new Date()
      }
      return false
    }
  }

  // 手机号验证
  const validatePhone = (phone) => {
    try {
      const isValid = isPhoneNumber(phone)
      validationResults.phone = {
        input: phone,
        isValid,
        message: isValid ? '手机号格式正确' : '手机号格式错误',
        timestamp: new Date()
      }
      return isValid
    } catch (error) {
      console.error('手机号验证失败:', error)
      validationResults.phone = {
        input: phone,
        isValid: false,
        message: '验证出错',
        timestamp: new Date()
      }
      return false
    }
  }

  // URL验证
  const validateURL = (url) => {
    try {
      const isValid = isUrl(url)
      validationResults.url = {
        input: url,
        isValid,
        message: isValid ? 'URL格式正确' : 'URL格式错误',
        timestamp: new Date()
      }
      return isValid
    } catch (error) {
      console.error('URL验证失败:', error)
      validationResults.url = {
        input: url,
        isValid: false,
        message: '验证出错',
        timestamp: new Date()
      }
      return false
    }
  }

  return {
    validationResults,
    validateIdCard,
    validatePhone,
    validateURL
  }
}

/**
 * 时间处理相关的组合式函数
 */
export function useTimeUtils() {
  const currentTime = ref(dayjs())
  const timeCalculations = ref([])

  // 更新当前时间
  const updateCurrentTime = () => {
    currentTime.value = dayjs()
  }

  // 格式化时间
  const formatTime = (time, format = 'YYYY-MM-DD HH:mm:ss') => {
    try {
      const dayjsTime = dayjs(time)
      return dayjsTime.format(format)
    } catch (error) {
      console.error('时间格式化失败:', error)
      return ''
    }
  }

  // 时间计算
  const calculateTime = (amount, unit = 'day') => {
    try {
      const result = currentTime.value.add(amount, unit)
      timeCalculations.value.push({
        base: currentTime.value.toISOString(),
        amount,
        unit,
        result: result.toISOString(),
        timestamp: new Date()
      })
      return result
    } catch (error) {
      console.error('时间计算失败:', error)
      return null
    }
  }

  // 计算时间差
  const timeDiff = (time1, time2, unit = 'day') => {
    try {
      const t1 = dayjs(time1)
      const t2 = dayjs(time2)
      return t1.diff(t2, unit)
    } catch (error) {
      console.error('时间差计算失败:', error)
      return null
    }
  }

  return {
    currentTime,
    timeCalculations,
    updateCurrentTime,
    formatTime,
    calculateTime,
    timeDiff
  }
}

/**
 * 通用工具相关的组合式函数
 */
export function useGeneralUtils() {
  const deviceInfo = ref(null)
  const randomResults = ref([])

  // 检测设备类型
  const detectDevice = () => {
    try {
      const type = detectDeviceType()
      deviceInfo.value = {
        type,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        timestamp: new Date()
      }
      return type
    } catch (error) {
      console.error('设备检测失败:', error)
      return 'unknown'
    }
  }

  // 字符串处理
  const processString = (str, type = 'reverse') => {
    try {
      switch (type) {
        case 'reverse':
          return reverseString(str)
        case 'mask':
          return mask(str, 2, -2, '*')
        default:
          return str
      }
    } catch (error) {
      console.error('字符串处理失败:', error)
      return str
    }
  }

  // 生成随机数
  const generateRandom = (type = 'number', ...args) => {
    try {
      let result
      switch (type) {
        case 'number':
          result = randomIntegerInRange(...args)
          break
        case 'color':
          result = randomHexColorCode()
          break
        default:
          result = Math.random()
      }
      
      randomResults.value.push({
        type,
        args,
        result,
        timestamp: new Date()
      })
      
      return result
    } catch (error) {
      console.error('随机生成失败:', error)
      return null
    }
  }

  return {
    deviceInfo,
    randomResults,
    detectDevice,
    processString,
    generateRandom
  }
}
