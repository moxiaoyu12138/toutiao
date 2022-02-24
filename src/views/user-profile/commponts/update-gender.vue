<template>
  <div class="update-gender">
    <van-picker
      show-toolbar
      title="标题"
      :columns="columns"
      :default-index="value"
      @cancel="$emit('close')"
      @confirm="onConfirm"
      @change="onPickerChange"
    />
  </div>
</template>

<script>
import { UpdateUserProfile } from '@/api/suer'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0
      })
      try {
        const localGender = this.localGender
        await UpdateUserProfile({
          gender: localGender
        })
        // 更新视图
        this.$emit('input', localGender)
        // 关闭弹出层
        this.$emit('close')
        // 提示更新完成
        this.$toast.success('用户名修改完成')
      } catch (err) {
        this.$toast.fail('更新失败，请稍后重试')
      }
    },
    onPickerChange (picker, value, index) {
      this.localGender = index
    }
  }

}

</script>

<style scoped lang="less"></style>
