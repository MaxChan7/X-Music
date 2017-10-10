<template>
  <div class="player" v-show="playlist.length > 0">
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
        <div class="tools-bar">
          <div class="icon icon-left">
            <i class="icon-suiji"></i>
          </div>
          <div class="icon icon-left">
            <i class="icon-last"></i>
          </div>
          <div class="icon icon-center">
            <i class="icon-play"></i>
          </div>
          <div class="icon icon-right">
            <i class="icon-next"></i>
          </div>
          <div class="icon icon-right">
            <i class="icon-list"></i>
          </div>
        </div>
      </div>
    </div>
    <div class="mini-player" v-show="!fullScreen" @click="open">
      <div class="img">
        <img :src="currentSong.image">
      </div>
      <div class="info">
        <h2 v-html="currentSong.name"></h2>
        <p v-html="currentSong.singer"></p>
      </div>
      <div class="control">
        <i class="icon icon-play"></i>
      </div>
      <div class="control">
        <i class="icon icon-list"></i>
      </div>
    </div>
  </div>
</template>

<script type="text/babel">
import {mapGetters, mapMutations} from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'playlist',
      'fullScreen',
      'currentSong'
    ])
  },
  methods: {
    back() {
      this.setFullScreen(false);
    },
    open() {
      this.setFullScreen(true);
    },
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    })
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
    background: $color-background;
    .background {
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      width: 100%;
      height: 100%;
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
        background: rgba(24, 27, 44, .4);
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
      .tools-bar {
        display: flex;
        align-items: center;
        .icon {
          flex: 1;
          color: $color-white;
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
    .img {
      padding-left: 15px;
      flex: 0 0 50px;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
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
</style>
