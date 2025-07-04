/**
 * 数学计算示例
 * 展示数学工具在Node.js中的使用
 */

import { sum, average, factorial } from '@wbytts/utils/math'

export async function runMathExamples() {
  console.log('📊 数学计算示例')
  console.log('-'.repeat(30))

  try {
    // 求和示例
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const sumResult = sum(...numbers)
    console.log(`✅ 求和: [${numbers.join(', ')}] = ${sumResult}`)

    // 平均值示例
    const avgResult = average(...numbers)
    console.log(`✅ 平均值: [${numbers.join(', ')}] = ${avgResult}`)

    // 阶乘示例
    const factorialNumbers = [5, 8, 10]
    factorialNumbers.forEach(n => {
      try {
        const result = factorial(n)
        console.log(`✅ 阶乘: ${n}! = ${result}`)
      } catch (error) {
        console.log(`❌ 阶乘计算失败 ${n}!: ${error.message}`)
      }
    })

    // 大数据集测试
    console.log('\n🔢 大数据集性能测试:')
    const largeNumbers = Array.from({ length: 10000 }, (_, i) => i + 1)
    
    console.time('大数据集求和')
    const largeSumResult = sum(...largeNumbers)
    console.timeEnd('大数据集求和')
    console.log(`✅ 大数据集求和结果: ${largeSumResult}`)

    console.time('大数据集平均值')
    const largeAvgResult = average(...largeNumbers)
    console.timeEnd('大数据集平均值')
    console.log(`✅ 大数据集平均值: ${largeAvgResult}`)

    // 边界情况测试
    console.log('\n🧪 边界情况测试:')
    
    // 空数组
    try {
      const emptySum = sum()
      console.log(`✅ 空参数求和: ${emptySum}`)
    } catch (error) {
      console.log(`❌ 空参数求和失败: ${error.message}`)
    }

    // 单个数字
    const singleSum = sum(42)
    console.log(`✅ 单个数字求和: ${singleSum}`)

    // 负数
    const negativeNumbers = [-5, -3, -1, 0, 1, 3, 5]
    const negativeSum = sum(...negativeNumbers)
    const negativeAvg = average(...negativeNumbers)
    console.log(`✅ 负数求和: [${negativeNumbers.join(', ')}] = ${negativeSum}`)
    console.log(`✅ 负数平均值: [${negativeNumbers.join(', ')}] = ${negativeAvg}`)

    // 浮点数
    const floatNumbers = [1.1, 2.2, 3.3, 4.4, 5.5]
    const floatSum = sum(...floatNumbers)
    const floatAvg = average(...floatNumbers)
    console.log(`✅ 浮点数求和: [${floatNumbers.join(', ')}] = ${floatSum}`)
    console.log(`✅ 浮点数平均值: [${floatNumbers.join(', ')}] = ${floatAvg}`)

  } catch (error) {
    console.error('❌ 数学计算示例出错:', error.message)
    throw error
  }
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  runMathExamples().catch(console.error)
}
