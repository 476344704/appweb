<template>
<div class="grid">
    <div class="grid__item" v-for="temp in temps" :key="temp.index">
        <a class="" v-on:click="getdata(temp)"><img class="grid__img"   :src="temp.thumbnailsrc" :alt="temp.pname" /></a>
    </div>
</div>
</template>

<script>
export default {
  props: ['temps'],
  computed: {
  },
  mounted () {
  },
  methods: {
    getdata (temp) {
      var params = JSON.stringify(temp)
      // js 调用 android/ios 获取用户信息
      this.$bridge.callHandler('getPosterPreviewData', params, function (data) {
      })
    }
  }
}
</script>

<style>
</style>