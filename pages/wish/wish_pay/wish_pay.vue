<template>
  <view class="wrapper wrapper-p">
    <view class="title">请稍等，正在确定维保地点</view>
    <License :licensePlate="licensePlate" />
    <view class="box">
      <view class="box-info">
        <text>维保地点</text>
        <text>湖南省临湘市白马山庄142号</text>
      </view>
      <view class="box-info" style="flex-direction: column">
        <text class="box-img-title">门头图片</text>
        <view class="box-img">
          <image src="/static/images/wish/car.png" mode=""></image>
          <image src="/static/images/wish/car.png" mode=""></image>
          <image src="/static/images/wish/car.png" mode=""></image>
          <image src="/static/images/wish/car.png" mode=""></image>
        </view>
      </view>
    </view>
    <view class="box">
      <view class="box-info">
        <text>手机号码</text>
        <text>17666666666</text>
      </view>
      <view class="box-info">
        <text>预约姓名</text>
        <text>黄小二</text>
      </view>
      <view class="box-info">
        <text>维保时间</text>
        <text>11 月 21 日 19:00</text>
      </view>
    </view>
    <view class="box">
      <view class="box-info">
        <text>车辆颜色</text>
        <text>红色</text>
      </view>
      <view class="box-info">
        <text>车辆型号</text>
        <text>比亚迪</text>
      </view>
      <view class="box-info" style="flex-direction: column">
        <text>预约维保服务</text>
        <view class="box-service">
          <view class="service-info">
            <image src="@/static/images/wish/service.png"></image>
            <text class="service-name">精洗</text>
          </view>
          <view class="service-info">
            <image src="@/static/images/wish/service.png"></image>
            <text class="service-name">精洗</text>
          </view>
        </view>
      </view>
    </view>
    <view class="box">
      <view class="box-info">
        <text>精洗服务费</text>
        <text>+¥45</text>
      </view>
      <view class="box-info">
        <text>抛光服务费</text>
        <text>+¥35</text>
      </view>
      <view class="box-info">
        <text>实付款</text>
        <text style="color: #ea0000; font-size: 32rpx; font-weight: 700">¥80</text>
      </view>
    </view>
    <view class="box">
      <view class="box-info">
        <text>订单编号</text>
        <text>101231798123123</text>
      </view>
      <view class="box-info">
        <text>订单时间</text>
        <text>2023-11-22 12:22:00</text>
      </view>
    </view>
    <view class="box">
      <view class="box-info">
        <text>开发票</text>
        <view class="check">
          <text>立即开票</text>
          <u-icon name="arrow-right" color="rgba(0, 0, 0, .4)"></u-icon>
        </view>
      </view>
    </view>
    <view class="box">
      <view class="box-info">
        <text>评价服务</text>
        <view class="check">
          <text>立即评价</text>
          <u-icon name="arrow-right" color="rgba(0, 0, 0, .4)"></u-icon>
        </view>
      </view>
    </view>
    <Insurance />
  </view>
  <view class="check-btn">
    <u-button plain text="查看维保地点" color="#DFA0B1"></u-button>
  </view>
  <!-- <view class="check-btn">
		<u-button text="返回首页" color="#DFA0B1"></u-button>
	</view> -->
</template>

<script setup>
import { ref } from "vue";

import Insurance from "@/components/insurance_tips/insurance_tips.vue";
import License from "@/components/license_plate_selection/license_plate_selection.vue";
let licensePlate = ref("皖GHHHHHN");
</script>

<style lang="less" scoped>
.box {
  padding: 0 32rpx;
  background: #fff;
  border-radius: 16rpx;
  margin: 8rpx 0 0;

  .box-info {
    display: flex;
    justify-content: space-between;
    font-size: 28rpx;
    padding: 28rpx 0;

    .check {
      display: flex;
      color: rgba(0, 0, 0, 0.4);
      font-size: 28rpx;
    }

    .box-service {
      display: flex;
      margin: 24rpx 0 0;
      .service-info {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 0 32rpx 0 0;
        image {
          width: 96rpx;
          height: 96rpx;
        }
        .service-name {
          margin: 8rpx 0 0;
        }
      }
    }

    &:not(:last-child) {
      border-bottom: 1px solid #e7e7e7;
    }

    .box-img-title {
      margin: 0 0 24rpx;
    }

    .box-img {
      display: flex;
      justify-content: space-between;

      image {
        width: 128rpx;
        height: 128rpx;
        overflow: hidden;
        border-radius: 8rpx;
      }
    }
  }
}
</style>
