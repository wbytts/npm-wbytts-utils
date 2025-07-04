<template>
  <div class="examples-container">
    <h2>BOM操作示例</h2>
    <p>展示浏览器对象模型相关的工具函数在Vue.js中的使用</p>

    <!-- URL参数解析示例 -->
    <div class="example-section">
      <h3>URL参数解析</h3>
      <div class="example-content">
        <div class="form-group">
          <label>测试URL:</label>
          <input
            v-model="testUrl"
            type="url"
            placeholder="输入要解析的URL"
            class="form-control"
            style="min-width: 400px;"
          />
          <button @click="parseUrl" class="btn btn-primary">
            解析参数
          </button>
        </div>

        <div v-if="urlResult" class="result success">
          <div class="code-output">
            <strong>解析结果:</strong><br>
            {{ JSON.stringify(urlResult, null, 2) }}
          </div>
        </div>

        <!-- 示例URL按钮 -->
        <div class="mt-2">
          <strong>示例URL:</strong>
          <div class="d-flex" style="gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
            <button
              v-for="(example, index) in exampleUrls"
              :key="index"
              @click="testUrl = example"
              class="btn btn-sm"
            >
              示例 {{ index + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 剪贴板操作示例 -->
    <div class="example-section">
      <h3>剪贴板操作</h3>
      <div class="example-content">
        <div class="form-group">
          <label>复制内容:</label>
          <textarea
            v-model="clipboardText"
            placeholder="输入要复制的文本"
            class="form-control"
            rows="3"
            style="min-width: 400px; resize: vertical;"
          ></textarea>
          <button
            @click="copyToClipboard"
            :disabled="!clipboardText.trim()"
            class="btn btn-primary"
          >
            {{ copying ? '复制中...' : '复制到剪贴板' }}
          </button>
        </div>

        <div v-if="copyStatus" class="result" :class="copySuccess ? 'success' : 'error'">
          <strong>{{ copyStatus }}</strong>
          <div v-if="copySuccess && clipboardText.length > 50" class="mt-1">
            <small>内容预览: "{{ clipboardText.substring(0, 50) }}..."</small>
          </div>
        </div>

        <!-- 预设文本按钮 -->
        <div class="mt-2">
          <strong>预设文本:</strong>
          <div class="d-flex" style="gap: 0.5rem; flex-wrap: wrap; margin-top: 0.5rem;">
            <button
              v-for="(preset, index) in presetTexts"
              :key="index"
              @click="clipboardText = preset"
              class="btn btn-sm"
            >
              预设 {{ index + 1 }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="example-section">
      <h3>Vue.js 集成说明</h3>
      <div class="code-example">
        <pre><code>// 使用组合式函数
import { useBOMUtils } from '@/composables/useUtils'

export default {
  setup() {
    const { urlParams, clipboardStatus, parseURL, copyText } = useBOMUtils()

    const handleParseUrl = () => {
      const params = parseURL(testUrl.value)
      console.log('解析结果:', params)
    }

    const handleCopy = async () => {
      const success = await copyText(clipboardText.value)
      console.log('复制结果:', success)
    }

    return {
      urlParams,
      clipboardStatus,
      handleParseUrl,
      handleCopy
    }
  }
}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useBOMUtils } from '../composables/useUtils'

export default {
  name: 'BOMExamples',
  setup() {
    // 使用组合式函数
    const { parseURL, copyText } = useBOMUtils()

    // 响应式数据
    const testUrl = ref('https://example.com?name=张三&age=25&hobby=读书&hobby=游戏')
    const urlResult = ref(null)

    const clipboardText = ref('Hello, @wbytts/utils!')
    const copying = ref(false)
    const copyStatus = ref('')
    const copySuccess = ref(false)

    // 示例URL
    const exampleUrls = [
      'https://example.com?name=张三&age=25&hobby=读书&hobby=游戏',
      'https://test.com?id=123&category=tech&tags=js,vue,react&active=true',
      'https://shop.com?product=laptop&price=5999&color=silver&size=13inch',
      'https://blog.com?page=1&limit=10&sort=date&order=desc&author=admin'
    ]

    // 预设文本
    const presetTexts = [
      'Hello, @wbytts/utils!',
      '这是一个测试文本，用于演示剪贴板功能。',
      '{"name": "张三", "age": 25, "city": "北京"}',
      'console.log("Hello World");'
    ]

    // 解析URL
    const parseUrl = () => {
      if (!testUrl.value.trim()) {
        urlResult.value = null
        return
      }

      try {
        const result = parseURL(testUrl.value)
        urlResult.value = result
        console.log('✅ URL解析完成:', result)
      } catch (error) {
        console.error('URL解析失败:', error)
        urlResult.value = { error: error.message }
      }
    }

    // 复制到剪贴板
    const copyToClipboard = async () => {
      if (!clipboardText.value.trim()) return

      copying.value = true
      copyStatus.value = ''

      try {
        const success = await copyText(clipboardText.value)

        if (success) {
          copyStatus.value = `✅ 复制成功! 已复制 ${clipboardText.value.length} 个字符`
          copySuccess.value = true
          console.log('✅ 文本复制成功')
        } else {
          copyStatus.value = '❌ 复制失败'
          copySuccess.value = false
        }
      } catch (error) {
        console.error('复制失败:', error)
        copyStatus.value = `❌ 复制失败: ${error.message}`
        copySuccess.value = false
      } finally {
        copying.value = false

        // 3秒后清除状态
        setTimeout(() => {
          copyStatus.value = ''
        }, 3000)
      }
    }

    // 组件挂载时初始化
    onMounted(() => {
      console.log('🌐 BOM示例组件已挂载')
      // 自动解析默认URL
      parseUrl()
    })

    return {
      // 数据
      testUrl,
      urlResult,
      clipboardText,
      copying,
      copyStatus,
      copySuccess,
      exampleUrls,
      presetTexts,

      // 方法
      parseUrl,
      copyToClipboard
    }
  }
}
</script>

<style scoped>
.code-example {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 4px;
  padding: 1rem;
  margin: 1rem 0;
}

.code-example pre {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
}

.code-example code {
  color: #495057;
}

textarea.form-control {
  font-family: inherit;
  line-height: 1.5;
}
</style>
