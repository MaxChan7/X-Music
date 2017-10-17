<template>
  <div class="favorite">
    <v-header @leftClick="back" title="收藏"></v-header>
    <div class="favorite-head" @click="playAll(favoriteList)">
      <i class="icon-suiji"></i>
      <span>随机播放全部</span>
    </div>
    <div class="favorite-content" ref="favoriteContent">
      <scroll ref="scroll" class="favorite-list" :data="favoriteList">
        <div class="list-inner">
          <song-list :songs="favoriteList" :showImg="showImg" @select="selectSong"></song-list>
        </div>
      </scroll>
    </div>
    <div class="no-result-wrap" v-show="!favoriteList.length">
      <no-result title="暂无收藏歌曲"></no-result>
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
      'favoriteList'
    ])
  },
  methods: {
    handlePlaylist() {
      const bottom = this.playlist.length > 0 ? '60px' : '';
      this.$refs.favoriteContent.style.bottom = bottom;
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

.favorite {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  .favorite-head {
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
  .favorite-content {
    position: absolute;
    top: 84px;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    .favorite-list {
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
