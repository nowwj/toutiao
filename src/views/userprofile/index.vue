<template>
  <div class="user-profile-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="个人信息"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <input type="file" hidden ref="imgUpload" @change="onFileChange" />
    <van-cell
      title="头像"
      is-link
      accept="image/*"
      @click="$refs.imgUpload.click()"
    >
      <van-image
        width="30"
        height="30"
        round
        fit="cover"
        :src="userInfo.photo"
      ></van-image>
    </van-cell>
    <van-cell
      title="昵称"
      is-link
      :value="userInfo.name"
      @click="isEditName = true"
    ></van-cell>
    <van-cell
      title="性别"
      is-link
      :value="userInfo.gender == '0' ? '男' : '女'"
      @click="isEditGender = true"
    ></van-cell>
    <van-cell
      title="生日"
      is-link
      :value="userInfo.birthday"
      @click="isEditBirthday = true"
    ></van-cell>
    <!-- 修改昵称 -->
    <van-popup
      v-model="isEditName"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <UpdateName
        v-if="isEditName"
        @close="isEditName = false"
        :name="userInfo.name"
        @updateSuccess="userInfo.name = $event"
      ></UpdateName>
    </van-popup>
    <!-- 修改性别 -->
    <van-popup
      v-model="isEditGender"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <UpdateGender
        v-if="isEditGender"
        @close="isEditGender = false"
        v-model="userInfo.gender"
      ></UpdateGender>
    </van-popup>
    <!-- 修改生日 -->
    <van-popup
      v-model="isEditBirthday"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <UpdateBirthday
        v-if="isEditBirthday"
        @close="isEditBirthday = false"
        v-model="userInfo.birthday"
      ></UpdateBirthday>
    </van-popup>
    <!-- 修改头像 -->
    <div class="headImg">
      <van-popup v-model="isEditPhoto" style="height: 100%" position="bottom">
        <UpdateAvatar
          v-if="isEditPhoto"
          @update-photo="userInfo.photo = $event"
          @close="isEditPhoto = false"
          :file="previewImg"
        >
        </UpdateAvatar>
      </van-popup>
    </div>
  </div>
</template>

<script>
import { getUserProfile } from "@/api/user";
import UpdateName from "./components/updateName";
import UpdateGender from "./components/updateGender";
import UpdateBirthday from "./components/updateBirthday";
import UpdateAvatar from './components/updateAvatar'
export default {
  name: "userprofile",
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdateAvatar,
  },
  data() {
    return {
      userInfo: {},
      isEditName: false,
      isEditGender: false,
      isEditBirthday: false,
      isEditPhoto: false,
      previewImg: null,
    };
  },
  
  mounted() {
    this.getUserInfo();
   
  },
  methods: {
    async getUserInfo() {
      const { data } = await getUserProfile();
      this.userInfo = data.data;
    },
    onFileChange() {
      this.isEditPhoto = true
     const file = this.$refs.imgUpload.files[0]
     this.previewImg = file
      this.$refs.imgUpload.value = "";
    },
  },
};
</script>

<style scoped lang="less">
/deep/.van-nav-bar__text {
  color: #fff;
}
/deep/.van-popup {
  background-color: #f5f7f9 !important;
}
</style>