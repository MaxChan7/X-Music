<template>
  <div class="progress-bar" ref="progressBar">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrap">
        <div class="progress-btn" ref="progressBtn"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import {prefixStyle} from 'common/js/dom'

const progressBtnWidth = 14;
const transform = prefixStyle('transform');

export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  watch: {
    percent(newVal) {
      const BarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const offetWidth = newVal * BarWidth;

      this.$refs.progress.style.width = `${offetWidth}px`;
      this.$refs.progressBtn.style[transform] = `translate3d(${offetWidth}px, 0, 0)`;
    }
  }

}
</script>

<style scoped lang="scss">
@import '~common/css/variable';

.progress-bar {
  height: 30px;
  .bar-inner {
    position: relative;
    top: 14px;
    height: 2px;
    background: rgba(255, 255, 255, .3);
    .progress {
      position: absolute;
      height: 100%;
      background: $color-white;
    }
    .progress-btn-wrap {
      position: absolute;
      top: -14px;
      left: -8px;
      width: 30px;
      height: 30px;
      .progress-btn {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        box-sizing: border-box;
        width: 14px;
        height: 14px;
        border: 4px solid $color-white;
        border-radius: 50%;
        background: #000;
      }
    }
  }
}
</style>
