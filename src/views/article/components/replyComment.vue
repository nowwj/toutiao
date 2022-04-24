<template>
  <div class="replyComment-container">
    <van-nav-bar
      :title="`${comment.reply_count}条回复`"
      left-text="返回"
      left-arrow
    >
      <van-icon name="close" slot="left" @click="$emit('close')" />
    </van-nav-bar>
    <CommentItem :comment="comment"></CommentItem>

    <van-cell title="全部回复" />
    <CommentList
      :source="comment.com_id"
      type="c"
      :list="commentList"
      @update-totalCount="totalCommentCount = $event"
    ></CommentList>

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
    </div>

    <!-- 弹出层 -->
    <!-- 发布评论区 -->
    <van-popup v-model="isPostShow" position="bottom">
      <PostComment
        @post-success="onSuccess"
        :target="comment.com_id"
        :articleId="articleId"
      ></PostComment>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from "@/views/article/components/commentItem";
import CommentList from "@/views/article/components/commentList.vue";
import PostComment from "@/views/article/components/postComment";
export default {
  name: "ReplyComment",
  components: {
    CommentItem,
    CommentList,
    PostComment,
  },
  props: {
    comment: {
      type: Object,
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  data() {
    return {
      isPostShow: false,
      commentList: [],
    };
  },
  methods: {
    onSuccess(comment) {
      this.commentList.unshift(comment);
      this.comment.reply_count++;
      this.isPostShow = false;
    },
  },
};
</script>

<style scoped lang="less">
.replyComment-container {
  /deep/.van-nav-bar .van-icon {
    color: #fff;
  }
  .van-button {
    width: 100%;
  }
}
</style>