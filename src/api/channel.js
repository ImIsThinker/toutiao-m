// 频道相关请求模块
import request from '@/utils/request'

/**
 * 获取所有的频道列表
 * @returns
 */
export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels'
  })
}
/**
 * 添加用户频道
 * @param {*} channels
 * @returns
 */
export const addUserChannels = channel => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}
/**
 * 根据频道id删除指定频道
 * @param {*} channelId
 * @returns
 */
export const deleteUserChannel = channelId => {
  return request({
    url: `/app/v1_0/user/channels/${channelId}`,
    method: 'delete'
  })
}
