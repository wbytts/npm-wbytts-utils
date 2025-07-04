/**
 * 时间处理示例
 * 展示时间工具在Node.js中的使用
 */

import { dayjs } from '@wbytts/utils/time'

export async function runTimeExamples() {
  console.log('⏰ 时间处理示例')
  console.log('-'.repeat(30))

  try {
    // 当前时间
    const now = dayjs()
    console.log('📅 当前时间信息:')
    console.log(`  当前时间: ${now.format('YYYY-MM-DD HH:mm:ss')}`)
    console.log(`  Unix时间戳: ${now.unix()}`)
    console.log(`  毫秒时间戳: ${now.valueOf()}`)
    console.log(`  ISO字符串: ${now.toISOString()}`)
    console.log(`  相对时间: ${now.fromNow()}`)

    // 时间格式化
    console.log('\n🎨 时间格式化:')
    const formats = [
      'YYYY-MM-DD',
      'YYYY年MM月DD日',
      'MM/DD/YYYY',
      'HH:mm:ss',
      'YYYY-MM-DD HH:mm:ss',
      'dddd, MMMM Do YYYY',
      'MMM DD, YYYY'
    ]

    formats.forEach(format => {
      try {
        const formatted = now.format(format)
        console.log(`  ${format.padEnd(25)} => ${formatted}`)
      } catch (error) {
        console.log(`  ${format.padEnd(25)} => ❌ 格式错误`)
      }
    })

    // 时间计算
    console.log('\n🧮 时间计算:')
    const calculations = [
      { amount: 7, unit: 'day', desc: '7天后' },
      { amount: -7, unit: 'day', desc: '7天前' },
      { amount: 3, unit: 'month', desc: '3个月后' },
      { amount: -1, unit: 'year', desc: '1年前' },
      { amount: 2, unit: 'hour', desc: '2小时后' },
      { amount: -30, unit: 'minute', desc: '30分钟前' }
    ]

    calculations.forEach(({ amount, unit, desc }) => {
      const result = now.add(amount, unit)
      console.log(`  ${desc.padEnd(10)}: ${result.format('YYYY-MM-DD HH:mm:ss')}`)
    })

    // 时间差计算
    console.log('\n📏 时间差计算:')
    const pastDate = dayjs('2023-01-01')
    const futureDate = dayjs('2025-12-31')

    console.log(`  过去日期: ${pastDate.format('YYYY-MM-DD')}`)
    console.log(`  未来日期: ${futureDate.format('YYYY-MM-DD')}`)
    console.log(`  距离过去: ${now.diff(pastDate, 'day')} 天`)
    console.log(`  距离未来: ${futureDate.diff(now, 'day')} 天`)
    console.log(`  距离过去: ${now.diff(pastDate, 'month')} 个月`)
    console.log(`  距离未来: ${futureDate.diff(now, 'month')} 个月`)

    // 时间解析
    console.log('\n🔍 时间解析:')
    const timeStrings = [
      '2023-12-25',
      '2023/12/25 15:30:00',
      '2023-12-25T15:30:00Z',
      '1703520600000',  // 时间戳
      'December 25, 2023',
      '2023-12-25 15:30:00'
    ]

    timeStrings.forEach(timeStr => {
      try {
        const parsed = dayjs(timeStr)
        if (parsed.isValid()) {
          console.log(`  "${timeStr}" => ${parsed.format('YYYY-MM-DD HH:mm:ss')}`)
        } else {
          console.log(`  "${timeStr}" => ❌ 无效时间`)
        }
      } catch (error) {
        console.log(`  "${timeStr}" => ❌ 解析错误`)
      }
    })

    // 时间比较
    console.log('\n⚖️ 时间比较:')
    const date1 = dayjs('2023-06-15')
    const date2 = dayjs('2023-06-20')
    const date3 = dayjs('2023-06-15')

    console.log(`  日期1: ${date1.format('YYYY-MM-DD')}`)
    console.log(`  日期2: ${date2.format('YYYY-MM-DD')}`)
    console.log(`  日期3: ${date3.format('YYYY-MM-DD')}`)
    console.log(`  日期1 < 日期2: ${date1.isBefore(date2)}`)
    console.log(`  日期1 > 日期2: ${date1.isAfter(date2)}`)
    console.log(`  日期1 = 日期3: ${date1.isSame(date3)}`)
    console.log(`  日期1 = 日期3 (仅日期): ${date1.isSame(date3, 'day')}`)

    // 实际应用场景
    console.log('\n💼 实际应用场景:')
    
    // 日志时间戳
    const logEntry = {
      timestamp: now.toISOString(),
      level: 'INFO',
      message: '用户登录成功',
      userId: 12345
    }
    console.log('  日志条目:', JSON.stringify(logEntry, null, 2))

    // 计算年龄
    const birthDate = dayjs('1990-05-15')
    const age = now.diff(birthDate, 'year')
    console.log(`  出生日期: ${birthDate.format('YYYY-MM-DD')}`)
    console.log(`  当前年龄: ${age} 岁`)

    // 工作日计算（简单示例）
    const startDate = dayjs('2023-12-01')
    const endDate = dayjs('2023-12-31')
    let workDays = 0
    let current = startDate

    while (current.isBefore(endDate) || current.isSame(endDate)) {
      // 0=周日, 1=周一, ..., 6=周六
      const dayOfWeek = current.day()
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        workDays++
      }
      current = current.add(1, 'day')
    }

    console.log(`  ${startDate.format('YYYY-MM-DD')} 到 ${endDate.format('YYYY-MM-DD')}`)
    console.log(`  工作日数量: ${workDays} 天`)

    // 性能测试
    console.log('\n🚀 性能测试:')
    console.time('时间格式化性能')
    for (let i = 0; i < 10000; i++) {
      dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    console.timeEnd('时间格式化性能')

    console.time('时间计算性能')
    for (let i = 0; i < 10000; i++) {
      dayjs().add(i, 'day')
    }
    console.timeEnd('时间计算性能')

  } catch (error) {
    console.error('❌ 时间处理示例出错:', error.message)
    throw error
  }
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  runTimeExamples().catch(console.error)
}
