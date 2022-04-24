<template>
  <div class="home-container">
    <!-- 头部导航栏区域 -->
    <van-nav-bar>
      <van-button
        class="search-btn"
        slot="title"
        icon="search"
        type="info"
        round
        to="/search"
        >搜索</van-button
      >
    </van-nav-bar>
    <!-- 文章频道列表 -->
    <van-tabs v-model="active">
      <van-tab
        :title="channel.name"
        v-for="channel in channels"
        :key="channel.id"
      >
        <ArticleLists :channel="channel"></ArticleLists>
      </van-tab>
      <div slot="nav-right" class="wap-nav-placeholder"></div>
      <div slot="nav-right" @click="show = true" class="wap-nav-wrap">
        <van-icon name="wap-nav"></van-icon>
      </div>
     
    </van-tabs>
     <van-popup
        v-model="show"
        position="bottom"
        class="channel-edit-poup"
        get-container="body"
        :style="{ height: '100%' }"
        closeable
        close-icon-position="top-left"
      >
        <ChannalEdit
          :channels="channels"
          @close="show = false"
          @update="updateCurrentChannel"
          :current="active"
        ></ChannalEdit>
      </van-popup>
  </div>
</template>

<script>
import  {reqGetUserChannels}  from "@/api/user";
import ArticleLists from "./components/ArticleLists.vue";
import ChannalEdit from "./components/ChannalEdit";
import { getItem } from "@/utils/storage";
export default {
  name: "home",
  components: {
    ArticleLists,
    ChannalEdit,
  },
  data() {
    return {
      active: 0,
      channels: [],
      show: false, //控制弹出层是否显示
    };
  },
  mounted() {
    this.getUserChannels();
  },
  methods: {
    //获取用户频道列表
    async getUserChannels() {
      let Channel = [];
      //已登陆，获取用户频道列表
      if (this.user) {
        let result = await reqGetUserChannels();
        this.channels = result.data.data.channels;
      } else {
        const localChannels = getItem("userChannels");
        //未登录,有本地存储频道列表,获取本地数据
        if (localChannels) {
          Channel = localChannels;
        } else {
          //未登录,没有本地存储频道列表，获取默认数据
          let result = await reqGetUserChannels();
          Channel = result.data.data.channels;
        }
      }
      this.channels = Channel;
    },
    //切换当前频道
    updateCurrentChannel(index) {
      this.active = index;
    },
  },
};
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    border: none;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
  /deep/ .van-tabs__wrap--scrollable .van-tab {
    border-right: 1px solid #edeff3;
    border-bottom: 1px solid #edeff3;
  }
  /deep/ .van-tabs__line {
    background-color: #3296fa;
    width: 15px;
    bottom: 20px;
  }
  .wap-nav-placeholder {
    flex-shrink: 0;
    //不参与平分 只参与固定。
    width: 33px;
  }
  .wap-nav-wrap {
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    right: 0px;
    width: 33px;
    height: 43px;
    font-size: 24px;
    opacity: 0.9;
    background-color: #fff;
  }
  &:before {
    content: "";
    width: 1px;
    height: 43px;
    position: absolute;
    left: 0;
    top: 0;
  }
}
</style>