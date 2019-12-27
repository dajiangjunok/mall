<template>
  <div class="shop-cart">
    <ShopNav />
    <Scroll class="content" ref='scroll'>
      <ShopCartList />
    </Scroll>
    <ShopBottomBar />
  </div>
</template>

<script>
import ShopNav from './childComponents/ShopNav'
import ShopCartList from './childComponents/ShopCartList'
import ShopBottomBar from './childComponents/ShopBottomBar'

import Scroll from 'components/common/scroll/Scroll'

export default {
  name: 'Shopcart',
  mounted() {},
  components: {
    ShopNav,
    ShopCartList,
    ShopBottomBar,
    Scroll
  },
  activated() {
    this.$refs.scroll.refresh()
  }
}
</script>

<style scoped>
.content {
  height: calc(100vh - 130px);
  overflow: hidden;
}
</style>