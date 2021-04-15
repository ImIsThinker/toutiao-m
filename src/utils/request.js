// 请求模块
import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})

// 请求拦截器
request.interceptors.request.use(config => {
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // config 本次请求的配置对象
  console.log(config)
  // 必须返回config 否则请求会停留在这里、出不去
  return config
}, error => {
  // 如果请求出错了(请求还未发出去)、就会来到这里
  return Promise.reject(error)
})
// 响应拦截器

export default request
