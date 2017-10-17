<template>
  <div class="history">
    <v-header @leftClick="back" title="最近播放"></v-header>
    <div class="history-head" @click="playAll(playHistory)">
      <i class="icon-suiji"></i>
      <span>随机播放全部</span>
    </div>
    <div class="history-content" ref="historyContent">
      <scroll ref="scroll" class="history-list" :data="playHistory">
        <div class="list-inner">
          <song-list :songs="playHistory" :showImg="showImg" @select="selectSong"></song-list>
        </div>
      </scroll>
    </div>
    <div class="no-result-wrap" v-show="!playHistory.length">
      <no-result title="你还没有听过歌曲"></no-result>
    </div>
  </div>
</template>

<script type="text/babel">
import VHeader from '@/base/v-header/v-header'
import SongList from '@/base/song-list/song-list'
import Scroll from '@/base/scroll/scroll'
import NoResult from '@/base/no-result/no-result'
import {mapGetters} from 'vuex'
import {songlistMixin, playlistMixin} from '@/common/js/mixin'

export default {
  mixins: [songlistMixin, playlistMixin],
  data() {
    return {
      showImg: true
    }
  },
  computed: {
    ...mapGetters([
      'playHistory'
    ])
  },
  methods: {
    handlePlaylist() {
      const bottom = this.playlist.length > 0 ? '60px' : '';
      this.$refs.historyContent.style.bottom = bottom;
      this.$refs.scroll.refresh();
    }
  },
  components: {
    VHeader,
    SongList,
    Scroll,
    NoResult
  }
}
</script>

<style scoped lang="scss">
@import '~common/css/variable';

.history {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .history-head {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 15px;
    border-bottom: 1px solid $color-border;
    font-size: $font-size-medium;
    .icon-suiji {
      margin-right: 10px;
      color: $color-sub-theme;
    }
  }
  .history-content {
    position: absolute;
    top: 84px;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    .history-list {
      height: 100%;
      overflow: hidden;
      .list-inner {
        padding: 0 15px;
      }
    }
  }
  .no-result-wrap {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}

</style>
