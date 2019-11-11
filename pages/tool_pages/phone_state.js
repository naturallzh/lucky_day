// pages/store_pages/store_mainpage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerParas: {
      headerBg: 'white',
      titleText: '空间状态',
      titleColor: 'black',
    },
    showMask: false,
    isRequiring: false,

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
    wx.startDeviceMotionListening();
    wx.onDeviceMotionChange(
      function (res) {
        console.log(res);
      }
    );
    // wx.startGyroscope();
    // wx.onGyroscopeChange(
    //   function (res) {
    //     console.log(res);
    //   }
    // )
    // wx.startAccelerometer();
    // wx.onAccelerometerChange(
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