<template>
 <van-icon
        :name="value ? 'star' : 'star-o'"
        :color="value ? '#ffa500' : ''"
        @click="onClooect"
        :loading="loading"
      />
</template>

<script>
import { addCollect, deleteCollect } from '@/api/article'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
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
        if (this.value) {
          // 取消收藏
          await deleteCollect(this.articleId)
        } else {
          // 添加收藏
          await addCollect(this.articleId)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
      } catch (err) {
        // 判断是否是登录失效
        if (err.response.status === 401) {
          this.$toast.fail('登录失效，请重新登录')
          this.$router.push('/login')
        } else {
          this.$toast.fail('收藏失败')
        }
      }

      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">

</style>
