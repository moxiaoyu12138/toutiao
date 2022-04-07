<template>
  <div class="my-container">
    <!-- 登录成功 -->
    <div class="header user-info" v-if="user">
      <div class="base-info">
        <div class="left">
         <van-image
            class="avater"
            round
            fit="cover"
            :src="userInfo.photo"
          />
          <span class="name">小雨科技</span>
        </div>
        <div class="right">
          <van-button
          size="mini"
          to="/user/profile"
          >编辑资料</van-button>
        </div>
      </div>
      <div class="data-stats">
        <div class="data-stats">
          <div class="data-item">
            <span class="count">{{userInfo.art_count}}</span>
            <span class="text">头条</span>
          </div>
           <div class="data-item">
            <span class="count">{{userInfo.follow_count}}</span>
            <span class="text">关注</span>
          </div>
           <div class="data-item">
            <span class="count">{{userInfo.fans_count}}</span>
            <span class="text">粉丝</span>
          </div>
           <div class="data-item">
            <span class="count">{{userInfo.like_count}}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 登录成功 -->

      <!-- 未登录 -->
    <div class="header not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img src="@/assets/mobile.png" class="mobile-img">
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- 未登录 -->

    <!-- 导航 -->
    <van-grid :column-num="2" class="grid-nav" clickable>
      <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="text"> 收藏</span>
      </van-grid-item>
       <van-grid-item class="grid-item">
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 导航 -->

    <!-- 小智同学,消息通知,退出登录1 -->
     <van-cell title="消息通知" is-link class="login-message"/>
     <van-cell title="小智同学" is-link/>
     <van-cell v-if="user" title="退出登录" class="login-out" @click="onLogout"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '../../api/suer'
export default {
  name: 'MyIndex', // 组件名
  components: {},
  props: {}, // 父级传值入口
  data () { // 初始化数据
    return {
      userInfo: {} // 用户信息
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if (this.user) {
      this.loadUserInfo()
    }
  },
  mounted () {},
  methods: {
    onLogout () {
      this.$dialog.confirm({
        title: '确认退出'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        this.userInfo.photo = 'http://xiaoyuaichitang.xyz/view.php/3539b65aa04b21b96b6124357cf75877.jpg'
      } catch (err) {
        this.$toast('获取数据失败,请稍后重试')
      }
    }
  }
}
</script>

<style lang="less"  scoped>
.my-container{
  height: 100%;
  background-color: #f5f7f9;

  .header{
    height: 361px;
    background:url("~@/assets/banner.png");
    background-size: cover;
  }
  //未登录界面
  .not-login{
    display: flex;
    justify-content: center;
    align-items: center;
    .login-btn {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .mobile-img {
        width: 132px;
        height: 132px;
        margin-bottom: 15px;
      }
      .text {
        font-size: 28px;
        color: #fff;
      }
    }
  }
  //登录过后界面
  .user-info{
    width: 750px;
    .base-info{
      height: 231px;
      padding: 76px 32px 23px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .left{
        display: flex;
        align-items: center;
        .avater{
          border: 4px solid #fff;
          width: 132px;
          height: 132px;
          margin-right: 23px;
        }
        .name{
          font-size: 30px;
          color: #fff;
        }
      }
    }
    .data-stats{
      width: 750px;
      display: flex;
      .data-item{
        height: 130px;
        width: 25%;
        // flex: 1 !important;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        .count {
          font-size: 36px;
        }
        .text {
          font-size: 23px;
        }
      }
    }
  }
  //导航
  .grid-nav{
    .grid-item{
      height: 141px;
      i.toutiao{
        font-size: 45px;
      }
      .toutiao-shoucang{
        color: #eb5253;
      }
      .toutiao-lishi{
        color: #ff9d1d;
      }
      span.text{
        font-size: 28px;
      }
    }
  }
  //退出登录
  .login-message{
     margin-top: 9px;
  }
  .login-out{
    text-align: center;
    color: #d86262;
    margin-top: 9px;
  }
}
</style>
