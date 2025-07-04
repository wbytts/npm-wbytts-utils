// React Hooks - 封装@wbytts/utils工具包
import { useState, useEffect, useCallback, useRef } from 'react'

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
 * DOM操作相关的Hook
 */
export function useDOMUtils() {
  const [animationState, setAnimationState] = useState({
    isAnimating: false,
    currentValue: 0,
    targetValue: 1000
  })
  const [touchEnabled, setTouchEnabled] = useState(true)
  const animationRef = useRef(null)

  // 数字动画
  const startNumberAnimation = useCallback((options = {}) => {
    const {
      from = 0,
      to = animationState.targetValue,
      duration = 2000,
      onUpdate,
      onComplete
    } = options

    setAnimationState(prev => ({ ...prev, isAnimating: true, currentValue: from }))

    if (animationRef.current) {
      animationRef.current.stop?.()
    }

    animationRef.current = animateNumber({
      from,
      to,
      duration,
      onUpdate: (value) => {
        setAnimationState(prev => ({ ...prev, currentValue: value }))
        onUpdate?.(value)
      },
      onComplete: () => {
        setAnimationState(prev => ({ ...prev, isAnimating: false }))
        onComplete?.()
      }
    })

    return animationRef.current
  }, [animationState.targetValue])

  // 触摸控制
  const toggleTouchMove = useCallback((enable) => {
    try {
      if (enable) {
        enableTouchMove()
        setTouchEnabled(true)
      } else {
        disableTouchMove()
        setTouchEnabled(false)
      }
      return true
    } catch (error) {
      console.error('触摸控制失败:', error)
      return false
    }
  }, [])

  // 图片预览
  const showImagePreview = useCallback((images, currentIndex = 0) => {
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
  }, [])

  // 清理动画
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        animationRef.current.stop?.()
      }
    }
  }, [])

  return {
    animationState,
    touchEnabled,
    startNumberAnimation,
    toggleTouchMove,
    showImagePreview,
    setTargetValue: (value) => setAnimationState(prev => ({ ...prev, targetValue: value }))
  }
}

/**
 * BOM操作相关的Hook
 */
export function useBOMUtils() {
  const [urlParams, setUrlParams] = useState({})
  const [clipboardStatus, setClipboardStatus] = useState('')

  // 解析URL参数
  const parseURL = useCallback((url) => {
    try {
      const params = getURLParameters(url)
      setUrlParams(params)
      return params
    } catch (error) {
      console.error('URL解析失败:', error)
      return {}
    }
  }, [])

  // 复制到剪贴板
  const copyText = useCallback(async (text) => {
    try {
      const success = await copyToClipboard(text)
      setClipboardStatus(success ? '复制成功' : '复制失败')
      
      // 3秒后清除状态
      setTimeout(() => {
        setClipboardStatus('')
      }, 3000)
      
      return success
    } catch (error) {
      console.error('复制失败:', error)
      setClipboardStatus('复制失败')
      setTimeout(() => {
        setClipboardStatus('')
      }, 3000)
      return false
    }
  }, [])

  return {
    urlParams,
    clipboardStatus,
    parseURL,
    copyText
  }
}

/**
 * 数学计算相关的Hook
 */
