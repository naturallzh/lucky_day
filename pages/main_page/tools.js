Page({

  /**
   * 页面的初始数据
   */
  data: {
    headerParas: {
      headerBg: 'white',
      titleText: '功能列表',
      titleColor: 'black',
      showBack: false,
      showHome: false,
    },

    dimeFact: 1,      // dimension factor 尺寸系数
    canvasParas: {},  // 画布的参数
    waveParas: [],    // 波形的控制参数 以数组的形式储存多个参数 可以画出多个波形
    timer: null,
    upperBgStr: '',		// 上半部分的背景颜色，随时间变化
  },

	nothing () {},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 计算尺寸系数 由于小程序中的canvas绘制单位是px且无法使用rpx 所以对于不同机型的屏幕尺寸必须做缩放处理
    // 所用机型的屏幕如果比标准尺寸(iphone7/8 375px)更宽 则系数会大于1 意味着需要将绘制的尺寸放大 反之同理
    const _this = this;
    wx.getSystemInfo({
      success: function (res) {
        _this.setData({
          dimeFact: res.windowWidth / 375,
        });
      }
    });
    // console.log(this.data.dimeFact);
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
    // 初始化参数
    this.initParas();

    // 每20ms更新一次画面 即动画帧率为50
    this.data.timer = setInterval(()=>{
      this.drawWaves();
    },20);
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
    clearInterval(this.data.timer);
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  gotoLunch () {
    wx.navigateTo({
      url: '/pages/tool_pages/lunch'
    })
  },

  gotoPhoneState () {
    wx.navigateTo({
      url: '/pages/tool_pages/phone_state'
    })
  },

  gotoPCR () {
    wx.navigateTo({
      url: '/pages/PCR/index'
    })
  },

  // 初始化参数
  initParas () {
    // 引入需要的参数
    const fac = this.data.dimeFact;

    // 初始化画布参数 对于iphone7而言 宽为750rpx 高为200rpx 与class中的尺寸对应
    const canvasParas = {
      width: 375 * fac,
      height: 100 * fac,
    };

    // 初始化波形参数 波形绘制时按照数组顺序由后至前 数组最后一位参数的波形将位于图形最上层
    const waveParas = [
      {
        // 振幅 不得大于画布高度的一半 振幅越大 波形上下起伏程度越大
        A: 20,
        // 函数的角频率W=2π/T T为函数的周期
        // 注意这里的"周期"指的是一个完成的余弦波(从波峰到波峰或从波谷到波谷)长度是多少个像素 而不是图像运动的快慢
        // 由于波形本身无需(或者说不适合)根据不同的机型适配尺寸 建议以绝对尺寸(px)确定形状 当然也可以尝试带上fac系数查看效果 就能更好地理解前半句话了
        // 周期越长(频率越小) 波形上升下降越平缓 反之则波形变化越剧烈
        // 这里相当于将一个完整的正弦波长度设置为1200px
        W: 2 * Math.PI / 1200,
        // 相位 即偏移量 和SPD(也可以理解为步进值)协同控制图像变换 产生图像在移动的感觉
        Q: 0,
        // 这里的SPD才是图像运动的速度 绝对值越大则图形运动越快
        // 正负号可以控制图像偏移的方向 负号向右 正号向左
        SPD: - 0.01,
        // 由于纯色填充和渐变填充的方式不同 所以直接用函数来实现
        FILL: function (ctx) {
          // 设置纯色填充字符串 可按以下规则设置
          // 带alpha通道 'rgba(255, 255, 255, 0.5)'
          // 单词 'yellow'
          // rgb '#f00'
          ctx.setFillStyle('rgba(255, 255, 255, 0.5)');

          // 以下是设置渐变色的例子 参考文档
          // https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasContext.createLinearGradient.html
          // https://developers.weixin.qq.com/miniprogram/dev/api/canvas/CanvasGradient.addColorStop.html

          // const grd = ctx.createLinearGradient(0, 0, 375 * fac, 100 * fac);
          // grd.addColorStop(0, 'red');
          // grd.addColorStop(1, 'white');
          // ctx.setFillStyle(grd);
        }
      },
      {
        A: 40,
        W: 2 * Math.PI / 1800,
        Q: 0,
        SPD: - 0.015,
        FILL: function (ctx) {
          const grd = ctx.createLinearGradient(0, 0, 0, 100 * fac);
          grd.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
          grd.addColorStop(1, 'white');
          ctx.setFillStyle(grd);
        }
      },
    ];

    // 设置一套默认参数
    const defPara = {
      A: 30,
      W: 2 * Math.PI / 500,
      Q: 0,
      SPD: - 0.01,
      FILL: function (ctx) {
        ctx.setFillStyle('rgba(255, 255, 255, 0.5)');
      }
    };
    // 检查参数是否完整 不完整的用默认参数填补
    for (let i = 0; i < waveParas.length; i++) {
      waveParas[i].A ? '' : waveParas[i].A = defPara.A;
      waveParas[i].W ? '' : waveParas[i].W = defPara.W;
      waveParas[i].Q ? '' : waveParas[i].Q = defPara.Q;
      waveParas[i].SPD ? '' : waveParas[i].SPD = defPara.SPD;
      waveParas[i].FILL ? '' : waveParas[i].FILL = defPara.FILL;
    }

    this.setData({
      canvasParas: canvasParas,
      waveParas: waveParas,
    });
  },

  // 绘制函数 反复调用
  drawWaves () {
    // 引入需要的参数
    const width = this.data.canvasParas.width;
    const height = this.data.canvasParas.height;
    const waveParas = this.data.waveParas;

    // 通过id获取canvas画布
    const ctx = wx.createCanvasContext('waveCanvas');
    // 清空画布
    ctx.clearRect(0, 0, width, height);

    // 根据waveParas参数数组中的每个参数画出波形
    for (let i = 0; i < waveParas.length; i++) {
      // 准备绘制所需的参数
      const A = waveParas[i].A;
      const W = waveParas[i].W;
      const Q = waveParas[i].Q;
      const SPD = waveParas[i].SPD;

      // 设置填充颜色
      waveParas[i].FILL(ctx);

      // 开始画路径
      ctx.beginPath();

      // 将画笔移动到初始位置 需要画一个封闭的边框 然后填充
      // 这个起始位置就是横坐标为0时y的值
      ctx.moveTo(0, A * Math.sin(Q) + height / 2);
      // 首先画出余弦线部分 通过逐步增大x的值一点点绘制出余弦曲线图
      for (let x = 1; x <= width; x++) {
        const y = A * Math.sin(W * x + Q) + height / 2;
        ctx.lineTo(x, y);
      }
      // 画线到右下角 即画出右边框
      ctx.lineTo(width, height);
      // 画线到左下角 即画出底边框
      ctx.lineTo(0, height);
      // 完成路径绘制 即补全左边框
      ctx.closePath();
      // 填充
      ctx.fill();

      // 以下3行可以显示边框笔迹路径 解除注释可以就能看到边框
      // canvas就是在这个封闭的范围内用fillStyle的样式填充出了图形
      // 仔细体会顶部的余弦边框是如何生成的
      // ctx.setStrokeStyle("#ff0000");
      // ctx.setLineWidth(1);
      // ctx.stroke();

      // 更新相位Q 相当于随着时间的流逝改变函数相位 即平移了函数图像
      waveParas[i].Q += SPD;
    }

    // 绘制
    ctx.draw();

    // 更新data中Q的值
    this.setData({waveParas: waveParas,});
  },

})