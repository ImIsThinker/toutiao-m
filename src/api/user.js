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
/**
 * 根据手机号发送短信验证码
 * @param {*} mobile
 * @returns
 */
export const sendSms = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}` // 使用字符串拼接的方式进行
  })
}
