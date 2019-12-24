<template>
  <div class="detail-shop-info">
    <div class="logo">
      <img :src="shopInfo.logo">
      <span class="shop-name">{{shopInfo.name}}</span>
    </div>
    <div class="info">
      <div class="left">
        <div class="sells">
          <p class="top">{{sells}}</p>
          <p>总销量</p>
        </div>
        <div class="goods-count">
          <p class="top">{{shopInfo.goodsCount}}</p>
          <p>全部宝贝</p>
        </div>
      </div>

      <div class="right">
        <div class="scrore" v-for="(item, index) in shopInfo.score" :key="index+item">
          <span class="name">{{item.name}}</span>
          <span class="score" :class="{'high-color':item.isBetter}">{{item.score}}</span>
          <div class="better">
            <span v-if='item.isBetter' :class="{'high-bgc':item.isBetter}">高</span>
            <span v-else class="better" :class="{'high-bgc':item.isBetter}">
              低
            </span>
          </div>
        </div>
      </div>
    </div>
    <h2 class='enter'>进店逛逛</h2>
  </div>

</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    sells() {
      if (this.shopInfo.sells > 10000) {
        let text = ''
        text = (this.shopInfo.sells / 10000).toFixed(1) + '万'
        return text
      }
    }
  }
}
</script>

<style scoped>
.detail-shop-info {
  padding: 20px 10px;
  border-bottom: 4px solid #eee;
}
.detail-shop-info img {
  margin-right: 8px;
  width: 40px;
  border: 1px solid #ccc;
  border-radius: 50%;
  vertical-align: middle;
}
.detail-shop-info .info {
  display: flex;
  padding: 20px 0;
  text-align: center;
}
.detail-shop-info .info .left {
  flex: 1;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
.detail-shop-info .info .left .sells p:nth-child(2) {
  padding-top: 6px;
  font-size: 12px;
}
.detail-shop-info .info .left .goods-count {
  padding-right: 20px;
  border-right: 1px solid #ccc;
}
.detail-shop-info .info .left .goods-count p:nth-child(2) {
  padding-top: 6px;
  font-size: 12px;
}
.detail-shop-info .info .right {
  flex: 1;
  padding-left: 10px;
  font-size: 13px;
}
.detail-shop-info .info .right .scrore {
  display: flex;
  text-align: left;
}
.detail-shop-info .info .right .scrore:nth-child(2) {
  margin: 6px 0;
}

.detail-shop-info .info .right .scrore .name {
  flex: 2;
}
.detail-shop-info .info .right .scrore .score {
  flex: 1;
  padding: 0 10px;
  color: rgb(0, 200, 0);
}
.detail-shop-info .info .right .scrore .better {
  flex: 1;
}
.detail-shop-info .info .right .scrore .better span {
  background-color: rgb(0, 200, 0);
  color: #fff;
}
.high-bgc {
  background-color: #f00 !important;
}
.high-color {
  color: #f00 !important;
}

.detail-shop-info .enter {
  display: inline-block;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  background-color: #eee;
  padding: 8px 40px;
  font-size: 12px;
  font-weight: normal;
  border-radius: 8px;
}
</style>