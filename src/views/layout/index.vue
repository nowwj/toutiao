<template>
  <div class="lauout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- 底部导航栏 -->
    <van-tabbar  route>
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="comment-o" to="/qa">问答</van-tabbar-item>
      <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
      <van-tabbar-item icon="manager-o" to="/my">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "LayoutIndex",
  data() {
    return {
      active: 1,
    };
  },
  mounted(){
    this.$store.commit('addCachepages','LayoutIndex')
  }
};
</script>

<style>
</style>
