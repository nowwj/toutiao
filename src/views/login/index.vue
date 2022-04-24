<template>
  <div class="login-container">
    <van-nav-bar
      title="注册/登录"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 登录表单 -->
    <van-form
      @submit="onLogin"
      :show-error="false"
      :show-error-message="false"
      ref="login-form"
      @failed="onFailed"
      validate-first
    >
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao icon"
        left-icon="shouji"
        right-icon="warning-o"
        name="mobile"
        placeholder="请输入手机号"
        :rules="formRules.mobile"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao icon"
        left-icon="yanzhengma"
        name="code"
        placeholder="请输入验证码"
        :rules="formRules.code"
      >
        <template #button>
          <van-count-down
            :time="1000 * 60"
            format="ss s"
            v-if="isCountDown"
            @finish="isCountDown = false"
          />
          <van-button
            size="small"
            round
            class="send-btn"
            @click.prevent="onSendSms"
            v-else
            :loading="isLoading"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <!-- 登录按钮 -->
      <div class="login-btn-wrap">
        <van-button type="info" block class="login-btn">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { reqLogin, reqSendSms } from "@/api/user.js";
import { Toast } from "vant";
export default {
  name: "LoginIndex",
  data() {
    return {
      user: {
        mobile: "",
        code: "",
      },
      formRules: {
        mobile: [
          { required: true, message: "请输入手机号", trigger: "onBlur" },
          {
            pattern:
              /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "请输入正确的手机号",
            trigger: "onBlur",
          },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "onBlur" },
          {
            pattern: /\d{6}$/,
            message: "验证码格式不正确",
            trigger: "onBlur",
          },
        ],
      },
      isCountDown: false,
      isLoading: false,
    };
  },
  methods: {
    async onLogin() {
      Toast.loading({
        message: "登录中...",
        forbidClick: true,
        duration: 0,
      });
      try {
        let result = await reqLogin(this.user);
        this.$store.commit('setUser',result.data.data)
        Toast.success("登录成功")
        this.$store.commit('removeCachepages','LoginIndex')
        //this.$router.back()
        // 跳转回原来的页面
        this.$router.push(this.$route.query.redirect || "/");
      } catch (error) {
        Toast.fail("登录失败");
        console.dir(error)
      }
    },
    onFailed(error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: "top",
        });
      }
    },
    async onSendSms() {
      //校验手机号码
      try {
        await this.$refs["login-form"].validate("mobile");
        // 让button显示loading
        this.isloading = true;
        //请求发送验证码，
        let result = await reqSendSms(this.user.mobile);
        //倒计时，隐藏发送按钮
        this.isCountDown = true;
      } catch (error) {
        let message = "";
        if (error && error.response && error.response.status == 429) {
          //发送短信失败的错误提示
          message = "发送太频繁了，请稍后重试";
        } else if (error.name == "mobile") {
          //表单验证失败的提示
          message = error.message;
        } else {
          //未知错误
          message = "发送失败，请重试";
        }
        this.$toast({
          message,
          position: "top",
        });
      }
      // 让button关闭loading
      this.isloading = false;
      //倒计时结束
    },
  },
};
</script>

<style lang="less" scoped>
.login-btn-wrap {
  padding: 26px 16px;
  .login-btn {
    background-color: #6db4fb;
    border: none;
    .van-button_text {
      font-size: 15px;
    }
  }
}
.send-btn {
  height: 23px;
  background-color: #ededed;
  font-size: 11px;
  color: #666666;
}
</style>