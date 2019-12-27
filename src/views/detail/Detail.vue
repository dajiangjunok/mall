<template>
  <div class="detail">
    <DetailNav @itemClick='imgOnLoad' ref="nav"></DetailNav>
    <Scroll class="wrapper" ref="scroll" :probeType='3' @scroll='scroll'>
      <DetailSwiper :topImages="topImages" v-if="topImages.length!==0" @imgOnLoad='imgOnLoad' />
      <DetailBaseInfo :goods='goods' v-if="isGoodsEmpty" />
      <DetailShopInfo :shopInfo='shopInfo' v-if='isShopInfoEmpty' />
      <DetailInfo :detailInfo='detailInfo' v-if='isDetailInfoEmpty' @imgOnLoad='imgOnLoad' />
      <DetailGoodsParams :itemParams='itemParams' v-if='isItemParamsEmpty' ref="params" />
      <DetailComment :comments='comments' v-if='comments.length!==0' ref="comment" @imgOnLoad='imgOnLoad' />
      <DetailRecommend :recommend='recommend' v-if='isRecommendEmpty' ref="recommend" @imgOnLoad='imgOnLoad' />
    </Scroll>
    <!-- <Toast :isToastShow="isToastShow" :message='message' /> -->
    <transition name="fade">
      <BackTop @click.native="BackTopClick" v-show='isShowBack' />
    </transition>
    <DetailBottomBar @addCart='addCart' />
  </div>
</template>

<script>
import DetailNav from './childComp/DetailNav'
import DetailSwiper from './childComp/DetailSwiper'
import DetailBaseInfo from './childComp/DetailBaseInfo'
import DetailShopInfo from './childComp/DetailShopInfo'
import DetailInfo from './childComp/DetailInfo'
import DetailGoodsParams from './childComp/DetailGoodsParams'
import DetailComment from './childComp/DetailComment'
import DetailRecommend from './childComp/DetailRecommend'
import DetailBottomBar from './childComp/DetailBottomBar'

import BackTop from 'components/content/backtop/BackTop'

import Scroll from 'components/common/scroll/Scroll'
// import Toast from 'components/common/toast/Toast'

import { getDetail, Goods, Shop, GoodsParams, getRecommend } from 'network/detail'

export default {
  name: 'Detail',
  data() {
    return {
      iid: 'null',
      topImages: [],
      goods: {},
      shopInfo: {},
      detailInfo: {},
      itemParams: {},
      comments: [],
      recommend: {},
      themeTopTs: [],
      isShowBack: false
    }
  },
  updated() {},
  methods: {
    // 获取购物车中需展示的数据
    addCart() {
      const cartInfo = {
        iid: this.iid,
        title: this.goods.title,
        img: this.topImages[0],
        price: this.goods.realPrice,
        desc: this.goods.desc
      }
      // 然后将数据存储到 vuex中,存储成功后弹出  toast
      this.$store.dispatch('addCart', cartInfo).then(res => {
        this.$toast.show('已成功加入购物车', 1500)
      })
    },

    imgOnLoad(index) {
      // 1.获取betterScroll 滚动的元素
      this.$refs.scroll.refresh()
      // 2.当图片加载则获取下   参数，评论，推荐   的DOM元素的 offsetTop值
      // 压进themeTopTs的数组中
      // console.log(typeof this.$refs.recommend, typeof this.$refs.params, typeof this.$refs.comment)
      this.themeTopTs = []
      this.themeTopTs.push(
        0,
        typeof this.$refs.params === 'undefined' ? 0 : this.$refs.params.$el.offsetTop,
        typeof this.$refs.comment === 'undefined' ? 0 : this.$refs.comment.$el.offsetTop,
        typeof this.$refs.recommend === 'undefined' ? 0 : this.$refs.recommend.$el.offsetTop
      )
      // 此处需要拿到滚动事件，这样我们就可以操作滚动到指定位置
      index == undefined ? 0 : this.$refs.scroll.scrollTo(0, -this.themeTopTs[index], 800)
    },
    scroll(position) {
      this.themeTopTs.forEach((item, index) => {
        // 判断下  navbar中活跃的  index和这里的index 是否一致，一致的话就不用进入下面判断
        // 说明我们的值没有变化
        if (this.$refs.nav.isActive === index) {
          return
        }
        if (-position.y >= this.themeTopTs[index] && -position.y <= this.themeTopTs[index + 1]) {
          this.$refs.nav.isActive = index
        } else if (
          -position.y >= this.themeTopTs[index] &&
          typeof this.themeTopTs[index + 1] === 'undefined'
        ) {
          this.$refs.nav.isActive = index
        }
      })
      this.isShowBack = Math.abs(position.y) > 1000
      // console.log(position.y)
    },
    // 返回顶部
    BackTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    }
  },
  computed: {
    isGoodsEmpty() {
      return Object.keys(this.goods).length !== 0
    },
    isShopInfoEmpty() {
      return Object.keys(this.shopInfo).length !== 0
    },
    isDetailInfoEmpty() {
      return Object.keys(this.detailInfo).length !== 0
    },
    isItemParamsEmpty() {
      return Object.keys(this.itemParams).length !== 0
    },
    isRecommendEmpty() {
      return Object.keys(this.recommend).length !== 0
    }
  },
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailInfo,
    DetailGoodsParams,
    DetailComment,
    DetailRecommend,
    DetailBottomBar,
    BackTop,
    Scroll
  },
  created() {
    // 1.保存请求的数据
    this.iid = this.$route.params.iid
    // 2.根据iid请求详情数据
    getDetail(this.iid).then(res => {
      // console.log(res.result)
      // 0.获取数据
      const data = res.result
      // 1.获取轮播图片信息
      this.topImages = data.itemInfo.topImages
      // 2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // console.log(this.goods)
      // 3.获取ShopInfo数据
      this.shopInfo = new Shop(data.shopInfo)
      // console.log(this.shopInfo)
      // 4.获取商品详情信息
      this.detailInfo = data.detailInfo
      // 5.获取衣服参数信息
      this.itemParams = new GoodsParams(data.itemParams.info, data.itemParams.rule)
      // 6.获取评论的数据
      this.comments = typeof data.rate.list === 'undefined' ? [] : data.rate.list
    }),
      getRecommend().then(res => {
        // 7.获取推荐详情数据
        this.recommend = res.data.list
      })
  },
  mounted() {}
}
</script>

<style>
.detail .wrapper {
  position: relative;
  z-index: 9999;
  height: calc(100vh - 93px);
  background-color: #fff;
  overflow: hidden;
}

/* 返回顶部动画效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
}
</style>