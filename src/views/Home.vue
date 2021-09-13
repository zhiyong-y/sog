<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      a: 0
    }
  },
  methods: {
    getData () {
      this.$http.get('/home/getData').then(res => {
        console.log(res, 1)
      })
    }
  },
  mounted () {
    this.getData()
  }
}
</script>
