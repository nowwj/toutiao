import request from '@/utils/request'
//搜索联想建议的接口
export const reqSearchSuggest = q => request({ url: '/app/v1_0/suggestion', method: 'get', params: { q } })
//获取搜获结果的接口
export const reqSearchResult = params => request({url:'/app/v1_0/search',method:'get',params})
// 获取用户搜索历史
// Path： /app/v1_0/search/histories
export const reqGetHistory = ()=>request({url:'/app/v1_0/search/histories',method:'get'})