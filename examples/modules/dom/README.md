# DOM 操作模块示例

这个目录包含了 `@wbytts/utils/dom` 模块的详细使用示例。

## 📁 文件说明

- `index.html` - 模块概览和导航
- `basic.html` - 基础 DOM 操作示例
- `events.html` - 事件处理示例
- `manipulation.html` - DOM 操作示例

## 🔧 主要功能

### 元素选择和查询
- `querySelector` - 增强的元素选择器
- `querySelectorAll` - 批量元素选择
- `getElementById` - ID 选择器
- `getElementsByClassName` - 类名选择器

### 样式操作
- `addClass` - 添加 CSS 类
- `removeClass` - 移除 CSS 类
- `toggleClass` - 切换 CSS 类
- `hasClass` - 检查是否包含类
- `setStyle` - 设置样式
- `getStyle` - 获取样式

### 属性操作
- `setAttribute` - 设置属性
- `getAttribute` - 获取属性
- `removeAttribute` - 移除属性
- `hasAttribute` - 检查属性存在

### 内容操作
- `setText` - 设置文本内容
- `getText` - 获取文本内容
- `setHTML` - 设置 HTML 内容
- `getHTML` - 获取 HTML 内容

### 元素操作
- `createElement` - 创建元素
- `appendChild` - 添加子元素
- `removeChild` - 移除子元素
- `insertBefore` - 在指定元素前插入
- `insertAfter` - 在指定元素后插入

### 事件处理
- `addEventListener` - 添加事件监听器
- `removeEventListener` - 移除事件监听器
- `dispatchEvent` - 触发自定义事件
- `delegateEvent` - 事件委托

## 🚀 快速开始

### 1. 基础使用

```javascript
import { addClass, removeClass, toggleClass } from '@wbytts/utils/dom'

// 添加类名
addClass(element, 'active')

// 移除类名
removeClass(element, 'inactive')

// 切换类名
toggleClass(element, 'visible')
```

### 2. 样式操作

```javascript
import { setStyle, getStyle } from '@wbytts/utils/dom'

// 设置单个样式
setStyle(element, 'color', 'red')

// 设置多个样式
setStyle(element, {
  color: 'blue',
  fontSize: '16px',
  margin: '10px'
})

// 获取样式
const color = getStyle(element, 'color')
```

### 3. 事件处理

```javascript
import { addEventListener, delegateEvent } from '@wbytts/utils/dom'

// 添加事件监听器
addEventListener(button, 'click', () => {
  console.log('按钮被点击')
})

// 事件委托
delegateEvent(container, 'click', '.button', (e) => {
  console.log('委托事件触发')
})
```

## 💡 使用技巧

### 1. 链式操作

```javascript
import { addClass, setStyle, setAttribute } from '@wbytts/utils/dom'

// 可以组合使用多个函数
addClass(element, 'active')
setStyle(element, 'display', 'block')
setAttribute(element, 'data-id', '123')
```

### 2. 批量操作

```javascript
import { addClass, querySelectorAll } from '@wbytts/utils/dom'

// 批量添加类名
const elements = querySelectorAll('.item')
elements.forEach(el => addClass(el, 'processed'))
```

### 3. 条件操作

```javascript
import { hasClass, addClass, removeClass } from '@wbytts/utils/dom'

// 根据条件操作类名
if (hasClass(element, 'active')) {
  removeClass(element, 'active')
} else {
  addClass(element, 'active')
}
```

## 🎯 实际应用场景

### 1. 表单验证

```javascript
import { addClass, removeClass, setAttribute } from '@wbytts/utils/dom'

function validateInput(input, isValid) {
  if (isValid) {
    removeClass(input, 'error')
    addClass(input, 'success')
    setAttribute(input, 'aria-invalid', 'false')
  } else {
    removeClass(input, 'success')
    addClass(input, 'error')
    setAttribute(input, 'aria-invalid', 'true')
  }
}
```

### 2. 动态内容更新

```javascript
import { setText, setHTML, addClass } from '@wbytts/utils/dom'

function updateNotification(element, message, type) {
  setText(element, message)
  addClass(element, `notification-${type}`)
  addClass(element, 'show')
  
  setTimeout(() => {
    removeClass(element, 'show')
  }, 3000)
}
```

### 3. 响应式导航

```javascript
import { toggleClass, addEventListener } from '@wbytts/utils/dom'

const menuToggle = document.querySelector('.menu-toggle')
const navigation = document.querySelector('.navigation')

addEventListener(menuToggle, 'click', () => {
  toggleClass(navigation, 'open')
  toggleClass(menuToggle, 'active')
})
```

## 🔗 相关链接

- [BOM 模块示例](../bom/)
- [事件模块示例](../event/)
- [工具包文档](../../../README.md)
