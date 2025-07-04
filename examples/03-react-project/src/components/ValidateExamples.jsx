import React, { useState } from 'react'
import { useValidateUtils } from '../hooks/useUtils'

function ValidateExamples() {
  const { validationResults, validateIdCard, validatePhone, validateURL } = useValidateUtils()
  const [idCardInput, setIdCardInput] = useState('')
  const [phoneInput, setPhoneInput] = useState('')
  const [urlInput, setUrlInput] = useState('')

  const handleValidateIdCard = () => {
    if (idCardInput.trim()) {
      validateIdCard(idCardInput)
    }
  }

  const handleValidatePhone = () => {
    if (phoneInput.trim()) {
      validatePhone(phoneInput)
    }
  }

  const handleValidateURL = () => {
    if (urlInput.trim()) {
      validateURL(urlInput)
    }
  }

  return (
    <div className="examples-container">
      <h2>数据验证示例</h2>
      <p>展示数据验证相关的工具函数在React中的使用</p>

      {/* 身份证验证 */}
      <div className="example-section">
        <h3>身份证验证</h3>
        <div className="example-content">
          <div className="form-group">
            <label>身份证号:</label>
            <input
              type="text"
              value={idCardInput}
              onChange={(e) => setIdCardInput(e.target.value)}
              placeholder="输入身份证号码"
              className="form-control"
              maxLength="18"
            />
            <button onClick={handleValidateIdCard} className="btn btn-primary">
              验证
            </button>
          </div>
          
          {validationResults.idCard && (
            <div className={`result ${validationResults.idCard.isValid ? 'success' : 'error'}`}>
              <strong>{validationResults.idCard.message}</strong>
            </div>
          )}
        </div>
      </div>

      {/* 手机号验证 */}
      <div className="example-section">
        <h3>手机号验证</h3>
        <div className="example-content">
          <div className="form-group">
            <label>手机号:</label>
            <input
              type="tel"
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
              placeholder="输入手机号码"
              className="form-control"
            />
            <button onClick={handleValidatePhone} className="btn btn-primary">
              验证
            </button>
          </div>
          
          {validationResults.phone && (
            <div className={`result ${validationResults.phone.isValid ? 'success' : 'error'}`}>
              <strong>{validationResults.phone.message}</strong>
            </div>
          )}
        </div>
      </div>

      {/* URL验证 */}
      <div className="example-section">
        <h3>URL验证</h3>
        <div className="example-content">
          <div className="form-group">
            <label>URL地址:</label>
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="输入URL地址"
              className="form-control"
              style={{ minWidth: '300px' }}
            />
            <button onClick={handleValidateURL} className="btn btn-primary">
              验证
            </button>
          </div>
          
          {validationResults.url && (
            <div className={`result ${validationResults.url.isValid ? 'success' : 'error'}`}>
              <strong>{validationResults.url.message}</strong>
            </div>
          )}
        </div>
      </div>

      {/* 示例数据 */}
      <div className="example-section">
        <h3>示例数据</h3>
        <div className="example-content">
          <div className="mb-2">
            <strong>身份证示例:</strong>
            <div className="d-flex" style={{ gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['11010519491231002X', '440524188001010014'].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setIdCardInput(example)}
                  className="btn btn-sm"
                >
                  示例 {index + 1}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-2">
            <strong>手机号示例:</strong>
            <div className="d-flex" style={{ gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['13800138000', '15912345678'].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setPhoneInput(example)}
                  className="btn btn-sm"
                >
                  示例 {index + 1}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-2">
            <strong>URL示例:</strong>
            <div className="d-flex" style={{ gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
              {['https://www.example.com', 'http://localhost:3000'].map((example, index) => (
                <button
                  key={index}
                  onClick={() => setUrlInput(example)}
                  className="btn btn-sm"
                >
                  示例 {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ValidateExamples
