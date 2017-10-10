<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <player></player>
  </div>
</template>

<script>
import Player from 'components/player/player'

export default {
  components: {
    Player
  }
}
</script>

<style lang="scss">
@import "~common/css/index"
</style>
