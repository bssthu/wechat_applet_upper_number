
// 数字转换为大写金额数字
function toUpper(num) {
  if (isNaN(num)) {
    return '非法输入';
  } else {
    if (num >= 1e16) {
      return '超出范围';
    }

    var result = '';

    if (num < 0) {
      result += '负';
      num = -num;
    }

    result += toUpperPartial(Math.floor(num));

    while (result.includes('零零')) {
      result = result.replace('零零', '零');
    }
    if (result != '零' && result.endsWith('零')) {
      result = result.substr(0, result.length - 1);
    }

    // 小数
    result += '元';
    if (num % 1 == 0) {
      result += '整';
    } else {
      var cents = (num * 100) % 100;
      if (cents >= 10) {
        result += toUpperPartial(Math.floor(cents / 10)) + '角';
        cents %= 10;
      } else {
        result += '零';
      }
      if (cents >= 1) {
        result += toUpperPartial(Math.floor(cents % 10)) + '分';
        cents %= 1;
      }
      // 以下忽略
    }

    return result;
  }
}


function toUpperPartial(num) {
  var numTable = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
  var suffixTable = ['亿', '万', '仟', '佰', '拾'];
  var suffixMod = [1e8, 1e4, 1e3, 1e2, 1e1];
  var result = '';

  // 高位
  var hasNumber = false;
  for (var i = 0; i < suffixMod.length; i++) {
    var m = suffixMod[i];

    if (hasNumber || num >= m) {
      hasNumber = true;
      var subResult = toUpperPartial(Math.floor(num / m));
      while (subResult != '零' && subResult.endsWith('零')) {
        subResult = subResult.substr(0, subResult.length - 1);
      }
      if (subResult == '零') {
        result += subResult;
      } else {
        result += subResult + suffixTable[i];
      }
      num = num % m;
    }
  }

  // 个位
  if (num >= 1) {
    num %= 10;
    result += numTable[Math.floor(num)];
  } else {
    result += '零';
  }

  return result;
}


module.exports = {
  toUpper: toUpper
}
