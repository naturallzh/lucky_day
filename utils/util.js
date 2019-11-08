const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function processLunchData() {
  if (!wx.getStorageSync('LunchData')) {
    const defaultPool = [
      {
        className: '传统中餐',
        classArr: ['手抓饼','凉面','一碗好粥','拉面','重庆小面','黄鱼面','煮饺子','煎饺','海南三杯鸡'],
      },
      {
        className: '非常之选',
        classArr: ['饿着','麻辣香锅','麻辣烫','烤串','饿着'],
      },
      {
        className: '西式快餐',
        classArr: ['金拱门','开封菜','汉堡王','卡乐星','必胜客'],
      },
      {
        className: '异域风情',
        classArr: ['日式寿司','韩式烤肉','越南河粉','咖喱饭'],
      },
    ];
    const customPool = [];
    const defaultPoolSelect = [];
    const customPoolSelect = [];
  }
  else {
  }
}

module.exports = {
  formatTime: formatTime,
  processLunchData: processLunchData
}