<template>
  <div class="search-suggestion">
      <van-cell
      icon="search"
      v-for="(text, index) in suggestions"
      :key="index"
      @click="$emit('search',text)"
      >
      {{text}}
      <div slot="title" v-html="highlight(text)"></div>
      </van-cell>
      <!-- <div v-html="htmlStr"></div> -->
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'SearchSuggesstion', // 组件名
  components: {},
  props: {
    searchText: {
      type: String,
      require: true
    }
  }, // 父级传值入口
  data () { // 初始化数据
    return {
      suggestions: [] // 联想数据列表
    //   htmlStr: 'hello <span style="color:red">world</span>'
    }
  },
  computed: {},
  watch: {
    searchText: {
      handler: debounce(function (value) {
        this.loadSearchSuggestions(value)
      }, 200),
      //   handler (value) {
      //     this.loadSearchSuggestions(value)
      //   },
      immediate: true
    }
  },
  created () {},
  mounted () {},
  methods: {
    async loadSearchSuggestions (q) {
      try {
        const { data } = await getSearchSuggestion(q)
        this.suggestions = data.data.options
      } catch (err) {
        this.$toast('数据获取失败，请稍后重试')
      }
    },
    highlight (keyword) {
      // console.log(keyword)
      const reg = new RegExp(this.searchText, 'gi')
      return keyword.replace(reg, `<span style="color: #3296fa">${this.searchText}</span>`)
    }
  }
}
</script>

<style scoped lang="less">
.search-suggestion{
    /deep/ span.active {
        color: #3296fa
    }
}
</style>
