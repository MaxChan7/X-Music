<template>
  <div class="singer">
    <v-header
      title="歌手"
      @leftClick="leftClick"
    >
    </v-header>
    <div class="singer-content" ref="singer">
      <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/babel">
import VHeader from '@/base/v-header/v-header'
import Scroll from '@/base/scroll/scroll'
import {ERR_OK} from '@/api/config'
import {getSingerList} from '@/api/singer'
import Singer from '@/common/js/singer'
import ListView from '@/base/listview/listview'
import {mapGetters, mapMutations} from 'vuex'
import {playlistMixin} from '@/common/js/mixin'

const HOT_NAME = '热门'
const HOT_SINGER_LEN = 10

export default {
  mixins: [playlistMixin],
  data() {
    return {
      singers: []
    }
  },
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  created() {
    this._getSingerList();
  },
  methods: {
    handlePlaylist() {
      const bottom = this.playlist.length > 0 ? '60px' : '';
      this.$refs.singer.style.bottom = bottom;
      this.$refs.list.refresh();
    },
    selectSinger(singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list);
        }
      })
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }

        const key = item.Findex;
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      });
      // 排序列表
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    leftClick() {
      this.$router.back()
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    VHeader,
    Scroll,
    ListView
  }
}
</script>

<style scoped lang="scss">
.singer-content {
  position: absolute;
  top: 44px;
  bottom: 0;
  width: 100%;
}
</style>
