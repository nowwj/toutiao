<template>
  <div class="updateName-container">
    <van-nav-bar
      title="修改昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onConfirm"
    />
    <div class="name-field-container">
      <van-field
        class="name-wrap"
        v-model="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入昵称"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
export default {
  name: "UpdateName",
  data() {
    return {
      localName: this.name,
    };
  },
  props: ["name"],
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: "保存中",
        forbidclick: true,
      });
      try {
        await updateUserProfile({
          name: this.localName,
        });
        this.$toast.success("修改成功");
        this.$emit('updateSuccess',this.localName)
        this.$emit("close");
      } catch (error) {
        if (error && error.response && error.response.status == 409) {
          this.$toast.fail('昵称已存在')
        }
      }
    },
  },
};
</script>

<style scoped lang="less">
.updateName-container {
  /deep/ .van-nav-bar__text {
    color: #fff;
  }
  .name-field-container {
    padding: 10px;
  }
}
</style>