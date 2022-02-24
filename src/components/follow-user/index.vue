<template>
    <van-button
      v-if="isFollowed"
      class="follow-btn"
      round
      size="small"
      :loading="loading"
      @click="onFllow"
    >已关注</van-button>
    <van-button
      v-else
      class="follow-btn"
      type="badge"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      :loading="loading"
      @click="onFllow"
    >关注</van-button>
</template>

<script>
import { addFllow, deleteFllow } from '@/api/suer'

export default {
  name: 'FollowUser',
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onFllow () {
      this.loading = true // 开启展示关注按钮的loading
      try {
        if (this.isFollowed) {
          // 已关注，取消关注
          await deleteFllow(this.userId)
          // console.log(data)
        } else {
          // 没关注添加关注
          await addFllow(this.userId)
        }
        this.$emit('update-is_followed', !this.isFollowed)
      } catch (err) {
        const message = '操作失败，请稍后重试'
        if (err.response && err.response.status === 400) {
          // eslint-disable-next-line no-const-assign
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
      this.loading = false // 关闭展示关注按钮的loading
    }
  }

}
</script>

<style scoped  lang="less">

</style>
