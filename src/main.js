import Vue from 'vue'
import App from './App'
import router from './router'
import Fastclick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import {updateWinFontSize, initPixelRatio} from '@/common/js/rem.js'

window.addEventListener('resize', () => {
  updateWinFontSize();
});

document.addEventListener('DOMContentLoaded', () => {
  initPixelRatio();
  updateWinFontSize();
  Fastclick.attach(document.body)
});

Vue.use(VueLazyload, {
  loading: require('common/img/image_loading.png')
})

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
