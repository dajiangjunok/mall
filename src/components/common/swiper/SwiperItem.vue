<template>
  <div class="swiper-item" :style="{width:1/imgSrc.length*100+'%'}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'SwiperItem',
  props: {
    imgSrc: {
      type: Array
    }
  }
}
</script>

<style>
.swiper-item {
  float: left;
}

.swiper-item a {
  display: inline-block;
}
.swiper-item img {
  width: 100%;
}
</style>