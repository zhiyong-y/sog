import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './utils/index'

import './mock/index'

Vue.config.productionTip = false

// 全局配置
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
