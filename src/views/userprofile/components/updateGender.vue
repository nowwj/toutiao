<template>
  <div class="updateGender-container">
    <van-picker
      title="性别"
      show-toolbar
      :columns="columns"
      :default-index="this.value"
      @confirm="onConfirm"
      @change="onChange"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { Toast } from "vant";
import { updateUserProfile } from "@/api/user";
export default {
  name: "UpdateGender",
  data() {
    return {
      columns: ["男", "女"],
      defaultIndex: this.value,
    };
  },
  props: ["value"],
  methods: {
    onChange(picker, value, index) {
      this.defaultIndex = index;
    },
    async onConfirm(value) {
      this.$toast.loading({
        message: "保存中",
        forbidclick: true,
      });
      await updateUserProfile({
        gender: this.defaultIndex,
      });
      this.$emit('input',this.defaultIndex)
      this.$emit('close')
      Toast(`性别修改为：${value}`);
    },
  },
};
</script>

<style>
</style>