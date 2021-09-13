<template>
  <div class="about">
    <h1>{{msg}}</h1>
    <test/>
  </div>
</template>
<script>
export default {
  components: {
    Test: () => import('@/components/Test.vue')
  },
  data () {
    return {
      msg: 'This is an about page'
    }
  }
}
</script>
