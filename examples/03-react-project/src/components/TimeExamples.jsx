import React, { useState, useEffect } from 'react'
import { useTimeUtils } from '../hooks/useUtils'

function TimeExamples() {
  const { currentTime, updateCurrentTime, formatTime, calculateTime } = useTimeUtils()
  const [daysInput, setDaysInput] = useState(7)
  const [customFormat, setCustomFormat] = useState('YYYY-MM-DD HH:mm:ss')
  const [calculationResult, setCalculationResult] = useState('')
  const [formatResult, setFormatResult] = useState('')

  // 更新时间
  const handleUpdateTime = () => {
    updateCurrentTime()
  }

  // 加天数
  const handleAddDays = () => {
    const result = calculateTime(daysInput, 'day')
    if (result) {
      setCalculationResult(`加 ${daysInput} 天后: ${formatTime(result, 'YYYY-MM-DD HH:mm:ss dddd')}`)
    }
  }

  // 减天数
  const handleSubtractDays = () => {
    const result = calculateTime(-daysInput, 'day')
    if (result) {
      setCalculationResult(`减 ${daysInput} 天后: ${formatTime(result, 'YYYY-MM-DD HH:mm:ss dddd')}`)
    }
  }

  // 应用自定义格式
  const handleApplyFormat = () => {
    if (customFormat.trim()) {
      try {
        const result = formatTime(currentTime, customFormat)
        setFormatResult(result)
      } catch (error) {
        setFormatResult('格式错误')
      }
    }
  }

  useEffect(() => {
    console.log('⏰ 时间示例组件已挂载')
  }, [])

  return (
    <div className="examples-container">
      <h2>时间处理示例</h2>
      <p>展示时间处理相关的工具函数在React中的使用</p>

      {/* 当前时间显示 */}
      <div className="example-section">
        <h3>当前时间</h3>
        <div className="example-content">
          <div className="form-group">
            <button onClick={handleUpdateTime} className="btn btn-primary">
              刷新时间
            </button>
          </div>
          
          <div className="result success">
            <div className="code-output">
              <strong>当前时间:</strong><br/>
              标准格式: {formatTime(currentTime, 'YYYY-MM-DD HH:mm:ss')}<br/>
              中文格式: {formatTime(currentTime, 'YYYY年MM月DD日 HH:mm:ss')}<br/>
              相对时间: {currentTime.fromNow()}<br/>
              Unix时间戳: {currentTime.unix()}
            </div>
          </div>
        </div>
      </div>

      {/* 时间计算 */}
      <div className="example-section">
        <h3>时间计算</h3>
        <div className="example-content">
          <div className="form-group">
            <label>天数:</label>
            <input
              type="number"
              value={daysInput}
              onChange={(e) => setDaysInput(Number(e.target.value))}
              className="form-control"
            />
            <button onClick={handleAddDays} className="btn btn-primary">
              加天数
            </button>
            <button onClick={handleSubtractDays} className="btn btn-success">
              减天数
            </button>
          </div>
          
          {calculationResult && (
            <div className="result success">
              <div className="code-output">{calculationResult}</div>
            </div>
          )}
        </div>
      </div>

      {/* 时间格式化 */}
      <div className="example-section">
        <h3>自定义格式化</h3>
        <div className="example-content">
          <div className="form-group">
            <label>格式:</label>
            <input
              type="text"
              value={customFormat}
              onChange={(e) => setCustomFormat(e.target.value)}
              placeholder="输入时间格式"
              className="form-control"
              style={{ minWidth: '250px' }}
            />
            <button onClick={handleApplyFormat} className="btn btn-primary">
              应用格式
            </button>
          </div>
          
          {formatResult && (
            <div className="result success">
              <strong>格式化结果:</strong> {formatResult}
            </div>
          )}

          {/* 常用格式 */}
          <div className="mt-2">
            <strong>常用格式:</strong>
            <div className="d-flex" style={{ gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['YYYY-MM-DD', 'DD/MM/YYYY', 'MMM DD, YYYY', 'HH:mm:ss'].map((format) => (
                <button
                  key={format}
                  onClick={() => setCustomFormat(format)}
                  className="btn btn-sm"
                >
                  {format}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimeExamples
