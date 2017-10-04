import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import {updateWinFontSize, initPixelRatio} from '@/common/js/rem.js'

window.addEventListener('resize', () => {
  updateWinFontSize();
});

document.addEventListener('DOMContentLoaded', () => {
  initPixelRatio();
  updateWinFontSize();
  fastclick.attach(document.body)
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
