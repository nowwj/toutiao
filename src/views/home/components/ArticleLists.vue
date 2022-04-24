<template>
  <div class="articles-container" ref="articleList">
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-text="successText"
      :success-duration="500"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <ArticleItem
          v-for="(article, index) in articles"
          :key="index"
          :title="article.title"
          :article="article"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { reqGetArticle } from "@/api/article";
import ArticleItem from "@/components/ArticleItem";
import {debounce} from 'lodash'
export default {
  name: "ArticleLists",
  props: {
    channel: {
      type: Object,
      required: true,
    },
  },
  components: {
    ArticleItem,
  },
  data() {
    return {
      articles: [],
      loading: false,
      finished: false,
      timestamp: 0,
      refreshing: false,
      successText: "",
      scrollTop: 0,
    };
  },
  mounted() {
    const articleList = this.$refs["articleList"];
    articleList.onscroll = debounce(() => {
      this.scrollTop = articleList.scrollTop;
    },50)
  },
  activated(){
   this.$refs["articleList"] = this.scrollTop
  },
  methods: {
    async onLoad() {
      const { data } = await reqGetArticle({
        channel_id: this.channel.id,
        timestamp: this.timestamp === 0 ? Date.now() : this.timestamp,
        with_top: 0,
      });
      const result = data.data.results;
      this.timestamp = data.data.pre_timestamp || 0;
      result.forEach((item) => {
        this.articles.push(item);
      });
      this.loading = false;
      if (this.timestamp === 0) this.finished = true;
    },
    async onRefresh() {
      const { data } = await reqGetArticle({
        channel_id: this.channel.id,
        timestamp: Date.now(),
        with_top: 0,
      });
      const result = data.data.results;
      result.forEach((item) => {
        this.articles.unshift(item);
      });
      this.refreshing = false;
      this.successText = `更新了${result.length}条数据`;
    },
  },
};
</script>

<style scoped lang="less">
.articles-container {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
  .van-cell {
    text-align: left;
  }
}
</style>