<template>
	<view
		style="min-height: 100vh; background: #f6f7f8; padding: 0 16rpx; padding-top: 32rpx; display: flex; flex-direction: column">
		<u-navbar title="我的订单" :left-icon="false" titleStyle="font-size:36rpx" placeholder safeAreaInsetTop></u-navbar>
		<view style="flex: 1">
			<OrderCard v-for="info in orderList?.reverse()" :orderInfo="info" />
			<view style="color: #449656; text-align: center" v-if="orderList.length === 0">暂无订单信息</view>
		</view>
		<Tabbar :value="1" />
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onShow
	} from '@dcloudio/uni-app';
	import OrderCard from '../../components/order_card/order_card.vue';
	import Tabbar from '@/components/tabbar/tabbar.vue';
	import {
		getOrderList
	} from '../../api/index.js';
	const orderList = ref([]);

	onShow(async () => {
		const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
		const orders = await getOrderList(userInfo.userNo);
		orderList.value = orders.data;
	});
</script>

<style lang="scss" scoped></style>