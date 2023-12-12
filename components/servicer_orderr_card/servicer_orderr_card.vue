<template>
	<view class="card" @click="goDetail">
		<view class="top">
			<view style="display: flex;align-items: center;">
				<image src="../../static/images/index/grid1.png" mode="widthFix" style="width: 64rpx;"></image>
				<text style="font-size: 32rpx;color: rgba(0, 0, 0, 0.9);margin-left: 16rpx;">代客泊车</text>
			</view>
			<text :style="{'font-size':'32rpx','color': props.type === 'royalty' ? '#3D3D3D' : '#43974C'}">
				{{
					props.type === 'royalty' ? 
					"服务完成" : 
					"等待付款"
				}}
			</text>
		</view>
		<view style="height: 1rpx;background-color: #e7e7e7;" />
		<view class="info">
			<view>
				<view class="info_title">
					服务方式:
				</view>
				<view class="info_content">
					简洗
				</view>
			</view>
			<view style="margin-top: 16rpx;">
				<view class="info_title">
					服务时间:
				</view>
				<view class="info_content">
					2034 / 10 / 17 16:41
				</view>
			</view>
			<view style="margin-top: 16rpx;display: flex;">
				<view style="flex: 1;">
					<view class="info_title">
						客户姓名:
					</view>
					<view class="info_content">
						张三
					</view>
				</view>
				<view style="flex: 1;">
					<view class="info_title">
						客户电话:
					</view>
					<view class="info_content">
						15170616041
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {defineProps} from "vue"
	const props = defineProps(["type"])
	
	const goDetail=()=>{
		uni.navigateTo({
			url:'/pages/order_detail_parking/order_detail_parking'
		})
	}
</script>

<style lang="scss" scoped>
	.card {
		padding: 0 32rpx;
		background-color: white;
		border-radius: 16rpx;
		margin-bottom: 16rpx;
		.top {
			height: 96rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.info {
			padding: 32rpx 0;

			.info_title {
				font-size: 28rpx;
				color: rgba(0, 0, 0, 0.6);
			}

			.info_content {
				font-size: 32rpx;
				margin-top: 8rpx;
				color: rgba(0, 0, 0, 0.9);
			}
		}
	}
</style>