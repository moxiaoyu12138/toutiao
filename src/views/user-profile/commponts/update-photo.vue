<template>
  <div class="update-photo">
    <img :src="img" class="img" ref="img">
    <div class="toolbar">
      <div class="text" @click="$emit('close')">取消</div>
      <div class="text" @click="onConfirm">完成</div>
    </div>
  </div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import { UpdateUserPhoto } from '@/api/suer'
export default {

  name: 'UpdatePhoto',
  props: {
    img: {
      type: [Object, String],
      required: true
    }
  },
  data () {
    return {
      cropper: null,
      loading: ''
    }
  },
  created () {
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false
    })
  },
  methods: {
    onConfirm () {
      // 基于服务端的裁切使用  getData()  方法获取裁切参数
      // console.log(this.cropper.getData())
      // 纯客户端使用  获取裁切的文件对象
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        this.updatePhoto(blob)
      })
    },
    async updatePhoto (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0
      })
      try {
        // 如果接口要求 Content-Type  是 multipart/from-data
      // 则必须要传递FromData对象
        const fromData = new FormData()
        fromData.append('photo', blob)
        const { data } = await UpdateUserPhoto(fromData)
        // 关闭弹出层
        this.$emit('close')
        // 更新视图
        this.$emit('update-photo', data.data.photo)
        this.$toast.success('头像修改完成')
      } catch (err) {
        this.$toast.fail('上传失败,请稍后重试')
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-photo{
  background-color: #000;
  height: 100%;
  .toolbar{
    position: fixed;
    right: 0;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: space-between;
  }
  .text{
    width: 90px;
    height: 90px;
    font-size: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
}
.img{
  display: block;
  max-width: 100%;
}
</style>
