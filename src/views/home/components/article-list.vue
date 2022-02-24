<template>
  <div class="article-list">
      <van-pull-refresh
       v-model="isreFreshLoading"
       :success-text="refreshSuccessText"
       :success-duration="1500"
       @refresh="onRefresh">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad">
          <ArticleItem
            v-for="(article, index) in list"
            :key="index"
            :article="article"
            >

          </ArticleItem>
            <!-- <van-cell
            v-for="(article, index) in list"
            :key="index"
            :title="article.title" /> -->
        </van-list>
      </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item/index.vue'
export default {
  name: 'ArticleList',
  components: { // 注册组件
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null, // 请求获取下一页的时间戳
      error: false,
      isreFreshLoading: false, // 控制下拉刷新状态
      refreshSuccessText: '刷新成功'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
    //   发起请求
      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now()
        })
        // 模拟随机失败案例
        // if (Math.random() > 0.2) {
        //   JSON.parse('dsnajndjsa')
        // //   console.log('失败了')
        // }

        // 把请求结果放到list数组中
        const { results } = data.data
        this.list.push(...results)
        // console.log(this.list)

        // 加载结束后要把状态改为false
        this.loading = false

        // 判断数据是否加载完成
        if (results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }

        // console.log(data)
      } catch (err) {
        this.err = true
        this.loading = false
      }
    },
    async onRefresh () {
    //   console.log('onRefresh')
      // 1.请求获取数据

      try {
        const { data } = await getArticles({
          channel_id: this.channel.id,
          timestamp: Date.now() // 这里需获取最新的实时数据
        })
        // 模拟随机失败案例
        // if (Math.random() > 0.5) {
        //   JSON.parse('dsnajndjsa')
        // //   console.log('失败了')
        // }
        // 2.数据追加到列表顶部
        const { results } = data.data
        this.list.unshift(...results)

        // 3.关闭下拉状态
        this.isreFreshLoading = false

        // 更新下拉提示文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.refreshSuccessText = '请求失败，请稍后重试'
        this.isreFreshLoading = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list{
    height: 79vh;
    // background-color: pink;
    overflow-y: auto;
}
</style>
