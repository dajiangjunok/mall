<template>
  <div class="profile-nav">
    <nav-bar>
      <template v-slot:center>
        老张敏小店
      </template>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'

export default {
  name: 'ProfileNavBar',
  components: {
    NavBar
  }
}
</script>

<style scoped>
.profile-nav {
  background-color: var(--color-tint);
  color: #ffffff;
  font-weight: 700;
}
</style>