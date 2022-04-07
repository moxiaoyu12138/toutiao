<template>
    <van-icon
      :name="value === 1 ? 'good-job' : 'good-job-o'"
      :color="value === 1 ? '#e5645f' : ''"
      @click="onClooect"
      :loading="loading"
    />
</template>

<script>
import { addLike, deleteLike } from '@/api/article'

export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, Object, String],
      required: true
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    async onClooect () {
      this.loading = true
      try {
        let status = -1
        if (this.value === 1) {
        //   以点赞，取消
          await deleteLike(this.articleId)
        } else {
        // 未点赞，添加
          await addLike(this.articleId)
          status = 1
        }
        this.$emit('input', status)
        this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        // console.log(err)
        console.log(err)
        // 判断是否是登录失效
        if (err.response.status === 401) {
          this.$toast.fail('登录失效，请重新登录')
          this.$router.push('/login')
        } else {
          this.$toast.fail('点赞失败')
        }
      }
      this.loading = false
    }
  }
}
</script>

<style>

</style>
