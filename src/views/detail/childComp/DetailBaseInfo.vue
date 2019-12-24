<template>
  <div class="detal-base-info">
    <h2 class="title">{{goods.title}}</h2>
    <div class="top">
      <span class="new-price">{{goods.newPrice}}</span>
      <s class="old-price">{{goods.oldPrice}}</s>
      <span class="discount">{{goods.discount}}</span>
    </div>
    <div class="bottom">
      <span> {{goods.columns[0]}}</span>
      <span> {{goods.columns[1]}}</span>
      <span> {{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="services">
      <div>
        <img :src="goods.services[0].icon" alt="">
        <span>{{goods.services[0].name}}</span>
      </div>
      <div>
        <img :src="goods.services[1].icon" alt="">
        <span>{{goods.services[1].name}}</span>
      </div>
      <div>
        <img :src="goods.services[2].icon" alt="">
        <span>{{goods.services[2].name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBaseInfo',
  props: {
    goods: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>
.detal-base-info {
  padding: 15px 10px;
  border-bottom: 4px solid #eee;
}
.detal-base-info h2 {
  font-size: 15px;
  font-weight: normal;
  color: #000;
}
.top {
  margin: 10px 0;
}
.top .new-price {
  font-size: 18px;
  color: var(--color-high-text);
}
.top .old-price {
  padding: 0 5px;
  font-size: 12px;
  color: #ccc;
}
.top .discount {
  position: relative;
  top: -6px;
  padding: 2px 3px;
  background-color: var(--color-tint);
  color: var(--color-background);
  font-size: 12px;
  line-height: 12px;
  border-radius: 8px;
}
.bottom {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  font-size: 12px;
  color: #ccc;
}
.services {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
}
.services img {
  width: 15px;
  vertical-align: middle;
}
.services span {
  font-size: 10px;
}
</style>