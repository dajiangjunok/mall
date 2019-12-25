<template>
  <div class="nav">
    <NavBar>
      <div slot="left" class="title-left" @click="backClick">
        <img src="~assets/img/common/back.svg" class="back">
      </div>
      <div slot="center" class="title-center">
        <div v-for="(item,index) in titles" :key="index" class="title-center-item" :class="{active:isActive===index}" @click="itemClick(index)">{{item}}</div>
      </div>
    </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import { type } from 'os'

export default {
  name: 'DetailNav',
  data() {
    return {
      titles: ['商品', '参数', '评论', '推荐'],
      isActive: 0
    }
  },
  methods: {
    itemClick(index) {
      this.isActive = index
      // 此处需要拿到滚动事件，这样我们就可以操作滚动到指定位置
      this.$emit('itemClick', this.isActive)
    },
    backClick() {
      this.$router.go(-1)
    }
  },
  components: {
    NavBar
  }
}
</script>

<style scoped>
.nav {
  position: relative;
  z-index: 55;
  background-color: #fff;
}
.nav .title-center {
  display: flex;
  justify-content: space-evenly;
  font-size: 14px;
}

/* .nav .title-center .title-center-item {
  flex: 1;
} */
.active {
  color: var(--color-high-text);
}
.title-left {
  position: relative;
}
.back {
  position: absolute;
  z-index: 666;
  left: 50%;
  transform: translateX(-50%);
  transform: translateY(50%);
}
</style>