<template>
  <div class="searchSuggest-container">
    <van-cell-group>
      <van-cell
        icon="search"
        v-for="(suggestion, index) in searchSuggests"
        :key="index"
        :title="suggestion"
        @click="$emit('search',suggestion)"
      >
      <div slot="title" v-html="hightlight(suggestion)"></div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { reqSearchSuggest } from "@/api/search";
import { debounce } from "lodash";
export default {
  name: "searchSuggest",
  props: {
    searchText: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchSuggests: [],
    };
  },
  methods: {
    hightlight(suggestion) {
      if (suggestion) {
        const reg = new RegExp(this.searchText, "gi");
        return suggestion.replace(
          reg,
          `<span style="color:red;">${this.searchText}</span>`
        );
      } else {
        return suggestion;
      }
    },
  },
  watch: {
    searchText: {
      handler: debounce(async function () {
        let result = await reqSearchSuggest(this.searchText);
        this.searchSuggests = result.data.data.options;
      }, 200),
    },
  },
};
</script>

<style>
</style>