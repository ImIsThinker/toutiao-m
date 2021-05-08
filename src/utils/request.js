// 请求模块
import axios from 'axios'
import store from '@/store'
// 使用 json-bigint 来处理大数字问题 其中就有两个重要的api JSONbig.stringify() 和 JSONbig.parse()
import jsonbig from 'json-bigint'
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/', // 基础路径
  // `transformResponse` 在传递给 then/catch 前，允许修改响应数据修改请求数据 data就是服务器返回的原始数据
  transformResponse: [function (data) {
    // 对 data 进行任意转换处理
    try {
      // 如果是 JSON格式的字符串 就正常转换为 JSON格式的对象
      // 如果不是就将data直接返回
      // JSONbig.parse(data) 转换后的 JSON格式的对象中 大数字以一个对象形式展示
      return jsonbig.parse(data)
    } catch (error) {
      return data
    }
  }]
})

// 请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // config 本次请求的配置对象
  // console.log(config)
  // 必须返回config 否则请求会停留在这里、出不去
  return config
}, error => {
  // 如果请求出错了(请求还未发出去)、就会来到这里
  return Promise.reject(error)
})
// 响应拦截器

export default request
