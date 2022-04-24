<template>
  <van-cell
    class="articleItem"
    :to="{ name: 'article', params: { articleId: article.art_id } }"
  >
    <div slot="title" class="van-multi-ellipsis--l3">{{ article.title }}</div>
    <div slot="label">
      <div v-if="article.cover.type == 3" class="cover-wrap">
        <div
          class="cover-wrap-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item" :src="img"> </van-image>
        </div>
      </div>
      <div class="lable-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate }}</span>
      </div>
    </div>
    <van-image
      v-if="article.cover.type == 1"
      width="116"
      height="73"
      fit="cover"
      class="right-cover"
      :src="article.cover.images[0]"
    >
    </van-image>
  </van-cell>
</template>

<script>
export default {
  name: "ArticleItem",
  props: {
    article: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="less">
.articleItem {
  .title {
    font-size: 16px;
    color: #3a3a3a;
  }
  /deep/.van-cell__value {
    flex: unset;
    width: 116px;
    height: 73px;
    margin-left: 12px;
  }
  .right-cover {
    width: 116px;
    height: 73px;
  }
  .cover-wrap {
    display: flex;
    .cover-wrap-item {
      &:not(:last-child) {
        padding-right: 4px;
      }
      flex: 1;
      height: 73px;
      .cover-item {
        width: 100%;
        height: 73px;
      }
    }
  }
  .lable-wrap {
    font-size: 11px;
    color: #b4b4b4;
    span {
      margin-left: 12px;
    }
  }
}
</style>