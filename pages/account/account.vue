<template>
  <view style="min-height: 100vh; background: #f6f7f8">
    <view class="nav">
      <text class="nav-title">城市服务代客泊车小程序</text>
    </view>
    <view class="main">
      <view class="user">
        <view class="avatar">
          <up-image width="96rpx" height="96rpx" src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle"></up-image>
        </view>
        <view class="user_info">
          <text class="name">微信昵称</text>
          <text class="phone">151****7894 </text>
        </view>
      </view>
      <view class="size_box"></view>
      <UserMenu pageUrl="/pages/evaluate_list/evaluate_list">我的评价</UserMenu>
      <UserMenu pageUrl="/pages/invoice_list/invoice_list">查看发票</UserMenu>
      <UserMenu pageUrl="/pages/privacy_policy/privacy_policy">隐私政策</UserMenu>
      <UserMenu pageUrl="/pages/terms_of_service/terms_of_service">服务条款</UserMenu>
      <UserMenu>在线客服</UserMenu>
      <UserMenu>切换角色</UserMenu>
    </view>
    <Tabbar :value="2" />
  </view>
</template>

<script setup>
import { ref } from "vue";
import UserMenu from "../../components/user_menu/user_menu.vue";
import Tabbar from "@/components/tabbar/tabbar.vue";
</script>

<style lang="less" scoped>
.nav {
  height: 208rpx;
  background: #dfa0b1;
  display: flex;
  align-items: center;

  .nav-title {
    font-size: 32rpx;
    font-weight: 500;
    color: #fff;
    margin: 48rpx 0 0 60rpx;
  }
}
.main {
  border-top-left-radius: 32rpx;
  border-top-right-radius: 32rpx;
  position: relative;
  top: -30rpx;
  overflow: hidden;

  background: #f6f7f8;
  .user {
    margin: 48rpx 0;
    height: 96rpx;
    display: flex;
    align-items: center;
    padding: 0 32rpx;
    .avatar {
      margin-right: 16rpx;
    }
    .user_info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .name {
        font-size: 32rpx;
      }
      .phone {
        font-size: 28rpx;
        color: rgba(0, 0, 0, 0.4);
      }
    }
  }
  .size_box {
    height: 8rpx;
    background: #e7e7e7;
  }
}
</style>
