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

    x: 0,
    y: 0,
    test: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const _this = this;

    wx.startCompass();
    wx.onCompassChange(
      function (res) {
        console.log(res);
      }
    )

    // wx.startDeviceMotionListening();
    // wx.onDeviceMotionChange(
    //   function (res) {
    //     _this.setData({
    //       x: res.beta.toFixed(2),
    //       y: res.gamma.toFixed(2),
    //     });
    //   }
    // );
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
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
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