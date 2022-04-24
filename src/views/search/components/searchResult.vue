<template>
  <div class="searchResultContainer">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell
        v-for="article in list"
        :key="article.art_id"
        :title="article.title"
       :to="{ name: 'article', params: { articleId: article.art_id } }"
      />
    </van-list>
  </div>
</template>

<script>
import { reqSearchResult } from "@/api/search";
export default {
  name: "searchResult",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perpage: 10,
    };
  },
  methods: {
    async onLoad() {
      //请求获取数据
      let { data } = await reqSearchResult({
        page: this.page,
        per_page: this.perpage,
        q: this.searchText,
      });
      let results = data.data.results;
      //将数据追加到list
      this.list.push(...results);
      //关闭本次loading
      this.loading = false;
      if (results.length) {
        this.page++;
      } else {
        this.finished = true;
        this.list = []
      }
    },
  },
};
</script>

<style scoped lang="less">
.searchResultContainer {
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  top: 54px;
  overflow-y: auto;
}
</style>