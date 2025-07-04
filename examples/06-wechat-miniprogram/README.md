# 微信小程序示例

这个示例展示了如何在微信小程序中使用 `@wbytts/utils` 工具包。

## 📁 项目结构

```
06-wechat-miniprogram/
├── README.md           # 本文件
├── project.config.json # 小程序配置文件
├── app.js              # 小程序入口文件
├── app.json            # 全局配置
├── app.wxss            # 全局样式
├── sitemap.json        # 站点地图配置
├── utils/              # 工具函数目录
│   ├── index.js        # 工具函数入口
│   └── logger.js       # 日志工具
├── lib/                # 第三方库目录
│   └── wbytts-utils/   # @wbytts/utils 库文件
├── pages/              # 页面目录
│   ├── index/          # 首页
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── math/           # 数学计算示例页面
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── validate/       # 数据验证示例页面
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   ├── time/           # 时间处理示例页面
│   │   ├── index.js
│   │   ├── index.json
│   │   ├── index.wxml
│   │   └── index.wxss
│   └── utils/          # 通用工具示例页面
│       ├── index.js
│       ├── index.json
│       ├── index.wxml
│       └── index.wxss
└── components/         # 组件目录
    ├── demo-card/      # 演示卡片组件
    │   ├── index.js
    │   ├── index.json
    │   ├── index.wxml
    │   └── index.wxss
    └── result-display/ # 结果展示组件
        ├── index.js
        ├── index.json
        ├── index.wxml
        └── index.wxss
```

## 🚀 快速开始

### 1. 准备工作

1. 安装微信开发者工具
2. 注册微信小程序账号
3. 获取小程序 AppID

### 2. 导入项目

1. 打开微信开发者工具
2. 选择"导入项目"
3. 选择 `examples/06-wechat-miniprogram` 目录
4. 填入你的小程序 AppID

### 3. 配置工具包

由于小程序环境的限制，需要将 `@wbytts/utils` 的相关文件复制到 `lib/wbytts-utils/` 目录中。

```bash
# 在项目根目录执行
npm run build:miniprogram
```

### 4. 运行项目

在微信开发者工具中点击"编译"按钮即可运行项目。

## 📖 示例说明

### 页面功能

1. **首页 (index)** - 工具包介绍和导航
2. **数学计算 (math)** - 展示数学计算功能
3. **数据验证 (validate)** - 展示数据验证功能
4. **时间处理 (time)** - 展示时间处理功能
5. **通用工具 (utils)** - 展示通用工具功能

### 组件说明

1. **demo-card** - 演示卡片组件，用于展示功能模块
2. **result-display** - 结果展示组件，用于显示计算结果

## 🔧 技术特点

### 小程序适配

- **模块化导入** - 使用小程序的模块化语法
- **API兼容** - 确保工具函数在小程序环境中正常工作
- **性能优化** - 按需加载，减少包体积
- **错误处理** - 完善的错误处理机制

### 用户体验

- **响应式设计** - 适配不同屏幕尺寸
- **交互反馈** - 丰富的用户交互反馈
- **加载状态** - 清晰的加载状态提示
- **错误提示** - 友好的错误提示信息

## 💡 使用示例

### 数学计算
```javascript
// pages/math/index.js
const { sum, average } = require('../../lib/wbytts-utils/math')

Page({
  data: {
    numbers: [1, 2, 3, 4, 5],
    result: 0
  },
  
  calculateSum() {
    const result = sum(...this.data.numbers)
    this.setData({ result })
  }
})
```

### 数据验证
```javascript
// pages/validate/index.js
const { isPhoneNumber } = require('../../lib/wbytts-utils/validate')

Page({
  data: {
    phone: '',
    isValid: false
  },
  
  validatePhone(e) {
    const phone = e.detail.value
    const isValid = isPhoneNumber(phone)
    this.setData({ phone, isValid })
  }
})
```

## 🎯 注意事项

### 环境限制

1. **Node.js API** - 小程序不支持 Node.js API，需要使用兼容版本
2. **文件系统** - 不能直接访问文件系统
3. **网络请求** - 需要配置合法域名
4. **包大小** - 注意小程序包大小限制（2MB）

### 最佳实践

1. **按需引入** - 只引入需要的工具函数
2. **错误处理** - 完善的错误处理和用户提示
3. **性能优化** - 避免在页面渲染时进行复杂计算
4. **用户体验** - 提供清晰的操作指引和反馈

## 📚 相关文档

- [微信小程序官方文档](https://developers.weixin.qq.com/miniprogram/dev/)
- [小程序开发指南](https://developers.weixin.qq.com/miniprogram/dev/framework/)
- [工具包文档](../../README.md)

## 🔗 相关链接

- [TypeScript 示例](../05-typescript-project/)
- [Node.js 示例](../04-nodejs-project/)
- [React 示例](../03-react-project/)
- [Vue.js 示例](../02-vue-project/)
