<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    >
    </van-nav-bar>
    <!-- 导航栏 -->

    <!-- 输入框 -->
    <div class="text-roup" style="margin-top:20px;">
      <van-cell-group inset>
        <van-field
          v-model.trim="localName"
          rows="2"
          autosize
          type="textarea"
          maxlength="7"
          placeholder="请输入昵称"
          show-word-limit
        />
      </van-cell-group>
    </div>
    <!-- 输入框 -->

  </div>
</template>

<script>
import { UpdateUserProfile } from '@/api/suer'
export default {
  name: 'UpdateName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$$toast('昵称不能为空')
          return
        }
        await UpdateUserProfile({
          name: localName
        })
        // 更新视图
        this.$emit('input', localName)
        // 关闭弹出层
        this.$emit('close')
        // 提示更新完成
        this.$toast.success('用户名修改完成')
      } catch (err) {
        this.$toast.fail('更新失败，请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
