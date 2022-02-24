<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isDeleteShow">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        &nbsp;
        <span @click="isDeleteShow=false">完成</span>
      </div>
      <van-icon v-else name="delete" @click="isDeleteShow=true"/>
    </van-cell>
    <van-cell
    :title="item"
    v-for="(item,index) in searchHistorys"
    :key="index"
    @click="onSearchClick(item,index)"
    >
      <van-icon name="close" v-if="isDeleteShow"/>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory', // 组件名
  components: {},
  props: {
    searchHistorys: {
      type: Array,
      require: true
    }
  }, // 父级传值入口
  data () { // 初始化数据
    return {
      isDeleteShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    onSearchClick (item, index) {
      if (this.isDeleteShow) {
        // 处理删除数据
        this.searchHistorys.splice(index, 1)
      } else {
        // 跳转搜索
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped lang="less">

</style>