export function useMathUtils() {
  const [calculationResult, setCalculationResult] = useState(null)
  const [calculationHistory, setCalculationHistory] = useState([])

  // 求和
  const calculateSum = useCallback((...numbers) => {
    try {
      const result = sum(...numbers)
      setCalculationResult(result)
      setCalculationHistory(prev => [...prev, {
        type: 'sum',
        input: numbers,
        result,
        timestamp: new Date()
      }])
      return result
    } catch (error) {
      console.error('求和计算失败:', error)
      return null
    }
  }, [])

  // 平均值
  const calculateAverage = useCallback((...numbers) => {
    try {
      const result = average(...numbers)
      setCalculationResult(result)
      setCalculationHistory(prev => [...prev, {
        type: 'average',
        input: numbers,
        result,
        timestamp: new Date()
      }])
      return result
    } catch (error) {
      console.error('平均值计算失败:', error)
      return null
    }
  }, [])

  // 阶乘
  const calculateFactorial = useCallback((n) => {
    try {
      const result = factorial(n)
      setCalculationResult(result)
      setCalculationHistory(prev => [...prev, {
        type: 'factorial',
        input: [n],
        result,
        timestamp: new Date()
      }])
      return result
    } catch (error) {
      console.error('阶乘计算失败:', error)
      return null
    }
  }, [])

  // 清除历史记录
  const clearHistory = useCallback(() => {
    setCalculationHistory([])
    setCalculationResult(null)
  }, [])

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
 * 数据验证相关的Hook
 */
export function useValidateUtils() {
  const [validationResults, setValidationResults] = useState({
    idCard: null,
    phone: null,
    url: null
  })

  // 身份证验证
  const validateIdCard = useCallback((idCard) => {
    try {
      const isValid = isIdCard(idCard)
      const result = {
        input: idCard,
        isValid,
        message: isValid ? '身份证格式正确' : '身份证格式错误',
        timestamp: new Date()
      }
      setValidationResults(prev => ({ ...prev, idCard: result }))
      return isValid
    } catch (error) {
      console.error('身份证验证失败:', error)
      const result = {
        input: idCard,
        isValid: false,
        message: '验证出错',
        timestamp: new Date()
      }
      setValidationResults(prev => ({ ...prev, idCard: result }))
      return false
    }
  }, [])

  // 手机号验证
  const validatePhone = useCallback((phone) => {
    try {
      const isValid = isPhoneNumber(phone)
      const result = {
        input: phone,
        isValid,
        message: isValid ? '手机号格式正确' : '手机号格式错误',
        timestamp: new Date()
      }
      setValidationResults(prev => ({ ...prev, phone: result }))
      return isValid
    } catch (error) {
      console.error('手机号验证失败:', error)
      const result = {
        input: phone,
        isValid: false,
        message: '验证出错',
        timestamp: new Date()
      }
      setValidationResults(prev => ({ ...prev, phone: result }))
      return false
    }
  }, [])

  // URL验证
  const validateURL = useCallback((url) => {
    try {
      const isValid = isUrl(url)
      const result = {
        input: url,
        isValid,
        message: isValid ? 'URL格式正确' : 'URL格式错误',
        timestamp: new Date()
      }
      setValidationResults(prev => ({ ...prev, url: result }))
      return isValid
    } catch (error) {
      console.error('URL验证失败:', error)
      const result = {
        input: url,
        isValid: false,
        message: '验证出错',
        timestamp: new Date()
      }
      setValidationResults(prev => ({ ...prev, url: result }))
      return false
    }
  }, [])

  return {
    validationResults,
    validateIdCard,
    validatePhone,
    validateURL
  }
}

/**
 * 时间处理相关的Hook
 */
export function useTimeUtils() {
  const [currentTime, setCurrentTime] = useState(() => dayjs())
  const [timeCalculations, setTimeCalculations] = useState([])

  // 更新当前时间
  const updateCurrentTime = useCallback(() => {
    setCurrentTime(dayjs())
  }, [])

  // 格式化时间
  const formatTime = useCallback((time, format = 'YYYY-MM-DD HH:mm:ss') => {
    try {
      const dayjsTime = dayjs(time)
      return dayjsTime.format(format)
    } catch (error) {
      console.error('时间格式化失败:', error)
      return ''
    }
  }, [])

  // 时间计算
  const calculateTime = useCallback((amount, unit = 'day') => {
    try {
      const result = currentTime.add(amount, unit)
      setTimeCalculations(prev => [...prev, {
        base: currentTime.toISOString(),
        amount,
        unit,
        result: result.toISOString(),
        timestamp: new Date()
      }])
      return result
    } catch (error) {
      console.error('时间计算失败:', error)
      return null
    }
  }, [currentTime])

  // 计算时间差
  const timeDiff = useCallback((time1, time2, unit = 'day') => {
    try {
      const t1 = dayjs(time1)
      const t2 = dayjs(time2)
      return t1.diff(t2, unit)
    } catch (error) {
      console.error('时间差计算失败:', error)
      return null
    }
  }, [])

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
 * 通用工具相关的Hook
 */
export function useGeneralUtils() {
  const [deviceInfo, setDeviceInfo] = useState(null)
  const [randomResults, setRandomResults] = useState([])

  // 检测设备类型
  const detectDevice = useCallback(() => {
    try {
      const type = detectDeviceType()
      const info = {
        type,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        timestamp: new Date()
      }
      setDeviceInfo(info)
      return type
    } catch (error) {
      console.error('设备检测失败:', error)
      return 'unknown'
    }
  }, [])

  // 字符串处理
  const processString = useCallback((str, type = 'reverse') => {
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
  }, [])

  // 生成随机数
  const generateRandom = useCallback((type = 'number', ...args) => {
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
      
      setRandomResults(prev => [...prev, {
        type,
        args,
        result,
        timestamp: new Date()
      }])
      
      return result
    } catch (error) {
      console.error('随机生成失败:', error)
      return null
    }
  }, [])

  return {
    deviceInfo,
    randomResults,
    detectDevice,
    processString,
    generateRandom
  }
}
