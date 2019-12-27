<template>
  <div class="cart-list">
    <ShopCartItem v-for='(item,index) in cartList' :key='index' :iteminfo="item"></ShopCartItem>
  </div>
</template>

<script>
import ShopCartItem from './ShopCartItem'
import { mapGetters } from 'vuex'

export default {
  name: 'ShopCartList',
  data() {
    return {}
  },
  components: {
    ShopCartItem
  },
  computed: {
    ...mapGetters(['cartList'])
  }
}
</script>

<style scoped>
</style>