<template>
  <div class="search-result">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="加载失败请稍后重试"
        @load="onLoad"
      >
    <van-cell
        v-for="(article, index) in list"
        :key="index"
        :title="article.title"
        :to="{
          name: 'acticle',
          params: {
            // 属性名：路由路径中设计的动态参数名称
            articleId: article.art_id
          }
        }"
      />
  </van-list>
  </div>
</template>

<script>
import { getSearchReslt } from '@/api/search'

export default {
  name: 'SearchResult', // 组件名
  components: {},
  props: {
    searchText: {
      type: String,
      require: true
    }
  }, // 父级传值入口
  data () { // 初始化数据
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20,
      error: false
    }
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {},
  methods: {
    async onLoad () {
      // 1，请求获取数据
      try {
        const { data } = await getSearchReslt({
          page: this.page,
          per_page: this.perPage,
          q: this.searchText
        })
        // console.log(data)
        // 2，将数据添加到数组当中
        const { results } = data.data
        this.list.push(...results)

        // 3，将本次加载中的loading关闭

        this.loading = false
        // 4，判断是否存在数据
        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
        //    如果有，则更新获取下一个数据页码
        //    如果没有，则将 finished 设置为结束
      } catch (err) {
        this.error = true
        // 加载失败loading也要停掉
        this.loading = false
      }
    }

  }
}
</script>

<style scoped lang="less">

</style>
