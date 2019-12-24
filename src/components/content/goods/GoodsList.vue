<template>
  <div class="goods">
    <GoodsListItem class="goods-list" v-for="(item,index) in goodsList" :key="index" :goods="item"></GoodsListItem>
  </div>
</template>

<script>
import GoodsListItem from 'components/content/goods/GoodsListItem'

export default {
  name: 'GoodsList',
  props: {
    goodsList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    GoodsListItem
  }
}
</script>

<style>
.goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
/* display: flex;
  flex-wrap: nowrap;
  justify-content: space-evenly; */
</style>