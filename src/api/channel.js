import request from '@/utils/request'
//获取多有频道的接口
export const reqGetAllChannels = () => request({ url: '/app/v1_0/channels', method: 'get' })
//修改、编辑频道列表/app/v1_0/user/channels
export const reqHandleChannels = data=>request({url:'/app/v1_0/user/channels',method:'patch',data})
//删除指定频道的接口
export const reqDeleteChannel = (channelId)=>request({url:`/app/v1_0/user/channels/${channelId}`,method:'delete'})