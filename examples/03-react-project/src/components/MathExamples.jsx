import React, { useState } from 'react'
import { useMathUtils } from '../hooks/useUtils'

function MathExamples() {
  const { calculationResult, calculationHistory, calculateSum, calculateAverage, calculateFactorial, clearHistory } = useMathUtils()
  const [numbersInput, setNumbersInput] = useState('1,2,3,4,5')
  const [factorialInput, setFactorialInput] = useState(5)

  const parseNumbers = (input) => {
    return input
      .split(',')
      .map(n => n.trim())
      .filter(n => n !== '')
      .map(n => parseFloat(n))
      .filter(n => !isNaN(n))
  }

  const handleSum = () => {
    const numbers = parseNumbers(numbersInput)
    if (numbers.length > 0) {
      calculateSum(...numbers)
    }
  }

  const handleAverage = () => {
    const numbers = parseNumbers(numbersInput)
    if (numbers.length > 0) {
      calculateAverage(...numbers)
    }
  }

  const handleFactorial = () => {
    if (factorialInput >= 0 && factorialInput <= 20) {
      calculateFactorial(factorialInput)
    }
  }

  return (
    <div className="examples-container">
      <h2>数学计算示例</h2>
      <p>展示数学计算相关的工具函数在React中的使用</p>

      {/* 基础运算 */}
      <div className="example-section">
        <h3>基础数学运算</h3>
        <div className="example-content">
          <div className="form-group">
            <label>数字列表:</label>
            <input
              type="text"
              value={numbersInput}
              onChange={(e) => setNumbersInput(e.target.value)}
              placeholder="输入数字，用逗号分隔"
              className="form-control"
            />
            <button onClick={handleSum} className="btn btn-primary">求和</button>
            <button onClick={handleAverage} className="btn btn-success">平均值</button>
          </div>
          
          {calculationResult !== null && (
            <div className="result success">
              <strong>计算结果:</strong> {calculationResult}
            </div>
          )}
        </div>
      </div>

      {/* 阶乘计算 */}
      <div className="example-section">
        <h3>阶乘计算</h3>
        <div className="example-content">
          <div className="form-group">
            <label>数字:</label>
            <input
              type="number"
              value={factorialInput}
              onChange={(e) => setFactorialInput(Number(e.target.value))}
              min="0"
              max="20"
              className="form-control"
            />
            <button
              onClick={handleFactorial}
              disabled={factorialInput < 0 || factorialInput > 20}
              className="btn btn-primary"
            >
              计算阶乘
            </button>
          </div>
        </div>
      </div>

      {/* 计算历史 */}
      {calculationHistory.length > 0 && (
        <div className="example-section">
          <h3>计算历史</h3>
          <div className="example-content">
            <button onClick={clearHistory} className="btn btn-warning mb-2">
              清除历史
            </button>
            <div className="result info">
              {calculationHistory.slice(-5).map((record, index) => (
                <div key={index} className="mb-1">
                  <strong>{record.type}:</strong> {record.input.join(', ')} = {record.result}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MathExamples
