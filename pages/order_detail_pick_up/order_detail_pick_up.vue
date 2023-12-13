<template>
	<view style="height: 100vh;display: flex;flex-direction: column;">
		<u-navbar title="预约详情" :auto-back="true" titleStyle="font-size:36rpx" placeholder safeAreaInsetTop></u-navbar>
		<view class="main" style="flex:1;background-color: #F6F7F8;">
			<view style="height: 32rpx;" />
			<text style="color: #449656;font-size: 36rpx;font-weight: bold;">{{orderStatus[orderInfo?.status]}}</text>
			<view class="card"
				style="background: linear-gradient(180deg, #ECFBEC 0%, #FFFFFF 26%, #FFFFFF 100%);margin-top: 16rpx;">
				<view class="card_line" style="height: 82rpx;">
					<text class="card_line_title" style="font-size: 32rpx;font-weight: bold;">订单信息</text>
					<view>
						<text
							style="font-size: 20rpx;color: #449656;font-weight: bold;margin-right: 8rpx;text-decoration: underline;">联系客服</text>
						<text style="font-size: 20rpx;color: #979797;;text-decoration: underline;">取消预约</text>
					</view>
				</view>
				<view class="size_box" />
				<view class="card_line">
					<text class="card_line_title">预约地点</text>
					<view style="display: flex;align-items: center;">
						<text>{{orderInfo?.geographicLocationVo?.name}}</text>
						<image src="../../static/images/order/location.png" mode="widthFix" style="width: 24rpx;margin-left: 8rpx;">
						</image>
					</view>
				</view>
				<view class="size_box" />
				<view class="card_line">
					<text class="card_line_title">手机号码</text>
					<text>{{orderInfo?.orderExtraVo?.reservationPhone}}</text>
				</view>
				<view class="size_box" />
				<view class="card_line">
					<text class="card_line_title">预约姓名</text>
					<text>{{orderInfo?.orderExtraVo?.reservationName}}</text>
				</view>
				<view class="size_box" />
				<view class="card_line">
					<text class="card_line_title">预约时间</text>
					<text>{{dayjs(orderInfo?.reservationTime).format('MM月DD日 HH:mm')}}</text>
				</view>
				<view class="card_line">
					<text class="card_line_title">预约服务</text>
					<text>{{orderTypes[orderInfo?.orderType].small_type}}</text>
				</view>
			</view>
			<view  style="height: 144rpx ;display: flex; align-items: center;background-color: white;border-radius: 16rpx;padding: 0 32rpx;margin: 19rpx 0;justify-content: space-between;">
				<view style="display: flex; height: 96rpx">
					<image style="width: 96rpx; border-radius: 50%; height: 96rpx" :src="orderInfo?.servicerVo?.userAvatar"></image>
					<view style="display: flex; flex-direction: column; margin-left: 16rpx">
						<text style="font-size: 32rpx">{{orderInfo?.servicerVo?.userName}}</text>
						<text style="font-size: 28rpx; color: rgba(0, 0, 0, 0.4); margin-top: 8rpx">驾驶年龄 - {{orderInfo?.servicerVo?.drivingAge}}年</text>
					</view>
				</view>
				<view class="card_line_content" style="display: flex;align-items: center;" @click="callServicer">
					<image src="../../static/images/order/phone-call.png" style="width: 36rpx;height: 36rpx;" mode="widthFix"></image>
					<text style="font-size: 24rpx;color: #449656;margin-left: 8rpx;">呼叫泊车员</text>
				</view>
			</view>
			<view class="card" style="margin-top: 8rpx;">
				<view class="card_line" v-for="item in orderInfo?.paymentRecordVos">
					<text class="card_line_title">{{item.serviceName}}</text>
					<text>+¥{{item.service_price}}</text>
				</view>
				<view class="card_line">
					<text class="card_line_title">实付款</text>
					<text style="font-size: 32rpx;font-weight: bold;color: #EA0000;">¥{{orderInfo?.orderPayMoney}}</text>
				</view>
			</view>
			<view class="card" style="margin-top: 8rpx;">
				<view class="card_line">
					<text class="card_line_title">订单编号</text>
					<text>{{orderInfo?.orderNo}}</text>
				</view>
				<view class="card_line">
					<text class="card_line_title">订单时间</text>
					<text>{{dayjs(orderInfo?.createdTime).format('YYYY-MM-DD HH:mm:sss')}}</text>
				</view>
			</view>
			<InsuranceTips />
		</view>
	</view>
</template>

<script setup>
	import InsuranceTips from '../../components/insurance_tips/insurance_tips.vue'
	import {
		onLoad
	} from '@dcloudio/uni-app'
	import {
		getOrderPaymentRecord
	} from '../../api/index.js'
	import dayjs from 'dayjs'
	import {
		ref
	} from 'vue'
	import {orderTypes,orderStatus} from '../../static/js/types.js'
	const orderInfo = ref();
	onLoad((options) => {
		console.log(options);
		getOrderPaymentRecord(options.order_no).then(res => {
			console.log(res.data);
			orderInfo.value = res.data;
		})
	})
	const callServicer =()=>{
		wx.makePhoneCall({
		  phoneNumber: orderInfo.value.servicerVo.servicerPhone
		})
	}
</script>

<style lang="scss">
	.main {
		padding: 0 32rpx;

		.card {
			border-radius: 16rpx;
			background-color: white;
			padding: 0 32rpx;

			.card_line {
				display: flex;
				height: 96rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}

			.size_box {
				height: 1rpx;
				background-color: #e7e7e7;
			}
		}
	}
</style>