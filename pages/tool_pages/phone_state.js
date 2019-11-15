// pages/store_pages/store_mainpage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerParas: {
      headerBg: 'black',
      titleText: '空间状态',
      titleColor: 'white',
    },
    showMask: false,
    isRequiring: false,

    horiData: {
      horiA1: 0,
      horiA2: 0,
      pointL: '134',
      pointT: '134',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


    // wx.startCompass();
    // wx.onCompassChange(
    //   function (res) {
    //     console.log(res);
    //   }
    // )

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const _this = this;

    wx.startDeviceMotionListening({interval: 'ui'});
    wx.onDeviceMotionChange(
      function (res) {
        let horiData = {};
        const PIF = 180 / Math.PI;
        const a = 1 / Math.tan(res.beta / PIF), b = 1 / Math.tan(res.gamma / PIF);  // 计算两个倾角的cot值
        const tanA1 = Math.abs(Math.sqrt(a*a + b*b) / a / b);
        const tanA2 = Math.abs(b / a);
        let horiA2 = (Math.atan(tanA2)*PIF);
        switch (true) {
          case res.beta > 0 && res.gamma > 0:
            // horiA2 = horiA2;
            break;
          case res.beta > 0 && res.gamma < 0:
            horiA2 = 180 - horiA2;
            break;
          case res.beta < 0 && res.gamma > 0:
            horiA2 = 360 - horiA2;
            break;
          case res.beta < 0 && res.gamma < 0:
            horiA2 = 180 + horiA2;
            break;
        }
        const len = Math.atan(tanA1)*PIF>10?10:Math.atan(tanA1)*PIF;
        horiData = {
          horiA1: (Math.atan(tanA1)*PIF).toFixed(1),
          horiA2: horiA2.toFixed(1),
          pointL: 134 + Math.cos(horiA2 / PIF) * len / 10 * 134,
          pointT: 134 + Math.sin(horiA2 / PIF) * len / 10 * 134,
        };
        _this.setData({
          horiData: horiData,
        });
      }
    );

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    wx.offDeviceMotionChange();
    wx.stopDeviceMotionListening();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  // onPageScroll: function (e) {
  //
  // },

  /**
   * 页面上拉触底事件的处理函数
   */
  // onReachBottom: function () {
  // },

  nothing () {},


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})