<template>
  <div class="my-container">
    <!-- 头像和个人信息区域 -->
    <van-cell-group class="my-info" v-if="user">
      <van-cell class="base-info" center :border="false">
        <van-image
          slot="icon"
          width="50"
          height="50"
          round
          fit="cover"
          class="avatar"
          :src="currentUser.photo"
        />
        <div slot="title" class="name">{{ currentUser.name }}</div>
        <van-button size="small" round class="right-btn" to="/user/profile"
          >编辑资料</van-button
        >
      </van-cell>
      <!-- 头像下部宫格布局 -->
      <van-grid :border="false" class="data-info">
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text">
            <div class="count">{{ currentUser.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item text="文字" class="data-info-item">
          <div slot="text">
            <div class="count">{{ currentUser.fans_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 未登录显示的页面 -->
    <div class="not-login" v-else>
      <div
        @click="
          $router.push({
            name: 'login',
            query: {
              redirect: '/my',
            },
          })
        "
      >
        <img class="mobile-icon" src="./images/unlogin-img.png" />
      </div>
      <span class="not-login-text">登录、注册</span>
    </div>
    <!-- 收藏和历史 -->
    <van-grid :column-num="2" class="nav-grid mb-15">
      <van-grid-item
        icon-prefix="toutiao icon"
        icon="shoucang"
        text="收藏"
        class="nav-grid-item"
      ></van-grid-item>
      <van-grid-item
        icon-prefix="toutiao icon"
        icon="lishi"
        text="历史"
        class="nav-grid-item"
      ></van-grid-item>
    </van-grid>
    <van-cell value="消息通知" is-link url="/" />
    <van-cell class="mb-15" value="小智同学" is-link to="/" />
    <van-cell class="logout" v-if="user" title="退出登录" @click="onLogout" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { reqGetCurrentUser } from "@/api/user";
export default {
  data() {
    return {
      currentUser: {},
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.getCurrentUser();
     console.log('mounted');
  },
  created(){
    console.log('created');
  },
  methods: {
    onLogout() {
      this.$dialog
        .confirm({
          title: "确认退出账户吗",
          message: "退出后将清除当前所有用户数据",
        })
        .then(() => {
          //清除用户数据
          this.$store.commit("setUser", null);
        })
        .catch(() => {
          // on cancel
          return;
        });
    },
    async getCurrentUser() {
      let result = await reqGetCurrentUser();
      this.currentUser = result.data.data;
    },
  },
};
</script>

<style lang="less" scoped>
//最外层
.my-container {
  .my-info {
    background: url("./images/banner.png") no-repeat;
    background-size: cover;

    .base-info {
      height: 115px;
      box-sizing: border-box;
      padding-top: 38px;
      padding-bottom: 11px;
      background-color: unset;

      .avatar {
        width: 66px;
        height: 66px;
        border: 1px solid white;
        box-sizing: border-box;
        margin-right: 11px;
      }

      .name {
        color: #fff;
        font-size: 15px;
        text-align: left;
      }

      .right-btn {
        height: 16px;
        font-size: 10px;
        color: #666666;
      }
    }

    .data-info {
      .data-info-item {
        height: 65px;
        color: #fff;
        text-align: center;

        .count {
          font-size: 18px;
        }

        .text {
          font-size: 11px;
        }
      }
    }

    /deep/ .van-grid-item__content {
      background-color: unset;
    }
  }

  .not-login {
    background: url("./images/banner.png") no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 180px;

    .mobile-icon {
      width: 66px;
      height: 66px;
    }

    .not-login-text {
      margin-top: 10px;
      color: white;
      font-size: 14px;
    }
  }

  /deep/ .nav-grid {
    .nav-grid-item {
      height: 70px;

      .icon {
        font-size: 23px;
      }

      .icon-good {
        color: #eb5556;
      }

      .icon-browse {
        color: #ff9d1d;
      }

      .van-grid-item__text {
        font-size: 14px;
        color: #333;
      }
    }
  }

  .mb-15 {
    margin-bottom: 4px;
  }

  .logout {
    text-align: center;
    color: #d86262;
  }
}
</style>