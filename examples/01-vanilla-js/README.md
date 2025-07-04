# 原生JavaScript使用示例

这个示例展示了如何在原生JavaScript项目中使用 `@wbytts/utils` 工具包。

## 📁 文件结构

```
01-vanilla-js/
├── README.md           # 本文件
├── package.json        # 项目配置
├── vite.config.js      # Vite配置
├── index.html          # 主页面
├── src/
│   ├── main.js         # 入口文件
│   ├── examples/       # 各模块示例
│   │   ├── dom.js      # DOM操作示例
│   │   ├── bom.js      # BOM操作示例
│   │   ├── math.js     # 数学计算示例
│   │   ├── validate.js # 数据验证示例
│   │   ├── time.js     # 时间处理示例
│   │   └── utils.js    # 通用工具示例
│   └── styles/
│       └── main.css    # 样式文件
└── dist/               # 构建输出目录
```

## 🚀 快速开始

### 1. 安装依赖

```bash
cd examples/01-vanilla-js
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

### DOM操作示例
- 元素获取和操作
- 数字动画效果
- 触摸事件控制
- 图片预览功能

### BOM操作示例
- URL参数处理
- 剪贴板操作
- 页面重载

### 数学计算示例
- 基础数学运算
- 大数计算
- 统计函数

### 数据验证示例
- 身份证验证
- 手机号验证
- URL验证

### 时间处理示例
- 日期格式化
- 时间计算
- 时间范围处理

### 通用工具示例
- 字符串处理
- 数据转换
- 设备检测

## 💡 使用技巧

1. **模块化导入**: 只导入需要的模块，减少包体积
2. **错误处理**: 示例中包含了完整的错误处理
3. **性能优化**: 使用防抖和节流优化用户交互
4. **响应式设计**: 适配不同屏幕尺寸

## 🔗 相关链接

- [工具包文档](../../README.md)
- [API参考](../../docs/api.md)
- [更多示例](../README.md)
