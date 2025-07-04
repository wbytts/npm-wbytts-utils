# @wbytts/utils 使用示例

这个目录包含了 `@wbytts/utils` 工具包在各种场景下的使用示例。

## 📁 目录结构

```
examples/
├── README.md                    # 本文件
├── package.json                 # 示例项目的通用依赖
├── 01-vanilla-js/              # 原生JavaScript示例
├── 02-vue-project/             # Vue.js项目示例
├── 03-react-project/           # React项目示例
├── 04-nodejs-backend/          # Node.js后端示例
├── 05-typescript-project/      # TypeScript项目示例
├── 06-wechat-miniprogram/      # 微信小程序示例
├── modules/                    # 各模块专项示例
│   ├── dom-examples/           # DOM操作示例
│   ├── bom-examples/           # BOM操作示例
│   ├── math-examples/          # 数学计算示例
│   ├── validate-examples/      # 数据验证示例
│   ├── time-examples/          # 时间处理示例
│   ├── request-examples/       # 网络请求示例
│   ├── sse-examples/           # SSE示例
│   ├── canvas-examples/        # Canvas示例
│   ├── excel-examples/         # Excel处理示例
│   ├── logger-examples/        # 日志系统示例
│   ├── event-examples/         # 事件总线示例
│   ├── monitor-examples/       # 监控工具示例
│   ├── enum-examples/          # 枚举增强示例
│   └── sandbox-examples/       # 沙箱环境示例
└── shared/                     # 共享资源
    ├── assets/                 # 静态资源
    ├── styles/                 # 通用样式
    └── utils/                  # 示例辅助工具
```

## 🚀 快速开始

### 1. 安装依赖

```bash
# 在examples目录下安装依赖
cd examples
npm install

# 或者使用pnpm
pnpm install
```

### 2. 运行示例

每个示例目录都包含独立的运行说明，请查看对应目录下的README.md文件。

## 📖 示例分类

### 🌐 框架集成示例

- **[原生JavaScript](./01-vanilla-js/)** - 在普通HTML页面中使用
- **[Vue.js项目](./02-vue-project/)** - Vue3 + Vite项目集成
- **[React项目](./03-react-project/)** - React + Vite项目集成
- **[Node.js后端](./04-nodejs-backend/)** - 服务端使用示例
- **[TypeScript项目](./05-typescript-project/)** - 类型安全的使用方式
- **[微信小程序](./06-wechat-miniprogram/)** - 小程序环境使用

### 🔧 功能模块示例

- **[DOM操作](./modules/dom-examples/)** - 元素操作、动画、事件处理
- **[BOM操作](./modules/bom-examples/)** - 浏览器对象模型操作
- **[数学计算](./modules/math-examples/)** - 数学运算和计算工具
- **[数据验证](./modules/validate-examples/)** - 各种数据格式验证
- **[时间处理](./modules/time-examples/)** - 日期时间操作
- **[网络请求](./modules/request-examples/)** - HTTP请求封装
- **[SSE通信](./modules/sse-examples/)** - 服务端推送事件
- **[Canvas绘图](./modules/canvas-examples/)** - 画布操作工具
- **[Excel处理](./modules/excel-examples/)** - 表格数据处理
- **[日志系统](./modules/logger-examples/)** - 日志记录和管理
- **[事件总线](./modules/event-examples/)** - 事件发布订阅
- **[性能监控](./modules/monitor-examples/)** - 性能监控工具
- **[枚举增强](./modules/enum-examples/)** - 增强的枚举类型
- **[沙箱环境](./modules/sandbox-examples/)** - 代码沙箱执行

## 💡 使用建议

1. **选择合适的示例**: 根据你的项目类型选择对应的框架示例
2. **模块化使用**: 只导入需要的模块，减少包体积
3. **类型支持**: 推荐使用TypeScript获得更好的开发体验
4. **性能优化**: 查看各示例中的性能优化建议

## 🤝 贡献

如果你有新的使用场景或改进建议，欢迎提交PR或Issue。

## 📄 许可证

与主项目保持一致的ISC许可证。
