import { set } from 'nprogress'
import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
   user: getItem('user'),
   cachepages:['LayoutIndex']
  },
  mutations: {
    setUser(state, data) {
      state.user = data
      setItem('user',state.user)
    },
    //添加缓存页面
    addCachepages(state,pageName){
      if(!state.cachepages.includes(pageName)){
        state.cachepages.push(pageName)
      }
    },
    //删除缓存页面
    removeCachepages(state,pageName){
       const index = state.cachepages.indexOf(pageName)
       if(index!==-1){
        state.cachepages.splice(index,1)
       }
    }
  },
  actions: {
  },
  modules: {
  }
})
