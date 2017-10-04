<template>
  <div id="app">
    <v-header></v-header>
    <router-view></router-view>
  </div>
</template>

<script>
import VHeader from 'components/v-header/v-header'

export default {
  components: {
    VHeader
  }
}
</script>

<style lang="scss">
@import "~common/css/index"
</style>
