<template>
  <div class="right-info">
    <a class="right-info-item" v-for='(item,index) in subCategorys' :key='index+item.title' :href='item.link'>
      <img :src="item.image">
      <p>{{item.title}}</p>
    </a>
    <!-- 推荐款式数据 -->
    <div class="category-detail">
      <div class="title">
        <div v-for='(item,index) in title' :key='index' @click="detailClick(index)">
          <span :class="{active:item.isActive}">{{item.name}}</span>
        </div>
      </div>
      <div class="info">
        <GoodsList :goodsList='subCategoryDetail[type]' />
      </div>
    </div>
  </div>
</template>

<script>
import GoodsList from 'components/content/goods/GoodsList'

export default {
  name: 'CategoryRightInfo',
  data() {
    return {
      title: [
        { name: '综合', isActive: true, type: 'pop' },
        { name: '新品', isActive: false, type: 'new' },
        { name: '销量', isActive: false, type: 'sell' }
      ],
      type: 'pop'
    }
  },
  props: {
    subCategorys: {
      type: Array,
      default() {
        return []
      }
    },
    subCategoryDetail: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    // currentDetail() {
    //   this.title.forEach((item, i) => {
    //     if (item.isActive) {
    //       console.log(this.subCategoryDetail[item.type])
    //       return this.subCategoryDetail[item.type]
    //     }
    //   })
    // }
  },
  mounted() {
    // console.log(this.subCategorys)
  },
  methods: {
    detailClick(index) {
      this.title.forEach((item, i) => {
        if (index == i) {
          item.isActive = true
          this.type = item.type
        } else {
          item.isActive = false
        }
      })
    }
  },
  components: {
    GoodsList
  }
}
</script>

<style scoped>
.right-info {
  /* flex: 3; */
  display: flex;
  /* justify-content: space-evenly; */
  /* justify-content: start; */
  padding-left: 26px;
  flex-wrap: wrap;
  font-size: 14px;
}
.right-info .right-info-item {
  width: 32%;
  text-align: center;
}
.right-info .right-info-item a {
  overflow: hidden;
}
.right-info .right-info-item img {
  margin: 15px 0;
  width: 80%;
  border-radius: 50%;
}

.category-detail {
  margin-top: 20px;
}
.category-detail .title {
  display: flex;
  /* justify-content: space-evenly; */
}
.category-detail .title div {
  flex: 1;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 16px;
}
.category-detail .title div span {
  padding: 3px 3px 5px 3px;
}
.category-detail .title div span.active {
  border-bottom: 2px solid var(--color-tint);
  color: var(--color-tint);
}
</style>