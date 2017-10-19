<template>
  <div class="no-result">
    <div class="no-result-icon"></div>
    <p class="no-result-text">{{title}}</p>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style scoped lang="scss">
@import "~common/css/variable";
@import "~common/css/mixin";

.no-result {
  text-align: center;
  .no-result-icon {
    width: 86px;
    height: 86px;
    margin: 0 auto;
    @include bg-image('no-result');
    background-size: 86px 86px;
  }
  .no-result-text {
    margin-top: 30px;
    font-size: $font-size-medium;
    color: $color-text-d;
  }
}
</style>
