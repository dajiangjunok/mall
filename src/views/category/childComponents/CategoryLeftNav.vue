<template>
  <div class="left-nav">
    <ul>
      <li v-for="(item,index) in categorysList" :key='index+item.title' :class="{active:item.isActive}" @click.prevent='itemClick(index)'>
        {{item.title}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'CategoryLeftNav',
  data() {
    return {}
  },
  props: {
    categorysList: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    itemClick(index) {
      this.$emit('changeActive', index)
    }
  },
  mounted() {
    this.itemClick(0)
    // console.log(this.categorysList)
  }
}
</script>

<style scoped>
.left-nav {
  position: relative;
  flex: 1;
  /* width: 25%; */
  height: calc(100vh - 49px - 44px);
}
.left-nav ul {
  display: flex;
  /* justify-content: space-around; */
  flex-direction: column;
  text-align: center;
  height: 100%;
}
.left-nav ul li {
  flex: 1;
  height: 49px;
  line-height: 49px;
  background-color: #f2f2f2;
}
.left-nav ul .active {
  background-color: #fff;
  color: var(--color-high-text);
  border-left: 2px solid var(--color-high-text);
  font-weight: 600;
}
</style>