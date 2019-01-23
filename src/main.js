import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import i18n from './lang' // Internationalization
import './icons'
import 'normalize.css/normalize.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import configJson from "../public/config.json"

// import './mock' 
import './permission'

import vueDrag from 'vue-dragging'
Vue.use(vueDrag)

Vue.use(Element,{
  size: 'medium', 
  i18n: (key, value) => i18n.t(key, value)
});

Vue.config.productionTip = false

Vue.prototype.SERVSER_CONFIG = configJson;

new Vue({
  store,
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
