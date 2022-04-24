<template>
  <div class="postComment-container">
    <van-cell-group>
      <van-field
        v-model.trim="message"
        rows="2"
        autosize
        type="textarea"
        maxlength="50"
        placeholder="请输入评论"
        show-word-limit
      >
        <template #button>
          <van-button size="small" type="info" @click="onPost" :disabled="!message">发送</van-button>
        </template>
      </van-field>
    </van-cell-group>
  </div>
</template>

<script>
import { addComment } from "@/api/comment";
export default {
  name: "PostComment",
  data() {
    return {
      message: "",
    };
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true,
    },
    articleId: {
      type: [Number, String, Object],
      default: null,
    },
  },
  methods: {
    async onPost() {
     let data = await addComment({
        target: this.target,
        content: this.message,
        art_id: this.articleId === null ? null : this.articleId,
      });
      this.$emit('post-success',{idObj:data.data.data,content:this.message})
      this.$toast.success('发布成功')
      this.message = ''
    },
    
  },
};
</script>

<style scoped lang="less">
</style>