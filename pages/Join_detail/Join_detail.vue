<template>
	<view class="page">
		<u-navbar title="交接车详情" :autoBack="true" titleStyle="font-size:36rpx" placeholder safeAreaInsetTop></u-navbar>
		<view class="main">
			<view class="box">
				<view class="box_line border_bottom">
					泊车位置
				</view>
				<view class="box_line">
					<text>13213213132131312323321</text>
					<image src="../../static/images/order/location.png" mode="widthFix" style="width: 32rpx;"></image>
				</view>
			</view>
			<view class="box">
				<view class="box_line border_bottom">
					泊车视频
				</view>
				<view class="box_line" style="height: 336rpx;padding: 20rpx;box-sizing: border-box;">
					<video src="" style="width: 100%;height: 100%;"></video>
				</view>
			</view>
			<view class="box">
				<view class="box_line border_bottom">
					泊车图片
				</view>
				<view class="grid" style="padding: 20rpx 0;">
					<image class="img" src="../../static/images/wish/car.png" mode=""></image>
					<image class="img" src="../../static/images/wish/car.png" mode=""></image>
					<image class="img" src="../../static/images/wish/car.png" mode=""></image>
					<image class="img" src="../../static/images/wish/car.png" mode=""></image>
				</view>
			</view>
			<view class="box">
				<view class="box_line border_bottom">
					接车视频
				</view>
				<view class="box_line" style="height: 336rpx;padding: 20rpx;box-sizing: border-box;">
					<video src="" style="width: 100%;height: 100%;"></video>
				</view>
			</view>
			<view class="box">
				<view class="box_line border_bottom">
					接车图片
				</view>
				<view class="grid" style="padding: 20rpx 0;">
					<image class="img" src="../../static/images/wish/car.png" mode=""></image>
					<image class="img" src="../../static/images/wish/car.png" mode=""></image>
					<image class="img" src="../../static/images/wish/car.png" mode=""></image>
					<image class="img" src="../../static/images/wish/car.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue'
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		getHandOverCarInfo
	} from '../../api/index.js'
	const joinDetail = ref();
	const {
		orderNo
	} = defineProps(['orderNo'])
	onShow(async () => {
		const detail = await getHandOverCarInfo(orderNo)
		joinDetail.value = detail.data
	})
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.main {
			flex: 1;
			background-color: #F6F7F8;

			.box {
				padding: 0 32rpx;

				.box_line {
					min-height: 96rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 32rpx;
				}
			}
		}
	}

	.img {
		width: 100%;
		height: 180rpx;
	}

	.border_bottom {
		border-bottom: 1rpx solid #E7E7E7;
	}

	.grid {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		grid-row-gap: 30rpx;
		grid-column-gap: 30rpx;
	}
</style>