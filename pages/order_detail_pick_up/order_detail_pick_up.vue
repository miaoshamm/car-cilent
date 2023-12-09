<template>
	<view style="height: 100vh;display: flex;flex-direction: column;">
		<u-navbar title="预约详情" :auto-back="true" titleStyle="font-size:36rpx" placeholder safeAreaInsetTop></u-navbar>
		<view class="main" style="flex:1;background-color: #F6F7F8;">
			<view style="height: 32rpx;" />
			<text style="color: #449656;font-size: 36rpx;font-weight: bold;">预约成功，等待交接</text>
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
						<text>湖南省临湘市白马山庄142号</text>
						<image src="../../static/images/order/location.png" mode="widthFix" style="width: 24rpx;margin-left: 8rpx;">
						</image>
					</view>
				</view>
				<view class="size_box" />
				<view class="card_line">
					<text class="card_line_title">手机号码</text>
					<text>15170616041</text>
				</view>
				<view class="size_box" />
				<view class="card_line">
					<text class="card_line_title">预约姓名</text>
					<text>张三</text>
				</view>
				<view class="size_box" />
				<view class="card_line">
					<text class="card_line_title">预约时间</text>
					<text>{{dayjs(orderInfo?.reservationTime).format('MM月DD日 HH:mm')}}</text>
				</view>
				<view class="card_line">
					<text class="card_line_title">预约服务</text>
					<text>{{typeObj[orderInfo?.orderType]}}</text>
				</view>
			</view>
			<ChooseEmployee></ChooseEmployee>
			<view class="card" style="margin-top: 8rpx;">
				<view class="card_line">
					<text class="card_line_title">接送费用</text>
					<text>+¥80</text>
				</view>
				<view class="card_line">
					<text class="card_line_title">实付款</text>
					<text style="font-size: 32rpx;font-weight: bold;color: #EA0000;">¥80</text>
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
	import ChooseEmployee from '../../components/choose_employee/choose_employee.vue'
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
	const orderInfo = ref();
	const typeObj = {
		TRANSFER: '接送',
		TRANSFER_PICK_UP: '只接',
		TRANSFER_DROP_OFF: '只送',
	}





	onLoad((options) => {
		console.log(options);
		getOrderPaymentRecord(options.order_no).then(res => {
			console.log('res', res);
			orderInfo.value = res.data;
		})
	})
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