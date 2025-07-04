# 模块专项示例

这个目录包含了 `@wbytts/utils` 工具包中每个主要模块的专门使用示例和演示。

## 📁 目录结构

```
modules/
├── README.md           # 本文件
├── dom/                # DOM 操作模块示例
│   ├── README.md
│   ├── index.html
│   ├── basic.html      # 基础 DOM 操作
│   ├── events.html     # 事件处理
│   └── manipulation.html # DOM 操作
├── bom/                # BOM 操作模块示例
│   ├── README.md
│   ├── index.html
│   ├── storage.html    # 存储操作
│   ├── url.html        # URL 操作
│   └── device.html     # 设备信息
├── math/               # 数学计算模块示例
│   ├── README.md
│   ├── index.html
│   ├── basic.html      # 基础数学运算
│   ├── advanced.html   # 高级数学函数
│   └── statistics.html # 统计计算
├── validate/           # 数据验证模块示例
│   ├── README.md
│   ├── index.html
│   ├── forms.html      # 表单验证
│   ├── formats.html    # 格式验证
│   └── custom.html     # 自定义验证
├── time/               # 时间处理模块示例
│   ├── README.md
│   ├── index.html
│   ├── format.html     # 时间格式化
│   ├── calculate.html  # 时间计算
│   └── timezone.html   # 时区处理
├── request/            # 网络请求模块示例
│   ├── README.md
│   ├── index.html
│   ├── basic.html      # 基础请求
│   ├── advanced.html   # 高级配置
│   └── interceptors.html # 拦截器
├── sse/                # Server-Sent Events 模块示例
│   ├── README.md
│   ├── index.html
│   ├── basic.html      # 基础 SSE
│   ├── reconnect.html  # 重连机制
│   └── server.js       # 服务端示例
├── canvas/             # Canvas 操作模块示例
│   ├── README.md
│   ├── index.html
│   ├── drawing.html    # 绘图操作
│   ├── image.html      # 图像处理
│   └── animation.html  # 动画效果
├── excel/              # Excel 操作模块示例
│   ├── README.md
│   ├── index.html
│   ├── export.html     # 导出 Excel
│   ├── import.html     # 导入 Excel
│   └── format.html     # 格式化
├── logger/             # 日志模块示例
│   ├── README.md
│   ├── index.html
│   ├── basic.html      # 基础日志
│   ├── levels.html     # 日志级别
│   └── custom.html     # 自定义日志
├── event/              # 事件系统模块示例
│   ├── README.md
│   ├── index.html
│   ├── emitter.html    # 事件发射器
│   ├── bus.html        # 事件总线
│   └── custom.html     # 自定义事件
├── monitor/            # 监控模块示例
│   ├── README.md
│   ├── index.html
│   ├── performance.html # 性能监控
│   ├── error.html      # 错误监控
│   └── user.html       # 用户行为监控
├── enum/               # 枚举模块示例
│   ├── README.md
│   ├── index.html
│   ├── basic.html      # 基础枚举
│   ├── advanced.html   # 高级枚举
│   └── utils.html      # 枚举工具
├── sandbox/            # 沙箱模块示例
│   ├── README.md
│   ├── index.html
│   ├── basic.html      # 基础沙箱
│   ├── security.html   # 安全沙箱
│   └── isolation.html  # 隔离环境
└── utils/              # 通用工具模块示例
    ├── README.md
    ├── index.html
    ├── string.html     # 字符串工具
    ├── array.html      # 数组工具
    ├── object.html     # 对象工具
    └── function.html   # 函数工具
```

## 🎯 使用说明

### 1. 浏览器中查看

每个模块目录都包含一个 `index.html` 文件，可以直接在浏览器中打开查看示例。

```bash
# 启动本地服务器（推荐）
cd examples/modules
python -m http.server 8080
# 或者使用 Node.js
npx serve .

# 然后在浏览器中访问
# http://localhost:8080/dom/
# http://localhost:8080/math/
# 等等...
```

### 2. 集成到项目

每个示例都可以作为参考，集成到你的项目中：

```javascript
// 例如：使用 DOM 模块
import { addClass, removeClass, toggleClass } from '@wbytts/utils/dom'

// 使用数学模块
import { sum, average, factorial } from '@wbytts/utils/math'

// 使用验证模块
import { isPhoneNumber, isIdCard, isUrl } from '@wbytts/utils/validate'
```

## 📚 模块说明

### 核心模块

1. **DOM** - DOM 操作和查询
2. **BOM** - 浏览器对象模型操作
3. **Math** - 数学计算和统计
4. **Validate** - 数据验证和格式检查
5. **Time** - 时间处理和格式化
6. **Utils** - 通用工具函数

### 功能模块

7. **Request** - HTTP 请求封装
8. **SSE** - Server-Sent Events 支持
9. **Canvas** - Canvas 绘图工具
10. **Excel** - Excel 文件操作
11. **Logger** - 日志记录系统
12. **Event** - 事件系统
13. **Monitor** - 性能和错误监控
14. **Enum** - 枚举类型工具
15. **Sandbox** - 代码沙箱环境

## 🔧 开发指南

### 添加新示例

1. 在对应模块目录下创建新的 HTML 文件
2. 引入必要的工具函数
3. 编写示例代码和说明
4. 更新模块的 README.md

### 示例模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>示例标题 - @wbytts/utils</title>
    <link rel="stylesheet" href="../shared/styles/common.css">
</head>
<body>
    <div class="container">
        <h1>示例标题</h1>
        <div class="example-section">
            <!-- 示例内容 -->
        </div>
    </div>
    
    <script type="module">
        import { functionName } from '@wbytts/utils/module'
        
        // 示例代码
    </script>
</body>
</html>
```

## 💡 最佳实践

1. **模块化使用** - 按需引入，避免引入整个库
2. **错误处理** - 在示例中展示错误处理方式
3. **性能考虑** - 展示性能优化技巧
4. **兼容性** - 说明浏览器兼容性要求
5. **实际应用** - 提供真实场景的使用示例

## 🔗 相关链接

- [完整项目示例](../)
- [工具包文档](../../README.md)
- [API 参考](../../docs/api/)
- [更新日志](../../CHANGELOG.md)
