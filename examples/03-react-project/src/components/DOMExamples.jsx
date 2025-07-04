import React, { useState, useEffect } from 'react'
import { useDOMUtils } from '../hooks/useUtils'

function DOMExamples() {
  const { 
    animationState, 
    touchEnabled, 
    startNumberAnimation, 
    toggleTouchMove, 
    showImagePreview,
    setTargetValue 
  } = useDOMUtils()

  const [targetValue, setTarget] = useState(1000)
  const [imageUrls] = useState([
    'https://picsum.photos/800/600?random=1',
    'https://picsum.photos/800/600?random=2',
    'https://picsum.photos/800/600?random=3'
  ])

  // 开始动画
  const handleStartAnimation = () => {
    setTargetValue(targetValue)
    startNumberAnimation({
      from: 0,
      to: targetValue,
      duration: 2000,
      onUpdate: (value) => {
        console.log('动画进度:', Math.round(value))
      },
      onComplete: () => {
        console.log('✅ 数字动画完成')
      }
    })
  }

  // 切换触摸
  const handleToggleTouch = () => {
    const newState = !touchEnabled
    const success = toggleTouchMove(newState)
    if (success) {
      console.log(`✅ 触摸${newState ? '启用' : '禁用'}成功`)
    }
  }

  // 预览图片
  const handlePreviewImage = (index = 0) => {
    const success = showImagePreview(imageUrls, index)
    if (success) {
      console.log('✅ 图片预览已打开')
    }
  }

  useEffect(() => {
    console.log('🎯 DOM示例组件已挂载')
  }, [])

  return (
    <div className="examples-container">
      <h2>DOM操作示例</h2>
      <p>展示DOM操作相关的工具函数在React中的使用</p>

      {/* 数字动画示例 */}
      <div className="example-section">
        <h3>数字动画</h3>
        <div className="example-content">
          <div className="form-group">
            <label>目标数值:</label>
            <input
              type="number"
              value={targetValue}
              onChange={(e) => setTarget(Number(e.target.value))}
              className="form-control"
              min="0"
              max="10000"
            />
            <button
              onClick={handleStartAnimation}
              disabled={animationState.isAnimating}
              className="btn btn-primary"
            >
              {animationState.isAnimating ? '动画中...' : '开始动画'}
            </button>
          </div>
          
          <div className="result success">
            <div className="code-output">
              <strong>当前数值:</strong> {Math.round(animationState.currentValue)}<br/>
              <strong>目标数值:</strong> {animationState.targetValue}<br/>
              <strong>动画状态:</strong> {animationState.isAnimating ? '进行中' : '已停止'}
            </div>
          </div>
        </div>
      </div>

      {/* 触摸控制示例 */}
      <div className="example-section">
        <h3>触摸控制</h3>
        <div className="example-content">
          <div className="form-group">
            <button
              onClick={handleToggleTouch}
              className={`btn ${touchEnabled ? 'btn-warning' : 'btn-success'}`}
            >
              {touchEnabled ? '禁用触摸滚动' : '启用触摸滚动'}
            </button>
          </div>
          
          <div className="result info">
            <strong>当前状态:</strong> 触摸滚动 {touchEnabled ? '已启用' : '已禁用'}
            <div className="mt-1">
              <small>
                {touchEnabled 
                  ? '页面可以正常滚动和触摸操作' 
                  : '页面触摸滚动已被禁用（适用于弹窗场景）'
                }
              </small>
            </div>
          </div>
        </div>
      </div>

      {/* 图片预览示例 */}
      <div className="example-section">
        <h3>图片预览</h3>
        <div className="example-content">
          <div className="form-group">
            <button
              onClick={() => handlePreviewImage(0)}
              className="btn btn-primary"
            >
              预览图片1
            </button>
            <button
              onClick={() => handlePreviewImage(1)}
              className="btn btn-primary"
            >
              预览图片2
            </button>
            <button
              onClick={() => handlePreviewImage(2)}
              className="btn btn-primary"
            >
              预览图片3
            </button>
          </div>
          
          <div className="result info">
            <strong>图片列表:</strong>
            <div className="mt-1">
              {imageUrls.map((url, index) => (
                <div key={index}>
                  <small>图片 {index + 1}: {url}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* React集成说明 */}
      <div className="example-section">
        <h3>React Hook 集成说明</h3>
        <div className="code-output">
          <pre>{`// 使用自定义Hook
import { useDOMUtils } from '../hooks/useUtils'

function MyComponent() {
  const { 
    animationState, 
    startNumberAnimation, 
    toggleTouchMove 
  } = useDOMUtils()
  
  const handleAnimation = () => {
    startNumberAnimation({
      from: 0,
      to: 1000,
      duration: 2000,
      onUpdate: (value) => console.log(value),
      onComplete: () => console.log('完成')
    })
  }
  
  return (
    <div>
      <p>当前值: {animationState.currentValue}</p>
      <button onClick={handleAnimation}>开始动画</button>
    </div>
  )
}`}</pre>
        </div>
      </div>
    </div>
  )
}

export default DOMExamples
