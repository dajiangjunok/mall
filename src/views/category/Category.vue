<template>
  <div class="category">
    <CategoryNav></CategoryNav>
    <div class="content">
      <CategoryLeftNav :categorysList='categorys' v-if='categorys.length!==0' @changeActive='changeActive' />
      <CategoryRightInfo :subCategorys='subCategorys' v-if='subCategorys.length!==0' />
    </div>
  </div>
</template>

<script>
import CategoryNav from './childComponents/CategoryNav'
import CategoryLeftNav from './childComponents/CategoryLeftNav'
import CategoryRightInfo from './childComponents/CategoryRightInfo'

// 网络请求部分
import { getCategory, getSubcategory, getSubcategoryDetail } from 'network/category'

export default {
  name: 'Category',
  data() {
    return {
      categorys: [],
      subCategorys: []
    }
  },
  components: {
    CategoryNav,
    CategoryLeftNav,
    CategoryRightInfo
  },
  methods: {
    changeActive(index) {
      // 更改数据中的 active属性
      const maitKey = this.categorys[index].maitKey

      this.categorys.forEach(item => {
        item.isActive = false
      })
      this.categorys[index].isActive = true
      this._getSubcategory(maitKey)
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
        console.log(this.subCategorys)
      })
    }
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
</style>