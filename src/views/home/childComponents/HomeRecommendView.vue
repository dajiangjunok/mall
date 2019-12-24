<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeRecommendView',
  props: {
    recommends: {
      type: Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.recommend {
  display: flex;
  padding: 10px 0 20px 0;
  width: 100%;
  border-bottom: 8px solid #eee;
  font-size: 12px;
  text-align: center;
}
.recommend .recommend-item {
  flex: 1;
}
.recommend .recommend-item img {
  margin-bottom: 8px;
  width: 80%;
}
</style>