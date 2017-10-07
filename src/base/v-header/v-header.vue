<template>
  <div class="v-header">
    <div class="left-icon" @click="leftClick">
      <i class="icon" :class="leftIcon"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="right-icon"
      v-if="showRightIcon"
      @click="rightClick">
      <i class="icon" :class="rightIcon"></i>
    </div>
  </div>
</template>

<script type="text/babel">
  export default {
    props: {
      title: {
        type: String,
        default: 'Music'
      },
      showRightIcon: {
        type: Boolean,
        default: false
      },
      leftIcon: {
        type: String,
        default: 'icon-nav_back'
      },
      rightIcon: {
        type: String,
        default: ''
      }
    },
    methods: {
      leftClick() {
        this.$emit('leftClick')
      },
      rightClick() {
        this.$emit('rightClick')
      }
    }
  }
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
    .left-icon {
      position: absolute;
      top: 0;
      left: 0;
    }
    .right-icon {
      position: absolute;
      top: 0;
      right: 0;
    }
    .icon {
      display: block;
      padding: .25rem;
      font-size: $font-size-large-x;
      color: $color-white;
    }
  }
</style>
