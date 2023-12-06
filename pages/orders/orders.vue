<template>
  <view style="min-height: 100vh; background: #f6f7f8; padding: 0 16rpx; padding-top: 32rpx;display: flex;flex-direction: column;">
		<u-navbar  title="我的订单" :left-icon="false" titleStyle="font-size:36rpx"  placeholder safeAreaInsetTop></u-navbar>
		<view style="flex: 1;">
			<OrderCard />
			<OrderCard />
			<OrderCard />
			<OrderCard />
		</view>
    <Tabbar :value="1" />
  </view>
</template>

<script setup>
import { ref } from "vue";
import OrderCard from "../../components/order_card/order_card.vue";
import Tabbar from "@/components/tabbar/tabbar.vue";
</script>

<style lang="scss" scoped></style>
