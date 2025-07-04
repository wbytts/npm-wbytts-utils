// app.js
App({
  onLaunch() {
    console.log('🚀 @wbytts/utils 微信小程序示例启动')
    
    // 显示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log('登录成功', res.code)
      }
    })
  },

  onShow() {
    console.log('小程序显示')
  },

  onHide() {
    console.log('小程序隐藏')
  },

  onError(error) {
    console.error('小程序错误:', error)
  },

  globalData: {
    userInfo: null,
    version: '1.0.0',
    utilsVersion: '@wbytts/utils',
    features: {
      math: true,
      validate: true,
      time: true,
      utils: true
    }
  }
})
