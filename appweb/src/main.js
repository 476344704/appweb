// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import api from './api/index.js'
// import VueAxios from 'vue-axios'
// import vuePicturePreview from 'vue-picture-preview'
// Vue.use(vuePicturePreview)
import VueSee from 'vue-see'
import util from './utils/util'
import bridge from 'vue-bridge-webview'
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)
Vue.use(bridge)
Vue.use(util)
var option = {}
Vue.use(VueSee, option)
require('./assets/icon/iconfont')
require('../src/assets/base.less')
Vue.prototype.$api = api
Vue.prototype.$http = axios

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
