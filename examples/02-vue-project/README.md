# Vue.js 项目示例

这个示例展示了如何在Vue.js项目中使用 `@wbytts/utils` 工具包。

## 📁 项目结构

```
02-vue-project/
├── README.md           # 本文件
├── package.json        # 项目配置
├── vite.config.js      # Vite配置
├── index.html          # HTML模板
├── src/
│   ├── main.js         # 入口文件
│   ├── App.vue         # 根组件
│   ├── components/     # 组件目录
│   │   ├── DOMExamples.vue      # DOM操作示例
│   │   ├── BOMExamples.vue      # BOM操作示例
│   │   ├── MathExamples.vue     # 数学计算示例
│   │   ├── ValidateExamples.vue # 数据验证示例
│   │   ├── TimeExamples.vue     # 时间处理示例
│   │   └── UtilsExamples.vue    # 通用工具示例
│   ├── composables/    # 组合式函数
│   │   └── useUtils.js # 工具包封装
│   └── styles/
│       └── main.css    # 样式文件
└── dist/               # 构建输出目录
```

## 🚀 快速开始

### 1. 安装依赖

```bash
cd examples/02-vue-project
npm install
```

### 2. 启动开发服务器

```bash
npm run dev
```

### 3. 构建生产版本

```bash
npm run build
```

### 4. 预览构建结果

```bash
npm run preview
```

## 📖 示例说明

### 组件化示例
- **DOMExamples.vue** - DOM操作相关功能
- **BOMExamples.vue** - 浏览器对象模型操作
- **MathExamples.vue** - 数学计算工具
- **ValidateExamples.vue** - 数据验证功能
- **TimeExamples.vue** - 时间处理工具
- **UtilsExamples.vue** - 通用工具函数

### 组合式函数
- **useUtils.js** - 封装工具包为Vue组合式函数，提供响应式的工具方法

### Vue特性集成
- 响应式数据绑定
- 组件化开发
- 事件处理
- 计算属性
- 侦听器
- 生命周期钩子

## 💡 使用技巧

1. **组合式API**: 使用组合式函数封装工具包功能
2. **响应式集成**: 将工具包结果与Vue响应式系统结合
3. **组件复用**: 将常用功能封装为可复用组件
4. **类型支持**: 配合TypeScript获得更好的开发体验

## 🔧 技术栈

- Vue 3.x
- Vite
- @wbytts/utils
- CSS3

## 🔗 相关链接

- [Vue.js 官方文档](https://vuejs.org/)
- [Vite 官方文档](https://vitejs.dev/)
- [工具包文档](../../README.md)
- [更多示例](../README.md)
