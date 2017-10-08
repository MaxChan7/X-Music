<template>
  <div class="recommend">
    <v-header
      leftIcon="icon-nav_me"
      rightIcon="icon-nav_search"
      :showRightIcon="true"
      @leftClick="leftClick"
      @rightClick="rightClick"
    >
    </v-header>
    <div class="recommend-wrap">
      <scroll ref="scoll" class="recommend-content" :data="discList">
        <div>
          <div class="tab-wrap">
            <div class="tab-bg"></div>
            <ul class="tab">
              <router-link tag="div" class="tab-link" to="/rank">
                <i class="icon icon-home_paihang"></i>
                <p>排行榜</p>
              </router-link>
              <router-link tag="div" class="tab-link" to="/singer">
                <i class="icon icon-home_singer"></i>
                <p>歌手</p>
              </router-link>
              <router-link tag="div" class="tab-link" to="/history">
                <i class="icon icon-home_recent"></i>
                <p>最近播放</p>
              </router-link>
              <router-link tag="div" class="tab-link" to="/favorite">
                <i class="icon icon-home_collect"></i>
                <p>收藏</p>
              </router-link>
            </ul>
          </div>
          <div  class="recommend-list">
            <h2>热门歌单</h2>
            <ul>
              <li v-for="item in discList">
                <div class="img">
                  <img v-lazy="item.imgurl" :alt="item.dissname">
                </div>
                <div class="text">
                  <div class="disc-name" v-html="item.dissname"></div>
                  <div class="creator" v-html="item.creator.name"></div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container" v-show="!discList.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
  </div>
</template>

<script type="text/babel">
import VHeader from '@/base/v-header/v-header'
import Scroll from '@/base/scroll/scroll'
import {ERR_OK} from '@/api/config'
import {getDiscList} from '@/api/recommond'
import Loading from '@/base/loading/loading'

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
    },
    leftClick() {
      this.$router.push('/user')
    },
    rightClick() {
      this.$router.push('/search')
    }
  },
  components: {
    VHeader,
    Scroll,
    Loading
  }
}
</script>

<style scoped lang="scss">
@import "~common/css/variable";

.recommend-wrap {
  position: absolute;
  top: 44px;
  bottom: 0;
  width: 100%;
  background-color: $color-theme;
  .recommend-content {
    height: 100%;
    overflow: hidden;
    background-color: $color-background;
    .tab-wrap {
      position: relative;
      height: 3.3rem;
      background-color: $color-background;
      .tab-bg {
        height: 1.8rem;
        background-color: $color-theme;
      }
      .tab {
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-around;
        position: absolute;
        top: .3rem;
        left: 50%;
        transform: translate3d(-50%,0,0);
        width: 95%;
        height: 2.5rem;
        padding: 0 .4rem;
        border-radius: 0.1rem;
        background-color: $color-white;
        box-shadow: 0 0 10px 1px rgba(0,0,0,0.31);
        .tab-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: .52rem 0;
          .icon {
            display: block;
            color: $color-tab-icon;
            font-size: $font-size-tab-icon;
          }
        }
        p {
          margin-top: .35rem;
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
    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
