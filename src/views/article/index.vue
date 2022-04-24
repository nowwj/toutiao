<template>
  <div class="article-cotainer">
    <van-nav-bar title="文章" left-arrow @click-left="$router.back()" />
    <!-- 内容区 -->
    <div class="content-wrap">
      <h1 class="title">{{ article.title }}</h1>

      <van-cell class="user-info">
        <van-image
          class="user-avatar"
          :src="article.aut_photo"
          round
          fit="cover"
          slot="icon"
        />
        <div slot="title" class="user-name">{{ article.aut_name }}</div>
        <div slot="label" class="time">
          {{ article.pubdate | relativeTime }}
        </div>
        <van-button
          :type="article.is_followed ? 'default' : 'info'"
          :icon="article.is_followed ? '' : 'plus'"
          class="follow-button"
          round
          :loading="isLoading"
          size="small"
          @click="handleFollow"
        >
          {{ article.is_followed ? "已关注" : "未关注" }}</van-button
        >
      </van-cell>
      <div
        ref="article-content"
        class="content markdown-body"
        v-html="article.content"
      ></div>
      <van-divider>文章到这里结束啦~</van-divider>
      <div class="title">全部评论</div>
      <!-- 评论区 -->
      <CommentList
        :source="articleId"
        :list="commentList"
        @update-totalCount="totalCommentCount = $event"
        @Reply="onReplyClick"
      ></CommentList>
    </div>

    <!-- 底部区域 -->
    <div class="bottom-content">
      <van-button
        @click="isPostShow = true"
        type="default"
        class="comment-btn"
        round
        size="medium"
      >
        写评论
      </van-button>
      <!-- 评论 -->
      <van-icon name="comment-o" :badge="totalCommentCount" />
      <!-- 收藏 -->
      <van-icon
        :name="article.is_collected ? 'star' : 'star-o'"
        :color="article.is_collected ? 'orange' : ''"
        :loading="isLoading"
        @click="handleCollect"
      />
      <!-- 点赞 -->
      <van-icon
        :name="article.attitude == 1 ? 'good-job' : 'good-job-o'"
        :color="article.attitude == 1 ? '#3296fa' : ''"
        :loading="isLoading"
        @click="handleLike"
      />
      <van-icon name="share-o" />
    </div>

    <!-- 发布评论区 -->

    <van-popup v-model="isPostShow" position="bottom">
      <PostComment :target="articleId" @post-success="onSuccess"></PostComment>
    </van-popup>

    <!-- 评论的评论 -->
    <van-popup v-model="isReplyShow" position="bottom">
      <ReplyComment
        :articleId="articleId"
        v-if="isReplyShow"
        @close="isReplyShow = false"
        :comment="replyComment"
      >
      </ReplyComment>
    </van-popup>
  </div>
</template>

<script>
import "github-markdown-css";
import {
  getArticleById,
  reqFollowAuthor,
  reqDeleteFollow,
  reqCollectArticle,
  reqDeleteCollect,
  reqLikeArticle,
  reqDeleteLike,
} from "@/api/article";
import { ImagePreview, Toast } from "vant";
import { mapState } from "vuex";
import CommentList from "./components/commentList.vue";
import PostComment from "@/views/article/components/postComment";
import ReplyComment from "./components/replyComment.vue";
export default {
  name: "Article",
  components: {
    CommentList,
    PostComment,
    ReplyComment,
  },
  data() {
    return {
      articleId: this.$route.params.articleId,
      article: {},
      isLoading: false,
      isPostShow: false,
      commentList: [],
      totalCommentCount: 0,
      isReplyShow: false,
      replyComment: {},
    };
  },
  created() {
    this.getArticleDetail();
  },
  methods: {
    //获取文章信息
    async getArticleDetail() {
      const { data } = await getArticleById(this.articleId);
      this.article = data.data;

      this.$nextTick(() => {
        this.previewImage();
      });
    },
    //图片预览
    previewImage() {
      const articleContent = this.$refs["article-content"];
      const imgs = articleContent.querySelectorAll("img");
      const imgPath = [];
      imgs.forEach((img, index) => {
        imgPath.push(img.src);
        img.onclick = function () {
          ImagePreview({
            images: imgPath,
            startPosition: index,
          });
        };
      });
    },
    // 关注与取消关注
    async handleFollow() {
      if (this.user) {
        this.isLoading = true;

        if (this.article.is_followed) {
          await reqDeleteFollow(this.article.aut_id);
        } else {
          await reqFollowAuthor(this.article.aut_id);
        }
        this.article.is_followed = !this.article.is_followed;
        this.isLoading = false;
      }
    },
    //收藏与取消文章
    async handleCollect() {
      if (this.user) {
        this.isLoading = true;
        if (this.article.is_collected) {
          await reqDeleteCollect(this.articleId);
          this.$toast("已取消收藏");
        } else {
          await reqCollectArticle(this.articleId);
          this.$toast.success("收藏成功");
        }
        this.article.is_collected = !(await this.article.is_collected);
        this.isLoading = false;
      }
    },
    //点赞与取消点赞
    async handleLike() {
      this.isLoading = true;
      if (this.user) {
        if (this.article.attitude == 1) {
          await reqDeleteLike(this.articleId);
          this.article.attitude = -1;
        } else {
          await reqLikeArticle(this.articleId);
          this.article.attitude = 1;
        }
      }
      this.isLoading = false;
    },
    //评论发布成功的回调
    onSuccess(comment) {
      this.commentList.unshift(comment);
      this.totalCommentCount++;
      this.isPostShow = false;
    },
    //点击回复评论
    onReplyClick(comment) {
      this.isReplyShow = true;
      this.replyComment = comment;
    },
  },
  computed: {
    ...mapState(["user"]),
  },
};
</script>

<style scoped lang="less">
@media (max-width: 767px) {
  .markdown-body {
    padding: 15px;
  }
}

.article-cotainer {
  .content-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 46px;
    bottom: 44px;
    overflow-y: auto;
    background-color: white;
  }

  .title {
    font-size: 20px;
    margin: 0;
    padding: 14px;
    color: #3a3a3a;
    background-color: white;
  }

  .user-info {
    justify-content: space-around;
    align-items: center;
    padding: 10px 14px;

    .user-avatar {
      width: 35px;
      height: 35px;
      margin-right: 8px;
    }

    .user-name {
      font-size: 11px;
      color: #333333;
    }

    .time {
      font-size: 11px;
      color: #b4b4b4;
    }

    .follow-button {
      width: 85px;
      height: 29px;
    }
  }

  .markdown-body {
    padding: 14px;
    background-color: white;
  }

  .bottom-content {
    position: fixed;
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    bottom: 0;
    left: 0;
    right: 0;
    height: 44px;
    background-color: white;

    .comment-btn {
      width: 141px;
      height: 23px;
      font-size: 15px;
    }
  }
}
</style>