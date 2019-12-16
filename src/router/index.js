import Vue from 'vue'
import VueRputer from 'vue-router';

Vue.use(VueRputer)

const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Shopcart = () => import('views/shopcart/Shopcart')
const Profile = () => import('views/profile/Profile')

const routes = [{
  path: '',
  redirect: '/home'
}, {
  path: '/home',
  component: Home
}, {
  path: '/category',
  component: Category
}, {
  path: '/shopcart',
  component: Shopcart
}, {
  path: '/profile',
  component: Profile
}]
const router = new VueRputer({
  routes,
  mode: 'history'
})

export default router
