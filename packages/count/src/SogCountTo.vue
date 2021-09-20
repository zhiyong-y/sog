<template>
  <div>{{finalValue}}</div>
</template>

<script>
import { requestAnimationFrame, cancelAnimationFrame } from '../util/util'
export default {
  props: {
    startVal: {
      type: Number,
      required: false,
      default: 0
    },
    endVal: {
      type: Number,
      required: false,
      default: 2017
    },
    duration: {
      // 执行时间
      type: Number,
      required: false,
      default: 3000
    },
    autoplay: {
      // 默认自动加载
      type: Boolean,
      required: false,
      default: true
    },
    prefix: {
      // 前缀
      type: String,
      required: false,
      default: ''
    },
    suffix: {
      // 后缀
      type: String,
      required: false,
      default: ''
    },
    separator: {
      // 千分位分隔符
      type: String,
      required: false,
      default: ','
    },
    decimals: {
      type: Number,
      required: false,
      default: 0,
      validator (value) {
        return value >= 0
      }
    },
    decimal: {
      type: String,
      required: false,
      default: '.'
    },
    useEasing: {
      // 临近结束时动画渐缓
      type: Boolean,
      required: false,
      default: true
    },
    easingFn: {
      type: Function,
      default (t, b, c, d) {
        return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b
      }
    }
  },
  data () {
    return {
      printVal: null, // finalValue的中间变量
      finalValue: 0,
      timestamp: null,
      startTime: null,
      remaining: null,
      localDuration: this.duration,
      rAF: null // 用于cancelAnimationFrame
    }
  },
  computed: {
    // countUp or countDown
    countDown () {
      return this.startVal > this.endVal
    }
  },
  watch: {
    startVal () {
      if (this.autoplay) {
        this.start()
      }
    },
    endVal () {
      if (this.autoplay) {
        this.start()
      }
    }
  },
  mounted () {
    if (this.autoplay) {
      this.start()
    }
  },
  methods: {
    start () {
      this.localStartVal = this.startVal
      this.startTime = null
      this.localDuration = this.duration
      // this.paused = false
      this.rAF = requestAnimationFrame(this.count)
    },
    count (timestamp) {
      if (!this.startTime) this.startTime = timestamp
      this.timestamp = timestamp
      const progress = timestamp - this.startTime
      this.remaining = this.localDuration - progress

      if (this.useEasing) {
        if (this.countDown) {
          this.printVal = this.localStartVal - this.easingFn(progress, 0, this.localStartVal - this.endVal, this.localDuration)
        } else {
          this.printVal = this.easingFn(progress, this.localStartVal, this.endVal - this.localStartVal, this.localDuration)
        }
      } else {
        if (this.countDown) {
          this.printVal = this.localStartVal - ((this.localStartVal - this.endVal) * (progress / this.localDuration))
        } else {
          this.printVal = this.localStartVal + (this.endVal - this.localStartVal) * (progress / this.localDuration)
        }
      }
      if (this.countDown) {
        this.printVal = this.printVal < this.endVal ? this.endVal : this.printVal
      } else {
        this.printVal = this.printVal > this.endVal ? this.endVal : this.printVal
      }

      this.finalValue = this.formatNumber(this.printVal)
      if (progress < this.localDuration) {
        this.rAF = requestAnimationFrame(this.count)
      } else {
        this.$emit('callback')
      }
    },
    isNumber (val) {
      return !isNaN(parseFloat(val))
    },
    formatNumber (val) {
      // 保留指定位数小数
      val = val.toFixed(this.decimals)
      val += ''
      const x = val.split('.')
      let x1 = x[0]
      const x2 = x.length > 1 ? this.decimal + x[1] : ''
      const rgx = /(\d+)(\d{3})/
      if (this.separator && !this.isNumber(this.separator)) {
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + this.separator + '$2')
        }
      }
      return this.prefix + x1 + x2 + this.suffix
    }
  },
  destroyed () {
    cancelAnimationFrame(this.rAF)
  }
}
</script>

<style lang="scss" scoped>
</style>
