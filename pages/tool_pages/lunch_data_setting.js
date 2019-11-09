// pages/store_pages/store_mainpage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerParas: {
      headerBg: 'white',
      titleText: '数据设置',
      titleColor: 'black',
    },
    showMask: false,
    isRequiring: false,

    lunchData: {},

    defaultTitleStat: [],           // 一级类目显示状态
    customTitleStat: true,          // 自定义大类显示状态
    // defaultPoolSelectTemp: [],
    // customPoolTemp: [],
    // customPoolSelectTemp: [],

    isDeleting: false,              // 是否处于删除自定义品类的状态
    isAdding: false,                // 是否处于增加自定义品类的状态

    newFood: '',                    // 新增自定义品类名称
  },

  processDefaultTitleStat () {
    const defaultTitleStat = [];
    for (let i=0;i<this.data.lunchData.defaultPoolSelect.length;i++) {
      defaultTitleStat[i] = false;
      for (let j=0;j<this.data.lunchData.defaultPoolSelect[i].length;j++) {
        defaultTitleStat[i] = defaultTitleStat[i] || this.data.lunchData.defaultPoolSelect[i][j];
        if (defaultTitleStat[i]) {break;}
      }
    }
    this.setData({defaultTitleStat: defaultTitleStat});
  },

  processCustomTitleStat () {
    if (this.data.lunchData.customPool.length<1) {return;}
    let res = false;
    for (let i=0;i<this.data.lunchData.customPool.length;i++) {
      res = res || this.data.lunchData.customPoolSelect[i];
      if (res) {break;}
    }
    this.setData({customTitleStat: res});
  },

  changeDefaultTitleStat (e) {
    const idx = e.currentTarget.dataset.idx;
    const lunchData = this.data.lunchData;
    for (let i=0;i<lunchData.defaultPoolSelect[idx].length;i++) {
      lunchData.defaultPoolSelect[idx][i] = !this.data.defaultTitleStat[idx];
    }
    this.setData({
      lunchData: lunchData,
      ['defaultTitleStat['+idx+']']: !this.data.defaultTitleStat[idx],
    });
    this.updateData();
  },

  changeCustomTitleStat () {
    if (this.data.lunchData.customPool.length<1) {return;}
    const lunchData = this.data.lunchData;
    for (let i=0;i<lunchData.customPoolSelect.length;i++) {
      lunchData.customPoolSelect[i] = !this.data.customTitleStat;
    }
    this.setData({
      lunchData: lunchData,
      customTitleStat: !this.data.customTitleStat,
    });
    this.updateData();
  },

  changeDefaultSubStat (e) {
    const lunchData = this.data.lunchData;
    const idx1 = e.currentTarget.dataset.idx1;
    const idx2 = e.currentTarget.dataset.idx2;
    lunchData.defaultPoolSelect[idx1][idx2] = !lunchData.defaultPoolSelect[idx1][idx2];

    this.setData({lunchData: lunchData});
    this.processDefaultTitleStat();
    this.updateData();
  },

  changeCustomSubStat (e) {
    const lunchData = this.data.lunchData;
    const idx = e.currentTarget.dataset.idx;
    const _this = this;
    if (this.data.isDeleting) {
      wx.showModal({
        title: '确定要删除 ' + lunchData.customPool[idx] + ' 吗？',
        confirmColor: '#ff0000',
        success (res) {
          if (res.confirm) {
            lunchData.customPoolSelect.splice(idx,1);
            lunchData.customPool.splice(idx,1);
            _this.setData({lunchData: lunchData});
            _this.processCustomTitleStat();
            _this.updateData();
            // console.log('用户点击确定');
          } else if (res.cancel) {
            // console.log('用户点击取消');
          }
        }
      });
    }
    else {
      lunchData.customPoolSelect[idx] = !lunchData.customPoolSelect[idx];
      this.setData({lunchData: lunchData});
      this.processCustomTitleStat();
      this.updateData();
    }
  },

  openAdding () {
    if (this.data.isDeleting) {return;}
    this.setData({isAdding: true});
  },
  closeAdding () {this.setData({isAdding: false})},

  openDeleting () {
    if (this.data.lunchData.customPool.length<1) {return;}
    this.setData({isDeleting: true});
  },
  closeDeleting () {this.setData({isDeleting: false})},

  updateData () {
    wx.setStorageSync('lunchData',this.data.lunchData);
  },

  setNewFood (e) {
    this.setData({newFood: e.detail.value});
  },

  addNewFood () {
    if (this.data.newFood==='') {return;}
    const lunchData = this.data.lunchData;
    lunchData.customPool.push(this.data.newFood);
    lunchData.customPoolSelect.push(true);

    this.setData({
      lunchData: lunchData,
      newFood: '',
    });

    this.processCustomTitleStat();
    this.updateData();
    this.closeAdding();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.setData({lunchData: wx.getStorageSync('lunchData')});
    this.processDefaultTitleStat();
    this.processCustomTitleStat();
    console.log(wx.getStorageSync('lunchData'));
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
  // onShareAppMessage: function () {
  //
  // }
})