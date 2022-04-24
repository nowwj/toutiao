<template>
  <div class="search-container">
    <!-- 顶部搜索输入框 -->
    <van-search
      v-model="searchText"
      placeholder="请输入搜索关键词"
      show-action
      @search="onSearch"
      @cancel="onCancel"
      @focus="isResultShow = false"
    />
    <!-- 搜索结果 -->
    <searchResult v-if="isResultShow" :searchText="searchText"></searchResult>
    <!-- 联想建议 -->
    <searchSuggest
      @search="onSearch"
      :searchText="searchText"
      v-else-if="searchText"
    ></searchSuggest>
    <!-- 历史记录 -->
    <searchHistory
      v-else
      :searchHistory="searchHistory"
      @search="onSearch"
      @update-history="searchHistory = $event"
    ></searchHistory>
  </div>
</template>

<script>
import searchSuggest from "@/views/search/components/searchSuggest";
import searchHistory from "@/views/search/components/searchHistory";
import searchResult from "@/views/search/components/searchResult";
import { reqGetHistory } from "@/api/search";
import { getItem, setItem } from "@/utils/storage";
import { mapState } from "vuex";
export default {
  data() {
    return {
      searchText: "",
      isResultShow: false,
      searchHistory: getItem("searchHistorys") || [],
    };
  },
  components: {
    searchSuggest,
    searchHistory,
    searchResult,
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.getHistory();
  },
  watch: {
    // 通过watch统一处理history
    searchHistory: {
      isDeep: true,
      handler() {
        setItem("searchHistorys", this.searchHistory);
      },
    },
  },
  methods: {
    onSearch(searchText) {
      this.searchText = searchText;
      const index = this.searchHistory.indexOf(searchText);
      //删除重复的
      if (index != -1) {
        this.searchHistory.splice(index, 1);
      }
      this.searchHistory.unshift(searchText);
      //将搜索历史存储到本地
      //setItem("searchHistorys", this.searchHistory);
      this.isResultShow = true;
    },
    onCancel() {
      this.$router.back();
    },
    async getHistory() {
      this.searchHistory = getItem("searchHistorys") || [];
      // if (this.user) {
      //   const { data } = await reqGetHistory();
      //   let searchHistorys = [
      //     ...new Set([...data.data.keywords, ...localHistorys]),
      //   ];
      //   this.searchHistory = searchHistorys;
      // }
    },
  },
};
</script>

<style scoped lang="less">
</style>