<template>
  <div class="goods-list-item" @click="showDetail">
    <img v-lazy="goods.show.img" @load="imageLoad" v-if='hasGoodsShow'>
    <img v-lazy="goods.img" @load="imageLoad" v-else>
    <div>
      <div class="title">
        <span>{{goods.title}}</span>
      </div>
      <div>
        <span class="price">￥{{goods.price}}</span>
        <span class="collect">{{goods.cfav}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsListItem',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    hasGoodsShow() {
      if (this.goods.show) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    imageLoad() {
      this.$bus.$emit('imageLoad')
    },
    // 展示详情页
    showDetail() {
      this.$router.push('/detail/' + this.goods.iid)
    }
  }
}
</script>

<style>
.goods-list-item {
  position: relative;
  font-size: 12px;
  width: 46%;
  padding-bottom: 40px;
}
.goods-list-item > div {
  position: absolute;
  width: 100%;
  bottom: 3px;
  left: 3px;
}
.goods-list-item > div > div:nth-child(2) {
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 5px;
}
.goods-list-item .title {
  /* display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden; */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.goods-list-item .price {
  color: var(--color-high-text);
}
.goods-list-item .collect::before {
  content: '';
  display: inline-block;
  width: 11px;
  height: 11px;
  background: url('~assets/img/detail/detail_bottom.png') no-repeat 0 0;
  background-size: 100%;
}

.goods-list-item img {
  width: 100%;
  border-radius: 8px;
}
</style>