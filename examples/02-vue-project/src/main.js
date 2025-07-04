import { createApp } from 'vue'
import App from './App.vue'
import './styles/main.css'

const app = createApp(App)

// 全局配置
app.config.globalProperties.$utils = '@wbytts/utils'

// 挂载应用
app.mount('#app')

console.log('🚀 Vue.js 示例应用已启动')
console.log('📦 使用工具包: @wbytts/utils')
console.log('🔧 构建工具: Vite + Vue 3')
