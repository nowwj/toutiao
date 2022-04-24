import request from '@/utils/request'
//获取文章列表的接口
export const reqGetArticle = params => request({ url: '/app/v1_1/articles', method: 'get', params })
//获取文章详情接口
export const getArticleById = articleId => request({ url: `/app/v1_0/articles/${articleId}`, method: 'get' })
//关注文章作者的接口
export const reqFollowAuthor = userId => request({ url: '/app/v1_0/user/followings', method: 'post', data: { target: userId } })
//取消关注文章作者的接口
export const reqDeleteFollow = userId => request({ url: `/app/v1_0/user/followings/${userId}`, method: 'delete' })
//收藏文章的接口
export const reqCollectArticle = articleId => request({ url: '/app/v1_0/article/collections', method: 'post', data: { target: articleId } })
//取消收藏文章的接口/app/v1_0/article/collections/${articleId}
export const reqDeleteCollect = articleId => request({ url: `/app/v1_0/article/collections/${articleId}`, method: 'delete' })
//点赞文章的接口/app/v1_0/article/likings
export const reqLikeArticle = articleId => request({ url: '/app/v1_0/article/likings', method: 'post', data: { target: articleId } })
//取消点赞文章的接口
export const reqDeleteLike = articleId => request({ url: `/app/v1_0/article/likings/${articleId}`, method: 'delete' })