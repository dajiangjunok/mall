<template>
  <div class="item-tabbar" @click="itemClick" :style="activeStyle">
    <slot name="item-ico"></slot>
    <slot name="item-text"></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  data() {
    return {}
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.link) !== -1
    },
    activeStyle() {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  props: {
    link: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  methods: {
    itemClick() {
      this.$router.replace(this.link)
    }
  }
}
</script>

<style>
@font-face {
  font-family: 'icomoon';
  src: url('~assets/fonts/icomoon.eot?v2u8tl');
  src: url('~assets/fonts/icomoon.eot?v2u8tl#iefix') format('embedded-opentype'),
    url('~assets/fonts/icomoon.ttf?v2u8tl') format('truetype'),
    url('~assets/fonts/icomoon.woff?v2u8tl') format('woff'),
    url('~assets/fonts/icomoon.svg?v2u8tl#icomoon') format('svg');
  font-weight: normal;
  font-style: normal;
  font-display: block;
}
#tabbar .item-tabbar {
  flex: 1;
  margin: 8px;
  text-align: center;
}

#tabbar .item-tabbar .item-icomoon {
  display: block;
  font-family: 'icomoon';
  font-size: 18px;
}
#tabbar .item-tabbar span:nth-child(2) {
  font-size: 12px;
}
</style>