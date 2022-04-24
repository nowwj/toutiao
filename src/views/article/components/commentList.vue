<template>
  <div class="commentList-container">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <CommentItem
        v-for="(comment, index) in list"
        :key="index"
        :comment="comment"
        @Reply="$emit('Reply', $event)"
      ></CommentItem>
    </van-list>
  </div>
</template>

<script>
import CommentItem from "@/views/article/components/commentItem";
import { getCommentList } from "@/api/comment";
export default {
  name: "CommentList",
  components: {
    CommentItem,
  },
  data() {
    return {
      // list: [],
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
    };
  },
  props: {
    source: {
      type: [Number, String, Object],
      required:true,
    },
    list: {
      type:Array,
      default:()=>[],
    },
    type: {
      type: String,
      default: 'a',
    },
  },
  methods: {
    async onLoad() {
      const { data } = await getCommentList({
        type: this.type,
        source: this.source.toString(), //文章或评论的id
        offset: this.offset,
        limit: this.limit,
      });
      this.$emit("update-totalCount", data.data.total_count);
      const { results } = data.data;
      this.list.push(...results);
      this.loading = false;
      if (results.length) {
        this.offset = data.data.last_id;
      } else {
        this.finished = true;
      }
    },
  },
};
</script>

<style>
</style>