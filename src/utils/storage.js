/*

    存储数据
*/
export const setItem = (key, value) => {
  // 将数组转化为json 格式存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

/*

    读取数据
*/
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}
/*

  删除数据
*/

export const removeItem = key => {
  window.localStorage.removeItem(key)
}
