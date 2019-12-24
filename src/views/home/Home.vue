<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template v-slot:center>购物街</template>
    </nav-bar>
    <TabControl ref="tabControl1" :titles="['流行','新款','精选']" @tabControlClick="tabControlClick" class="tab-control" v-show="isTabControlFixed" />
    <Scroll class="srcoll-wrapper" ref="scroll" :probeType="3" @scroll="scrollEvent" @loadmore="loadmore" :pullUpLoad="true">
      <HomeSwiper :banners="banners" v-if="banners.length!==0" @SwiperImgIsOnLoad="imgisonload"></HomeSwiper>
      <HomeRecommendView :recommends="recommends"></HomeRecommendView>
      <HomeFeature></HomeFeature>
      <TabControl ref="tabControl2" :titles="['流行','新款','精选']" @tabControlClick="tabControlClick" />
      <GoodsList :goodsList="showGoodsList" />
    </Scroll>
    <transition name="fade">
      <BackTop @click.native="BackTopClick" v-show="isShowBack"></BackTop>
    </transition>
  </div>
</template>

<script>
import HomeSwiper from './childComponents/HomeSwiper'
import HomeRecommendView from './childComponents/HomeRecommendView'
import HomeFeature from './childComponents/HomeFeature'

import NavBar from 'components/common/navbar/NavBar'
import Scroll from 'components/common/scroll/Scroll'
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import BackTop from 'components/content/backtop/BackTop'

import { getHomeMultidata } from 'network/home'
import { getHomeGoods } from 'network/home'

// 公共js工具代码
// 解决频繁调用性能消耗
import debounce from 'common/debounce'

export default {
  name: 'Home',
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: 'pop',
      isShowBack: false,
      isTabControlFixed: false,
      tabOffsetTop: 534,
      saveY: 0
    }
  },
  methods: {
    /**
     * 事件监听相关方法
     */
    // 切换请求类目方法
    tabControlClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      // 控制tabControl 选项卡，这两个组件中的  isActiveIndex  让其同步
      this.$refs.tabControl1.isActiveIndex = index
      this.$refs.tabControl2.isActiveIndex = index
    },
    // 按钮返回顶部操作
    BackTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    // 实时监听滚动事件
    scrollEvent(position) {
      // 1.监听BcakToP是否显示
      this.isShowBack = Math.abs(position.y) > 1000
      // 2.决定tabControl是否吸顶(position:fixed )
      this.isTabControlFixed = Math.abs(position.y) > this.tabOffsetTop
    },
    // 下拉加载更多
    loadmore() {
      this.getHomeGoods(this.currentType)
      new Promise((resolve, reject) => {
        setTimeout(() => {
          this.$refs.scroll.finishPullUp()
          resolve()
        }, 1000)
      }).then(res => {
        this.$refs.scroll.refresh()
      })
    },
    /**
     * 网络请求，相关方法
     */
    getHomeMultidata() {
      // 1.请求多个数据
      getHomeMultidata().then(res => {
        // console.log(res)
        this.banners = res.data.banner
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      // 2.请求商品数据
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
      })
      this.goods[type].page += 1
    },
    // 监听轮播图是否已加载
    /**
     * imgisonload() {
     * 吸顶效果处理
     * 1.拿到滑屏元素的offsetTop
     * 但是此方法出现了两个bug  一个是吸顶后由于脱标，导致后续元素闪现
     * 以及无法通过定位吸顶，因为滑屏是用的css3的 transform属性
     *
     * console.log(this.$refs.scroll.$el.offsetTop)
     * }
     */
    imgisonload() {
      this.$refs.scroll.$el.offsetTop
    }
  },
  computed: {
    showGoodsList() {
      return this.goods[this.currentType].list
    }
  },
  components: {
    HomeSwiper,
    HomeRecommendView,
    HomeFeature,
    NavBar,
    Scroll,
    TabControl,
    GoodsList,
    BackTop
  },
  // http://106.54.54.237:8000/api/v1/home/data?type=sell&page=1
  created() {
    // 1.请求多个数据
    this.getHomeMultidata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    // 获取刷新的函数
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    // 什么时候触发？ 图片加载好的时候
    this.$bus.$on('imageLoad', () => {
      refresh()
    })
  },
  activated() {
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  destroyed() {
    console.log('destroyed')
  }
}
</script>

<style scoped>
#home {
  position: relative;
  padding-top: 44px;
  height: 100vh;
  overflow: hidden;
}
.home-nav {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9;
  width: 100%;
  background-color: var(--color-tint);
  color: #fff;
}
#home .srcoll-wrapper {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
}
.tab-control {
  position: relative;
  z-index: 9;
  top: 0;
  left: 0;
}
</style>