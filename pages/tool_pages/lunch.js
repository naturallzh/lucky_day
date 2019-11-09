// pages/store_pages/store_mainpage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerParas: {
      headerBg: 'white',
      titleText: '中午吃什么',
      titleColor: 'black',
    },
    showMask: false,
    isRequiring: false,


    dataList: [],
    timer: null,
    idx: 0,
    flag: true,
    blurStr: 'blur(12rpx)',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  initDataList () {
    const lunchData = wx.getStorageSync('lunchData');
    let dataList = [];
    for (let i=0;i<lunchData.defaultPool.length;i++) {
      for (let j=0;j<lunchData.defaultPool[i].classArr.length;j++) {
        lunchData.defaultPoolSelect[i][j]?dataList.push(lunchData.defaultPool[i].classArr[j]):'';
        //console.log(lunchData.defaultPool[i].classArr[j])
      }
    }
    for (let i=0;i<lunchData.customPool.length;i++) {
      lunchData.customPoolSelect[i]?dataList.push(lunchData.customPool[i]):'';
    }
    this.setData({dataList: dataList});
  },

  getRes () {
    if (this.data.flag) {
      clearInterval(this.data.timer);
      this.setData({
        flag: false,
        blurStr: 'blur(0rpx)',
      });
    }
    else {
      this.data.timer = setInterval(()=>{
        const idx = (this.data.idx + 1) % this.data.dataList.length;
        this.setData({idx: idx});
      },100);
      this.setData({
        flag: true,
        blurStr: 'blur(12rpx)',
      });
    }
  },

  gotoSetting () {
    wx.navigateTo({
      url: '/pages/tool_pages/lunch_data_setting'
    })
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
    this.initDataList();
    if (this.data.dataList.length<1 || !this.data.flag) {return;}
    this.data.timer = setInterval(()=>{
      const idx = Math.floor(Math.random()*this.data.dataList.length);
      this.setData({idx: idx});
    },100);
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    clearInterval(this.data.timer);
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