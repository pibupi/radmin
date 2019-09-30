/**
 * 将查询字符串转成参数对象。   
 * @param {String} str 查询字符串
 * @returns {Object}
 */
export function urlParams2Object(str) {
  // str:  ?str=233&name=90
  if(!str) {
    return null;
  }
  str = str.slice(1);
  let pareArr = str.split('&');
  let result = {};
  pareArr.forEach(item => {
    let keyValueArr = item.split('=');
    result[keyValueArr[0]] = keyValueArr[1];
  })
  return result;
}