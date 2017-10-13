<template>
  <div class="rank">
    <v-header
      leftIcon="icon-nav_back"
      @leftClick="leftClick"
      title="排行榜"
    ></v-header>
    <div class="rank-list-wrap" ref="ranklist">
      <scroll class="rank-list" :data="rankList" ref="scroll">
        <ul>
          <li class="item" v-for="item in rankList">
            <div class="rank-img">
              <img width="100" height="100" v-lazy="item.picUrl"/>
            </div>
            <ul class="songlist">
              <li class="song" v-for="(song,index) in item.songList">
                <span>{{index + 1}}</span>
                <span>{{song.songname}}-{{song.singername}}</span>
              </li>
            </ul>
          </li>
        </ul>
      </scroll>
    </div>
  </div>
</template>

<script type="text/babel">
import VHeader from '@/base/v-header/v-header'
import Scroll from '@/base/scroll/scroll'
import {getRankList} from '@/api/rank'
import {ERR_OK} from '@/api/config'
import {mapGetters} from 'vuex'
import {playlistMixin} from '@/common/js/mixin'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      rankList: []
    }
  },
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  created() {
    this._getRankList()
  },
  methods: {
    handlePlaylist() {
      const bottom = this.playlist.length > 0 ? '60px' : '';
      this.$refs.ranklist.style.bottom = bottom;
      this.$refs.scroll.refresh();
    },
    leftClick() {
      this.$router.back();
    },
    _getRankList() {
      getRankList().then((res) => {
        if (res.code === ERR_OK) {
          this.rankList = res.data.topList;
        }
      })
    }
  },
  components: {
    VHeader,
    Scroll
  }
}
</script>

<style scope lang="scss">
@import '~common/css/variable';
@import '~common/css/mixin';

.rank {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  .rank-list-wrap {
    position: absolute;
    top: 44px;
    bottom: 0;
    width: 100%;
    .rank-list {
      height: 100%;
      overflow: hidden;
      .item {
        display: flex;
        height: 100px;
        margin: 0 20px;
        padding: 10px 0;
        &:not(:last-child) {
          border-bottom: .01rem solid $color-border;
        }
        .rank-img {
          flex: 0 0 100px;
          width: 100px;
          height: 100px;
        }
        .songlist {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 0 20px;
          height: 100px;
          overflow: hidden;
          background: $color-background;
          color: $color-text;
          font-size: $font-size-medium-s;
          .song {
            @include no-wrap;
            line-height: 26px;
          }
        }
      }
    }
  }
}
</style>
