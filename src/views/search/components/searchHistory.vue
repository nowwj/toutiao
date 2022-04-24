<template>
  <div class="searchHistoryContainer">
    <van-cell title="搜索历史">
      <div v-if="isHistoryShow">
        <span @click="$emit('update-history', [])">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isHistoryShow = false">完成</span>
      </div>
      <van-icon name="delete" v-else @click="isHistoryShow = true"></van-icon>
    </van-cell>
    <van-cell
      :title="history"
      v-for="(history, index) in searchHistory"
      :key="index"
      @click="onSearch(history)"
    >
      <van-icon
        name="close"
        v-if="isHistoryShow"
        @click="onDelete(index)"
      ></van-icon>
    </van-cell>
  </div>
</template>

<script>
//import setItem from "@/utils/storage";
export default {
  name: "searchHistory",
  props: {
    searchHistory: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isHistoryShow: false,
    };
  },
  methods: {
    onDelete(index) {
      if (this.isHistoryShow) {
        this.searchHistory.splice(index, 1);
        //持久化存储
        //setItem("searchHistorys", this.searchHistory);
      }
    },
    onSearch(history) {
      if (!this.isHistoryShow) {
        this.$emit("search", history);
      }
    },
  },
};
</script>

<style>
</style>