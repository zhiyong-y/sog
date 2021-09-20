<template>
  <div>
    <h3>测试修改vue.config.js的别名修改</h3>
    {{param}}
  </div>
</template>

<script>
export default {
  name: 'Test',
  props: {
    msg: String
  },
  data () {
    return {
      tips: 'init tips',
      w: 'watcher'
    }
  },
  // watch: {
  //   w (newValue, oldValue) {
  //     console.log(newValue)
  //     // console.log(this.tips)
  //   }
  // },
  watch: {
    w1: {
      immediate: true,
      deep: true,
      handler (newValue, oldValue) {
        console.log(newValue)
      }
    }
  },
  methods: {
    getData () {
      // 通过接口获取的数据
      const result = '接口返回数据'
      this.tips = result
      this.w = result
    }
  },
  beforeCreate () {
    console.log('beforeCreate', this.$data, this.$el)
  },
  created () {
    console.log('created', this.$data, this.$el)
  },
  beforeMount () {
    console.log('beforeMount', this.$data, this.$el)
  },
  mounted () {
    console.log('mounted', this.$data, this.$el)
    this.getData()
  },
  computed: {
    param () {
      // console.log('computed', this.tips)
      console.log('computed')
      return this.tips
      // return 1
    }
  },
  beforeUpdate () {
    console.log('beforeUpdate')
  },
  updated () {
    console.log('updated')
  },
  beforeDestroy () {
    console.log('beforeDestroy')
  },
  destroyed () {
    console.log('destory')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
