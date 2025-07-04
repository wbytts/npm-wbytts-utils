/**
 * 数据验证示例
 * 展示验证工具在Node.js中的使用
 */

import { isIdCard, isPhoneNumber, isUrl } from '@wbytts/utils/validate'

export async function runValidateExamples() {
  console.log('✅ 数据验证示例')
  console.log('-'.repeat(30))

  try {
    // 身份证验证示例
    console.log('🆔 身份证验证:')
    const idCards = [
      '11010519491231002X',  // 有效
      '440524188001010014',  // 有效
      '110105199001011234',  // 有效
      '123456789012345678',  // 无效
      '11010519491231002',   // 无效（缺少校验位）
      '',                    // 无效（空字符串）
      null                   // 无效（null）
    ]

    idCards.forEach(idCard => {
      try {
        const isValid = isIdCard(idCard)
        const status = isValid ? '✅ 有效' : '❌ 无效'
        console.log(`  ${status}: "${idCard}"`)
      } catch (error) {
        console.log(`  ❌ 验证出错: "${idCard}" - ${error.message}`)
      }
    })

    // 手机号验证示例
    console.log('\n📱 手机号验证:')
    const phoneNumbers = [
      '13800138000',    // 有效
      '15912345678',    // 有效
      '18888888888',    // 有效
      '19999999999',    // 有效
      '12345678901',    // 无效（不是有效的手机号段）
      '1380013800',     // 无效（位数不够）
      '138001380000',   // 无效（位数过多）
      'abc12345678',    // 无效（包含字母）
      '',               // 无效（空字符串）
      null              // 无效（null）
    ]

    phoneNumbers.forEach(phone => {
      try {
        const isValid = isPhoneNumber(phone)
        const status = isValid ? '✅ 有效' : '❌ 无效'
        console.log(`  ${status}: "${phone}"`)
      } catch (error) {
        console.log(`  ❌ 验证出错: "${phone}" - ${error.message}`)
      }
    })

    // URL验证示例
    console.log('\n🌐 URL验证:')
    const urls = [
      'https://www.example.com',                    // 有效
      'http://localhost:3000',                      // 有效
      'https://github.com/user/repo#readme',       // 有效
      'ftp://files.example.com/file.txt',          // 有效
      'mailto:user@example.com',                   // 有效
      'www.example.com',                           // 无效（缺少协议）
      'https://',                                  // 无效（不完整）
      'not-a-url',                                 // 无效
      '',                                          // 无效（空字符串）
      null                                         // 无效（null）
    ]

    urls.forEach(url => {
      try {
        const isValid = isUrl(url)
        const status = isValid ? '✅ 有效' : '❌ 无效'
        console.log(`  ${status}: "${url}"`)
      } catch (error) {
        console.log(`  ❌ 验证出错: "${url}" - ${error.message}`)
      }
    })

    // 批量验证性能测试
    console.log('\n🚀 批量验证性能测试:')
    
    // 生成测试数据
    const testPhones = Array.from({ length: 10000 }, (_, i) => 
      `138${String(i).padStart(8, '0')}`
    )

    console.time('批量手机号验证')
    let validCount = 0
    testPhones.forEach(phone => {
      if (isPhoneNumber(phone)) {
        validCount++
      }
    })
    console.timeEnd('批量手机号验证')
    console.log(`✅ 验证了 ${testPhones.length} 个手机号，其中 ${validCount} 个有效`)

    // 实际应用场景示例
    console.log('\n💼 实际应用场景:')
    
    // 用户注册数据验证
    const userData = {
      idCard: '11010519491231002X',
      phone: '13800138000',
      website: 'https://www.example.com'
    }

    const validationResults = {
      idCard: isIdCard(userData.idCard),
      phone: isPhoneNumber(userData.phone),
      website: isUrl(userData.website)
    }

    console.log('用户数据验证结果:')
    Object.entries(validationResults).forEach(([field, isValid]) => {
      const status = isValid ? '✅ 有效' : '❌ 无效'
      console.log(`  ${field}: ${status}`)
    })

    const allValid = Object.values(validationResults).every(Boolean)
    console.log(`\n用户数据整体验证: ${allValid ? '✅ 通过' : '❌ 失败'}`)

  } catch (error) {
    console.error('❌ 数据验证示例出错:', error.message)
    throw error
  }
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  runValidateExamples().catch(console.error)
}
