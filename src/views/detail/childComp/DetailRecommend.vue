<template>
  <div>
    <h2>今日推荐</h2>
    <div class="sku-info">
      <a class="sku-info-item" href="http://item.meilishuo.com/detail/1kkf1di?acm=3.mce.2_4_1kkf1di.6011.0-41756.xSEtnr76nBiNW.sd_119_115-mid_6011-pos_0-lc_201" v-for='(item,index) in recommend' :key='index'>
        <img :src="item.image" alt="">
        <div>
          <div class="title">
            <p>{{item.title}}</p>
          </div>
          <div>
            <span class="price">￥{{item.price}}</span>
            <span class="likes">{{item.itemLikes}}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailRecommend',
  props: {
    recommend: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
h2 {
  padding: 20px 10px;

  font-size: 16px;
}

.sku-info {
  display: flex;
  padding-top: 15px;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.sku-info-item {
  position: relative;
  font-size: 12px;
  width: 46%;
  padding-bottom: 50px;
}
.sku-info-item > div {
  position: absolute;
  width: 100%;
  bottom: 3px;
  left: 3px;
}
.sku-info-item > div > div:nth-child(2) {
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 5px;
}

.sku-info-item .title {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
}

.sku-info-item .price {
  color: var(--color-high-text);
}
.sku-info-item .likes::before {
  content: '';
  display: inline-block;
  width: 11px;
  height: 11px;
  background: url('~assets/img/detail/detail_bottom.png') no-repeat 0 0;
  background-size: 100%;
}

.sku-info-item img {
  width: 100%;
  border-radius: 6px;
}
</style>