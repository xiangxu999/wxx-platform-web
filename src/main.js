import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import VForm from 'vform-builds' // VForm
import 'vform-builds/dist/VFormDesigner.css' // VForm css

import '@/assets/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/assets/icons' // icon
import '@/permission' // permission control
import permission from '@/directive/permission'

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'mini'
})
Vue.use(VForm)
Vue.directive('permission', permission)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
