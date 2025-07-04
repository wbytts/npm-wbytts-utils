/**
 * 文件处理示例
 * 展示文件相关工具在Node.js中的使用
 */

import { promises as fs } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件目录
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export async function runFileExamples() {
  console.log('📁 文件处理示例')
  console.log('-'.repeat(30))

  try {
    // 创建测试目录
    const testDir = join(__dirname, '../../temp')
    
    try {
      await fs.mkdir(testDir, { recursive: true })
      console.log('✅ 创建测试目录成功')
    } catch (error) {
      console.log('📁 测试目录已存在')
    }

    // 文件写入示例
    console.log('\n📝 文件写入示例:')
    const testFiles = [
      {
        name: 'test.txt',
        content: 'Hello, @wbytts/utils!\n这是一个测试文件。'
      },
      {
        name: 'data.json',
        content: JSON.stringify({
          name: '测试数据',
          timestamp: new Date().toISOString(),
          version: '1.0.0',
          features: ['文件操作', '数据处理', '工具集成']
        }, null, 2)
      },
      {
        name: 'log.txt',
        content: `[${new Date().toISOString()}] INFO: 应用启动\n[${new Date().toISOString()}] INFO: 文件处理模块加载\n`
      }
    ]

    for (const file of testFiles) {
      const filePath = join(testDir, file.name)
      await fs.writeFile(filePath, file.content, 'utf8')
      console.log(`  ✅ 写入文件: ${file.name}`)
    }

    // 文件读取示例
    console.log('\n📖 文件读取示例:')
    for (const file of testFiles) {
      const filePath = join(testDir, file.name)
      const content = await fs.readFile(filePath, 'utf8')
      console.log(`  📄 ${file.name}:`)
      console.log(`    大小: ${content.length} 字符`)
      console.log(`    内容预览: ${content.substring(0, 50)}${content.length > 50 ? '...' : ''}`)
    }

    // 文件信息获取
    console.log('\n📊 文件信息获取:')
    for (const file of testFiles) {
      const filePath = join(testDir, file.name)
      const stats = await fs.stat(filePath)
      console.log(`  📄 ${file.name}:`)
      console.log(`    大小: ${stats.size} 字节`)
      console.log(`    创建时间: ${stats.birthtime.toISOString()}`)
      console.log(`    修改时间: ${stats.mtime.toISOString()}`)
      console.log(`    是否为文件: ${stats.isFile()}`)
    }

    // 目录操作示例
    console.log('\n📂 目录操作示例:')
    const subDir = join(testDir, 'subdir')
    await fs.mkdir(subDir, { recursive: true })
    console.log('  ✅ 创建子目录成功')

    // 列出目录内容
    const dirContents = await fs.readdir(testDir)
    console.log('  📋 目录内容:')
    for (const item of dirContents) {
      const itemPath = join(testDir, item)
      const stats = await fs.stat(itemPath)
      const type = stats.isDirectory() ? '📁' : '📄'
      console.log(`    ${type} ${item}`)
    }

    // 文件复制示例
    console.log('\n📋 文件复制示例:')
    const sourceFile = join(testDir, 'test.txt')
    const targetFile = join(testDir, 'test_copy.txt')
    await fs.copyFile(sourceFile, targetFile)
    console.log('  ✅ 文件复制成功')

    // 文件追加写入
    console.log('\n➕ 文件追加写入:')
    const logFile = join(testDir, 'log.txt')
    const newLogEntry = `[${new Date().toISOString()}] INFO: 文件操作示例完成\n`
    await fs.appendFile(logFile, newLogEntry)
    console.log('  ✅ 日志追加成功')

    // 读取更新后的日志
    const updatedLog = await fs.readFile(logFile, 'utf8')
    console.log('  📄 更新后的日志内容:')
    updatedLog.split('\n').filter(line => line.trim()).forEach(line => {
      console.log(`    ${line}`)
    })

    // 批量文件处理
    console.log('\n🔄 批量文件处理:')
    const batchFiles = Array.from({ length: 5 }, (_, i) => ({
      name: `batch_${i + 1}.txt`,
      content: `这是批量文件 ${i + 1}\n创建时间: ${new Date().toISOString()}\n`
    }))

    console.time('批量文件创建')
    await Promise.all(
      batchFiles.map(file => 
        fs.writeFile(join(testDir, file.name), file.content, 'utf8')
      )
    )
    console.timeEnd('批量文件创建')
    console.log(`  ✅ 批量创建 ${batchFiles.length} 个文件`)

    // 文件搜索示例
    console.log('\n🔍 文件搜索示例:')
    const allFiles = await fs.readdir(testDir)
    const txtFiles = allFiles.filter(file => file.endsWith('.txt'))
    const jsonFiles = allFiles.filter(file => file.endsWith('.json'))

    console.log(`  📄 .txt 文件: ${txtFiles.length} 个`)
    txtFiles.forEach(file => console.log(`    - ${file}`))
    
    console.log(`  📄 .json 文件: ${jsonFiles.length} 个`)
    jsonFiles.forEach(file => console.log(`    - ${file}`))

    // 实际应用场景
    console.log('\n💼 实际应用场景:')
    
    // 配置文件管理
    const configFile = join(testDir, 'config.json')
    const config = {
      app: {
        name: '@wbytts/utils示例',
        version: '1.0.0',
        debug: true
      },
      database: {
        host: 'localhost',
        port: 3306,
        name: 'example_db'
      },
      features: {
        logging: true,
        caching: false,
        monitoring: true
      }
    }

    await fs.writeFile(configFile, JSON.stringify(config, null, 2))
    console.log('  ✅ 配置文件创建成功')

    // 读取并解析配置
    const configContent = await fs.readFile(configFile, 'utf8')
    const parsedConfig = JSON.parse(configContent)
    console.log('  📖 配置文件内容:')
    console.log(`    应用名称: ${parsedConfig.app.name}`)
    console.log(`    应用版本: ${parsedConfig.app.version}`)
    console.log(`    调试模式: ${parsedConfig.app.debug ? '开启' : '关闭'}`)

    // 清理测试文件（可选）
    console.log('\n🧹 清理测试文件:')
    console.log('  💡 提示: 测试文件保留在 temp/ 目录中，可手动删除')

  } catch (error) {
    console.error('❌ 文件处理示例出错:', error.message)
    throw error
  }
}

// 如果直接运行此文件
if (import.meta.url === `file://${process.argv[1]}`) {
  runFileExamples().catch(console.error)
}
