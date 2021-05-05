// 封装搜索模块的api

import request from '@/utils/request'
/**
 * 根据查询val获取联想建议数据
 * @param {*} params
 * @returns
 */
/* export const getSuggestions = params => {
  return request({
    url: '/app/v1_0/suggestion?q=' + params
  })
} */
/**
 * 根据查询val获取联想建议数据
 * @param {*} q
 * @returns
 */
export const getSuggestions = q => {
  return request({
    url: '/app/v1_0/suggestion',
    params: {
      q
    }
  })
}

/**
 * 获取搜索结果
 */
export const getSearchResult = params => {
  return request({
    url: '/app/v1_0/search',
    params
  })
}
