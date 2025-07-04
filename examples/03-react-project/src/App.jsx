import React, { useState } from 'react'
import DOMExamples from './components/DOMExamples'
import BOMExamples from './components/BOMExamples'
import MathExamples from './components/MathExamples'
import ValidateExamples from './components/ValidateExamples'
import TimeExamples from './components/TimeExamples'
import UtilsExamples from './components/UtilsExamples'

function App() {
  const [activeTab, setActiveTab] = useState('dom')

  const tabs = [
    { id: 'dom', label: 'DOM操作', component: DOMExamples },
    { id: 'bom', label: 'BOM操作', component: BOMExamples },
    { id: 'math', label: '数学计算', component: MathExamples },
    { id: 'validate', label: '数据验证', component: ValidateExamples },
    { id: 'time', label: '时间处理', component: TimeExamples },
    { id: 'utils', label: '通用工具', component: UtilsExamples }
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component

  // 键盘快捷键
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.key >= '1' && e.key <= '6') {
        e.preventDefault()
        const index = parseInt(e.key) - 1
        if (tabs[index]) {
          setActiveTab(tabs[index].id)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  return (
    <div className="app">
      {/* 头部 */}
      <header className="app-header">
        <div className="container">
          <h1>@wbytts/utils React 示例</h1>
          <p>展示工具包在React项目中的使用方法</p>
        </div>
      </header>

      {/* 导航标签 */}
      <nav className="app-nav">
        <div className="container">
          <div className="nav-tabs">
            {tabs.map((tab, index) => (
              <button
                key={tab.id}
                className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
                title={`快捷键: Ctrl+${index + 1}`}
              >
                {tab.label}
                <span className="shortcut">Ctrl+{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* 主要内容 */}
      <main className="app-main">
        <div className="container">
          {ActiveComponent && <ActiveComponent />}
        </div>
      </main>

      {/* 页脚 */}
      <footer className="app-footer">
        <div className="container">
          <p>
            基于 React 18 + Vite 构建 | 
            <a href="https://github.com/wbytts/npm-wbytts-utils" target="_blank" rel="noopener noreferrer">
              GitHub
            </a> | 
            <a href="../README.md">更多示例</a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
