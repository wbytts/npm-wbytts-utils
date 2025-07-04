/**
 * API 路由
 * 提供工具包功能的 RESTful API 接口
 */

import express from 'express'
import { sum, average, factorial } from '@wbytts/utils/math'
import { isIdCard, isPhoneNumber, isUrl } from '@wbytts/utils/validate'
import { dayjs } from '@wbytts/utils/time'

const router = express.Router()

// 数学计算 API
router.get('/math/sum', (req, res) => {
  try {
    const { numbers } = req.query
    
    if (!numbers) {
      return res.status(400).json({
        error: '参数错误',
        message: '请提供 numbers 参数，格式: ?numbers=1,2,3,4,5'
      })
    }

    const numberArray = numbers
      .split(',')
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n))

    if (numberArray.length === 0) {
      return res.status(400).json({
        error: '参数错误',
        message: '未找到有效的数字'
      })
    }

    const result = sum(...numberArray)
    
    res.json({
      operation: 'sum',
      input: numberArray,
      result,
      count: numberArray.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '计算错误',
      message: error.message
    })
  }
})

router.get('/math/average', (req, res) => {
  try {
    const { numbers } = req.query
    
    if (!numbers) {
      return res.status(400).json({
        error: '参数错误',
        message: '请提供 numbers 参数'
      })
    }

    const numberArray = numbers
      .split(',')
      .map(n => parseFloat(n.trim()))
      .filter(n => !isNaN(n))

    if (numberArray.length === 0) {
      return res.status(400).json({
        error: '参数错误',
        message: '未找到有效的数字'
      })
    }

    const result = average(...numberArray)
    
    res.json({
      operation: 'average',
      input: numberArray,
      result,
      count: numberArray.length,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '计算错误',
      message: error.message
    })
  }
})

router.get('/math/factorial', (req, res) => {
  try {
    const { number } = req.query
    
    if (!number) {
      return res.status(400).json({
        error: '参数错误',
        message: '请提供 number 参数'
      })
    }

    const n = parseInt(number)
    
    if (isNaN(n) || n < 0) {
      return res.status(400).json({
        error: '参数错误',
        message: '请提供有效的非负整数'
      })
    }

    if (n > 20) {
      return res.status(400).json({
        error: '参数错误',
        message: '数字过大，请提供小于等于20的数字'
      })
    }

    const result = factorial(n)
    
    res.json({
      operation: 'factorial',
      input: n,
      result,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '计算错误',
      message: error.message
    })
  }
})

// 数据验证 API
router.get('/validate/phone', (req, res) => {
  try {
    const { phone } = req.query
    
    if (!phone) {
      return res.status(400).json({
        error: '参数错误',
        message: '请提供 phone 参数'
      })
    }

    const isValid = isPhoneNumber(phone)
    
    res.json({
      operation: 'validate_phone',
      input: phone,
      isValid,
      message: isValid ? '手机号格式正确' : '手机号格式错误',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '验证错误',
      message: error.message
    })
  }
})

router.get('/validate/idcard', (req, res) => {
  try {
    const { idcard } = req.query
    
    if (!idcard) {
      return res.status(400).json({
        error: '参数错误',
        message: '请提供 idcard 参数'
      })
    }

    const isValid = isIdCard(idcard)
    
    res.json({
      operation: 'validate_idcard',
      input: idcard,
      isValid,
      message: isValid ? '身份证格式正确' : '身份证格式错误',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '验证错误',
      message: error.message
    })
  }
})

router.get('/validate/url', (req, res) => {
  try {
    const { url } = req.query
    
    if (!url) {
      return res.status(400).json({
        error: '参数错误',
        message: '请提供 url 参数'
      })
    }

    const isValid = isUrl(url)
    
    res.json({
      operation: 'validate_url',
      input: url,
      isValid,
      message: isValid ? 'URL格式正确' : 'URL格式错误',
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '验证错误',
      message: error.message
    })
  }
})

// 时间处理 API
router.get('/time/format', (req, res) => {
  try {
    const { timestamp, format = 'YYYY-MM-DD HH:mm:ss' } = req.query
    
    let time
    if (timestamp) {
      time = dayjs(parseInt(timestamp) || timestamp)
    } else {
      time = dayjs()
    }

    if (!time.isValid()) {
      return res.status(400).json({
        error: '参数错误',
        message: '无效的时间戳'
      })
    }

    const formatted = time.format(format)
    
    res.json({
      operation: 'time_format',
      input: {
        timestamp: timestamp || 'current',
        format
      },
      result: formatted,
      unix: time.unix(),
      iso: time.toISOString(),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '时间处理错误',
      message: error.message
    })
  }
})

router.get('/time/add', (req, res) => {
  try {
    const { amount, unit = 'day', format = 'YYYY-MM-DD HH:mm:ss' } = req.query
    
    if (!amount) {
      return res.status(400).json({
        error: '参数错误',
        message: '请提供 amount 参数'
      })
    }

    const amountNum = parseInt(amount)
    if (isNaN(amountNum)) {
      return res.status(400).json({
        error: '参数错误',
        message: 'amount 必须是数字'
      })
    }

    const now = dayjs()
    const result = now.add(amountNum, unit)
    
    res.json({
      operation: 'time_add',
      input: {
        amount: amountNum,
        unit
      },
      base: now.format(format),
      result: result.format(format),
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: '时间计算错误',
      message: error.message
    })
  }
})

export default router
