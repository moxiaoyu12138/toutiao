<template>
  <div class="login-container">
    <!-- 导航栏 -->
  <van-nav-bar  class="page-nav-bar" title="登录">
    <van-icon
    slot="left"
    name="cross"
    @click="$router.back()"
    ></van-icon>
  </van-nav-bar>
    <!-- 导航栏 -->
    <!-- 登录表单 -->
  <van-form @submit="OnSubmit" ref="loginForm">
    <van-field
      v-model="user.mobile"
      name="mobile"
      placeholder="请输入手机号"
      :rules="userFromRules.mobile"
      type="number"
      maxlength="11"
    >
    <i slot="left-icon" class="toutiao toutiao-shouji"></i>
    </van-field>
    <van-field
      v-model="user.code"
      name="code"
      placeholder="请输入验证码"
      :rules="userFromRules.code"
      type="number"
      maxlength="6"
    >
    <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      <template #button>
        <!-- 验证码倒计时组件 -->
        <van-count-down
        v-if="isCountDownShow"
        :time="1000 * 60"
        format="ss s"
        @finish= 'isCountDownShow = false'
        />
        <van-button
        v-else
        class="send-sms-btn"
        native-type="button"
        round size="small"
        type="default"
        @click="onSendSms"
        >发送验证码</van-button>
      </template>
    </van-field>
    <div class="login-btn-wrap">
      <van-button class="login-btn"  block type="info" native-type="submit">登录</van-button>
    </div>
  </van-form>

    <!-- 登录表单 -->
  </div>

</template>

<script>
import { login, sendSms } from '../../api/suer'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      },
      userFromRules: {
        mobile: [{
          required: true,
          message: '请填写手机号'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号码格式不正确'
        }],
        code: [{
          required: true,
          message: '验证码'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }
        ]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async OnSubmit () {
      // eslint-disable-next-line no-unused-vars
      const user = this.user

      this.$toast.loading({
        message: '登陆中。。。',
        forbidClick: 'ture',
        duration: 0
      })

      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        this.$router.back()
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码有误')
        } else {
          this.$toast.fail('登录失败，请重试')
        }
      }
    },
    async onSendSms () {
      // 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err.message)
      }
      // 验证通过显示倒计时
      this.isCountDownShow = true
      // 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status === 429) {
          this.$toast('发送太频繁了，请稍后再试')
        } else {
          this.$toast('发送失败,请稍后重试')
        }
      }
    }
  }
}

</script>

<style scoped lang="less">
.login-container{
  .toutiao{
    font-size: 37px;
  }
  .send-sms-btn{
     background-color: #ededed !important;
     width: 156px;
     height: 46px;
     line-height: 46px;
     font-size: 22px !important;
     color: #666;
   }
   .login-btn-wrap{
     padding: 53px 33px;
     .login-btn{
       background-color: #6db4fb;
       border:none
     }
   }
}
</style>
