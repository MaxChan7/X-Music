<template>
  <div class="player" v-show="playlist.length > 0">
    <transition name="normal">
      <div class="normal-player" v-show="fullScreen">
        <div class="background">
          <img width="100%" height="100%" :src="currentSong.image">
        </div>
        <div class="header">
          <div class="icon-left" @click="back">
           <i class="icon-nav_back"></i>
          </div>
        </div>
        <div class="content"
          @touchstart.prevent="onTouchStart"
          @touchmove.prevent="onTouchMove"
          @touchend="onTouchEnd"
        >
          <div class="info" ref="info">
            <div class="song-img">
              <img :src="currentSong.image">
            </div>
            <div class="song-info-wrap">
              <div class="song-info">
                <h2 v-html="currentSong.name"></h2>
                <p v-html="currentSong.singer"></p>
              </div>
              <div class="favorite">
                <i class="icon icon-collect"></i>
              </div>
            </div>
          </div>
          <scroll class="lyric-wrap" ref="lyricList" :data="currentLyric && currentLyric.lines">
            <div class="lyric-content">
              <div v-if="currentLyric">
                <p ref="lyricLine"
                   class="text"
                   :class="{'current': currentLineNum ===index}"
                   v-for="(line,index) in currentLyric.lines">{{line.txt}}</p>
              </div>
            </div>
          </scroll>
        </div>
        <div class="tools-wrap">
          <div class="dot-wrap">
            <span class="dot" :class="{'active':currentShow==='cd'}"></span>
            <span class="dot" :class="{'active':currentShow==='lyric'}"></span>
          </div>
          <div class="progress-wrap">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrap">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="tools-bar">
            <div class="icon icon-left">
              <i :class="iconMode" @click="changeMode"></i>
            </div>
            <div class="icon icon-left" :class="disabledCls">
              <i class="icon-last" @click="prev"></i>
            </div>
            <div class="icon icon-center" :class="disabledCls">
              <i :class="playIcon" @click="togglePlaying"></i>
            </div>
            <div class="icon icon-right" :class="disabledCls">
              <i class="icon-next" @click="next"></i>
            </div>
            <div class="icon icon-right">
              <i class="icon-list" @click="showPlaylist"></i>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition name="mini">
      <div class="mini-player" v-show="!fullScreen" @click="open">
        <div class="cd">
          <img :src="currentSong.image" :class="cdClass">
        </div>
        <div class="info">
          <h2 v-html="currentSong.name"></h2>
          <p v-html="currentSong.singer"></p>
        </div>
        <div class="control">
          <progress-circle :radius="radius" :percent="percent">
            <i class="icon" :class="playIcon" @click.stop="togglePlaying"></i>
          </progress-circle>
        </div>
        <div class="control">
          <i class="icon icon-list" @click.stop="showPlaylist"></i>
        </div>
      </div>
    </transition>
    <playlist ref="playlist"></playlist>
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime" @ended="end"></audio>
  </div>
</template>

<script type="text/babel">
import {mapGetters, mapMutations} from 'vuex'
import ProgressBar from '@/base/progress-bar/progress-bar'
import ProgressCircle from '@/base/progress-circle/progress-circle'
import {playMode} from '@/common/js/config'
import Lyric from 'lyric-parser'
import Scroll from '@/base/scroll/scroll'
import {prefixStyle} from '@/common/js/dom'
import Playlist from '@/components/playlist/playlist'
import {playerMixin} from '@/common/js/mixin'

const transform = prefixStyle('transform');
const transitionDuration = prefixStyle('transitionDuration');

