import Vue from 'vue'
import Toast from './Toast'
const obj = {}

obj.install = function () {
  // 因为已经在main.js中进行了注册，因此会直接调用 这个对象的 install方法
  // 1.创建组件构造器
  const toastConstroctor = Vue.extend(Toast)
  // 2.根据组件构造器创建一个组件实例对象
  const toast = new toastConstroctor(Toast)
  // 3.将这个实例对象挂载到某一个元素上
  toast.$mount(document.createElement('div'))
  // 4.将这个元素添加到DOM节点中
  document.body.appendChild(toast.$el)

  Vue.prototype.$toast = toast
}

export default obj
