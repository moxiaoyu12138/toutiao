<template>
  <div class="channel-edit">
      <van-cell :border="false" >
          <div slot="title" class="title-text">我的频道</div>
          <van-button
          type="danger"
          plain
          round
          size="mini"
          class="edit-btn"
          @click="isEdit = !isEdit"
          >{{isEdit ? '完成' : '编辑'}}</van-button>
      </van-cell>
      <!-- 我的频道 -->
      <van-grid class="my-grid" :gutter="10">
        <van-grid-item
          class="grid-item"
          v-for="(channel, index) in myChannels"
          :key="channel.id"
          @click="onMyChannelClick(channel,index)"
          >
          <van-icon
          slot="icon"
           name="clear"
           v-show="isEdit && !fiexChannels.includes(channel.id)"
           ></van-icon>
          <span
          slot="text"
          class="text"
          :class="{active: index === active}"
          >{{channel.name}}</span>
          </van-grid-item>
      </van-grid>

      <!-- 频道推荐 -->
      <van-cell :border="false">
          <div slot="title"  class="title-text">频道推荐</div>
      </van-cell>
      <van-grid :gutter="10" class="recommend-grid">
        <van-grid-item
          class="grid-item"
          v-for="(channel, index) in recommendChannels"
          icon="plus"
          :key="index"
          :text="channel.name"
          @click="onAddChannel(channel)"/>
      </van-grid>
      <!-- 频道推荐 -->
  </div>
</template>

<script>
import {
  getAllChannels,
  addUserChannel,
  deleteUserChannel
} from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utils/storage'
export default {
  name: 'ChannelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      index: '',
      allChannels: [],
      isEdit: false, // 控制编辑状态
      fiexChannels: [0] // 固定频道，不允许删除
    }
  },
  created () { // 调用组件
    this.loadAllChannels()
  },
  methods: {
    async loadAllChannels () {
      try {
        const { data } = await getAllChannels()
        console.log(data)
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('数据获取失败', err)
      }
    },
    async onAddChannel (channel) {
      this.myChannels.push(channel)

      // 数据持久化处理
      if (this.user) {
      // 已登录，保存线上
        try {
          await addUserChannel({
            id: channel.id, // 频道id
            seq: this.myChannels.length // 序号
          })
        } catch (err) {
          this.$toast('保存失败请稍后重试', err)
        }
      } else {
      // 未登录，保存本地
        setItem('TOUTIAO_CHANNELS', this.myChannels)
      }
    },
    onMyChannelClick (channel, index) {
      if (this.isEdit) {
        // 如果是固定频道则不删除
        if (this.fiexChannels.includes(channel.id)) {
          return
        }
        if (index <= this.active) {
          this.$emit('update-active', this.active - 1, true)
        }
        this.myChannels.splice(index, 1)
        // 编辑状态，执行删除频道
        // 参数1：要删除的元素索引
        // 参数2：删除的个数，若不指定则从1删到结束
        this.deleteChannel(channel)
      } else {
        this.$emit('update-active', index, false)
      }
    },
    // 处理删除频道
    async deleteChannel (channel) {
      try {
        if (this.user) {
          // 已登录
          deleteUserChannel(channel)
        } else {
          // 未登录
          setItem('TOUTIAO_CHANNELS', this.myChannels)
        }
      } catch (err) {
        this.$toast('操作失败，请稍后重试', err)
        console.log(err)
      }
    }
  },
  computed: {
    ...mapState(['user']),
    recommendChannels () {
      // 数组的filter方法：遍历数组，符合条件的元素存到新数组当中
      return this.allChannels.filter(channels => {
        return !this.myChannels.find(myChannel => {
          // 数组的find方法：吧符合条件的第一个元素返回
          return myChannel.id === channels.id
        })
      })

      // const channels = []
      // this.allChannels.forEach(channel => {
      //   // find 遍历数组，找到满足条件的元素
      //   const ret = this.myChannels.find(myChannel => {
      //     return myChannel.id === channel.id
      //   })
      //   if (!ret) {
      //     channels.push(channel)
      //   }
      // })
      // return channels
    }
  }

}

</script>

<style scoped lang="less">
.channel-edit{
    padding: 85px 0;
    .title-text{
        font-size: 32px;
        color: #333;
    }
    .edit-btn{
        height: 48px;
        width: 104px;
        font-size: 26px;
        color: #f85959;
        border: 1px solid #f85959;
    }
   /deep/ .grid-item{
        width: 160px;
        height: 86px;
        // background-color: #fff;
        .van-grid-item__content{
            white-space: nowrap;
            background-color: #f4f5f6;
            .van-grid-item-text .text{
                font-size: 16px;
                color: #222;
            }
            .text{
                font-size: 28px;
            }
            .active{
                color: #f85959;
            }
            .van-grid-item__icon-wrapper{
              position: unset;
            }
        }
    }

   /deep/.my-grid{
        .grid-item{
            .van-icon-clear{
                position: absolute;
                right: -10px;
                top: -10px;
                font-size: 30px;
                color: #cacaca;
                z-index: 2;
            }
        }
           .van-grid-item__text {
                    margin-top: 0;
                }
    }
   /deep/ .recommend-grid{
        .grid-item{
            .van-grid-item__content{
                flex-direction: row;
                .van-icon-plus{
                    font-size: 28px;
                    margin-right: 6px;
                }
                .van-grid-item__text {
                    margin-top: 0;
                }
            }
        }
    }
}
</style>
