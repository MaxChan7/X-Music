<template>
  <div class="recommend">
    <scroll ref="scoll" class="recommend-content" :data="discList">
      <div>
        <div class="tab-wrap">
          <div class="tab-bg"></div>
          <ul class="tab">
            <router-link tag="div" class="tab-link" to="/rank">
              <div class="icon"></div>
              <p>排行榜</p>
            </router-link>
            <router-link tag="div" class="tab-link" to="/singer">
              <div class="icon"></div>
              <p>歌手</p>
            </router-link>
            <router-link tag="div" class="tab-link" to="/history">
              <div class="icon"></div>
              <p>最近播放</p>
            </router-link>
            <router-link tag="div" class="tab-link" to="/favorite">
              <div class="icon"></div>
              <p>收藏</p>
            </router-link>
          </ul>
        </div>
        <div  class="recommend-list">
          <h2>热门歌单</h2>
          <ul>
            <li v-for="item in discList">
              <div class="img">
                <img :src="item.imgurl" :alt="item.dissname">
              </div>
              <div class="text">
                <div class="disc-name" v-html="item.dissname"></div>
                <div class="creator" v-html="item.creator.name"></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script type="text/babel">
import Scroll from '@/base/scroll/scroll'
import {ERR_OK} from '@/api/config'
import {getDiscList} from '@/api/recommond'

export default {
  data() {
    return {
      discList: []
    }
  },
  created() {
    this._getDiscList();
  },
  methods: {
    _getDiscList() {
      getDiscList().then(_ => {
        if (_.code === ERR_OK) {
          this.discList = _.data.list
        }
      })
    }
  },
  components: {
    Scroll
  }
}
</script>

<style scoped lang="scss">
@import "~common/css/variable";

.recommend {
  position: fixed;
  width: 100%;
  top: 44px;
  bottom: 0;
  background-color: $color-theme;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    .tab-wrap {
      position: relative;
      height: 3.733333rem;
      background-color: $color-background;
      .tab-bg {
        height: 1.8rem;
        background-color: $color-theme;
      }
      .tab {
        display: flex;
        position: absolute;
        top: .3rem;
        left: 50%;
        transform: translate3d(-50%,0,0);
        width: 7.1rem;
        height: 2.5rem;
        border-radius: 0.1rem;
        background-color: $color-white;
        box-shadow: 0 0 10px 1px rgba(0,0,0,0.31);
        .tab-link {
          flex: 1;
          padding: .52rem 0;
          .icon {
            width: .75rem;
            height: .75rem;
            margin: 0 auto .35rem;
          }
        }
        p {
          text-align: center;
          font-size: $font-size-medium;
        }
      }
    }
    .recommend-list {
      padding: 0 .2rem;
      background-color: $color-background;
      h2 {
        height: .4rem;
        line-height: .4rem;
        margin-bottom: .25rem;
        padding-left: .15rem;
        border-left: .05rem solid $color-theme;
        font-size: $font-size-medium-x;
      }
      ul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        li {
          width: 3.45rem;
          margin-bottom: .2rem;
          .img {
            height: 3.45rem;
            img {
              display: block;
              width: 100%;
            }
          }
          .text {
            padding: .25rem;
            line-height: 1.2;
            background-color: $color-white;
            .disc-name {
              font-size: $font-size-medium
            }
            .creator {
              margin-top: .05rem;
              font-size: $font-size-small-s;
              color: $color-text-d;
            }
          }

        }
      }
    }
  }
}
</style>
