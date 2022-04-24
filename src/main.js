import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//加载vant组件库和样式
import Vant from 'vant';
import 'vant/lib/index.css';
//全局注册vant中的组件
Vue.use(Vant);
// 引入全局样式
import "./styles/index.css"
//自动设置rem基准值
import 'amfe-flexible'

import '@/utils/day'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
