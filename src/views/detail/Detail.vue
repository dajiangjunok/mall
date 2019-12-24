<template>
  <div class="detail">
    <DetailNav></DetailNav>
    <Scroll class="wrapper" ref="scroll">
      <DetailSwiper :topImages="topImages" v-if="topImages.length!==0" />
      <DetailBaseInfo :goods='goods' v-if="isGoodsEmpty" />
      <DetailShopInfo :shopInfo='shopInfo' v-if='isShopInfoEmpty' />
      <DetailInfo :detailInfo='detailInfo' v-if='isDetailInfoEmpty' @imgOnLoad='imgOnLoad' />
      <DetailGoodsParams :itemParams='itemParams' v-if='isItemParamsEmpty' />
      <DetailComment :comments='comments' v-if='comments.length!==0' />
      <DetailRecommend :recommend='recommend' v-if='isRecommendEmpty' />
    </Scroll>
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

import Scroll from '../../components/common/scroll/Scroll'

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
      recommend: {}
    }
  },
  methods: {
    imgOnLoad() {
      // 获取betterScroll 滚动的元素
      this.$refs.scroll.refresh()
      // console.log(this.$refs.scroll)
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
  height: calc(100vh - 44px);
  background-color: #fff;
  overflow: hidden;
}
</style>