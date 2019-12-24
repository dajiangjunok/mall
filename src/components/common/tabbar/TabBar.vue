<template>
  <div id="tabbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style>
#tabbar {
  display: flex;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  height: 49px;
  background-color: #eee;
  box-shadow: 0 -1px 10px 2px rgba(0, 0, 0, 0.1);
}
</style>