export default {
  mixins: [playerMixin],
  data() {
    return {
      songReady: false,
      currentTime: 0,
      radius: 34,
      currentLyric: null,
      currentLineNum: 0,
      currentShow: 'cd'
    }
  },
  computed: {
    playIcon() {
      return this.playing ? 'icon-stop' : 'icon-play';
    },
    cdClass() {
      return this.playing ? 'play' : 'play pause';
    },
    disabledCls() {
      return this.songReady ? '' : 'disabled'
    },
    percent() {
      return this.currentTime / this.currentSong.duration;
    },
    ...mapGetters([
      'fullScreen',
      'playing',
      'currentIndex'
    ])
  },
  watch: {
    currentSong(newVal, oldVal) {
      if (!newVal.id) {
        return
      }
      if (newVal.id === oldVal.id) {
        return
      }
      if (this.currentLyric) {
        this.currentLyric.stop();
      }
      this.$nextTick(() => {
        this.$refs.audio.play();
        this.getLyric();
      })
    },
    playing(newVal) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newVal ? audio.play() : audio.pause();
      })
    }
  },
  created() {
    this.touch = {};
  },
  methods: {
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    togglePlaying() {
      if (!this.songReady) {
        return
      }
      this.setPlayingState(!this.playing);
      if (this.currentLyric) {
        this.currentLyric.togglePlay()
      }
    },
    next() {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex + 1;
      if (index === this.playlist.length) {
        index = 0;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlaying()
      }
      this.songReady = false;
    },
    prev() {
      if (!this.songReady) {
        return
      }
      let index = this.currentIndex - 1;
      if (index === -1) {
        index = this.playlist.length - 1;
      }
      this.setCurrentIndex(index);
      if (!this.playing) {
        this.togglePlaying()
      };
      this.songReady = false;
    },
    ready() {
      this.songReady = true;
    },
    error() {
      this.songReady = true;
    },
    end() {
      if (this.mode === playMode.loop) {
        this.loop();
      } else {
        this.next();
      }
    },
    loop() {
      this.$refs.audio.currentTime = 0;
      this.$refs.audio.play();
      this.setPlayingState(true);
      if (this.currentLyric) {
        this.currentLyric.seek(0);
      }
    },
    updateTime(e) {
      this.currentTime = e.target.currentTime;
    },
    format(interval) {
      interval = interval | 0;
      const min = this._pad(interval / 60 | 0);
      const sec = this._pad(interval % 60);
      return `${min}:${sec}`
    },
    onProgressBarChange(percent) {
      const currentTime = this.currentSong.duration * percent;
      this.$refs.audio.currentTime = currentTime;
      if (!this.playing) {
        this.togglePlaying()
      };
      if (this.currentLyric) {
        this.currentLyric.seek(currentTime * 1000);
      }
    },
    getLyric() {
      this.currentSong.getLyric().then((lyric) => {
        this.currentLyric = new Lyric(lyric, this.handleLyric);
        if (this.playing) {
          this.currentLyric.play();
        }
      }).catch(() => {
        this.currentLyric = null;
        this.currentLineNum = 0;
      })
    },
    handleLyric({lineNum, txt}) {
      this.currentLineNum = lineNum;
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5];
        this.$refs.lyricList.scrollToElement(lineEl, 1000);
      } else {
        this.$refs.lyricList.scrollTo(0, 0, 1000);
      }
    },
    onTouchStart(e) {
      this.touch.initiated = true;
      // 用来判断是否是一次移动
      this.touch.moved = false;
      const touch = e.touches[0];
      this.touch.startX = touch.pageX;
      this.touch.startY = touch.pageY;
    },
    onTouchMove(e) {
      if (!this.touch.initiated) {
        return
      }
      const touch = e.touches[0];
      const deltaX = touch.pageX - this.touch.startX;
      const deltaY = touch.pageY - this.touch.startY;
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        return
      }
      if (!this.touch.moved) {
        this.touch.moved = true;
      }
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth;
      const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX));
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth);
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.lyricList.$el.style[transitionDuration] = 0;
      this.$refs.info.style.opacity = 1 - this.touch.percent;
      this.$refs.info.style[transitionDuration] = 0;
    },
    onTouchEnd(e) {
      if (!this.touch.moved) {
        return
      };
      let offsetWidth;
      let opacity;
      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.1) {
          offsetWidth = -window.innerWidth;
          opacity = 0;
          this.currentShow = 'lyric';
        } else {
          offsetWidth = 0;
          opacity = 1;
        }
      } else {
        if (this.touch.percent < 0.9) {
          offsetWidth = 0;
          this.currentShow = 'cd';
          opacity = 1;
        } else {
          offsetWidth = -window.innerWidth;
          opacity = 0;
        }
      }
      const time = 300;
      this.$refs.lyricList.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`;
      this.$refs.lyricList.$el.style[transitionDuration] = `${time}ms`;
      this.$refs.info.style.opacity = opacity;
      this.$refs.info.style[transitionDuration] = `${time}ms`;
      this.touch.initiated = false;
    },
    showPlaylist() {
      this.$refs.playlist.show();
    },
    _pad(num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN',
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX'
    })
  },
  components: {
    ProgressBar,
    ProgressCircle,
    Scroll,
    Playlist
  }
}
</script>

<style scoped lang="scss">
@import '~common/css/variable';
@import "~common/css/mixin";

.player {
  .normal-player {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 150;
    background: #999;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
      opacity: .6;
      filter: blur(20px);
    }
    .header {
      position: relative;
      height: 44px;
      .icon-left {
        position: absolute;
        top: 7px;
        left: 10px;
        .icon-nav_back {
          display: block;
          padding: 7px;
          font-size: 16px;
          color: #fff;
          border-radius: 50%;
          background-color: rgba(0, 0, 0, 0.2);
          transform: rotate(-90deg);
        }
      }
    }
    .content {
      position: fixed;
      top: 2rem;
      bottom: 188px;
      width: 100%;
      white-space: nowrap;
      font-size: 0;
      .info {
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        .song-img {
          width: 5rem;
          height: 5rem;
          margin: 0 auto;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .song-info-wrap {
          position: relative;
          box-sizing: border-box;
          width: 5rem;
          height: 1.15rem;
          margin: 0 auto;
          padding-left: .2rem;
          padding-right: 1rem;
          background: rgba(24, 27, 44, .8);
          .song-info {
            position: relative;
            top: 50%;
            left: 0;
            transform: translate3d(0,-50%,0);
            h2 {
              line-height: 1.5;
              font-size: $font-size-medium-x;
              color: $color-white;
              @include no-wrap;
            }
            p {
              line-height: 1.5;
              font-size: $font-size-small;
              color: $color-text-ll;
              @include no-wrap;
            }
          }
          .favorite {
            position: absolute;
            top: 0;
            right: 0;
            width: 1rem;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            .icon {
              font-size: .45rem;
              &.icon-collect {
                color: $color-white;
              }
              &.icon-collect-hl {
                color: #ff6464;
              }
            }
          }
        }
      }
      .lyric-wrap {
        display: inline-block;
        vertical-align: top;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .lyric-content {
          width: 80%;
          margin: 0 auto;
          overflow: hidden;
          text-align: center;
          .text {
            line-height: 32px;
            color: rgba(255, 255, 255, 0.5);
            font-size: 14px;
            &.current {
              color: #fff;
            }
          }
        }
      }
    }
    .tools-wrap {
      position: absolute;
      bottom: 50px;
      width: 100%;
      .dot-wrap {
        margin-bottom: 10px;
        text-align: center;
        font-size: 0;
        .dot {
          display: inline-block;
          vertical-align: middle;
          margin: 0 4px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, .3);
          &.active {
            width: 20px;
            border-radius: 5px;
            background: $color-white;
          }
        }
      }
      .progress-wrap {
        display: flex;
        align-items: center;
        width: 90%;
        margin: 0 auto 10px;
        .time {
          flex: 0 0 32px;
          font-size: $font-size-small;
          color: $color-white;
          &.time-l {
            text-align: left;
          }
          &.time-r {
            text-align: right;
          }
        }
        .progress-bar-wrap {
          flex: 1;
          padding: 0 2px;
        }

      }
      .tools-bar {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-white;
          &.disabled {
            color: #eee;
          }
        }
        .icon-left {
          text-align: right;
          font-size: .4rem;
        }
        .icon-right {
          text-align: left;
          font-size: .4rem;
        }
        .icon-center {
          padding: 0 30px;
          font-size: 65px;
        }
      }
    }
    &.normal-enter-active, &.normal-leave-active {
      transition: all 0.4s;
      .header, .tools-wrap {
        transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32);
      }
    }
    &.normal-enter, &.normal-leave-to {
      opacity: 0;
      .header {
        transform: translate3d(0, -100px, 0);
      }
      .tools-wrap {
        transform: translate3d(0, 100px, 0);
      }
    }
  }
  .mini-player {
    display: flex;
    align-items: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 180;
    width: 100%;
    height: 60px;
    background: $color-white;
    box-shadow: 0 0 1px rgba(0, 0, 0, .31);
    &.mini-enter-active, &.mini-leave-active {
      transition: all 0.4s;
    }
    &.mini-enter, &.mini-leave-to {
      opacity: 0;
    }
    .cd {
      padding-left: 15px;
      flex: 0 0 45px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        &.play {
          animation: rotate 20s linear infinite;
        }
        &.pause {
          animation-play-state: paused;
        }
      }
    }
    .info {
      flex: 1;
      padding-left: .2rem;
      h2 {
        margin-bottom: 7px;
        font-size: 13px;
        color: $color-title;
      }
      p {
        font-size: 11px;
        color: $color-text-d;
      }
    }
    .control {
      position: relative;
      flex: 0 0 34px;
      width: 34px;
      height: 34px;
      padding: 0 10px;
      .icon {
        position: absolute;
        top: 2px;
        left: 2px;
        font-size: 30px;
      }
    }
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0)
  }
  100% {
    transform: rotate(360deg)
  }
}
</style>
