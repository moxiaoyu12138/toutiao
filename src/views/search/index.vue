<template>
  <div class="search-container">
      <!-- 搜索栏 -->
        <form action="/" class="search_from">
        <van-search
            v-model="searchText"
            show-action
            placeholder="请输入搜索关键词"
            background="#3296fa"
            @search="onSearch"
            @cancel="onCancel"
            @focus="isResultShow = false"
        />
        </form>
      <!-- 搜索栏 -->

    <!-- 搜索结果 -->
      <search-result
        v-if="isResultShow"
        :search-text = "searchText"
      />
      <!-- 搜索结果 -->

      <!-- 联想建议 -->
      <search-suggestion
        v-else-if="searchText"
        :search-text = "searchText"
        @search = "onSearch"
        />
      <!-- 联想建议 -->

      <!-- 历史记录 -->
    <search-history
    v-else
    :searchHistorys="searchHistorys"
    @clear-search-histories = "searchHistorys = []"
    @search = "onSearch"
    />
      <!-- 历史记录 -->

  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { setItem, getItem } from '@/utils/storage'

export default {
  name: 'SearchIndex', // 组件名
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {}, // 父级传值入口
  data () { // 初始化数据
    return {
      searchText: '',
      isResultShow: false, // 控制搜索结果展示
      searchHistorys: getItem('TOUTIAO_SEARCH_HISTORYS') || [] // 搜索历史记录数据
    }
  },
  computed: {},
  watch: {
    searchHistorys (value) {
      setItem('TOUTIAO_SEARCH_HISTORYS', value)
    }
  },
  created () {},
  mounted () {},
  methods: {
    onSearch (val) {
      // 更新文本内容
      this.searchText = val

      // 存储历史搜索记录
      // 不要重复记录，最新的排在最前面
      const index = this.searchHistorys.indexOf(val)
      if (index !== -1) {
        this.searchHistorys.splice(index, 1)
      }
      this.searchHistorys.unshift(val)

      // 渲染搜索结果
      this.isResultShow = true
    },
    onCancel () {
      this.$router.back()
    }
  }
}
</script>

<style scoped lang="less">
.search-container{
  padding-top: 108px;
    .van-search__action {
        color: #fff;
    }
    .search_from{
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
}
</style>
