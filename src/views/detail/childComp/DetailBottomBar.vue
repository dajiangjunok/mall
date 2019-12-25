<template>
  <div class="bottom-bar">
    <div class="left">
      <div class="service">
        <i></i>
        <p>客服</p>
      </div>
      <div class="store">
        <i></i>
        <p>店铺</p>
      </div>
      <div class="collect">
        <i></i>
        <p>收藏</p>
      </div>
    </div>
    <div class="right">
      <div class="car">
        <p>加入购物车</p>
      </div>
      <div class="pay">
        <p>购买</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar'
}
</script>

<style scoped>
.bottom-bar {
  display: flex;
  position: fixed;
  z-index: 999999;
  bottom: 0;
  left: 0;
  height: 49px;
  width: 100%;
  background-color: #fff;
  font-size: 13px;
}
.bottom-bar .left,
.bottom-bar .right {
  display: flex;
  flex: 1;
}
.bottom-bar .right {
  background-color: pink;
}
.bottom-bar .left .service,
.bottom-bar .left .store,
.bottom-bar .left .collect {
  flex: 1;
  /* line-height: 49px; */
  text-align: center;
}
.service > i {
  background: url('~assets/img/detail/detail_bottom.png') 0 -47px;
}

.collect > i {
  background: url('~assets/img/detail/detail_bottom.png') 0 0;
}
.store > i {
  background: url('~assets/img/detail/detail_bottom.png') 0 -88px;
}
.service > i,
.collect > i,
.store > i {
  display: inline-block;
  margin: 7px auto 5px;
  width: 20px;
  height: 20px;
  background-size: 20px;
  vertical-align: middle;
}

.bottom-bar .right {
  text-align: center;
}
.car {
  flex: 2;
  line-height: 49px;
  background-color: #ffe6e8;
  color: #ff5777;
}
.pay {
  flex: 1.8;
  line-height: 49px;
  color: #fff;
  font-weight: 700;
  background: linear-gradient(90deg, #ff5777, #ff468f);
}
</style>