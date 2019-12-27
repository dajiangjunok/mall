<template>
  <div class="bottom-bar">
    <div class="collect">
      <img src="~assets/img/cart/tick.svg" :class="{active:isClickedAll}" @click='collectBtn'>
      <span>全选</span>
    </div>
    <div class="total-price">
      合计：
      <span>￥{{totlePrice}}</span>
    </div>
    <div class="calculate">
      去计算{{collectCartCount | filter}}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ShopBottomBar',
  methods: {
    collectBtn() {
      if (this.isClickedAll) {
        this.$store.state.cartList.forEach(item => {
          item.isClicked = false
        })
      } else {
        this.$store.state.cartList.forEach(item => {
          item.isClicked = true
        })
      }
    }
  },
  computed: {
    ...mapGetters(['cartList', 'cartCount', 'collectCartCount']),
    totlePrice() {
      return this.cartList
        .filter(item => {
          return item.isClicked
        })
        .reduce((totlePrice, item) => {
          return (totlePrice += (item.price * 100 * item.count) / 100)
        }, 0)
    },
    isClickedAll() {
      if (this.$store.state.cartList.length === 0) return false
      return !this.$store.state.cartList.some(item => {
        return item.isClicked === false
      })
    }
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
.bottom-bar {
  position: relative;
  display: flex;
  align-items: center;
  /* top: -37px; */
  width: 100%;
  height: 37px;
  background-color: #eee;
  font-size: 13px;
  line-height: 37px;
}
.collect {
  flex: 1;
}
.collect img {
  margin-left: 5px;
  margin-right: 5px;
  border: 2px solid #ccc;
  border-radius: 50%;
  vertical-align: middle;
}
.collect img.active {
  background-color: var(--color-tint);
}
.total-price {
  flex: 2;
}
.total-price > span {
  color: var(--color-high-text);
}
.calculate {
  flex: 1;
  text-align: center;
  background-color: var(--color-tint);
  color: #fff;
}
</style>