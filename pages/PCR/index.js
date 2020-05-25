// pages/store_pages/store_mainpage.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerParas: {
      headerBg: 'white',
      titleText: '公主连接',
      titleColor: 'black',
    },
    showMask: false,
    isRequiring: false,
    loadingMask: true,

    mobData: [],
    combineRule: [],
    playerLvlData: [],
    guildHomeData: {},

    expCalcParas: {
      curLvl: "",
      curExp: "",
      tarLvl: "",
      wipeMaxLvlUpSpirit: true,
    },
    spiritGetParas: {
      dailyQuestSpiritDouble: false,
      dailyQuestExpDouble: false,
      tableLvl: 10,
      FoodNum: 3,
      stone: "",
    },
    expRequire: ["--", "--"],
    spiritGet: 0,
    predictLvlDays: "--",

    combineParas: {
      remainHealth: "",
      damageA: "",
      damageB: "",
    },
    combineRes: ["--", "--"],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.initData();
    this.calcSpiritGet();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({loadingMask: false});
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

  },

  inputCurLvl: function (e) {
    this.setData({'expCalcParas.curLvl': e.detail.value});
    this.calcExpRequire();
  },
  inputCurExp: function (e) {
    this.setData({'expCalcParas.curExp': e.detail.value});
    this.calcExpRequire();
  },
  inputTarLvl: function (e) {
    this.setData({'expCalcParas.tarLvl': e.detail.value});
    this.calcExpRequire();
  },
  shiftWipeMaxLvlUpSpirit: function () {
    this.setData({'expCalcParas.wipeMaxLvlUpSpirit': !this.data.expCalcParas.wipeMaxLvlUpSpirit});
    this.calcExpRequire();
  },
  shiftDailyQuestSpiritDouble: function () {
    this.setData({'spiritGetParas.dailyQuestSpiritDouble': !this.data.spiritGetParas.dailyQuestSpiritDouble});
    this.calcSpiritGet();
  },
  shiftDailyQuestExpDouble: function () {
    this.setData({'spiritGetParas.dailyQuestExpDouble': !this.data.spiritGetParas.dailyQuestExpDouble});
    this.calcSpiritGet();
  },
  inputStoneNum: function (e) {
    this.setData({'spiritGetParas.stone': e.detail.value});
    this.calcSpiritGet();
  },
  calcExpRequire: function () {
    let {curLvl, curExp, tarLvl, wipeMaxLvlUpSpirit} = this.data.expCalcParas;
    const flag1 = curLvl==parseInt(curLvl); flag1?curLvl=parseInt(curLvl):'';
    const flag2 = curExp==parseInt(curExp) || curExp=== "";
    const flag3 = tarLvl==parseInt(tarLvl); flag3?tarLvl=parseInt(tarLvl):'';
    const flag4 = curLvl < tarLvl && this.data.playerLvlData[curLvl].exp > curExp;
    const flag5 = curLvl >= 1 && tarLvl <= 100 && curExp >= 0;
    // console.log(flag1, flag2, flag3, flag4, flag5);
    if (flag1 && flag2 && flag3 && flag4 && flag5) {
      const playerLvlData = this.data.playerLvlData;
      let expSum = -curExp;
      if (curExp === "") {expSum = 0}
      let spiritRecover = 0;
      for (let i=curLvl;i<tarLvl;i++) {
        i = parseInt(i);
        expSum += playerLvlData[i].exp;
        spiritRecover += playerLvlData[i+1].spirit;
      }
      if (wipeMaxLvlUpSpirit) {spiritRecover -= playerLvlData[tarLvl].spirit}
      this.setData({expRequire: [expSum, spiritRecover]});
      this.calcPredictLvlDays();
    }
    else {
      this.setData({expRequire: ["--", "--"]});
      this.calcPredictLvlDays();
    }
  },
  calcSpiritGet: function () {
    let sum = 0;
    sum+=240;
    sum+=this.data.spiritGetParas.dailyQuestSpiritDouble?400:200;
    sum+=this.data.guildHomeData.spiritTable[this.data.spiritGetParas.tableLvl-1].spirit;
    sum+=this.data.guildHomeData.dungeonFood[this.data.spiritGetParas.FoodNum].spirit;
    if (this.data.spiritGetParas.stone==="") {}
    else if (this.data.spiritGetParas.stone!=parseInt(this.data.spiritGetParas.stone)) {
      sum = "--"
    }
    else if (this.data.spiritGetParas.stone <= 30 && this.data.spiritGetParas.stone >= 0) {
      sum += this.data.spiritGetParas.stone*120;
    }
    else {sum = "--"}
    this.setData({spiritGet: sum+10});
    this.calcPredictLvlDays();
  },
  calcPredictLvlDays: function () {
    const expRequire = this.data.expRequire[0];
    const spiritRecover = this.data.expRequire[1];
    const expPerDay = this.data.spiritGet;
    const flag = expRequire==parseInt(expRequire) && spiritRecover==parseInt(spiritRecover) && expPerDay==parseInt(expPerDay)
    // console.log(expRequire,spiritRecover,expPerDay)
    if (flag) {
      const res = Math.ceil((expRequire - spiritRecover) / (expPerDay + (this.data.spiritGetParas.dailyQuestExpDouble?700:350)));
      this.setData({predictLvlDays: res});
    }
    else {this.setData({predictLvlDays: '--'});}
  },

  inputDamageA: function (e) {
    this.setData({'combineParas.damageA': e.detail.value});
    this.calcCombineRes();
  },
  inputDamageB: function (e) {
    this.setData({'combineParas.damageB': e.detail.value});
    this.calcCombineRes();
  },
  inputRemainHealth: function (e) {
    this.setData({'combineParas.remainHealth': e.detail.value});
    this.calcCombineRes();
  },
  calcCombineRes: function () {
    const _this = this;
    let {remainHealth, damageA, damageB} = this.data.combineParas;
    let res = ["--", "--"];
    const flag1 = remainHealth==parseInt(remainHealth);
    const flag2 = damageA==parseInt(damageA);
    const flag3 = damageB==parseInt(damageB);
    const flag4 = (parseInt(damageA) + parseInt(damageB)) > parseInt(remainHealth);
    const flag5 = parseInt(remainHealth)>0 && parseInt(damageA)>0 && parseInt(damageB)>0;
    if (flag1 && flag2 && flag3 && flag4 && flag5) {
      // const num1 = parseInt(damageB)/(parseInt(remainHealth)-parseInt(damageA));
      // const num2 = parseInt(damageA)/(parseInt(remainHealth)-parseInt(damageB));
      // res = [calcRefund(num1),calcRefund(num2)];
      const num1 = Math.ceil(100 - ((parseInt(remainHealth)-parseInt(damageA)) / parseInt(damageB)) * 90);
      const num2 = Math.ceil(100 - ((parseInt(remainHealth)-parseInt(damageB)) / parseInt(damageA)) * 90);
      res = [num1, num2];
    }
    this.setData({combineRes: res});

    function calcRefund (num) {
      for (let i=0;i<_this.data.combineRule.length-1;i++) {
        if (num<_this.data.combineRule[i+1].factor) {
          return _this.data.combineRule[i].refund;
        }
      }
      return 90;
    }
  },

  initData: function () {
    const DATA_combineRule = [
      {factor:1, refund: 10},
      {factor:1.1, refund: 29},
      {factor:1.2, refund: 35},
      {factor:1.3, refund: 41},
      {factor:1.4, refund: 46},
      {factor:1.5, refund: 50},
      {factor:1.6, refund: 54},
      {factor:1.7, refund: 58},
      {factor:1.8, refund: 60},
      {factor:1.9, refund: 63},
      {factor:2, refund: 65},
      {factor:3, refund: 80},
      {factor:4, refund: 88},
      {factor:4.3, refund: 90},
    ];

    const DATA_playerLvlData = [
      {lvl:0, exp: 0, spirit: 0},
      {lvl:1, exp: 24, spirit: 20},
      {lvl:2, exp: 8, spirit: 20},
      {lvl:3, exp: 8, spirit: 21},
      {lvl:4, exp: 8, spirit: 21},
      {lvl:5, exp: 16, spirit: 22},
      {lvl:6, exp: 16, spirit: 22},
      {lvl:7, exp: 16, spirit: 23},
      {lvl:8, exp: 24, spirit: 23},
      {lvl:9, exp: 48, spirit: 24},
      {lvl:10, exp: 56, spirit: 24},
      {lvl:11, exp: 56, spirit: 25},
      {lvl:12, exp: 64, spirit: 25},
      {lvl:13, exp: 76, spirit: 26},
      {lvl:14, exp: 82, spirit: 26},
      {lvl:15, exp: 82, spirit: 27},
      {lvl:16, exp: 82, spirit: 28},
      {lvl:17, exp: 82, spirit: 30},
      {lvl:18, exp: 82, spirit: 35},
      {lvl:19, exp: 100, spirit: 40},
      {lvl:20, exp: 110, spirit: 45},
      {lvl:21, exp: 138, spirit: 50},
      {lvl:22, exp: 138, spirit: 55},
      {lvl:23, exp: 142, spirit: 60},
      {lvl:24, exp: 146, spirit: 70},
      {lvl:25, exp: 151, spirit: 80},
      {lvl:26, exp: 155, spirit: 85},
      {lvl:27, exp: 160, spirit: 85},
      {lvl:28, exp: 165, spirit: 86},
      {lvl:29, exp: 170, spirit: 87},
      {lvl:30, exp: 174, spirit: 88},
      {lvl:31, exp: 181, spirit: 89},
      {lvl:32, exp: 185, spirit: 90},
      {lvl:33, exp: 191, spirit: 91},
      {lvl:34, exp: 197, spirit: 92},
      {lvl:35, exp: 202, spirit: 93},
      {lvl:36, exp: 209, spirit: 94},
      {lvl:37, exp: 230, spirit: 95},
      {lvl:38, exp: 252, spirit: 96},
      {lvl:39, exp: 278, spirit: 97},
      {lvl:40, exp: 306, spirit: 98},
      {lvl:41, exp: 342, spirit: 99},
      {lvl:42, exp: 383, spirit: 100},
      {lvl:43, exp: 430, spirit: 101},
      {lvl:44, exp: 481, spirit: 102},
      {lvl:45, exp: 558, spirit: 103},
      {lvl:46, exp: 647, spirit: 104},
      {lvl:47, exp: 750, spirit: 105},
      {lvl:48, exp: 871, spirit: 106},
      {lvl:49, exp: 1010, spirit: 107},
      {lvl:50, exp: 1172, spirit: 108},
      {lvl:51, exp: 1359, spirit: 109},
      {lvl:52, exp: 1576, spirit: 110},
    ];

    const DATA_spiritTable = [
      {lvl:1, spirit: 80, lvlRequest: 1},
      {lvl:2, spirit: 96, lvlRequest: 10},
      {lvl:3, spirit: 112, lvlRequest: 20},
      {lvl:4, spirit: 120, lvlRequest: 30},
      {lvl:5, spirit: 128, lvlRequest: 40},
      {lvl:6, spirit: 136, lvlRequest: 50},
      {lvl:7, spirit: 144, lvlRequest: 60},
      {lvl:8, spirit: 152, lvlRequest: 70},
      {lvl:9, spirit: 160, lvlRequest: 75},
      {lvl:10, spirit: 168, lvlRequest: 80},
    ];

    const DATA_dungeonFood = [
      {num: 0, spirit: 0},
      {num: 1, spirit: 48},
      {num: 2, spirit: 96},
      {num: 3, spirit: 144},
    ];

    const DATA_mobData_Aries = [
      {bossIdx: 1, health: 6000000, scoreFactor: 1, name: "龙", round: 1, bossNum: 1, bgC: "background: #300"},
      {bossIdx: 2, health: 8000000, scoreFactor: 1, name: "鸟", round: 1, bossNum: 2, bgC: "background: #c00"},
      {bossIdx: 3, health: 10000000, scoreFactor: 1.1, name: "花", round: 1, bossNum: 3, bgC: "background: #600"},
      {bossIdx: 4, health: 12000000, scoreFactor: 1.1, name: "熊", round: 1, bossNum: 4, bgC: "background: #f00"},
      {bossIdx: 5, health: 20000000, scoreFactor: 1.2, name: "羊", round: 1, bossNum: 5, bgC: "background: #900"},
      {bossIdx: 6, health: 6000000, scoreFactor: 1.2, name: "龙", round: 2, bossNum: 1, bgC: "background: #300"},
      {bossIdx: 7, health: 8000000, scoreFactor: 1.2, name: "鸟", round: 2, bossNum: 2, bgC: "background: #c00"},
      {bossIdx: 8, health: 10000000, scoreFactor: 1.5, name: "花", round: 2, bossNum: 3, bgC: "background: #600"},
      {bossIdx: 9, health: 12000000, scoreFactor: 1.7, name: "熊", round: 2, bossNum: 4, bgC: "background: #f00"},
      {bossIdx: 10, health: 20000000, scoreFactor: 2, name: "羊", round: 2, bossNum: 5, bgC: "background: #900"},
      {bossIdx: 11, health: 6000000, scoreFactor: 1.2, name: "龙", round: 3, bossNum: 1, bgC: "background: #311"},
      {bossIdx: 12, health: 8000000, scoreFactor: 1.2, name: "鸟", round: 3, bossNum: 2, bgC: "background: #c11"},
      {bossIdx: 13, health: 10000000, scoreFactor: 1.5, name: "花", round: 3, bossNum: 3, bgC: "background: #611"},
      {bossIdx: 14, health: 12000000, scoreFactor: 1.7, name: "熊", round: 3, bossNum: 4, bgC: "background: #f11"},
      {bossIdx: 15, health: 20000000, scoreFactor: 2, name: "羊", round: 3, bossNum: 5, bgC: "background: #911"},
      {bossIdx: 16, health: 6000000, scoreFactor: 1.2, name: "龙", round: 4, bossNum: 1, bgC: "background: #311"},
      {bossIdx: 17, health: 8000000, scoreFactor: 1.2, name: "鸟", round: 4, bossNum: 2, bgC: "background: #c11"},
      {bossIdx: 18, health: 10000000, scoreFactor: 1.5, name: "花", round: 4, bossNum: 3, bgC: "background: #611"},
      {bossIdx: 19, health: 12000000, scoreFactor: 1.7, name: "熊", round: 4, bossNum: 4, bgC: "background: #f11"},
      {bossIdx: 20, health: 20000000, scoreFactor: 2, name: "羊", round: 4, bossNum: 5, bgC: "background: #911"},
      {bossIdx: 21, health: 6000000, scoreFactor: 1.2, name: "龙", round: 5, bossNum: 1, bgC: "background: #322"},
      {bossIdx: 22, health: 8000000, scoreFactor: 1.2, name: "鸟", round: 5, bossNum: 2, bgC: "background: #c22"},
      {bossIdx: 23, health: 10000000, scoreFactor: 1.5, name: "花", round: 5, bossNum: 3, bgC: "background: #622"},
      {bossIdx: 24, health: 12000000, scoreFactor: 1.7, name: "熊", round: 5, bossNum: 4, bgC: "background: #f22"},
      {bossIdx: 25, health: 20000000, scoreFactor: 2, name: "羊", round: 5, bossNum: 5, bgC: "background: #922"},
    ];

    const _this = this;
    const guildHomeData = {
      spiritTable: DATA_spiritTable,
      dungeonFood: DATA_dungeonFood,
    }
    this.setData({
      combineRule: DATA_combineRule,
      guildHomeData: guildHomeData,
    });
    processPlayerLvlData();
    processMobData();

    function processPlayerLvlData () {
      const dataArr = DATA_playerLvlData;
      for (let i=53;i<65;i++) {
        dataArr[i] = {lvl: i, exp: 1770, spirit: dataArr[i-1].spirit+1};
      }
      for (let i=65;i<76;i++) {
        dataArr[i] = {lvl: i, exp: 2655, spirit: dataArr[i-1].spirit+1};
      }
      for (let i=76;i<101;i++) {
        dataArr[i] = {lvl: i, exp: 3540, spirit: dataArr[i-1].spirit+1};
      }
      _this.setData({playerLvlData: dataArr});
    }

    function processMobData () {
      const dataArr = [];
      dataArr[0] = {
        idx: 1,
        desc: '白羊座 20200507~20200514',
        data: DATA_mobData_Aries
      };
      _this.setData({mobData: dataArr});
    }
  }

})