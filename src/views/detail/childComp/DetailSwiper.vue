<template>

  <Swiper :imgPath="imgSrc" v-if="imgSrc.length!==0" class="detail-swiper" @amendimgs="amendImgsLength">
    <SwiperItem v-for="(item,index) in imgSrc" :key="index" :imgSrc="imgSrc">
      <img :src="item">
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
      imgSrc: []
    }
  },
  methods: {
    amendImgsLength(item) {
      this.imgSrc = item
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