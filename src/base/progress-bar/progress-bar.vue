<template>
  <div class="progress-bar" ref="progressBar" @click="progressBarClick">
    <div class="bar-inner">
      <div class="progress" ref="progress"></div>
      <div class="progress-btn-wrap">
        <div class="progress-btn" ref="progressBtn"
          @touchstart.prevent="progressTouchStart"
          @touchmove.prevent="progressTouchMove"
          @touchend.prevent="progressTouchEnd"
        ></div>
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
      if (newVal >= 0 && !this.touch.initiated) {
        const BarWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
        const offetWidth = newVal * BarWidth;
        this._offset(offetWidth);
      }
    }
  },
  created() {
    this.touch = {};
  },
  methods: {
    progressTouchStart(e) {
      this.touch.initiated = true;
      this.touch.startX = e.touches[0].pageX;
      this.touch.left = this.$refs.progress.clientWidth;
    },
    progressTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const deltaX = e.touches[0].pageX - this.touch.startX;
      const offetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth, Math.max(0, this.touch.left + deltaX));
      this._offset(offetWidth);
    },
    progressTouchEnd() {
      this.touch.initiated = false;
      this._triggerPercent();
    },
    progressBarClick(e) {
      const rect = this.$refs.progressBar.getBoundingClientRect();
      const offsetWidth = e.pageX - rect.left;
      this._offset(offsetWidth);
      // 这里当我们点击 progressBtn 的时候，e.offsetX 获取不对
      // this._offset(e.offsetX)
      this._triggerPercent();
    },
    _triggerPercent() {
      const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth;
      const percent = this.$refs.progress.clientWidth / barWidth;
      this.$emit('percentChange', percent);
    },
    _offset(offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
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
