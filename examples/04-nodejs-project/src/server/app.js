/**
 * Express 服务器示例
 * 展示 @wbytts/utils 在 Web 服务器中的使用
 */

import express from 'express'
import cors from 'cors'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

// 导入路由
import apiRoutes from './routes/api.js'
import utilsRoutes from './routes/utils.js'

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 创建 Express 应用
const app = express()
const PORT = process.env.PORT || 3000

// 中间件配置
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// 请求日志中间件
app.use((req, res, next) => {
  const timestamp = new Date().toISOString()
  console.log(`[${timestamp}] ${req.method} ${req.url}`)
  next()
})

// 静态文件服务
app.use('/static', express.static(join(__dirname, '../public')))

// 路由配置
app.use('/api', apiRoutes)
app.use('/utils', utilsRoutes)

// 首页路由
app.get('/', (req, res) => {
  res.json({
    message: '欢迎使用 @wbytts/utils Node.js 示例服务器',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      api: {
        math: '/api/math/*',
        validate: '/api/validate/*',
        time: '/api/time/*'
      },
      utils: {
        random: '/utils/random',
        string: '/utils/string/*',
        device: '/utils/device'
      }
    },
    examples: [
      'GET /api/math/sum?numbers=1,2,3,4,5',
      'GET /api/validate/phone?phone=13800138000',
      'GET /api/time/format?timestamp=1234567890&format=YYYY-MM-DD',
      'POST /utils/string/process (body: {text: "hello", action: "reverse"})',
      'GET /utils/random?type=number&min=1&max=100'
    ]
  })
})

// 健康检查端点
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    version: process.version
  })
})

// 404 处理
app.use('*', (req, res) => {
  res.status(404).json({
    error: '端点不存在',
    message: `路径 ${req.originalUrl} 未找到`,
    timestamp: new Date().toISOString()
  })
})

// 错误处理中间件
app.use((error, req, res, next) => {
  console.error('服务器错误:', error)
  res.status(500).json({
    error: '服务器内部错误',
    message: error.message,
    timestamp: new Date().toISOString()
  })
})

// 启动服务器
app.listen(PORT, () => {
  console.log('🚀 服务器启动成功!')
  console.log(`📡 服务地址: http://localhost:${PORT}`)
  console.log(`📖 API文档: http://localhost:${PORT}/`)
  console.log(`💚 健康检查: http://localhost:${PORT}/health`)
  console.log('=' * 50)
  console.log('💡 示例请求:')
  console.log(`   curl "http://localhost:${PORT}/api/math/sum?numbers=1,2,3,4,5"`)
  console.log(`   curl "http://localhost:${PORT}/api/validate/phone?phone=13800138000"`)
  console.log(`   curl "http://localhost:${PORT}/utils/random?type=color"`)
  console.log('=' * 50)
})

// 优雅关闭
process.on('SIGINT', () => {
  console.log('\n👋 服务器正在关闭...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  console.log('\n👋 服务器正在关闭...')
  process.exit(0)
})

export default app
