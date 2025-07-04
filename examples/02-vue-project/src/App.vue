<template>
  <div id="app">
    <!-- 头部 -->
    <header class="header">
      <div class="container">
        <h1>Vue.js 示例 - @wbytts/utils</h1>
        <p>展示如何在Vue.js项目中使用工具包</p>
      </div>
    </header>

    <!-- 导航 -->
    <nav class="nav">
      <div class="container">
        <div class="nav-tabs">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            :class="['nav-tab', { active: activeTab === tab.id }]"
            @click="activeTab = tab.id"
          >
            {{ tab.name }}
          </button>
        </div>
      </div>
    </nav>

    <!-- 主要内容 -->
    <main class="main">
      <div class="container">
        <div class="tab-content">
          <!-- DOM操作示例 -->
          <DOMExamples v-if="activeTab === 'dom'" />
          
          <!-- BOM操作示例 -->
          <BOMExamples v-if="activeTab === 'bom'" />
          
          <!-- 数学计算示例 -->
          <MathExamples v-if="activeTab === 'math'" />
          
          <!-- 数据验证示例 -->
          <ValidateExamples v-if="activeTab === 'validate'" />
          
          <!-- 时间处理示例 -->
          <TimeExamples v-if="activeTab === 'time'" />
          
          <!-- 通用工具示例 -->
          <UtilsExamples v-if="activeTab === 'utils'" />
        </div>
      </div>
    </main>

    <!-- 底部 -->
    <footer class="footer">
      <div class="container">
        <p>&copy; 2024 @wbytts/utils Vue.js 示例</p>
        <p>
          <a href="https://github.com/wbytts/npm-wbytts-utils" target="_blank">
            GitHub 仓库
          </a>
          |
          <a href="../README.md" target="_blank">
            更多示例
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import DOMExamples from './components/DOMExamples.vue'
import BOMExamples from './components/BOMExamples.vue'
import MathExamples from './components/MathExamples.vue'
import ValidateExamples from './components/ValidateExamples.vue'
import TimeExamples from './components/TimeExamples.vue'
import UtilsExamples from './components/UtilsExamples.vue'

export default {
  name: 'App',
  components: {
    DOMExamples,
    BOMExamples,
    MathExamples,
    ValidateExamples,
    TimeExamples,
    UtilsExamples
  },
  setup() {
    const activeTab = ref('dom')
    
    const tabs = [
      { id: 'dom', name: 'DOM操作' },
      { id: 'bom', name: 'BOM操作' },
      { id: 'math', name: '数学计算' },
      { id: 'validate', name: '数据验证' },
      { id: 'time', name: '时间处理' },
      { id: 'utils', name: '通用工具' }
    ]

    // 键盘快捷键支持
    const handleKeydown = (event) => {
      if (event.ctrlKey && event.key >= '1' && event.key <= '6') {
        event.preventDefault()
        const index = parseInt(event.key) - 1
        if (tabs[index]) {
          activeTab.value = tabs[index].id
        }
      }
    }

    onMounted(() => {
      document.addEventListener('keydown', handleKeydown)
      console.log('🎯 Vue.js 应用已挂载')
      console.log('💡 提示: 使用 Ctrl+1-6 快速切换标签页')
    })

    return {
      activeTab,
      tabs
    }
  }
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem 0;
  text-align: center;
}

.header h1 {
  margin: 0 0 0.5rem 0;
  font-size: 2.5rem;
  font-weight: 600;
}

.header p {
  margin: 0;
  font-size: 1.1rem;
  opacity: 0.9;
}

.nav {
  background: white;
  border-bottom: 1px solid #e0e0e0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-tabs {
  display: flex;
  gap: 0;
}

.nav-tab {
  padding: 1rem 1.5rem;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  border-bottom: 3px solid transparent;
  transition: all 0.3s ease;
}

.nav-tab:hover {
  color: #667eea;
  background: #f8f9fa;
}

.nav-tab.active {
  color: #667eea;
  border-bottom-color: #667eea;
  font-weight: 600;
}

.main {
  min-height: calc(100vh - 200px);
  padding: 2rem 0;
}

.tab-content {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.footer {
  background: #f8f9fa;
  border-top: 1px solid #e0e0e0;
  padding: 2rem 0;
  text-align: center;
  color: #666;
}

.footer p {
  margin: 0.5rem 0;
}

.footer a {
  color: #667eea;
  text-decoration: none;
  margin: 0 0.5rem;
}

.footer a:hover {
  text-decoration: underline;
}
</style>
