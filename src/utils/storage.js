// 封装本地数据操作模块

/**
 * 数据存储
 */

export const setItem = (key, value) => {
  // 如果 value 数组 对象 则 转换为 json 字符串
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}
/**
 * 数据获取
 */

export const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    //   如果是 JSON字符串 肯定会正常执行、不会进入到catch 如果不是json字符串就会进入到catch
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
/**
 * 数据删除
 */
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
