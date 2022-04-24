<template>
  <div class="updateBirthday-container">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @change="onChange"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from "@/api/user";
import dayjs from "dayjs";
export default {
  name: "UpdateBirthday",
  data() {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(2060, 10, 1),
      currentDate: new Date(this.value),
    };
  },
  props: ["value"],
  methods: {
    onChange() {},
    async onConfirm(value) {
      try {
        this.$toast.loading({
          message: "修改中",
          forbidclick: true,
        });
        const date = dayjs(this.currentDate).format("YYYY-MM-DD");
        await updateUserProfile({
          birthday: date,
        });
        this.$emit("input", date);
        this.$emit("close");
      } catch (error) {
        this.$toast(error.message);
      }
    },
  },
};
</script>

<style>
</style>