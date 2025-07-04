<template>
  <div class="examples-container">
    <h2>DOM操作示例</h2>
    <p>展示DOM相关的工具函数在Vue.js中的使用</p>

    <!-- 数字动画示例 -->
    <div class="example-section">
      <h3>数字动画</h3>
      <div class="example-content">
        <div class="form-group">
          <label>目标数值:</label>
          <input
            v-model.number="animateTarget"
            type="number"
            placeholder="输入目标数值"
            class="form-control"
          />
          <button
            @click="startAnimation"
            :disabled="isAnimating"
            class="btn btn-primary"
          >
            {{ isAnimating ? '动画中...' : '开始动画' }}
          </button>
        </div>
        
        <div v-if="animateResult !== null" class="result success">
          <strong>当前值: {{ Math.round(animateResult) }}</strong>
          <div v-if="!isAnimating" class="mt-1">
            <small>✅ 动画完成！从 0 到 {{ animateTarget }}</small>
          </div>
        </div>
      </div>
    </div>

    <!-- 触摸控制示例 -->
    <div class="example-section">
      <h3>触摸滚动控制</h3>
      <div class="example-content">
        <div class="form-group">
          <button
            @click="disableTouch"
            :disabled="!touchEnabled"
            class="btn btn-warning"
          >
            禁用触摸滚动
          </button>
          <button
            @click="enableTouch"
            :disabled="touchEnabled"
            class="btn btn-success"
          >
            启用触摸滚动
          </button>
        </div>
        
        <div class="result" :class="touchEnabled ? 'success' : 'error'">
          <strong>触摸滚动状态: {{ touchEnabled ? '启用' : '禁用' }}</strong>
          <div class="mt-1">
            <small>
              {{ touchEnabled ? '✅ 可以正常滚动页面' : '❌ 页面滚动已被禁用' }}
            </small>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览示例 -->
    <div class="example-section">
      <h3>图片预览</h3>
      <div class="example-content">
        <div class="image-gallery">
          <div
            v-for="(image, index) in previewImages"
            :key="index"
            class="image-item"
            @click="previewImage(index)"
            @keydown.enter="previewImage(index)"
            @keydown.space.prevent="previewImage(index)"
            tabindex="0"
            role="button"
            :aria-label="`预览图片 ${index + 1}`"
          >
            <img
              :src="image.url"
              :alt="image.alt"
              class="preview-img"
            />
            <div class="image-overlay">
              <span>点击预览</span>
            </div>
          </div>
        </div>
        
        <div v-if="previewStatus" class="result success">
          <strong>{{ previewStatus }}</strong>
        </div>
      </div>
    </div>

    <!-- 使用说明 -->
    <div class="example-section">
      <h3>Vue.js 集成说明</h3>
      <div class="code-example">
        <pre><code>// 在Vue组件中使用
import { animateNumber, disableTouchMove, enableTouchMove, previewImage } from '@wbytts/utils/dom'

export default {
  setup() {
    const animateResult = ref(0)
    const isAnimating = ref(false)
    
    const startAnimation = () => {
      isAnimating.value = true
      animateNumber({
        from: 0,
        to: 1000,
        duration: 2000,
        onUpdate: (value) => {
          animateResult.value = value
        },
        onComplete: () => {
          isAnimating.value = false
        }
      })
    }
    
    return { animateResult, isAnimating, startAnimation }
  }
}</code></pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import { animateNumber, disableTouchMove, enableTouchMove, previewImage } from '@wbytts/utils/dom'

export default {
  name: 'DOMExamples',
  setup() {
    // 数字动画相关
    const animateTarget = ref(1000)
    const animateResult = ref(null)
    const isAnimating = ref(false)
    
    // 触摸控制相关
    const touchEnabled = ref(true)
    
    // 图片预览相关
    const previewStatus = ref('')
    const previewImages = ref([
      {
        url: 'https://picsum.photos/300/200?random=1',
        alt: '示例图片 1'
      },
      {
        url: 'https://picsum.photos/300/200?random=2',
        alt: '示例图片 2'
      },
      {
        url: 'https://picsum.photos/300/200?random=3',
        alt: '示例图片 3'
      },
      {
        url: 'https://picsum.photos/300/200?random=4',
        alt: '示例图片 4'
      }
    ])

    // 开始数字动画
    const startAnimation = () => {
      if (isAnimating.value) return
      
      isAnimating.value = true
      animateResult.value = 0
      
      try {
        animateNumber({
          from: 0,
          to: animateTarget.value || 1000,
          duration: 2000,
          onUpdate: (value) => {
            animateResult.value = value
          },
          onComplete: () => {
            isAnimating.value = false
            console.log('✅ 数字动画完成')
          }
        })
      } catch (error) {
        console.error('数字动画失败:', error)
        isAnimating.value = false
      }
    }

    // 禁用触摸滚动
    const disableTouch = () => {
      try {
        disableTouchMove()
        touchEnabled.value = false
        console.log('✅ 触摸滚动已禁用')
      } catch (error) {
        console.error('禁用触摸滚动失败:', error)
      }
    }

    // 启用触摸滚动
    const enableTouch = () => {
      try {
        enableTouchMove()
        touchEnabled.value = true
        console.log('✅ 触摸滚动已启用')
      } catch (error) {
        console.error('启用触摸滚动失败:', error)
      }
    }

    // 预览图片
    const previewImageHandler = (index) => {
      try {
        const imageUrls = previewImages.value.map(img => img.url)
        
        previewImage({
          urls: imageUrls,
          current: index,
          onClose: () => {
            previewStatus.value = '图片预览已关闭'
            setTimeout(() => {
              previewStatus.value = ''
            }, 3000)
            console.log('图片预览已关闭')
          },
          onSwitch: (currentIndex) => {
            previewStatus.value = `正在查看第 ${currentIndex + 1} 张图片`
            console.log('切换到图片:', currentIndex)
          }
        })
        
        previewStatus.value = `打开图片预览 (${index + 1}/${imageUrls.length})`
        console.log('🖼️ 打开图片预览，当前索引:', index)
        
      } catch (error) {
        console.error('图片预览失败:', error)
        previewStatus.value = '图片预览功能暂时不可用'
        setTimeout(() => {
          previewStatus.value = ''
        }, 3000)
      }
    }

    // 组件挂载时的初始化
    onMounted(() => {
      console.log('🎨 DOM示例组件已挂载')
    })

    // 组件卸载时的清理
    onUnmounted(() => {
      if (touchEnabled.value === false) {
        enableTouchMove()
      }
      console.log('🎨 DOM示例组件已卸载')
    })

    return {
      // 数字动画
      animateTarget,
      animateResult,
      isAnimating,
      startAnimation,
      
      // 触摸控制
      touchEnabled,
      disableTouch,
      enableTouch,
      
      // 图片预览
      previewImages,
      previewStatus,
      previewImage: previewImageHandler
    }
  }
}
</script>

<style scoped>
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.image-item {
  position: relative;
  cursor: pointer;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease;
}

.image-item:hover {
  transform: scale(1.05);
}

.image-item:focus {
  outline: 2px solid #667eea;
  outline-offset: 2px;
}

.preview-img {
  width: 100%;
  height: 150px;
  object-fit: cover;
  display: block;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.image-item:hover .image-overlay,
.image-item:focus .image-overlay {
  opacity: 1;
}

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
</style>
