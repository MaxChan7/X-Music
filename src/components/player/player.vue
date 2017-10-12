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
        <div class="content">
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
        <div class="tools-wrap">
          <div class="progress-wrap">
            <span class="time time-l">{{format(currentTime)}}</span>
            <div class="progress-bar-wrap">
              <progress-bar :percent="percent" @percentChange="onProgressBarChange"></progress-bar>
            </div>
            <span class="time time-r">{{format(currentSong.duration)}}</span>
          </div>
          <div class="tools-bar">
            <div class="icon icon-left">
              <i class="icon-suiji"></i>
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
              <i class="icon-list"></i>
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
          <i class="icon" :class="playIcon" @click.stop="togglePlaying"></i>
        </div>
        <div class="control">
          <i class="icon icon-list"></i>
        </div>
      </div>
    </transition>
    <audio ref="audio" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
  </div>
</template>

<script type="text/babel">
import {mapGetters, mapMutations} from 'vuex'
import ProgressBar from '@/base/progress-bar/progress-bar'

export default {
  data() {
    return {
      songReady: false,
      currentTime: 0
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
      'playlist',
      'fullScreen',
      'currentSong',
      'playing',
      'currentIndex'
    ])
  },
  watch: {
    currentSong() {
      this.$nextTick(() => {
        this.$refs.audio.play()
      })
    },
    playing(newVal) {
      const audio = this.$refs.audio;
      this.$nextTick(() => {
        newVal ? audio.play() : audio.pause();
      })
    }
  },
  methods: {
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    togglePlaying() {
      this.setPlayingState(!this.playing);
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
    ProgressBar
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
      margin-bottom: 1rem;
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
      margin-bottom: 1.4rem;
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
        background: rgba(24, 27, 44, .1);
        .song-info {
          padding: .24rem 0;
          h2 {
            margin-bottom: .15rem;
            font-size: $font-size-medium-x;
            color: $color-white;
            @include no-wrap;
          }
          p {
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
    .tools-wrap {
      .progress-wrap {
        display: flex;
        align-items: center;
        width: 90%;
        margin: 0 auto .5rem;
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
          padding: 0 .65rem;
          font-size: 1.3rem;
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
      flex: 0 0 50px;
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
      display: flex;
      flex: 0 0 30px;
      width: 32px;
      padding: 0 10px;
      .icon {
        font-size: 32px;
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
