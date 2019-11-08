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
    buttonStyle: -1,     // 左上角按钮的显示模式 默认-1不显示胶囊按钮; 0只有回到主页; 1两个都有; 2只有回到上一页
  },
  attached: function () {
    this.processButtonStyle();
  },
  methods: {
    processButtonStyle () {
      let showBack;
      let showHome;
      if (getCurrentPages().length > 1 && !app.globalData.share) {showBack = true}
      if (this.properties.headerParas.showBack !== undefined) {showBack = this.properties.headerParas.showBack}
      if (this.properties.headerParas.showHome !== false) {showHome = true}

      if (showBack && !showHome) {
        this.setData({buttonStyle:2});
        return;
      }
      if (!showBack && showHome) {
        this.setData({buttonStyle:0});
        return;
      }
      if (showBack && showHome) {
        this.setData({buttonStyle:1});
        return;
      }
    },

    goBack () {
      wx.navigateBack();
    },
    goHome () {
      wx.switchTab({url: '/pages/main_page/front_page',});
    }
  }

})
