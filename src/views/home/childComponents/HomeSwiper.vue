<template>
  <Swiper class="swiper" :imgPath="imgSrc" @amendimgs="amendimgs" v-if="imgSrc.length!==0">
    <SwiperItem v-for="(item,index) in imgSrc" :key="index" :imgSrc="imgSrc">
      <a :href="link[index]">
        <img :src="item">
      </a>
    </SwiperItem>
  </Swiper>

</template>

<script>
import { Swiper, SwiperItem } from '@/components/common/swiper'
export default {
  name: 'HomeSwiper',
  props: {
    banners: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      imgSrc: [],
      link: []
    }
  },
  methods: {
    amendimgs(item) {
      this.imgSrc = item
      if (this.imgSrc.length > this.banners.list.length) {
        this.link = this.banners.list.map(item => {
          return item.link
        })
        this.link = this.link.concat(this.link)
      } else {
        this.link = this.banners.list.map(item => {
          return item.link
        })
      }
    }
  },
  computed: {},
  components: {
    Swiper,
    SwiperItem
  },
  mounted() {
    this.imgSrc = this.banners.list.map(item => {
      return item.image
    })
  }
}
</script>

<style>
img {
  vertical-align: middle;
}
</style>