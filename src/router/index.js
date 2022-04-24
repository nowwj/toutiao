import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
import { Toast } from 'vant'
Vue.use(VueRouter)
//路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      requireAuth: false
    },
    component: () => import('@/views/login/')
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      requireAuth: false
    },
    component: () => import('@/views/search/')
  },
  {
    path: '/article/:articleId',
    name: 'article',
    meta: {
      requireAuth: false
    },
    component: () => import('@/views/article/')
  },
  {
    path: '/user/profile',
    name: 'userprofile',
    meta: {
      requireAuth: true
    },
    component: () => import('@/views/userprofile'),
    props: true,

  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          requireAuth: false
        },
        component: () => import('@/views/home/')
      },
      {
        path: '/qa',
        name: 'qa',
        meta: {
          requireAuth: false
        },
        component: () => import('@/views/qa/')
      },
      {
        path: '/video',
        name: 'video',
        meta: {
          requireAuth: false
        },
        component: () => import('@/views/video/')
      },
      {
        path: '/my',
        name: 'my',
        meta: {
          requireAuth: false
        },
        component: () => import('@/views/my/')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.user) {
      next()
    } else {
      Toast('请登录后再试')
    }
  } else {
    next();
  }
})




export default router
