<template>
  <div class="toast" v-show='isToastShow'>
    <p>{{message}}</p>
  </div>
</template>

<script>
export default {
  name: 'Toast',
  data: function() {
    return {
      message: '',
      isToastShow: false,
      timer: 'null'
    }
  },
  methods: {
    show(mes, duration = 2000) {
      this.message = mes
      this.isToastShow = true
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.isToastShow = false
        this.message = ''
      }, duration)
    }
  }
}
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 20px;
  z-index: 999999999;
  background-color: rgba(0, 0, 0, 0.5);
  color: #fff;
  border-radius: 3px;
  font-size: 15px;
}
</style>