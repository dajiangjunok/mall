import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'

import toast from './components/common/toast'
import fastClick from 'fastclick'

Vue.use(toast)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('assets/img/author/author.png'),
  attempt: 1
})
// 往 Vue 原型中塞一个$bus 属性
Vue.prototype.$bus = new Vue()
// console.log(Vue.prototype);

Vue.config.productionTip = false

fastClick.attach(document.body)

new Vue({
  render: h => h(App),
  router,
  store,
  toast
}).$mount('#app')
