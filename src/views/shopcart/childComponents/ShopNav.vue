<template>
  <NavBar class="shop-nav">
    <div slot="center">购物车({{cartCount | filter}})</div>
  </NavBar>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { mapGetters } from 'vuex'

export default {
  name: 'ShopNav',
  components: {
    NavBar
  },
  computed: {
    ...mapGetters(['cartCount'])
  },
  filters: {
    filter(item) {
      if (!item) {
        return 0
      } else {
        return item
      }
    }
  }
}
</script>

<style scoped>
.shop-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>