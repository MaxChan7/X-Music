<template>
  <div class="search-box">
    <input ref="query" v-model="query" class="box" :placeholder="placeholder"/>
    <i @click="clear" v-show="query" class="icon-delete"></i>
  </div>
</template>

<script type="text/babel">
  import {debounce} from '@/common/js/util'

  export default {
    props: {
      placeholder: {
        type: String,
        default: '搜索歌曲、歌手'
      }
    },
    data() {
      return {
        query: ''
      }
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    },
    created() {
      this.$watch('query', debounce((newQuery) => {
        this.$emit('query', newQuery)
      }, 200))
    }
  }
</script>

<style scoped lang="scss">
@import "~common/css/variable";

.search-box {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 0 6px;
  height: 44px;
  background: $color-header;
  .box {
    flex: 1;
    margin-right: 5px;
    padding: 5px 0;
    background: $color-header;
    color: $color-white;
    font-size: $font-size-medium-x;
    border-bottom: 1px solid #fff;
    border-radius: 0;
    &::placeholder {
      color: rgba(255, 255, 255, .3);
    }
  }
  .icon-delete {
    font-size: $font-size-medium-x;
    color: $color-background;
  }
}
</style>
