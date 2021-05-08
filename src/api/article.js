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

/**
 * 通过文章id获取文章详情
 * @param {*} articleId
 * @returns
 */
export const getArticleById = articleId => {
  return request({
    url: `/app/v1_0/articles/${articleId}`
  })
}
