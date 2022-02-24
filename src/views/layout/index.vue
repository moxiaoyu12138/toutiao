<template>
  <div class="layout-container">

      <!-- 子路由出口 -->
      <router-view>
      </router-view>
      <!-- 子路由出口 -->
      <!-- 底部导航栏 -->
      <van-tabbar v-model="active" class="layout-tabbar" route>
        <van-tabbar-item to="/">
            <i slot="icon" class="toutiao toutiao-shouye"></i>
            <span class="text">首页</span>
        </van-tabbar-item>
        <van-tabbar-item to="qa">
            <i slot="icon" class="toutiao toutiao-wenda"></i>
            <span class="text">问答</span>
        </van-tabbar-item>
        <van-tabbar-item to="video">
            <i slot="icon" class="toutiao toutiao-shipin"></i>
            <span class="text">视频</span>
        </van-tabbar-item>
        <van-tabbar-item to="my">
            <i slot="icon" class="toutiao toutiao-wode"></i>
            <span class="text">{{ $store.state.user ? '我的' : '未登录'}}</span>
        </van-tabbar-item>

      </van-tabbar>
      <!-- 底部导航栏 -->
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex', // 组件名
  components: {},
  props: {}, // 父级传值入口
  data () { // 初始化数据
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.layout-container{
    .layout-tabbar{
       i.toutiao {
           font-size: 40px ;
       }
       span.text{
           font-size: 20px;
       }
    }
}
</style>
