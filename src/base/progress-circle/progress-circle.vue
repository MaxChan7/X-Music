<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray="dashArray"
              :stroke-dashoffset="dashOffset"/>
    </svg>
    <slot></slot>
  </div>
</template>

<script type="text/babel">
export default {
  props: {
    radius: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      dashArray: Math.PI * 100
    }
  },
  computed: {
    dashOffset() {
      return this.dashArray * (1 - this.percent);
    }
  }
}

</script>

<style scoped lang="scss">

.progress-circle {
  position: relative;
  svg {
    position: absolute;
    circle {
      stroke-width: 4px;
      transform-origin: center;
      &.progress-bar {
        transform: scale(0.95) rotate(-90deg);
        stroke: #dc041b;
      }
    }
  }
}
</style>
