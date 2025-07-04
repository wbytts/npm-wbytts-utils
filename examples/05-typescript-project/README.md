# TypeScript 项目示例

这个示例展示了如何在TypeScript项目中使用 `@wbytts/utils` 工具包，包括类型安全、类型定义和最佳实践。

## 📁 项目结构

```
05-typescript-project/
├── README.md           # 本文件
├── package.json        # 项目配置
├── tsconfig.json       # TypeScript配置
├── src/
│   ├── index.ts        # 入口文件
│   ├── types/          # 类型定义
│   │   ├── index.ts    # 导出所有类型
│   │   └── utils.ts    # 工具类型定义
│   ├── examples/       # 示例目录
│   │   ├── mathExamples.ts      # 数学计算示例
│   │   ├── validateExamples.ts  # 数据验证示例
│   │   ├── timeExamples.ts      # 时间处理示例
│   │   └── utilsExamples.ts     # 通用工具示例
│   ├── services/       # 服务层
│   │   ├── MathService.ts       # 数学服务
│   │   ├── ValidateService.ts   # 验证服务
│   │   └── TimeService.ts       # 时间服务
│   └── utils/          # 工具函数
│       ├── logger.ts   # 日志工具
│       └── helpers.ts  # 辅助函数
├── dist/               # 编译输出目录
└── tests/              # 测试目录
    └── *.test.ts       # 测试文件
```

## 🚀 快速开始

### 1. 安装依赖

```bash
cd examples/05-typescript-project
npm install
```

### 2. 编译和运行

```bash
# 编译 TypeScript
npm run build

# 运行编译后的代码
npm start

# 开发模式（监听文件变化）
npm run dev

# 类型检查
npm run type-check

# 运行测试
npm test
```

## 📖 示例说明

### 类型安全示例
- **严格类型检查** - 启用所有 TypeScript 严格模式
- **类型推断** - 充分利用 TypeScript 的类型推断
- **泛型使用** - 在工具函数中使用泛型
- **接口定义** - 为复杂数据结构定义接口

### 服务层示例
- **MathService** - 数学计算服务类
- **ValidateService** - 数据验证服务类
- **TimeService** - 时间处理服务类

### 最佳实践
- 模块化设计
- 错误处理类型化
- 配置类型安全
- 测试覆盖

## 🔧 技术栈

- TypeScript 5.0+
- Node.js 18+
- @wbytts/utils
- Jest (测试)
- ts-node (开发)

## 💡 TypeScript 特性

### 1. 类型安全
```typescript
import { sum } from '@wbytts/utils/math'

// 类型安全的函数调用
const result: number = sum(1, 2, 3, 4, 5)

// 编译时错误检查
// const invalid = sum("1", "2") // 类型错误
```

### 2. 接口定义
```typescript
interface ValidationResult {
  isValid: boolean
  message: string
  field: string
}

interface MathOperation {
  operation: string
  inputs: number[]
  result: number
}
```

### 3. 泛型使用
```typescript
function processArray<T>(
  items: T[], 
  processor: (item: T) => T
): T[] {
  return items.map(processor)
}
```

### 4. 枚举类型
```typescript
enum ValidationTypes {
  PHONE = 'phone',
  ID_CARD = 'idCard',
  URL = 'url'
}
```

## 🧪 测试

项目包含完整的测试套件：

```bash
# 运行所有测试
npm test

# 运行特定测试
npm test -- --testNamePattern="Math"

# 生成测试覆盖率报告
npm run test:coverage
```

## 📚 学习资源

- [TypeScript 官方文档](https://www.typescriptlang.org/)
- [TypeScript 最佳实践](https://typescript-eslint.io/)
- [工具包文档](../../README.md)
- [更多示例](../README.md)

## 🔗 相关链接

- [Node.js 示例](../04-nodejs-project/)
- [React 示例](../03-react-project/)
- [Vue.js 示例](../02-vue-project/)
