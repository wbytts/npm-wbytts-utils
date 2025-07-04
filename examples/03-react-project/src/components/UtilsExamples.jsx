import React, { useState, useEffect } from 'react'
import { useGeneralUtils } from '../hooks/useUtils'

function UtilsExamples() {
  const { deviceInfo, randomResults, detectDevice, processString, generateRandom } = useGeneralUtils()
  const [stringInput, setStringInput] = useState('Hello World')
  const [stringResult, setStringResult] = useState('')
  const [randomRange, setRandomRange] = useState('1-100')

  // 检测设备
  const handleDetectDevice = () => {
    detectDevice()
  }

  // 反转字符串
  const handleReverseString = () => {
    if (stringInput.trim()) {
      const result = processString(stringInput, 'reverse')
      setStringResult(`反转结果: "${result}"`)
    }
  }

  // 掩码字符串
  const handleMaskString = () => {
    if (stringInput.trim()) {
      const result = processString(stringInput, 'mask')
      setStringResult(`掩码结果: "${result}"`)
    }
  }

  // 生成随机数
  const handleGenerateRandomNumber = () => {
    if (randomRange.includes('-')) {
      const [min, max] = randomRange.split('-').map(n => parseInt(n.trim()))
      if (!isNaN(min) && !isNaN(max) && min < max) {
        generateRandom('number', min, max)
      }
    }
  }

  // 生成随机颜色
  const handleGenerateRandomColor = () => {
    generateRandom('color')
  }

  useEffect(() => {
    console.log('🔧 通用工具示例组件已挂载')
  }, [])

  return (
    <div className="examples-container">
      <h2>通用工具示例</h2>
      <p>展示通用工具函数在React中的使用</p>

      {/* 设备检测 */}
      <div className="example-section">
        <h3>设备检测</h3>
        <div className="example-content">
          <div className="form-group">
            <button onClick={handleDetectDevice} className="btn btn-primary">
              检测设备
            </button>
          </div>
          
          {deviceInfo && (
            <div className="result success">
              <div className="code-output">
                <strong>设备信息:</strong><br/>
                设备类型: {deviceInfo.type}<br/>
                平台: {deviceInfo.platform}<br/>
                用户代理: {deviceInfo.userAgent.substring(0, 100)}...
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 字符串处理 */}
      <div className="example-section">
        <h3>字符串处理</h3>
        <div className="example-content">
          <div className="form-group">
            <label>输入文本:</label>
            <input
              type="text"
              value={stringInput}
              onChange={(e) => setStringInput(e.target.value)}
              placeholder="输入要处理的文本"
              className="form-control"
              style={{ minWidth: '300px' }}
            />
            <button onClick={handleReverseString} className="btn btn-primary">
              反转
            </button>
            <button onClick={handleMaskString} className="btn btn-success">
              掩码
            </button>
          </div>
          
          {stringResult && (
            <div className="result success">
              <div className="code-output">{stringResult}</div>
            </div>
          )}
        </div>
      </div>

      {/* 随机生成 */}
      <div className="example-section">
        <h3>随机生成</h3>
        <div className="example-content">
          <div className="form-group">
            <label>数字范围:</label>
            <input
              type="text"
              value={randomRange}
              onChange={(e) => setRandomRange(e.target.value)}
              placeholder="输入范围 (如: 1-100)"
              className="form-control"
            />
            <button onClick={handleGenerateRandomNumber} className="btn btn-primary">
              生成随机数
            </button>
            <button onClick={handleGenerateRandomColor} className="btn btn-success">
              生成随机颜色
            </button>
          </div>
          
          {randomResults.length > 0 && (
            <div className="result success">
              <div className="code-output">
                <strong>最近生成的结果:</strong><br/>
                {randomResults.slice(-5).map((result, index) => (
                  <div key={index}>
                    {result.type}: {result.result}
                    {result.type === 'color' && (
                      <span
                        style={{
                          backgroundColor: result.result,
                          display: 'inline-block',
                          width: '20px',
                          height: '20px',
                          marginLeft: '8px',
                          border: '1px solid #ccc'
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 示例数据 */}
      <div className="example-section">
        <h3>示例数据</h3>
        <div className="example-content">
          <div className="mb-2">
            <strong>字符串示例:</strong>
            <div className="d-flex" style={{ gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['Hello World', '这是一个测试文本', '13800138000'].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setStringInput(example)}
                  className="btn btn-sm"
                >
                  示例 {index + 1}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-2">
            <strong>数字范围示例:</strong>
            <div className="d-flex" style={{ gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['1-10', '1-100', '0-255'].map((range) => (
                <button
                  key={range}
                  onClick={() => setRandomRange(range)}
                  className="btn btn-sm"
                >
                  {range}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UtilsExamples
