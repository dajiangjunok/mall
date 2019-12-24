<template>
  <div class="detail-info">
    <h2 class="intro">{{detailInfo.desc}}</h2>
    <h2 class="title">{{detailInfo.detailImage[0].key}}</h2>
    <img v-for='(item,index) in detailInfo.detailImage[0].list' :key='item+index' :src="item" @load="imgLoad">
  </div>
</template>

<script>
export default {
  name: 'DetailInfo',
  data() {
    return {
      // 记录已加载图片数
      imgLoadCount: 0
    }
  },
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    imgLoad() {
      this.imgLoadCount++
      if (this.imgLoadCount === this.detailInfo.detailImage[0].list.length) {
        this.$emit('imgOnLoad')
        this.imgLoadCount = 0
      }
    }
  },
  mounted() {}
}
</script>
 
 <style scoped>
.detail-info {
  border-bottom: 4px solid #eee;
}
.detail-info .intro {
  position: relative;
  padding: 33px 18px;
  text-align: left;
  font-size: 12px;
  font-weight: normal;
}
.detail-info .intro::before {
  display: inline-block;
  position: absolute;
  left: 20px;
  top: 15px;
  margin-bottom: 15px;
  content: '';
  width: 88px;
  height: 6px;
  background-color: #fff;
  border-left: 6px solid #000;
  border-bottom: 1px solid #ccc;
}
.detail-info .intro::after {
  display: inline-block;
  position: absolute;
  right: 25px;
  bottom: 15px;
  margin-top: 15px;
  content: '';
  width: 88px;
  height: 6px;
  background-color: #fff;
  border-right: 6px solid #000;
  border-bottom: 1px solid #ccc;
}

.detail-info .title {
  margin-left: 15px;
  padding-bottom: 25px;
  font-size: 13px;
  font-weight: normal;
}
.detail-info img {
  width: 100vw;
}
</style>

 