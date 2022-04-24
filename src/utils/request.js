import axios from 'axios'
import store from '@/store'
import router from '@/router'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
//引入进度条及其样式
import nprogress from 'nprogress'
import "nprogress/nprogress.css"

const refreshTokenReq = axios.create({
    baseURL: 'http://api-toutiao-web.itheima.net',
})

const request = axios.create({
    // baseURL:'http:/ttapi.research.itcast.cn/',
    baseURL: 'http://api-toutiao-web.itheima.net',
    timeout: 5000,
    transformResponse: [function (data) {
        try {
            return JSONbig.parse(data)
        } catch (error) {
            console.log("转换失败", error);
            return data
        }
    }]
})
//请求拦截器----在项目中发请求（请求没有发出去）可以做一些事情
request.interceptors.request.use((config) => {
    //config 配置对象 
    const { user } = store.state
    if (user) {
        config.headers.Authorization = `Bearer ${user.token}`
    }
    return config;
})

//响应拦截器
// 响应失败
request.interceptors.response.use((response) => {
    return response;
}, async function (error) {
    console.log(error.response);
    const status = error.response.status;
    if (status == 400) {
        // 参数错误
        Toast.fail('请求参数错误~')
    } else if (status == 401) {
        // token无效
        // 如果没有user 则跳转登录页重新登录
        // 有user  拿着刷新token去重新登录
        const {
            user
        } = store.state;
        if (!user || !user.token) {
            // 未登录 重新登录
            redirectLogin()
        } else {
            try {
                const {
                    data
                } = await refreshTokenReq({
                    url: '/app/v1_0/authorizations',
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${user.refresh_token}`
                    }
                })
                user.token = data.data.token;
                store.commit('setUser', user);
                // 处理完usertoken 重新发起请求
                return request(error.config);
            } catch (error) {
                // 刷新失败 直接跳转登录页
                Toast.fail('登录验证失败，请重新登录~');
                store.state.user = null;
                store.commit('REMOVECACHEPAGE', 'layout');
                redirectLogin()
            }
        }
    } else if (status == 403) {
        // 无权限
        Toast.fail('您没有权限~')
    } else if (status >= 500) {
        // 服务端异常
        Toast.fail('服务端出现异常~')
    }

    return Promise.reject(error)
})
function redirectLogin() {
    router.replace({
        name: 'login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    })
}
export default request