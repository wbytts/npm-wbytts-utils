# React 项目示例

这个示例展示了如何在React项目中使用 `@wbytts/utils` 工具包。

## 📁 项目结构

```
03-react-project/
├── README.md           # 本文件
├── package.json        # 项目配置
├── vite.config.js      # Vite配置
├── index.html          # HTML模板
├── src/
│   ├── main.jsx        # 入口文件
│   ├── App.jsx         # 根组件
│   ├── components/     # 组件目录
│   │   ├── DOMExamples.jsx      # DOM操作示例
│   │   ├── BOMExamples.jsx      # BOM操作示例
│   │   ├── MathExamples.jsx     # 数学计算示例
│   │   ├── ValidateExamples.jsx # 数据验证示例
│   │   ├── TimeExamples.jsx     # 时间处理示例
│   │   └── UtilsExamples.jsx    # 通用工具示例
│   ├── hooks/          # 自定义Hook
│   │   └── useUtils.js # 工具包Hook封装
│   └── styles/
│       └── index.css   # 样式文件
└── dist/               # 构建输出目录
```

## 🚀 快速开始

### 1. 安装依赖

```bash
cd examples/03-react-project
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

### React组件示例
- **DOMExamples.jsx** - DOM操作相关功能
- **BOMExamples.jsx** - 浏览器对象模型操作
- **MathExamples.jsx** - 数学计算工具
- **ValidateExamples.jsx** - 数据验证功能
- **TimeExamples.jsx** - 时间处理工具
- **UtilsExamples.jsx** - 通用工具函数

### 自定义Hook
- **useUtils.js** - 封装工具包为React Hook，提供状态管理和副作用处理

### React特性集成
- 函数组件和Hook
- 状态管理 (useState, useEffect)
- 事件处理
- 条件渲染
- 列表渲染
- 表单处理

## 💡 使用技巧

1. **自定义Hook**: 将工具包功能封装为可复用的Hook
2. **状态管理**: 使用React状态管理工具包的执行结果
3. **副作用处理**: 使用useEffect处理工具包的异步操作
4. **组件化**: 将功能拆分为独立的React组件
5. **类型支持**: 配合TypeScript获得更好的开发体验

## 🔧 技术栈

- React 18.x
- Vite
- @wbytts/utils
- CSS3

## 🔗 相关链接

- [React 官方文档](https://react.dev/)
- [Vite 官方文档](https://vitejs.dev/)
- [工具包文档](../../README.md)
- [更多示例](../README.md)
