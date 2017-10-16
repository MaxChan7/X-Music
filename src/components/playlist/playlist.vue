<template>
  <transition name="list-fade">
    <div class="playlist" v-show="showFlag" @click="hide">
      <div class="list-wrap" @click.stop>
        <div class="list-header">
          <h1 class="title">
            <i class="icon" :class="iconMode" @click="changeMode"></i>
            <span class="text">{{modeText}}</span>

            <span class="clear" @click="showConfirm">
              <i class="icon-delete_all"></i>
            </span>
          </h1>
        </div>
        <scroll class="list-content" ref="listContent">
          <transition-group name="list" tag="ul">
            <li :key="item.id" class="item" ref="listItem" v-for="(item, index) in sequenceList"  @click="selectItem(item,index)">
              <i class="current" :class="getCurrentIcon(item)"></i>

              <span class="text">{{item.name}}</span>

              <span class="like">
                <i class="icon-collect"></i>
              </span>

              <span class="delete" @click.stop="deleteOne(item)">
                <i class="icon-delete"></i>
              </span>
            </li>
          </transition-group>
        </scroll>
        <div @click="hide" class="list-close">
          <span>关闭</span>
        </div>
      </div>
      <confirm ref="confirm" text="是否清空播放列表？" confirmBtnText="清空" @confirm="clearSongs"></confirm>
    </div>
  </transition>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import Confirm from '@/base/confirm/confirm'
import {playMode} from '@/common/js/config'
import {mapActions} from 'vuex'
import {playerMixin} from '@/common/js/mixin'

export default {
  mixins: [playerMixin],
  data() {
    return {
      showFlag: false
    }
  },
  computed: {
    modeText() {
      return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
    }
  },
  watch: {
    currentSong(newVal, oldVal) {
      if (!this.showFlag || newVal.id === oldVal.id) {
        return
      };
      this.scrollToCurrent(newVal);
    }
  },
  methods: {
    show() {
      this.showFlag = true;
      setTimeout(() => {
        this.$refs.listContent.refresh();
        this.scrollToCurrent(this.currentSong);
      }, 20)
    },
    hide() {
      this.showFlag = false;
    },
    selectItem(item, index) {
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex((song) => {
          return song.id === item.id
        })
      }

      this.setCurrentIndex(index);
      this.setPlayingState(true);
    },
    getCurrentIcon(item) {
      return this.currentSong.id === item.id ? 'icon-play' : ''
    },
    scrollToCurrent(current) {
      const index = this.sequenceList.findIndex((song) => {
        return current.id === song.id;
      });
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300);
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    deleteOne(item) {
      this.deleteSong(item);
      if (!this.playlist.length) {
        this.hide();
      }
    },
    clearSongs() {
      this.deleteSongList();
    },
    ...mapActions([
      'deleteSong',
      'deleteSongList'
    ])
  },
  components: {
    Scroll,
    Confirm
  }
}
</script>

<style lang="scss" scoped>
@import '~common/css/variable';
@import '~common/css/mixin';

.playlist {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background-color: $color-background-d;
  &.list-fade-enter-active, &.list-fade-leave-active {
    transition: opacity 0.3s;
    .list-wrapper {
      transition: all 0.3s;
    }
  }
  &.list-fade-enter, &.list-fade-leave-to {
    opacity: 0;
    .list-wrapper {
      transform: translate3d(0, 100%, 0);
    }
  }
  .list-wrap {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    background-color: $color-white;
    .list-header {
      position: relative;
      padding: 20px 30px 10px 20px;
      .title {
        display: flex;
        align-items: center;
        .icon {
          margin-right: 10px;
          font-size: $font-size-large;
        }
        .text {
          flex: 1;
          font-size: $font-size-medium-x;
          color: $color-text-l;
        }
        .clear {
          @include extend-click();
          font-size: $font-size-medium-x;
          color: $color-text-d;
        }
      }
    }
    .list-content {
      max-height: 240px;
      overflow: hidden;
      .item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 30px 0 20px;
        overflow: hidden;
        &.list-enter-active, &.list-leave-active {
          transition: all 0.1s;
        }
        &.list-enter, &.list-leave-to {
          height: 0;
        }
        .current {
          flex: 0 0 20px;
          width: 20px;
          font-size: $font-size-small;
        }
        .text {
          flex: 1;
          @include no-wrap();
          font-size: $font-size-medium;
          color: $color-text-d;
        }
        .like {
          @include extend-click();
          margin-right: 15px;
          font-size: $font-size-medium;
          color: $color-theme;
          .icon-favorite {
            color: $color-sub-theme;
          }
        }
        .delete {
          @include extend-click();
          font-size: $font-size-medium;
          color: $color-theme;
        }
      }
    }
    .list-close {
      text-align: center;
      line-height: 50px;
      background: $color-highlight-background;
      font-size: $font-size-medium-x;
      color: $color-white;
    }
  }
}
</style>
