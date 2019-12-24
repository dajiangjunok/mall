<template>
  <div class="comment">
    <div class="title">
      <p>用户评价</p>
      <p>更多</p>
    </div>
    <div v-for="(item,index) in comments" :key='index'>
      <img :src="item.user.avatar" class="user-image">
      <span class="name">{{item.user.uname}}</span>
      <p>{{item.content}}</p>
      <p v-show='typeof item.explain!=="undefined"'>{{item.explain}}</p>
      <span class="date">{{item.created|showDate}}</span>
      <span class="style">{{item.style}}</span>
      <div class="info-imgs" v-if='typeof comments[0].images!=="undefined"'>
        <img :src="item" v-for="(item, index) in comments[0].images" :key='index'>
      </div>
    </div>
  </div>
</template>

<script>
import { formatDate } from 'common/utils'
export default {
  name: 'DetailComment',
  props: {
    comments: {
      type: Array,
      default() {
        return []
      }
    }
  },
  filters: {
    showDate: function(value) {
      let date = new Date(value * 1000)
      return formatDate(date, 'yyyy-MM-dd')
    }
  }
}
</script>

<style scoped>
.comment {
  padding: 15px 18px;
  border-bottom: 4px solid #eee;
}
.comment .title {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  border-bottom: 1px solid #eee;
}
.comment .title p {
  color: #000;
}
.comment div:nth-child(2) {
  padding-top: 20px;
}
.comment .user-image {
  width: 10vw;
  height: 10vw;
  border-radius: 50%;
  vertical-align: middle;
}
.comment .name {
  margin-left: 12px;
  font-size: 14px;
}
.comment p {
  padding-top: 15px;
  padding-bottom: 15px;
  line-height: 18px;
  font-size: 12px;
  color: rgb(156, 156, 156);
}
.comment .date {
  margin-right: 15px;
  font-size: 12px;
  color: rgb(156, 156, 156);
}
.comment .style {
  font-size: 12px;
  color: rgb(156, 156, 156);
}
.info-imgs img {
  padding-top: 20px;
  width: 100%;
}
</style>