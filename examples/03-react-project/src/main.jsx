import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'

// 创建根节点并渲染应用
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

console.log('🚀 React 示例应用已启动')
console.log('📦 使用工具包: @wbytts/utils')
console.log('🔧 构建工具: Vite + React 18')
