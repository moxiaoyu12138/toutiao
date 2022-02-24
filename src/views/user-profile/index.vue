<template>
  <div class="user-profile" >
      <!-- 导航栏 -->
    <van-nav-bar
    class="page-nav-bar"
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
    >
    </van-nav-bar>
      <!-- 导航栏 -->
      <input
      type="file"
      hidden
      ref="file"
      @change="onFileChange"
      >
      <!-- 个人信息 -->
    <van-cell title="头像" is-link >
       <van-image
          class="avater"
          round
          :src="user.photo"
          @click="$refs.file.click()"
        />
    </van-cell>
    <van-cell
        title="昵称"
        is-link
        :value="user.name"
        @click="isUpdateNameShow=true"
    ></van-cell>
     <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    />
    <van-cell
      title="年龄"
      is-link :value="user.birthday"
      @click="isUpdateBirthdayShow = true"
    ></van-cell>
      <!-- 个人信息 -->

    <!-- 编辑昵称 -->
    <van-popup
        v-model="isUpdateNameShow"
        position="bottom"
        style="height:100%">
        <UpdateName
        v-if="isUpdateNameShow"
        @close="isUpdateNameShow = false"
        v-model="user.name"
        ></UpdateName>
    </van-popup>
    <!-- 编辑昵称 -->
    <!-- 编辑性别 -->
    <van-popup
      v-model="isUpdateGenderShow"
      position="bottom"
    >
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      />
    </van-popup>
    <!-- /编辑性别 -->
    <!-- 编辑生日 -->
    <van-popup
      v-model="isUpdateBirthdayShow"
      position="bottom"
    >
      <update-birthday
      v-if="isUpdateBirthdayShow"
        v-model="user.birthday"
        @close="isUpdateBirthdayShow = false"
      ></update-birthday>
    </van-popup>
    <!-- /编辑生日 -->
    <!-- 编辑头像 -->
    <van-popup
      v-model="isUpdatePhotoShow"
      position="bottom"
      style="height:100%"
    >
      <update-photo
        :img="img"
        @close="isUpdatePhotoShow = false"
        @update-photo="user.photo= $event"
      ></update-photo>
    </van-popup>
    <!-- /编辑头像 -->
  </div>
</template>

<script>
import { getUserProfile } from '@/api/suer'
import UpdateName from './commponts/update-name'
import UpdateGender from './commponts/update-gender.vue'
import UpdateBirthday from './commponts/update-birthday.vue'
import UpdatePhoto from './commponts/update-photo.vue'
export default {
  name: 'UserProFile',
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdatePhoto
  },
  props: {
  },
  data () {
    return {
      user: '',
      isUpdateNameShow: false,
      isUpdateGenderShow: false,
      isUpdateBirthdayShow: false,
      isUpdatePhotoShow: false,
      img: null
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (err) {
        this.$toast('加载失败，请稍后重试')
      }
    },
    onFileChange () {
      // 获取文件对象
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      // 基于文件对象获取的blob数据
      this.isUpdatePhotoShow = true
      // file-input  如果选了同一个文件不会触发change事件
      // 解决办法就是每次使用完毕吧value清空
      this.$refs.file.value = ''
    }
  }
}
</script>

<style scoped lang="less">
.user-profile{
    .avater{
        width: 60px;
        height: 60px;
    }
    .van-popup{
        background-color: #f5f7f9;
    }
}

</style>
