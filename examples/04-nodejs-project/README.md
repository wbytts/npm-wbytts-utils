# Node.js 项目示例

这个示例展示了如何在Node.js后端项目中使用 `@wbytts/utils` 工具包。

## 📁 项目结构

```
04-nodejs-project/
├── README.md           # 本文件
├── package.json        # 项目配置
├── src/
│   ├── index.js        # 入口文件
│   ├── examples/       # 示例目录
│   │   ├── mathExamples.js      # 数学计算示例
│   │   ├── validateExamples.js  # 数据验证示例
│   │   ├── timeExamples.js      # 时间处理示例
│   │   ├── utilsExamples.js     # 通用工具示例
│   │   └── fileExamples.js      # 文件处理示例
│   ├── server/         # 服务器示例
│   │   ├── app.js      # Express应用
│   │   └── routes/     # 路由目录
│   │       ├── api.js  # API路由
│   │       └── utils.js # 工具路由
│   └── utils/          # 工具函数
│       └── logger.js   # 日志工具
└── logs/               # 日志目录
```

## 🚀 快速开始

### 1. 安装依赖

```bash
cd examples/04-nodejs-project
npm install
```

### 2. 运行示例

```bash
# 运行基础示例
npm run examples

# 启动Web服务器
npm run server

# 运行开发模式（自动重启）
npm run dev
```

## 📖 示例说明

### 基础示例
- **mathExamples.js** - 数学计算功能演示
- **validateExamples.js** - 数据验证功能演示
- **timeExamples.js** - 时间处理功能演示
- **utilsExamples.js** - 通用工具功能演示
- **fileExamples.js** - 文件处理功能演示

### Web服务器示例
- **Express应用** - 基于Express的Web服务器
- **API路由** - RESTful API接口示例
- **中间件集成** - 工具包与Express中间件的集成

### Node.js特性集成
- 模块化导入/导出
- 异步/同步操作
- 文件系统操作
- HTTP服务器
- 错误处理
- 日志记录

## 💡 使用技巧

1. **模块化使用**: 按需导入工具包的特定模块
2. **错误处理**: 在服务端环境中正确处理工具包可能抛出的错误
3. **性能优化**: 合理使用工具包功能，避免阻塞事件循环
4. **日志记录**: 结合工具包的日志功能进行应用监控
5. **配置管理**: 通过环境变量配置工具包行为

## 🔧 技术栈

- Node.js 18+
- Express.js
- @wbytts/utils
- nodemon (开发)

## 🌐 API接口

启动服务器后，可以访问以下接口：

- `GET /` - 首页
- `GET /api/math/sum?numbers=1,2,3,4,5` - 数学求和
- `GET /api/validate/phone?phone=13800138000` - 手机号验证
- `GET /api/time/format?timestamp=1234567890&format=YYYY-MM-DD` - 时间格式化
- `GET /api/utils/random?type=number&min=1&max=100` - 随机数生成

## 🔗 相关链接

- [Node.js 官方文档](https://nodejs.org/)
- [Express.js 官方文档](https://expressjs.com/)
- [工具包文档](../../README.md)
- [更多示例](../README.md)
