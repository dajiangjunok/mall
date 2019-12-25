<template>

  <Swiper :imgPath="imgSrc" v-if="imgSrc.length!==0" class="detail-swiper" @amendimgs="amendImgsLength" @toggle="toggleInfo" :needAuto='needAuto' :needCarousel='needCarousel' :needPoint='needPoint'>
    <SwiperItem v-for="(item,index) in imgSrc" :key="index" :imgSrc="imgSrc">
      <img :src="item" @load="imgLoad">
    </SwiperItem>
  </Swiper>
  <!-- <Swiper class="swiper" :imgPath="imgSrc" @amendimgs="amendimgs" v-if="imgSrc.length!==0">
    <SwiperItem v-for="(item,index) in imgSrc" :key="index" :imgSrc="imgSrc">
      <a :href="link[index]">
        <img :src="item" @load="imgload">
      </a>
    </SwiperItem>
  </Swiper> -->
</template>

<script>
import { Swiper, SwiperItem } from 'components/common/swiper'
export default {
  name: 'DetailSwiper',
  components: {
    Swiper,
    SwiperItem
  },
  data() {
    return {
      imgSrc: [],
      needAuto: true,
      needCarousel: true,
      needPoint: true
    }
  },
  methods: {
    // 当一张图片的时候，不要显示指示点，不要自动轮播，不要无缝
    toggleInfo() {
      this.needAuto = false
      this.needCarousel = false
      this.needPoint = false
    },
    amendImgsLength(item) {
      this.imgSrc = item
    },
    imgLoad() {
      this.$emit('imgOnLoad')
    }
  },
  props: {
    topImages: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    this.imgSrc = this.topImages
  }
}
</script>

<style scoped>
.detail-swiper {
  width: 100vw;
  height: 280px;
  overflow: hidden;
}
.detail-swiper img {
  width: 100%;
}
</style>