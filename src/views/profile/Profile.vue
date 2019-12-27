<template>
  <div class="profile">
    <ProfileNavBar />
    <ProfileUserInfo></ProfileUserInfo>
    <!-- 不单独封装组件了 -->
    <section class="account">
      <div class="account-item">
        <div class="balance">
          <div><i>0.00</i> 元</div>
          <div>我的余额</div>
        </div>
      </div>
      <div class="account-item">
        <div class="discounts">
          <div><i>0</i> 个</div>
          <div>我的余额</div>
        </div>
      </div>
      <div class="account-item">
        <div class="Integral">
          <div><i>0</i>分 </div>
          <div>我的积分</div>
        </div>
      </div>
    </section>
    <!-- 视图列表组件 -->
    <ProfilelistView :list-data="orderList" class="order-list" />
    <ProfilelistView :list-data="serviceList" class="service-list" />

  </div>
</template>

<script>
import ProfileNavBar from './childComponents/ProfileNavBar'
import ProfileUserInfo from './childComponents/ProfileUserInfo'
import ProfilelistView from './childComponents/ProfilelistView'

export default {
  name: 'Profile',
  components: {
    ProfileNavBar,
    ProfileUserInfo,
    ProfilelistView
  },
  data: function() {
    return {
      orderList: [
        { icon: '#order', iconColor: '#ff8198', info: '我的消息' },
        { icon: '#point', iconColor: '#fc7b53', info: '积分商城' },
        { icon: '#vip', iconColor: '#ffc636', info: '会员卡' }
      ],
      serviceList: [
        { icon: '#service', iconColor: '#ff8198', info: '我的购物车' },
        { icon: '#download', iconColor: '#ff8198', info: '下载购物APP' }
      ]
    }
  }
}
</script>

<style scoped>
.profile {
  background-color: #f2f2f2;
}
.account {
  display: flex;
  background-color: #fff;
  border-bottom: 8px solid #f2f2f2;
  font-size: 14px;
}
.account-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  padding: 13px 0;
  box-sizing: border-box;
}
.account-item div {
  margin-top: 5px;
}
.account-item i {
  text-decoration: none;
  font-style: normal;
  color: rgb(255, 0, 0);
  font-size: 23px;
  font-weight: 700;
}
.account-item:nth-child(2) {
  border-left: 1px solid #f2f2f2;
  border-right: 1px solid #f2f2f2;
}
</style>