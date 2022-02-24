<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="loading" class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-else-if="article.title" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{article.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-badge" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div slot="title" class="user-name">{{article.aut_name}}</div>
          <div slot="label" class="publish-date">{{article.pubdate | relativeTime}}</div>
          <Follow-User
            class="follow-btn"
            :is-followed="article.is_followed"
            :user-id="article.aut_id"
            @update-is_followed="article.is_followed = $event"
          >
          </Follow-User>
           <!-- <van-button
            v-if="article.is_followed"
            class="follow-btn"
            round
            size="small"
            :loading="fallowLoading"
            @click="onFllow"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="badge"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            :loading="fallowLoading"
            @click="onFllow"
          >关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
        class="article-content markdown-body"
        v-html="article.content"
        ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>
        <!-- 评论列表 -->
        <CommentList
        :source="article.art_id"
        :list="commentList"
        @onload-success="totalCommentCount = $event.total_count"
        @reply-click="onReplyClick"
        ></CommentList>
        <!-- 评论列表 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isPostShow= true"
          >写评论</van-button>
          <van-icon
            name="comment-o"
            :badge="totalCommentCount"
            color="#777"
          />
          <CollectArticle
          v-model="article.is_collected"
          :article-id="article.art_id"
          ></CollectArticle>
          <!-- like -->
          <LikeArticle
          v-model="article.attitude"
          :article-id="article.art_id"
          ></LikeArticle>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 发布评论弹出层 -->
        <van-popup
          v-model="isPostShow"
          position="bottom"
          :overlay="false"
          >
          <comment-post
          :target="article.art_id"
          @post-success="onPostSuccess"
          />
        </van-popup>
        <!-- 发布评论弹出层 -->
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="errStatus === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button
        class="retry-btn"
        @click="loadArticle"
        >点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
    <!-- 评论回复 -->
    <van-popup
      v-model="isReplyShow"
      position="bottom"
      :overlay="false"
      style="height:100%;"
      >
      <CommentReply
      v-if="isReplyShow"
      :comment="currentComment"
      @close="isReplyShow = false"
      ></CommentReply>
    </van-popup>

    <!-- 评论回复 -->

  </div>
</template>

<script>
import { getArticlById } from '@/api/article'
import { ImagePreview } from 'vant'
import FollowUser from '@/components/follow-user'
import CollectArticle from '@/components/collect-article'
import LikeArticle from '@/components/like-article'
import CommentList from './commponents/comment-list'
import CommentPost from './commponents/comment-post'
import CommentReply from './commponents/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    CommentList,
    CommentPost,
    CommentReply
  },
  provide: function () {
    return {
      articleId: this.articleId
    }
  },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true, // 加载中loading状态
      errStatus: 0, // 失败的状态码
      fallowLoading: false,
      totalCommentCount: 0, // 评论数量
      isPostShow: false, // 发布评论的显示状态
      commentList: [],
      isReplyShow: false, // 回复弹出层
      currentComment: []
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticle() // 初始调用
  },
  mounted () {
  },
  methods: {
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticlById(this.articleId)
        // console.log(data)
        // 初始化图片点击预览
        setTimeout(() => {
          // console.log(this.$refs['article-content'])
          this.previewImage()
        }, 0)
        // 测试数据失败
        // if (Math.random() > 0.5) {
        //   JSON.parse('absdisankjdsbsaoibi')
        // }

        this.article = data.data
      } catch (err) {
        if (err.response && err.response.status === 404) {
          this.errStatus = 404
        }
        console.log('获取数据失败', err)
      }
      // 无论请求成功或失败都需要关闭loading
      this.loading = false
    },
    previewImage () {
      // 获取img节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      // console.log(imgs)
      const images = []
      images.forEach((img, index) => {
        images.push(img.src)
      })
      imgs.forEach((img, index) => {
        images.push(img.src)

        // 给每个 img 注册点击事件，在处理函数中调用预览
        img.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组
            images,
            // 起始位置，从 0 开始
            startPosition: index
          })
        }
      })
      // console.log(images)
    },
    onPostSuccess (data) {
      // 关闭弹出层
      this.isPostShow = false
      // 将内容显示到顶部
      this.commentList.unshift(data.new_obj)
    },
    onReplyClick (comment) {
      // console.log(comment)
      this.currentComment = comment
      this.isReplyShow = true
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-badge {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-badge {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
