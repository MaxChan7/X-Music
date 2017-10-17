<template>
  <div class="song-list">
    <ul>
      <li @click="selectItem(song, index)" class="item" v-for="(song, index) in songs">
        <div class="song-img" v-if="showImg">
          <img v-lazy="song.image">
        </div>
        <div class="rank-text" v-show="rank">
          <span class="text" v-text="index + 1"></span>
        </div>
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script type="text/babel">
  export default {
    props: {
      songs: {
        type: Array,
        default: []
      },
      rank: {
        type: Boolean,
        default: false
      },
      showImg: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      selectItem(item, index) {
        this.$emit('select', item, index)
      },
      getDesc(song) {
        return `${song.singer}·${song.album}`
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "~common/css/variable";
  @import "~common/css/mixin";

  .song-list {
    .item {
      display: flex;
      align-items: center;
      box-sizing: border-box;
      height: 64px;
      font-size: $font-size-medium;
      .rank-text {
        flex: 0 0 25px;
        width: 25px;
        margin-right: 30px;
        text-align: center;
        color: $color-text;
        font-size: $font-size-large;
      }
      .song-img {
        margin-right: 15px;
        img {
          width: 1rem;
          height: 1rem;
        }
      }
      .content {
        flex: 1;
        line-height: 20px;
        overflow: hidden;
        .name {
          @include no-wrap;
          font-size: $font-size-medium-x;
          color: $color-text;
        }
        .desc {
          @include no-wrap;
          margin-top: 4px;
          font-size: $font-size-medium;
          color: $color-text-d;
        }
      }
    }
  }
</style>
