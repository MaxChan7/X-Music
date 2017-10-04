<template>
  <div class="v-header">
    <router-link tag="div" class="mine" to="/user">
      <i class="icon-mine"></i>
    </router-link>
    <h1 class="title">Music</h1>
    <router-link tag="div" class="search" to="/search">
      <i class="icon-search"></i>
    </router-link>
  </div>
</template>

<script type="text/babel">
  export default {}
</script>

<style scoped lang="scss">
  @import "~common/css/variable";

  .v-header {
    position: relative;
    height: 44px;
    text-align: center;
    color: $color-white;
    font-size: 0;
    background-color: $color-theme;
    .title {
      display: inline-block;
      vertical-align: top;
      line-height: 44px;
      font-size: $font-size-large;
    }
    .mine {
      position: absolute;
      top: 0;
      left: 0;
    }
    .search {
      position: absolute;
      top: 0;
      right: 0;
    }
  }
</style>
