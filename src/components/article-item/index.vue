<template>
    <!--  -->
    <!-- :to="`/article/${article.art_id}`" -->
    <!--  -->
     <!-- :to="{
        name:article,
        promes: {
            articleId: acticle.art_id
        }
    }" -->
  <van-cell
    class="article-item"
    :to="'/acticle/' + article.art_id"
>
      <div slot="title" class="title van-multi-ellipsis--l2" > {{article.title}}</div>
      <div slot="label">
          <div v-if="article.cover.type === 3" class="cover-wrap">
              <div class="cover-item"
                v-for="(img, index) in article.cover.images"
                :key="index">
                  <van-image
                    class="cover-item-image"
                    width="116px"
                    height="73px"
                    :src="img"
                    />
              </div>
          </div>
          <div class="label-badge-wrap">
              <span>小雨科技</span>
              <span>{{article.comm_count}}评论</span>
              <span>{{article.pubdate | relativeTime}}</span>
          </div>
      </div>
      <van-image
      v-if="article.cover.type === 1"
      slot="default"
      fit="cover"
      class="right-cover"
      :src="article.cover.images[0]"
      />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    article: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="less" >
 .article-item{
    .title{
        font-size: 32px;
        color: #3a3a3a;
    }
    .van-cell__value{
        flex: unset ;
        width: 232px;
        height: 146px;
        padding-left: 25px;
    }
    .right-cover{
        width: 232px;
        height: 146px;
    }
    .label-badge-wrap span{
        font-size: 22px;
        color: #b4b4b4;
        margin-right: 25px;
    }
    .cover-wrap{
        display: flex;
        padding: 30px 0;
        .cover-item{
            font: 1px;
            height: 146px;
            &:not(:last-child) {
                padding-right: 4px;
            }
            .cover-item-image{
                // width: 232px;
                width: 100%;
                height: 146px;
            }
        }
    }
}
</style>
