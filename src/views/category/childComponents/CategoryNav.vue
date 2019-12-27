<template>
  <div class="category-nav">
    <NavBar>
      <template v-slot:center>
        商品分类
      </template>
    </NavBar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'CategoryNav',
  components: {
    NavBar
  }
}
</script>

<style scoped>
.category-nav {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 17px;
  font-weight: 700;
}
</style>