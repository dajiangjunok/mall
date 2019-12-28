<template>
  <div class="category">
    <CategoryNav></CategoryNav>
    <div class="content">
      <Scroll class="scroll-content nav">
        <CategoryLeftNav :categorysList='categorys' v-if='categorys.length!==0' @changeActive='changeActive' />
      </Scroll>
      <Scroll class="scroll-content info" :probeType='3' ref='scroll' @scroll='scroll'>
        <CategoryRightInfo :subCategorys='subCategorys' v-if='subCategorys.length!==0' :subCategoryDetail='subCategoryDetail' />
      </Scroll>
      <BackTop @click.native="BackTopClick" v-show='isBackTopShow' />
    </div>
  </div>
</template>

<script>
import CategoryNav from './childComponents/CategoryNav'
import CategoryLeftNav from './childComponents/CategoryLeftNav'
import CategoryRightInfo from './childComponents/CategoryRightInfo'

import Scroll from 'components/common/scroll/Scroll'
import BackTop from '../../components/content/backtop/BackTop'
import debounce from 'common/debounce'

// 网络请求部分
import { getCategory, getSubcategory, getSubcategoryDetail } from 'network/category'

export default {
  name: 'Category',
  data() {
    return {
      categorys: [],
      subCategorys: [],
      subCategoryDetail: {
        pop: [],
        new: [],
        sell: []
      },
      isBackTopShow: false
    }
  },
  components: {
    CategoryNav,
    CategoryLeftNav,
    CategoryRightInfo,
    Scroll,
    BackTop
  },
  methods: {
    scroll(position) {
      if (Math.abs(position.y) > 1500) {
        this.isBackTopShow = true
      } else {
        this.isBackTopShow = false
      }
    },
    BackTopClick() {
      this.$refs.scroll.scrollTo(0, 0, 1000)
    },
    changeActive(index) {
      // 更改数据中的 active属性
      const maitKey = this.categorys[index].maitKey

      this.categorys.forEach(item => {
        item.isActive = false
      })
      this.categorys[index].isActive = true
      this._getSubcategory(maitKey)

      this._getSubcategoryDetail('pop', index)
      this._getSubcategoryDetail('new', index)
      this._getSubcategoryDetail('sell', index)
    },
    // 此处我们需要拿到服务器返回的分类界面的数据
    _getCategory() {
      getCategory().then(res => {
        // 此时拿到的是  页面左侧的的导航数字数据
        this.categorys = res.data.category.list
        this.categorys.forEach(item => {
          this.$set(item, 'isActive', false)
        })
      })
    },
    _getSubcategory(maitKey) {
      // 拿到对应的导航右侧数据
      getSubcategory(maitKey).then(res => {
        this.subCategorys = res.data.list
      })
    },
    // 此处我们拿  右侧下拉推荐的数据
    _getSubcategoryDetail(type, index) {
      const miniWallkey = this.categorys[index].miniWallkey
      getSubcategoryDetail(miniWallkey, type).then(res => {
        this.subCategoryDetail[type] = res
      })
    }
  },
  mounted() {
    // 获取刷新的函数
    const refresh = debounce(this.$refs.scroll.refresh, 500)
    // 什么时候触发？ 图片加载好的时候
    this.$bus.$on('imageLoad', () => {
      refresh()
    })
  },
  created() {
    this._getCategory() //创建的时候调用一下先拿到  category中的数据

    // 拿到  subcategory的  detail
    // getSubcategoryDetail(10062603).then(res => {
    //   console.log(res)
    // })
  }
}
</script>

<style scoped>
.content {
  display: flex;
}
.scroll-content {
  height: calc(100vh - 93px);
  /* overflow: hidden; */
}
.content .nav {
  flex: 1;
}
.content .info {
  flex: 3;
}
</style>