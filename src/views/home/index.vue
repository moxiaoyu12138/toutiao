<template>
  <div class="home-container">
    <!-- 导航栏 -->
     <van-nav-bar class="page-nav-bar" fixed>
       <van-button
       class="search-btn"
       slot="title"
       type="info"
       size="small"
       round
       icon="search"
       to="/search"
       >搜索</van-button>
     </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 频道列表 -->
    <!--
      通过 animated 属性可以开启切换标签内容时的转场动画。
      通过 swipeable 属性可以开启滑动切换标签页。
     -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
      :title="channel.name"
      v-for="channel in channels"
      :key="channel.id">
      <ArticleList :channel="channel"></ArticleList>
      </van-tab>
      <div slot="nav-right" class="placehoder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
      @click="isChennelEditShow=true"
      ><i class="toutiao toutiao-gengduo"></i></div>
    </van-tabs>

    <!-- 频道列表 -->

    <!-- 频道编辑 -->
      <van-popup
        v-model="isChennelEditShow"
        closeable
        position="bottom"
        close-icon-position="top-left"
        :style="{ height: '100%' }"
      >
      <!-- <ChannelEdit :my-channels="channels"></ChannelEdit> -->
      <channel-edit
       :my-channels="channels"
       :active="active"
       @update-active="onUpdateActive"
       />
      </van-popup>

    <!-- 频道编辑 -->
  </div>
</template>

<script>
import { getUserChannels } from '../../api/suer'
import ArticleList from './components/article-list.vue'
import ChannelEdit from './components/channel-edit.vue'
import { setItem } from '@/utils/storage'
import { mapState } from 'vuex'
export default {
  name: 'HmoeIndex', // 组件名
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {}, // 父级传值入口
  data () { // 初始化数据
    return {
      active: 0,
      channels: [],
      isChennelEditShow: false // 编辑频道的展示
    }
  },
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async loadChannels () {
      try {
        // const { data } = await getUserChannels()
        // this.channels = data.data.channels
        let channels = []
        if (this.user) {
          // 已登录，获取频道列表
          const { data } = await getUserChannels()
          channels = data.data.channels
        } else {
          // 未登录，判断本地是否有数据
          const localChannels = setItem('TOUTIAO_CHANNELS')
          // 有则用
          if (localChannels) {
            channels = localChannels
          } else {
            // 没有则请求默认列表
            const { data } = await getUserChannels()
            channels = data.data.channels
          }
        }

        this.channels = channels
      } catch (err) {
        this.$toast('获取频道数据失败')
      }
    },
    onUpdateActive (index, isChennelEditShow = true) {
      // console.log('home', index)
      // 更新频道编辑
      this.active = index
      // 关闭编辑频道
      this.isChennelEditShow = isChennelEditShow
    }
  }
}
</script>

<style scoped lang="less">

.home-container{
  padding-bottom: 100px;
  padding-top: 174px;
  div.van-nav-bar__title{
    min-width: unset !important;
    }
  .search-btn{
    // width: 555px;
    width: 400px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /deep/ .channel-tabs{
    .van-tabs__wrap{
      height: 82px;
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
    }
    .van-tab{
      min-width: 200px;
      font-size: 30px;
      color: #777;
      border-right: 1px solid #edeff3;
    }
    .van-tab--active{
      color: #333;
    }
    .van-tabs__nav{
      padding-bottom: 0;
    }
    .van-tabs__line{
      width: 31px !important;
      height: 6px;
      background-color: #3296fa;
      bottom: 8px;
    }
    .placehoder{
      flex-shrink: 0;
      width: 50px;
      height: 82px;
    }
    .hamburger-btn{
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao{
         font-size: 33px;
      }
      &:before {
        content: '';
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background-image: url(~@/assets/gradient-gray-line.png);
        background-size: contain;
      }
    }
  }
}
</style>
