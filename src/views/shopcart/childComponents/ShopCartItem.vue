<template>
  <div class="cart-item">
    <ClickButton class="btn">
      <img src="~assets/img/cart/tick.svg" class="click-img" @click='btnClick' :class="{active:isActive }">
    </ClickButton>
    <div class="img">
      <img :src="iteminfo.img">
    </div>
    <div class="cart-info">
      <div class="cart-title">{{iteminfo.title}}</div>
      <div class="description">{{iteminfo.desc}}</div>
      <div class="price">
        <span class="pre-price">￥{{iteminfo.price}}</span>
        <div class="count-btn">
          <button @click='sub'>-</button>
          <span class="count">{{iteminfo.count}}</span>
          <button @click='add'>+</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导出clickbtn组件
import ClickButton from 'components/content/clickBtn/ClickButton'

import { ADD_COUNT, ADD_TO_CART, SUB_COUNT, ADD_ITEM_COUNT } from '../../../store/mutations_type.js'
export default {
  name: 'ShopCartItem',
  data() {
    return {}
  },
  computed: {
    isActive() {
      return this.iteminfo.isClicked
    }
  },
  props: {
    iteminfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  components: {
    ClickButton
  },
  methods: {
    btnClick() {
      this.iteminfo.isClicked = !this.iteminfo.isClicked
    },
    // 点击修改商品的购物车中商品的件数
    sub() {
      if (this.iteminfo.count === 0) {
        return
      }
      this.$store.commit(SUB_COUNT, this.iteminfo)
      // this.iteminfo.iid
    },
    add() {
      if (this.iteminfo.count === 99) {
        return
      }
      this.$store.commit(ADD_ITEM_COUNT, this.iteminfo)
    }
  }
}
</script>

<style scoped>
.cart-item {
  display: flex;
  padding: 10px 8px;
  height: 100%;
  font-size: 12px;
  border-bottom: 2px solid #eee;
}
.cart-item .btn {
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  flex: 1;
}
.cart-item .click-img {
  border-radius: 50%;
  border: 2px solid #eee;
}
.cart-item .click-img.active {
  background-color: var(--color-tint);
}

.cart-item .img {
  padding: 0 4px;
  flex: 1;
}
.cart-item .img img {
  width: 23vw;
  height: 28vw;
  border-radius: 5px;
}
.cart-item .cart-info {
  flex: 2.5;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 9px 3px;
}
.cart-item .cart-info .cart-title {
  width: 63vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
}
.cart-item .cart-info .description {
  width: 60vw;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.cart-item .cart-info .price {
  display: flex;
  justify-content: space-between;
  font-size: 15px;
}
.cart-item .cart-info .price .count-btn {
  width: 50px;
  display: flex;
  justify-content: space-between;
  /* border: 1px solid #eee; */
}
.cart-item .cart-info .price button {
  display: inline-block;
  width: 18px;
  height: 16px;
  /* line-height: 16px; */
  vertical-align: middle;
  margin: 0;
  padding: 0;
}

.cart-item .cart-info .price .pre-price {
  color: var(--color-tint);
}
</style>