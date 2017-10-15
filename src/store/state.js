import {playMode} from 'common/js/config'
import {getSearch} from '@/common/js/cache.js'

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  rankList: {},
  searchHistory: getSearch()
}

export default state
