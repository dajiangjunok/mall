<template>
  <div class="tab-control">
    <div v-for="(item,index) in titles" :key="index" class="tab-control-item" :class="{active:index===isActiveIndex}" @click="showActive(index)">
      <span>{{item}}</span>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  data() {
    return {
      isActiveIndex: 0
    }
  },
  methods: {
    showActive(index) {
      this.isActiveIndex = index
      this.$emit('tabControlClick', index)
    }
  },
  props: {
    titles: {
      type: Array
    }
  }
}
</script>

<style>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 14px;
  line-height: 40px;
  height: 40px;
  background-color: #fff;
}
.tab-control .tab-control-item {
  flex: 1;
}
.tab-control .tab-control-item span {
  padding: 3px;
}
.tab-control .active {
  color: var(--color-high-text);
}
.tab-control .active span {
  border-bottom: 2px solid var(--color-tint);
}
</style>