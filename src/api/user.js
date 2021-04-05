// 用户相关请求模块
import request from '@/utils/request'

/**
 * 根据用户名验证码进行登录操作
 * @param {*} data
 * @returns
 */
export function login (data) {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}
