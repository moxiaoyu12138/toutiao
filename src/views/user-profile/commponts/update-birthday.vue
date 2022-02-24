<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { UpdateUserProfile } from '@/api/suer'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value,
      currentDate: new Date(this.value),
      maxDate: new Date(),
      minDate: new Date(1800, 0, 1)
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
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await UpdateUserProfile({
          birthday: currentDate
        })
        // 更新视图
        this.$emit('input', currentDate)
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

<style scoped lang="less">

</style>
