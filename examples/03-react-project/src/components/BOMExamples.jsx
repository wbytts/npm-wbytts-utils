import React, { useState } from 'react'
import { useBOMUtils } from '../hooks/useUtils'

function BOMExamples() {
  const { urlParams, clipboardStatus, parseURL, copyText } = useBOMUtils()
  const [testUrl, setTestUrl] = useState('https://example.com?name=张三&age=25&hobby=读书')
  const [clipboardText, setClipboardText] = useState('Hello, @wbytts/utils!')

  const handleParseUrl = () => {
    if (testUrl.trim()) {
      parseURL(testUrl)
    }
  }

  const handleCopy = async () => {
    if (clipboardText.trim()) {
      await copyText(clipboardText)
    }
  }

  return (
    <div className="examples-container">
      <h2>BOM操作示例</h2>
      <p>展示浏览器对象模型相关的工具函数在React中的使用</p>

      {/* URL参数解析 */}
      <div className="example-section">
        <h3>URL参数解析</h3>
        <div className="example-content">
          <div className="form-group">
            <label>测试URL:</label>
            <input
              type="url"
              value={testUrl}
              onChange={(e) => setTestUrl(e.target.value)}
              className="form-control"
              style={{ minWidth: '400px' }}
            />
            <button onClick={handleParseUrl} className="btn btn-primary">
              解析参数
            </button>
          </div>
          
          {Object.keys(urlParams).length > 0 && (
            <div className="result success">
              <div className="code-output">
                <strong>解析结果:</strong><br/>
                {JSON.stringify(urlParams, null, 2)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 剪贴板操作 */}
      <div className="example-section">
        <h3>剪贴板操作</h3>
        <div className="example-content">
          <div className="form-group">
            <label>复制内容:</label>
            <textarea
              value={clipboardText}
              onChange={(e) => setClipboardText(e.target.value)}
              className="form-control"
              rows="3"
              style={{ minWidth: '400px' }}
            />
            <button
              onClick={handleCopy}
              disabled={!clipboardText.trim()}
              className="btn btn-primary"
            >
              复制到剪贴板
            </button>
          </div>
          
          {clipboardStatus && (
            <div className={`result ${clipboardStatus.includes('成功') ? 'success' : 'error'}`}>
              <strong>{clipboardStatus}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BOMExamples
