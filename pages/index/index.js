//index.js

var util = require('../../utils/util.js');

// 获取应用实例
var app = getApp();

Page({
  data: {
    upperNumber: '零元整',
  },

  // 事件处理函数

  // 输入改变
  bindChange: function (e) {
    var self = this;
    var data = self.data;

    var num = parseFloat(e.detail.value);

    data.upperNumber = util.toUpper(num);
    self.setData(data);
  }
})
