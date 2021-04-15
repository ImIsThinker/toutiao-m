// 文章模块的api
import request from '@/utils/request'

/**
 * 获取频道列表数据
 * @param {*} params
 * @returns
 */
export const getArticles = params => {
  return request({
    url: '/app/v1_1/articles',
    params
  })
}
