// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import api from './api/index'
import Vuex from 'vuex'

// 将 api 方法绑定至全局
Vue.prototype.$api = api

Vue.config.productionTip = false

// 使用 element-ui 插件
Vue.use(ElementUI)

Vue.use(Vuex)

/* eslint-disable no-new */
new Vuex.Store({
  state: {
    message: ''
  },
  mutations: {
    setMessage (state, message) {
      state.message = message
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
