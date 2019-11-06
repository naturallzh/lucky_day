const app = getApp();
Component({
  properties: {
    headerParas: {
      type: Object,
      value: {},
    }
  },
  data: {
    showGoBack: app.globalData.share && getCurrentPages().length > 1,  // 获取是否是通过分享进入的小程序
    height: wx.getMenuButtonBoundingClientRect().bottom + 8,
    buttonStyle: 0,     // 左上角按钮的显示模式 0 只有回到主页 1 两个都有 2 只有回到上一页
  },
  attached: function () {
  },
  methods: {
    processButtonStyle () {},

    goBack () {
      wx.navigateBack();
    },
    goHome () {
      wx.navigateTo({url: '/pages/main_page/front_page',});
    }
  }

})
