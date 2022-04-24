<template>
  <div class="ChannalEdit">
    <van-cell>
      <div slot="title" class="title">我的频道</div>
      <van-button
        plain
        round
        size="mini"
        type="danger"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        class="grid-item"
        :class="{ current: current == index }"
        v-for="(channel, index) in channels"
        :key="index"
        :text="channel.name"
        :icon="isEdit && index != 0 ? 'clear' : ''"
        @click="userChannelHandler(channel, index)"
      />
    </van-grid>
    <van-cell>
      <div slot="title" class="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(channel, index) in recommandChannels"
        :key="index"
        :text="channel.name"
        class="grid-item"
        @click="addChannel(channel)"
      />
    </van-grid>
  </div>
</template>

<script>
import {
  reqGetAllChannels,
  reqHandleChannels,
  reqDeleteChannel,
} from "@/api/channel";
import { mapState } from "vuex";
import { setItem } from "@/utils/storage";
export default {
  name: "ChannalEdit",
  props: {
    channels: {
      type: Array,
      required: true,
    },
    current: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      allChannels: [],
      isEdit: false,
    };
  },
  mounted() {
    this.getAllChannels();
  },
  computed: {
    ...mapState(["user"]),
    recommandChannels() {
      return this.allChannels.filter((channel) => {
        return !this.channels.find((userChannel) => {
          return userChannel.id == channel.id;
        });
      });
    },
  },
  methods: {
    async getAllChannels() {
      let result = await reqGetAllChannels();
      this.allChannels = result.data.data.channels;
    },
    //添加至我的频道
    async addChannel(channel) {
      this.channels.push(channel);
      //登陆了，数据存储到线上
      if (this.user) {
        let result = await reqHandleChannels({
          channels: [{ id: channel.id, seq: this.channels.length }],
        });
      }
      //未登录，数据存储到本地
      else {
        setItem("userChannels", this.channels);
      }
    },
    //删除或切换频道
    userChannelHandler(channel, index) {
      //删除频道
      if (this.isEdit && index != 0) {
        this.deleteChannel(channel, index);
      } else {
        //切换频道
        this.switchChannel(index);
      }
    },
    //删除频道的回调
    async deleteChannel(channel, index) {
      if (index <= this.current) {
        this.$emit("update", this.current - 1);
      }
      this.channels.splice(index, 1);
      //持久化存储
      if (this.user) {
        await reqDeleteChannel(channel.id);
      } else {
        setItem("userChannels", this.channels);
      }
    },
    //添加频道的回调
    switchChannel(index) {
      this.$emit("update", index);
      this.$emit("close");
    },
  },
};
</script>

<style scoped lang="less">
.ChannalEdit {
  padding-top: 54px;
  .edit-btn {
    width: 60px;
  }

  .title {
    font-size: 16px;
    color: #333333;
    text-align: left;
  }
  .van-grid {
    background: #fff;
  }
  .grid-item {
    width: 80px;
    height: 43px;
    text-align: center;

    /deep/ .van-grid-item__content {
      background-color: #f4f5f6;

      .van-grid-item__text {
        font-size: 14px;
        color: #222;
      }
    }

    /deep/ .van-grid-item__content {
      position: relative;

      .van-icon {
        z-index: 2;
        right: -6px;
        top: -6px;
        font-size: 18px;
        color: rgb(92, 92, 92);
        position: absolute;
      }
    }
  }
  .current {
    /deep/ .van-grid-item__text {
      color: red !important;
    }
  }
}
</style>