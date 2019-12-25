<template>
  <div class="swiper" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
    <div class="swiper-slide" :style="{width:imgSrc.length * 100 +'%'}">
      <slot></slot>
    </div>
    <div class="point" v-if="needPoint">
      <span v-for="(item, i) in points" :key="i" :class="{active:index===i}" :style="isActive(i)"></span>
    </div>
  </div>
</template>

<script>
import { log } from 'util'
export default {
  name: 'Swiper',
  props: {
    // 请求拿到的滑屏图片
    imgPath: {
      type: Array,
      required: true
    },
    // 是否无缝
    needCarousel: {
      type: Boolean,
      default: true
    },
    // 是否自动滑屏
    needAuto: {
      type: Boolean,
      default: true
    },
    // 是否需要指示点
    needPoint: {
      type: Boolean,
      default: true
    },
    // 滑屏的速度 毫秒
    speed: {
      type: Number,
      default: 3000
    },
    // 获取传递的导航点活跃颜色
    activeColor: {
      type: String,
      default: 'deeppink'
    }
  },
  data() {
    return {
      imgSrc: [],
      points: [],
      // 获取滑屏元素，和滑屏区域，
      swiper: {},
      swiperSlide: {},
      // 滑屏开始的一些初始化值
      // 刚开始的手指位置
      start: {},
      // 移动过程中 滑动的距离
      dis: { x: 0, y: 0 },
      // 当前滑屏元素的transfrom位置
      translateX: 0,
      // 记录第几张图在轮播
      index: 0,
      // 定时器
      timer: null,
      // 防抖动
      isFirst: true,
      isX: true
    }
  },
  methods: {
    isActive(i) {
      // 盘点是否有无缝滑屏，是的话
      if (!this.needCarousel) {
        if (Math.abs(this.index) == i) {
          return { backgroundColor: this.activeColor }
        }
      } else {
        if (Math.abs(this.index % this.points.length) == i) {
          return { backgroundColor: this.activeColor }
        }
      }
    },
    // 封装一个函数，操作transform属性的读取和赋值
    cssTransform(node, type, val) {
      // 判断用户是否第一次使用该函数，并传了参数node对象
      if (typeof node === 'object' && typeof node['transform'] === 'undefined') {
        node['transform'] = {}
      }
      if (arguments.length === 3) {
        // 传入的实参个数三个，则表示是赋值操作
        // 将传递过来的属性，值存入之前创建的对象中
        node['transform'][type] = val

        // 然后进行css操作，定义一个值去拼接transform属性值
        let text = ''
        // 循环该对象，将每个属性对应的值拼接到text上，为之后操作css做准备
        for (let item in node['transform']) {
          switch (item) {
            case 'translateX':
            case 'translateY':
            case 'translateZ':
              // transform: translateX(565px)  格式
              text += `${item}(${node['transform'][item]}px)`
              break
            case 'scale':
              text += `${item}(${node['transform'][item]})`
              break
            case 'rotate':
              text += `${item}(${node['transform'][item]}deg)`
              break
          }
        }
        node.style.transform = text
      } else if (arguments.length === 2) {
        // 读取操作
        let result = node['transform'][type]
        // 但是如果用户给这些个属性操作过，默认就会是undefined,那么我们希望是默认一些数值
        if (typeof result === 'undefined') {
          // 之前没有传值过则进入下面判断
          switch (type) {
            case 'translateX':
            case 'translateY':
            case 'translateZ':
            case 'rotate':
              result = 0
              break
            case 'scale':
              result = 1
              break
          }
        }
        return result
      }
    },
    touchstart(ev) {
      ev = ev || event
      let touchC = ev.changedTouches[0]
      // 暂停定时器。清除
      this.needAuto ? clearInterval(this.timer) : null
      this.timer = null
      // 判断是否无缝滑屏，如果是则点击第一张跳到第二组第一张，点击第二组最后一张跳到第一组最后一张
      // 这样左右滑动就不会出现边界
      if (this.needCarousel) {
        if (this.index === 0) {
          this.index = -this.imgSrc.length / 2
          this.cssTransform(this.swiperSlide, 'translateX', this.index * this.swiper.offsetWidth)
        } else if (this.index === 1 - this.imgSrc.length) {
          this.index = 1 - this.imgSrc.length / 2
          this.cssTransform(this.swiperSlide, 'translateX', this.index * this.swiper.offsetWidth)
        }
      }

      // 取消过渡动画
      this.swiperSlide.style.transition = 'none'
      // 开启3d渲染
      this.cssTransform(this.swiperSlide, 'translateZ', 0.1)
      this.start = { x: touchC.clientX, y: touchC.clientY }
      // 获取每次点击时候滑屏元素的当前tranlateX值
      this.translateX = this.cssTransform(this.swiperSlide, 'translateX')
    },
    touchmove(ev) {
      ev = ev || event
      let touchC = ev.changedTouches[0]
      // 防抖动
      if (!this.isX) {
        return
      }
      // 移动过程中手指当前位置
      let newDis = { x: touchC.clientX, y: touchC.clientY }
      this.dis = { x: newDis.x - this.start.x, y: newDis.y - this.start.y }
      if (this.isFirst) {
        this.isFirst = false
        if (Math.abs(this.dis.x) < Math.abs(this.dis.y)) {
          this.isX = false
        }
      }
      // 开始让滑屏元素根据移动同步起来，那么需要在点击的时候，先拿到滑屏元素的transform位置
      // 实际移动位置为
      let targetX = this.translateX + this.dis.x
      this.cssTransform(this.swiperSlide, 'translateX', targetX)
    },
    touchend(ev) {
      ev = ev || event
      let touchC = ev.changedTouches[0]
      // 判断此时滑屏元素移出了多少个视口 ,获得一个比例，这个比例有正反，正代表元素左边移动
      let ratio = this.cssTransform(this.swiperSlide, 'translateX') / this.swiper.offsetWidth

      // 判断滑屏是否超过滑屏视口的三分之一，并让图片无法划出最后一张和第一张
      if (Math.abs(this.dis.x) < this.swiper.offsetWidth / 3) {
        ratio = parseInt(ratio)
      } else if (Math.abs(this.dis.x) > this.swiper.offsetWidth / 3) {
        // 大于等于三分之一  ，判断移动方向，确定滑屏元素向左移动还是向右移动，
        if (this.dis.x < 0) {
          // 滑屏元素右移,并且判断是否滑到超出最后一张图
          ratio < 1 - this.imgSrc.length
            ? (ratio = 1 - this.imgSrc.length)
            : (ratio = parseInt(ratio) - 1)
        } else if (this.dis.x > 0) {
          // 滑屏元素左移,并且判断是否滑到超出第一张图
          ratio > 0 ? (ratio = 0) : (ratio = parseInt(ratio))
        }
      }
      // 添加过渡
      this.swiperSlide.style.transition = 'transform 1s'
      this.cssTransform(this.swiperSlide, 'translateX', ratio * this.swiper.offsetWidth)
      this.index = ratio
      // 清除保留的手指位移,恢复自动轮播定时器
      this.needAuto ? this.auto() : null
      this.dis = {}
      // 防止抖动控制复原
      this.isFirst = true
      this.isX = true
    },
    // 封装自动轮播的函数
    auto() {
      this.timer = setInterval(() => {
        if (!this.needCarousel) {
          if (this.index === 1 - this.imgSrc.length) {
            // 由于下面还需要index--  然后才能移动，因此需要0往上走一位
            this.index = 1
          }
        } else {
          if (this.index === 1 - this.imgSrc.length) {
            this.index = 1 - this.imgSrc.length / 2
            this.swiperSlide.style.transition = 'none'
            this.cssTransform(this.swiperSlide, 'translateX', this.index * this.swiper.offsetWidth)
          }
        }
        this.index--
        setTimeout(() => {
          this.swiperSlide.style.transition = 'transform 1s'
          this.cssTransform(this.swiperSlide, 'translateX', this.index * this.swiper.offsetWidth)
        }, 50)
      }, this.speed)
    }
  },
  mounted() {
    this.needAuto ? this.auto() : null
    // 1. 页面加载结束后判断是否有无缝
    if (this.needCarousel) {
      // console.log(this.imgPath.concat(this.imgPath))
      this.imgSrc = this.imgPath.concat(this.imgPath)
      this.points.length = this.imgSrc.length / 2
    } else {
      this.imgSrc = this.imgPath
      this.points.length = this.imgSrc.length
    }

    // 获取滑屏元素，滑屏区域的DOM元素
    this.swiper = document.querySelector('.swiper') //滑屏区域
    this.swiperSlide = document.querySelector('.swiper-slide') //滑屏元素

    if (this.points.length == 1) {
      // let toggleInfo = { needAuto: false, needCarousel: false, needPoint: false }
      this.imgSrc.length = 1
      this.$emit('toggle')
      return
    }
    // 2. 判断完毕后 修改父组件中的 imgSrc，让页面的图片是否翻一倍
    this.$emit('amendimgs', this.imgSrc)
  },
  beforeDestroy() {
    clearInterval(this.timer)
    this.timer = null
  }
}
</script>

<style scoped>
.swiper {
  position: relative;
  overflow: hidden;
}
.swiper .swiper-slide {
  position: relative;
  overflow: hidden;
}
.swiper .point {
  position: absolute;
  z-index: 3;
  left: 50%;
  bottom: 8%;
  transform: translateX(-50%);
}
.swiper .point span {
  float: left;
  margin-right: 5px;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgb(204, 204, 204, 0.6);
}
.swiper .point span.active {
  background-color: deeppink;
}
</style>