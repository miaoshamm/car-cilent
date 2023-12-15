<template>
	<view class="card" @click="goDetail">
		<view class="top">
			<view style="display: flex;align-items: center;">
				<image v-if="order_info?.geographicLocationVo?.addressType === 'DEFAULT' " :src="orderTypes[order_info?.orderType].icon" mode="widthFix" style="width: 64rpx;"></image>
				<image v-else src="../../static/images/index/grid2.png" mode="widthFix" style="width: 64rpx;"></image>
				<text style="font-size: 32rpx;color: rgba(0, 0, 0, 0.9);margin-left: 16rpx;">{{orderTypes[order_info?.orderType].big_type}}{{order_info?.geographicLocationVo?.addressType === 'DEFAULT' ? '（中山六院）':'（临江大道）'}}</text>
			</view>
			<text :style="{'font-size':'32rpx','color': type === 'royalty' ? '#3D3D3D' : '#43974C'}">
				{{
					orderStatus[order_info?.status]
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
					{{orderTypes[order_info?.orderType].small_type}}
				</view>
			</view>
			<view style="margin-top: 16rpx;">
				<view class="info_title">
					服务时间:
				</view>
				<view class="info_content">
					{{dayjs(order_info?.reservationTime).format('YYYY-MM-DD HH:mm:ss')}}
				</view>
			</view>
			<view style="margin-top: 16rpx;display: flex;">
				<view style="flex: 1;">
					<view class="info_title">
						客户姓名:
					</view>
					<view class="info_content">
						{{order_info?.orderExtraVo?.reservationName}}
					</view>
				</view>
				<view style="flex: 1;">
					<view class="info_title">
						客户电话:
					</view>
					<view class="info_content">
						{{order_info?.orderExtraVo?.reservationPhone}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {defineProps} from "vue"
	import dayjs from 'dayjs'
	import { orderTypes,orderStatus} from '../../static/js/types.js'
	const {type,order_info} = defineProps(["type",'order_info'])
	
	const goDetail=()=>{
		// 判断类型
		uni.navigateTo({
			url:'/pages/servicer_orders/maintenance/maintenance'
		})
		return
		uni.navigateTo({
			url:`/pages/order_detail_parking/order_detail_parking?order_no=${order_info?.orderExtraVo?.orderNo}&isServicer=true`
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