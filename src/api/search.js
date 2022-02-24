/*
    搜索相关请求模块
*/

import request from '@/utils/request'
// import store from '../store'
// 搜索联想
export const getSearchSuggestion = q => {
  return request({
    method: 'GET',
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 获取搜索结果
export const getSearchReslt = params => {
  return request({
    method: 'GET',
    url: '/v1_0/search',
    params
  })
}
