<template>
  <div class="listView">
    <div v-for="(item, index) in listData" :key="index" class="item">
      <span class="icon">
        <svg :fill="item.iconColor">
          <use :xlink:href="item.icon"></use>
        </svg>
      </span>
      <div class="info">{{item.info}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'listView',
  props: {
    listData: {
      type: Array,
      default: function() {
        return []
      }
    }
  }
}
</script>

<style scoped>
.listView {
  background-color: #fff;
  font-size: 15px;
  color: #333;
  border-bottom: 8px solid #f2f2f2;
}

.listView .item {
  height: 44px;
  line-height: 44px;
  position: relative;
}

.icon svg {
  width: 18px;
  height: 18px;
}

.item .icon {
  margin-top: 10px;
  position: absolute;
  left: 16px;
  top: -7px;
}

.item .info {
  margin-left: 40px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.1);
  padding-left: 5px;
}

.item:last-of-type .info {
  border-bottom: none;
}
</style>