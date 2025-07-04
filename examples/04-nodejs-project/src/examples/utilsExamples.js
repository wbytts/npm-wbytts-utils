/**
 * 通用工具示例
 * 展示通用工具在Node.js中的使用
 */

import { 
  reverseString, 
  mask, 
  detectDeviceType, 
  randomHexColorCode, 
  randomIntegerInRange 
} from '@wbytts/utils'

export async function runUtilsExamples() {
  console.log('🔧 通用工具示例')
  console.log('-'.repeat(30))

  try {
    // 字符串处理
    console.log('📝 字符串处理:')
    const testStrings = [
      'Hello World',
      '这是一个测试字符串',
      '13800138000',
      'user@example.com'
    ]

    testStrings.forEach(str => {
      const reversed = reverseString(str)
      const masked = mask(str, 2, -2, '*')
      console.log(`  原字符串: "${str}"`)
      console.log(`  反转结果: "${reversed}"`)
      console.log(`  掩码结果: "${masked}"`)
      console.log()
    })

    // 设备检测（在Node.js环境中）
    console.log('📱 设备检测:')
    try {
      const deviceType = detectDeviceType()
      console.log(`  设备类型: ${deviceType}`)
      console.log(`  平台信息: ${process.platform}`)
      console.log(`  架构信息: ${process.arch}`)
      console.log(`  Node.js版本: ${process.version}`)
    } catch (error) {
      console.log(`  ❌ 设备检测失败: ${error.message}`)
    }

    // 随机生成
    console.log('\n🎲 随机生成:')
    
    // 随机颜色
    console.log('  随机颜色:')
    for (let i = 0; i < 5; i++) {
      const color = randomHexColorCode()
      console.log(`    颜色 ${i + 1}: ${color}`)
    }

    // 随机数字
    console.log('\n  随机数字:')
    const ranges = [
      { min: 1, max: 10 },
      { min: 1, max: 100 },
      { min: 0, max: 255 },
      { min: -50, max: 50 }
    ]

    ranges.forEach(({ min, max }) => {
      const numbers = Array.from({ length: 5 }, () => randomIntegerInRange(min, max))
      console.log(`    范围 [${min}, ${max}]: [${numbers.join(', ')}]`)
    })

    // 批量处理性能测试
    console.log('\n🚀 批量处理性能测试:')
    
    // 字符串反转性能
    console.time('批量字符串反转')
    const testData = Array.from({ length: 10000 }, (_, i) => `测试字符串${i}`)
    const reversedData = testData.map(str => reverseString(str))
    console.timeEnd('批量字符串反转')
    console.log(`  处理了 ${testData.length} 个字符串`)

    // 随机数生成性能
    console.time('批量随机数生成')
    const randomNumbers = Array.from({ length: 10000 }, () => randomIntegerInRange(1, 1000))
    console.timeEnd('批量随机数生成')
    console.log(`  生成了 ${randomNumbers.length} 个随机数`)

    // 实际应用场景
    console.log('\n💼 实际应用场景:')
    
    // 用户数据脱敏
    const userData = {
      name: '张三',
      phone: '13800138000',
      email: 'zhangsan@example.com',
      idCard: '11010519491231002X'
    }

    const maskedUserData = {
      name: mask(userData.name, 1, -1, '*'),
      phone: mask(userData.phone, 3, -4, '*'),
      email: mask(userData.email, 2, userData.email.indexOf('@'), '*'),
      idCard: mask(userData.idCard, 6, -4, '*')
    }

    console.log('  原始用户数据:', userData)
    console.log('  脱敏用户数据:', maskedUserData)

    // 生成随机测试数据
    console.log('\n  生成随机测试数据:')
    const testUsers = Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      name: `用户${i + 1}`,
      score: randomIntegerInRange(60, 100),
      color: randomHexColorCode(),
      level: randomIntegerInRange(1, 10)
    }))

    testUsers.forEach(user => {
      console.log(`    用户${user.id}: 分数=${user.score}, 等级=${user.level}, 颜色=${user.color}`)
    })

    // 文本处理工具链
    console.log('\n  文本处理工具链:')
    const originalText = '这是一个需要处理的敏感信息: 13800138000'
    const processedText = mask(reverseString(originalText), 5, -5, '*')
    console.log(`    原始文本: "${originalText}"`)
    console.log(`    处理结果: "${processedText}"`)

  } catch (error) {
    console.error('❌ 通用工具示例出错:', error.message)
    throw error
  }
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  runUtilsExamples().catch(console.error)
}
