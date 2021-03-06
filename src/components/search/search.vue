<template>
  <div class="search">
    <div class="search-box-wrapper">
      <i class="icon-nav_back" @click="back"></i>
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="shortcut-wrap" ref="shortcutWrap" v-show="!query">
      <scroll class="shortcut" ref="shortcut" :data="shortcutData">
        <div>
          <div class="hot-wrap">
            <h1 class="title">热门搜索</h1>
            <ul>
              <li @click="addQuery(item.k)" class="item" v-for="item in hotKey">
                <span>{{item.k}}</span>
              </li>
            </ul>
          </div>
          <div class="search-history" v-show="searchHistory.length">
            <h1 class="title">
              <span class="text">搜索历史</span>

              <span class="clear" @click="showConfirm">
                <i class="icon-delete_all"></i>
              </span>
            </h1>

            <search-list :searches="searchHistory" @select="addQuery" @delete="deleteHistory"></search-list>
          </div>
        </div>
      </scroll>
    </div>
    <div class="search-result" v-show="query" ref="searchResult">
      <suggest class="search-result-list" ref="suggest" :query="query" @listScroll="blurInput" :showSinger="showSinger" @select="saveSearch"></suggest>
    </div>
    <confirm ref="confirm" @confirm="clearAllHistory" text="是否删除所有搜索历史？" confirmBtnText="清空"></confirm>
    <router-view></router-view>
  </div>
</template>

<script type="text/babel">
import SearchBox from '@/base/search-box/search-box'
import {getHotKey} from '@/api/search'
import {ERR_OK} from '@/api/config'
import Suggest from '@/components/suggest/suggest'
import {mapGetters, mapActions} from 'vuex'
import {playlistMixin} from '@/common/js/mixin'
import SearchList from '@/base/search-list/search-list'
import Confirm from '@/base/confirm/confirm'
import Scroll from '@/base/scroll/scroll'

export default {
  mixins: [playlistMixin],
  data() {
    return {
      hotKey: [],
      query: '',
      showSinger: true,
      refreshDelay: 100
    }
  },
  computed: {
    shortcutData() {
      return this.hotKey.concat(this.searchHistory)
    },
    ...mapGetters([
      'playlist',
      'searchHistory'
    ])
  },
  watch: {
    // 解决添加歌曲后不能滚动的问题
    query(newVal) {
      if (!newVal) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  created() {
    this._getHotKey();
  },
  methods: {
    handlePlaylist() {
      let bottom = this.playlist.length > 0 ? '60px' : '';

      this.$refs.shortcutWrap.style.bottom = bottom;
      this.$refs.shortcut.refresh();

      this.$refs.searchResult.style.bottom = bottom;
      this.$refs.suggest.refresh();
    },
    back() {
      this.$router.back();
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    onQueryChange(query) {
      this.query = query
    },
    blurInput() {
      this.$refs.searchBox.blur()
    },
    saveSearch() {
      this.saveHistory(this.query);
    },
    deleteHistory(item) {
      this.delHistory(item)
    },
    clearAllHistory() {
      this.clearHistory()
    },
    showConfirm() {
      this.$refs.confirm.show();
    },
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotKey = res.data.hotkey.slice(0, 10)
        }
      })
    },
    ...mapActions([
      'saveHistory',
      'delHistory',
      'clearHistory'
    ])
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
  }
}
</script>

<style scoped lang="scss">
@import "~common/css/variable";
@import "~common/css/mixin";

.search {
  .search-box-wrapper {
    position: relative;
    height: 44px;
    padding-left: 32px;
    background: $color-header;
    .icon-nav_back {
      position: absolute;
      top: 0;
      left: 0;
      display: block;
      padding: 12px 0 12px 6px;
      font-size: 20px;
      color: $color-white;
    }
  }
  .shortcut-wrap {
    position: fixed;
    top: 44px;
    bottom: 0;
    width: 100%;
    .shortcut {
      height: 100%;
      overflow: hidden;
    }
    .hot-wrap {
      padding: .2rem .2rem 0 .2rem;
      background: $color-white;
      .title {
        margin-bottom: .2rem;
        font-size: $font-size-medium;
        color: $color-text;
      }
      ul {
        overflow: hidden;
        .item {
          display: block;
          float: left;
          box-sizing: border-box;
          height: .6rem;
          line-height: .58rem;
          padding: 0 .2rem;
          margin: 0 .2rem .2rem 0;
          border: 1px solid $color-text-d;
          border-radius: .3rem;
          font-size: $font-size-medium;
          color: $color-text;
        }
      }
    }
  }
  .search-history {
    position: relative;
    margin: 0 .2rem;
    .title {
      display: flex;
      align-items: center;
      height: 40px;
      font-size: $font-size-medium;
      .text {
        flex: 1;
      }
      .clear {
        @include extend-click();
        .icon-clear {
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
    }
  }
  .search-result {
    position: fixed;
    width: 100%;
    top: 44px;
    bottom: 0;
    .search-result-list {
      height: 100%;
      padding-top: 10px;
      overflow: hidden;
    }
  }
}
</style>
