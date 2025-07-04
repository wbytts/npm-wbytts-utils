# 数学计算模块示例

这个目录包含了 `@wbytts/utils/math` 模块的详细使用示例。

## 📁 文件说明

- `index.html` - 模块概览和导航
- `basic.html` - 基础数学运算示例
- `advanced.html` - 高级数学函数示例
- `statistics.html` - 统计计算示例

## 🔧 主要功能

### 基础运算
- `sum` - 求和计算
- `subtract` - 减法计算
- `multiply` - 乘法计算
- `divide` - 除法计算
- `mod` - 取模运算
- `power` - 幂运算

### 数学函数
- `abs` - 绝对值
- `sqrt` - 平方根
- `cbrt` - 立方根
- `factorial` - 阶乘
- `fibonacci` - 斐波那契数列
- `gcd` - 最大公约数
- `lcm` - 最小公倍数

### 随机数生成
- `random` - 生成随机数
- `randomInt` - 生成随机整数
- `randomFloat` - 生成随机浮点数
- `randomRange` - 指定范围随机数
- `randomChoice` - 随机选择
- `shuffle` - 数组随机打乱

### 统计计算
- `average` - 平均值
- `median` - 中位数
- `mode` - 众数
- `variance` - 方差
- `standardDeviation` - 标准差
- `min` - 最小值
- `max` - 最大值

### 几何计算
- `distance` - 两点距离
- `angle` - 角度计算
- `circleArea` - 圆形面积
- `circleCircumference` - 圆形周长
- `rectangleArea` - 矩形面积
- `triangleArea` - 三角形面积

### 数值处理
- `round` - 四舍五入
- `ceil` - 向上取整
- `floor` - 向下取整
- `toFixed` - 保留小数位
- `toPrecision` - 保留有效数字
- `clamp` - 数值限制

## 🚀 快速开始

### 1. 基础运算

```javascript
import { sum, average, factorial } from '@wbytts/utils/math'

// 求和
const total = sum(1, 2, 3, 4, 5) // 15

// 平均值
const avg = average([10, 20, 30, 40, 50]) // 30

// 阶乘
const fact = factorial(5) // 120
```

### 2. 随机数生成

```javascript
import { random, randomInt, randomChoice } from '@wbytts/utils/math'

// 生成 0-1 之间的随机数
const rand = random()

// 生成指定范围的随机整数
const randInt = randomInt(1, 100)

// 从数组中随机选择
const choice = randomChoice(['apple', 'banana', 'orange'])
```

### 3. 统计计算

```javascript
import { median, variance, standardDeviation } from '@wbytts/utils/math'

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// 中位数
const med = median(data) // 5.5

// 方差
const var1 = variance(data) // 8.25

// 标准差
const std = standardDeviation(data) // 2.87
```

## 💡 使用技巧

### 1. 链式计算

```javascript
import { sum, average, round } from '@wbytts/utils/math'

// 组合使用多个函数
const numbers = [1.234, 2.567, 3.891, 4.123]
const result = round(average(numbers), 2) // 2.95
```

### 2. 数组操作

```javascript
import { sum, max, min } from '@wbytts/utils/math'

const scores = [85, 92, 78, 96, 88]

// 总分
const total = sum(...scores)

// 最高分
const highest = max(...scores)

// 最低分
const lowest = min(...scores)
```

### 3. 条件计算

```javascript
import { clamp, round } from '@wbytts/utils/math'

// 限制数值范围
function normalizeScore(score) {
  return clamp(round(score, 1), 0, 100)
}
```

## 🎯 实际应用场景

### 1. 成绩统计

```javascript
import { average, median, standardDeviation } from '@wbytts/utils/math'

function analyzeScores(scores) {
  return {
    average: round(average(scores), 2),
    median: median(scores),
    standardDeviation: round(standardDeviation(scores), 2),
    highest: max(...scores),
    lowest: min(...scores)
  }
}
```

### 2. 财务计算

```javascript
import { sum, round } from '@wbytts/utils/math'

function calculateTotal(items) {
  const subtotal = sum(...items.map(item => item.price * item.quantity))
  const tax = subtotal * 0.08
  const total = subtotal + tax
  
  return {
    subtotal: round(subtotal, 2),
    tax: round(tax, 2),
    total: round(total, 2)
  }
}
```

### 3. 游戏开发

```javascript
import { randomInt, distance, clamp } from '@wbytts/utils/math'

// 生成随机敌人位置
function spawnEnemy() {
  return {
    x: randomInt(0, 800),
    y: randomInt(0, 600),
    health: randomInt(50, 100)
  }
}

// 计算攻击伤害
function calculateDamage(attacker, target) {
  const dist = distance(attacker.x, attacker.y, target.x, target.y)
  const baseDamage = attacker.attack
  const distanceModifier = clamp(1 - dist / 100, 0.1, 1)
  
  return round(baseDamage * distanceModifier)
}
```

### 4. 数据可视化

```javascript
import { min, max, clamp } from '@wbytts/utils/math'

// 数据归一化
function normalizeData(data, targetMin = 0, targetMax = 1) {
  const dataMin = min(...data)
  const dataMax = max(...data)
  const range = dataMax - dataMin
  
  return data.map(value => {
    const normalized = (value - dataMin) / range
    return targetMin + normalized * (targetMax - targetMin)
  })
}
```

## 🔗 相关链接

- [验证模块示例](../validate/)
- [时间模块示例](../time/)
- [工具包文档](../../../README.md)
