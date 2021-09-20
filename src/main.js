import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './utils/index'

// import 'vue-tag-textarea/lib/vue-tag-textarea.css'
// import Textarea from 'vue-tag-textarea'
// Vue.use(Textarea)

import SogCountTo from 'sog-count-to'
Vue.use(SogCountTo)

// 开发环境下使用mock
if (process.env.NODE_ENV !== 'production') {
  require('./mock/index')
}

Vue.config.productionTip = false

// 全局配置
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
