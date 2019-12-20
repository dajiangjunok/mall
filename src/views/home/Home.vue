<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <HomeSwiper :banners="banners" v-if="banners.length!==0"></HomeSwiper>
    <HomeRecommendView :recommends="recommends"></HomeRecommendView>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommendView from './childComponents/HomeRecommendView'

import { getHomeMultidata } from 'network/home'
export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: []
    }
  },
  methods: {},
  components: {
    NavBar,
    HomeSwiper,
    HomeRecommendView
  },
  created() {
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      // console.log(res)
      this.banners = res.data.banner
      this.recommends = res.data.recommend.list
    })
  }
}
</script>

<style>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>