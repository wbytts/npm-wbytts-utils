// pages/index/index.js
const app = getApp()

Page({
  data: {
    version: '1.0.0',
    features: [
      {
        id: 'math',
        title: '数学计算',
        desc: '提供常用的数学计算函数',
        icon: '🧮',
        path: '/pages/math/index',
        functions: ['sum', 'average', 'factorial', 'random']
      },
      {
        id: 'validate',
        title: '数据验证',
        desc: '提供各种数据格式验证功能',
        icon: '✅',
        path: '/pages/validate/index',
        functions: ['isPhoneNumber', 'isIdCard', 'isUrl', 'isEmail']
      },
      {
        id: 'time',
        title: '时间处理',
        desc: '提供时间格式化和计算功能',
        icon: '⏰',
        path: '/pages/time/index',
        functions: ['format', 'add', 'subtract', 'diff']
      },
      {
        id: 'utils',
        title: '通用工具',
        desc: '提供字符串、随机数等通用工具',
        icon: '🔧',
        path: '/pages/utils/index',
        functions: ['reverseString', 'mask', 'randomColor', 'detectDevice']
      }
    ],
    stats: {
      totalFunctions: 16,
      categories: 4,
      examples: 20
    }
  },

  onLoad() {
    console.log('首页加载')
    this.loadAppInfo()
  },

  onShow() {
    console.log('首页显示')
  },

  onShareAppMessage() {
    return {
      title: '@wbytts/utils 微信小程序示例',
      path: '/pages/index/index'
    }
  },

  onPullDownRefresh() {
    console.log('下拉刷新')
    this.loadAppInfo()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 1000)
  },

  // 加载应用信息
  loadAppInfo() {
    const globalData = app.globalData
    this.setData({
      version: globalData.version,
      utilsVersion: globalData.utilsVersion
    })
  },

  // 导航到功能页面
  navigateToFeature(e) {
    const { path } = e.currentTarget.dataset
    if (path) {
      wx.navigateTo({
        url: path,
        success: () => {
          console.log('导航成功:', path)
        },
        fail: (err) => {
          console.error('导航失败:', err)
          wx.showToast({
            title: '页面跳转失败',
            icon: 'error'
          })
        }
      })
    }
  },

  // 查看文档
  viewDocs() {
    wx.showModal({
      title: '查看文档',
      content: '请在浏览器中访问项目文档获取更多信息',
      showCancel: false,
      confirmText: '知道了'
    })
  },

  // 关于我们
  showAbout() {
    wx.showModal({
      title: '关于 @wbytts/utils',
      content: '这是一个功能丰富的 JavaScript 工具库，提供数学计算、数据验证、时间处理等常用功能。本示例展示了如何在微信小程序中使用这些工具。',
      showCancel: false,
      confirmText: '知道了'
    })
  },

  // 反馈建议
  showFeedback() {
    wx.showActionSheet({
      itemList: ['提交问题', '功能建议', '使用帮助'],
      success: (res) => {
        const actions = ['提交问题', '功能建议', '使用帮助']
        wx.showToast({
          title: `选择了: ${actions[res.tapIndex]}`,
          icon: 'success'
        })
      }
    })
  },

  // 复制链接
  copyLink() {
    wx.setClipboardData({
      data: 'https://github.com/wbytts/npm-wbytts-utils',
      success: () => {
        wx.showToast({
          title: '链接已复制',
          icon: 'success'
        })
      }
    })
  }
})
