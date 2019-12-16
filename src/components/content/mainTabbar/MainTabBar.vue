<template>
  <tab-bar>
    <tab-bar-item link="/home" activeColor='pink'>
      <span slot="item-ico" class="item-icomoon"></span>
      <span slot="item-text">首页</span>
    </tab-bar-item>
    <tab-bar-item link="/category" activeColor='pink'>
      <span slot="item-ico" class="item-icomoon"></span>
      <span slot="item-text">分类</span>
    </tab-bar-item>
    <tab-bar-item link="/shopcart" activeColor='pink'>
      <span slot="item-ico" class="item-icomoon"></span>
      <span slot="item-text">购物车</span>
    </tab-bar-item>
    <tab-bar-item link="/profile" activeColor='pink'>
      <span slot="item-ico" class="item-icomoon"></span>
      <span slot="item-text">我的</span>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from 'components/common/tabbar/TabBar'
import TabBarItem from 'components/common/tabbar/TabBarItem'

export default {
  name: 'MainTabBar',
  components: {
    TabBar,
    TabBarItem
  }
}
</script>

<style>
</style>