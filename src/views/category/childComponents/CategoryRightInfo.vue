<template>
  <div class="right-info">
    <a class="right-info-item" v-for='(item,index) in subCategorys' :key='index+item.title' :href='item.link'>
      <img :src="item.image">
      <p>{{item.title}}</p>
    </a>
  </div>
</template>

<script>
export default {
  name: 'CategoryRightInfo',
  props: {
    subCategorys: {
      type: Array,
      default() {
        return []
      }
    }
  },
  mounted() {
    // console.log(this.subCategorys)
  }
}
</script>

<style scoped>
.right-info {
  flex: 3;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
}
.right-info .right-info-item {
  margin: 5px 0;
  width: 30%;
  text-align: center;
}
.right-info .right-info-item a {
  overflow: hidden;
}
.right-info .right-info-item img {
  width: 80%;
  border-radius: 50%;
}
</style>