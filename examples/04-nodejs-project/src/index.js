#!/usr/bin/env node

/**
 * Node.js 示例入口文件
 * 展示 @wbytts/utils 在 Node.js 环境中的使用
 */

import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('🚀 Node.js 示例程序启动')
console.log('📦 使用工具包: @wbytts/utils')
console.log('🔧 运行环境: Node.js', process.version)
console.log('=' * 50)

// 动态导入示例模块
async function runExamples() {
  try {
    console.log('\n📊 运行数学计算示例...')
    const { runMathExamples } = await import('./examples/mathExamples.js')
    await runMathExamples()

    console.log('\n✅ 运行数据验证示例...')
    const { runValidateExamples } = await import('./examples/validateExamples.js')
    await runValidateExamples()

    console.log('\n⏰ 运行时间处理示例...')
    const { runTimeExamples } = await import('./examples/timeExamples.js')
    await runTimeExamples()

    console.log('\n🔧 运行通用工具示例...')
    const { runUtilsExamples } = await import('./examples/utilsExamples.js')
    await runUtilsExamples()

    console.log('\n📁 运行文件处理示例...')
    const { runFileExamples } = await import('./examples/fileExamples.js')
    await runFileExamples()

    console.log('\n' + '=' * 50)
    console.log('✅ 所有示例运行完成!')
    console.log('💡 提示: 运行 "npm run server" 启动Web服务器示例')
    
  } catch (error) {
    console.error('❌ 运行示例时出错:', error.message)
    process.exit(1)
  }
}

// 错误处理
process.on('uncaughtException', (error) => {
  console.error('❌ 未捕获的异常:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ 未处理的Promise拒绝:', reason)
  process.exit(1)
})

// 优雅退出
process.on('SIGINT', () => {
  console.log('\n👋 程序正在退出...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n👋 程序正在退出...')
  process.exit(0)
})

// 运行示例
runExamples()
