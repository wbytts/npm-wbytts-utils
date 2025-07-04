/**
 * 工具路由
 * 提供通用工具功能的 API 接口
 */

import express from 'express'
import { 
  reverseString, 
  mask, 
  detectDeviceType, 
  randomHexColorCode, 
  randomIntegerInRange 
} from '@wbytts/utils'

const router = express.Router()

// 随机生成 API
router.get('/random', (req, res) => {
  try {
    const { type = 'number', min = 1, max = 100 } = req.query
    
    let result
    let operation
    
    switch (type.toLowerCase()) {
      case 'number':
        const minNum = parseInt(min)
        const maxNum = parseInt(max)
        
        if (isNaN(minNum) || isNaN(maxNum)) {
          return res.status(400).json({
            error: '参数错误',
            message: 'min 和 max 必须是数字'
          })
        }
        
        if (minNum >= maxNum) {
          return res.status(400).json({
            error: '参数错误',
            message: 'min 必须小于 max'
          })
        }
        
        result = randomIntegerInRange(minNum, maxNum)
        operation = 'random_number'
        break
        
      case 'color':
        result = randomHexColorCode()
        operation = 'random_color'
        break
        
      default:
        return res.status(400).json({
          error: '参数错误',
          message: 'type 必须是 number 或 color'
        })
    }
    
    res.json({
      operation,
      type,
      result,
      ...(type === 'number' && { range: { min: parseInt(min), max: parseInt(max) } }),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '生成错误',
      message: error.message
    })
  }
})

// 字符串处理 API
router.post('/string/process', (req, res) => {
  try {
    const { text, action } = req.body
    
    if (!text) {
      return res.status(400).json({
        error: '参数错误',
        message: '请提供 text 参数'
      })
    }
    
    if (!action) {
      return res.status(400).json({
        error: '参数错误',
        message: '请提供 action 参数 (reverse 或 mask)'
      })
    }
    
    let result
    let operation
    
    switch (action.toLowerCase()) {
      case 'reverse':
        result = reverseString(text)
        operation = 'string_reverse'
        break
        
      case 'mask':
        const { start = 2, end = -2, char = '*' } = req.body
        result = mask(text, start, end, char)
        operation = 'string_mask'
        break
        
      default:
        return res.status(400).json({
          error: '参数错误',
          message: 'action 必须是 reverse 或 mask'
        })
    }
    
    res.json({
      operation,
      input: text,
      result,
      action,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '处理错误',
      message: error.message
    })
  }
})

router.get('/string/reverse', (req, res) => {
  try {
    const { text } = req.query
    
    if (!text) {
      return res.status(400).json({
        error: '参数错误',
        message: '请提供 text 参数'
      })
    }
    
    const result = reverseString(text)
    
    res.json({
      operation: 'string_reverse',
      input: text,
      result,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '处理错误',
      message: error.message
    })
  }
})

router.get('/string/mask', (req, res) => {
  try {
    const { text, start = 2, end = -2, char = '*' } = req.query
    
    if (!text) {
      return res.status(400).json({
        error: '参数错误',
        message: '请提供 text 参数'
      })
    }
    
    const startNum = parseInt(start)
    const endNum = parseInt(end)
    
    if (isNaN(startNum) || isNaN(endNum)) {
      return res.status(400).json({
        error: '参数错误',
        message: 'start 和 end 必须是数字'
      })
    }
    
    const result = mask(text, startNum, endNum, char)
    
    res.json({
      operation: 'string_mask',
      input: text,
      result,
      parameters: {
        start: startNum,
        end: endNum,
        char
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '处理错误',
      message: error.message
    })
  }
})

// 设备检测 API
router.get('/device', (req, res) => {
  try {
    const deviceType = detectDeviceType()
    const userAgent = req.get('User-Agent') || 'Unknown'
    
    res.json({
      operation: 'device_detect',
      result: {
        type: deviceType,
        userAgent,
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version
      },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '检测错误',
      message: error.message
    })
  }
})

// 批量处理 API
router.post('/batch/random', (req, res) => {
  try {
    const { count = 10, type = 'number', min = 1, max = 100 } = req.body
    
    const countNum = parseInt(count)
    if (isNaN(countNum) || countNum <= 0 || countNum > 1000) {
      return res.status(400).json({
        error: '参数错误',
        message: 'count 必须是 1-1000 之间的数字'
      })
    }
    
    let results = []
    
    switch (type.toLowerCase()) {
      case 'number':
        const minNum = parseInt(min)
        const maxNum = parseInt(max)
        
        if (isNaN(minNum) || isNaN(maxNum) || minNum >= maxNum) {
          return res.status(400).json({
            error: '参数错误',
            message: 'min 和 max 必须是有效数字且 min < max'
          })
        }
        
        results = Array.from({ length: countNum }, () => 
          randomIntegerInRange(minNum, maxNum)
        )
        break
        
      case 'color':
        results = Array.from({ length: countNum }, () => 
          randomHexColorCode()
        )
        break
        
      default:
        return res.status(400).json({
          error: '参数错误',
          message: 'type 必须是 number 或 color'
        })
    }
    
    res.json({
      operation: 'batch_random',
      type,
      count: countNum,
      results,
      ...(type === 'number' && { range: { min: parseInt(min), max: parseInt(max) } }),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '批量生成错误',
      message: error.message
    })
  }
})

export default router
