import request from '@/utils/request'
import store from '@/store'
//获取登录/注册接口
export const reqLogin = (data) => request({ url: '/app/v1_0/authorizations', method: 'post', data })
//发送验证码接口
export const reqSendSms = mobile => request({ url: `/app/v1_0/sms/codes/${mobile}`, method: 'get' })
//获取当前登录用户信息
export const reqGetCurrentUser = () => request({ url: '/app/v1_0/user', method: 'get' })
//获取用户频道列表
export const reqGetUserChannels = () => request({ url: '/app/v1_0/user/channels', method: 'get' })
//获取用户个人资料
// Path： /app/v1_0/user/profile
// Method： GET
export const getUserProfile = () => {
    return request({
        method: 'GET',
        url: '/app/v1_0/user/profile'
    })
}

// 修改用户数据
// Path： /app/v1_0/user/profile
// Method： PATCH
export const updateUserProfile = data => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/profile',
        data
    })
}

// 编辑用户头像
// Path： /app/v1_0/user/photo
// Method： PATCH
export const updateUserPhoto = data => {
    return request({
        method: 'PATCH',
        url: '/app/v1_0/user/photo',
        data
    })
}