import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 往 Vue 原型中塞一个$bus 属性
Vue.prototype.$bus = new Vue()
// console.log(Vue.prototype);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
