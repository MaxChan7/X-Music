<template>
  <transition name="slide">
    <music-list :title="title" :bg-image="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script type="text/babel">
import MusicList from '@/components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getRankSongs} from '@/api/rank'
import {ERR_OK} from '@/api/config'
import {createSong} from '@/common/js/song'

export default {
  computed: {
    title() {
      return this.rankList.topTitle
    },
    bgImage() {
      if (this.songs.length) {
        return this.songs[0].image
      }
      return ''
    },
    ...mapGetters([
      'rankList'
    ])
  },
  data() {
    return {
      songs: []
    }
  },
  created() {
    this._getRankSongs();
  },
  methods: {
    _getRankSongs() {
      if (!this.rankList.id) {
        this.$router.push('/rank')
        return
      }
      getRankSongs(this.rankList.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.songlist)
        }
      })
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item.data
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style scoped lang="scss">
  .slide-enter-active, .slide-leave-active {
    transition: all 0.3s
  }

  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }
</style>
