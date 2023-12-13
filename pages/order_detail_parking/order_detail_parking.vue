<template>
	<view style="height: 100vh; background: #f6f7f8; display: flex; flex-direction: column" class="">
		<u-navbar title="订单详情" @leftClick="leftClick" titleStyle="font-size:36rpx" placeholder safeAreaInsetTop></u-navbar>
		<view v-if="!isInvoice" :style="{flex: 1, padding: '32rpx',position: 'relative',overflow:'auto'}">
			<text style="color: #449656; font-size: 36rpx; font-weight: bold;">泊车服务已结束</text>
			<view style="margin-top: 19rpx">
				<LicensePlateSelection :licensePlate="orderInfo?.orderExtraVo?.carNo" />
			</view>
			<view style="margin-top: 7rpx" class="card">
				<view class="card_line">
					<view class="card_line_title">手机号码</view>
					<view class="card_line_content">{{orderInfo?.orderExtraVo?.reservationPhone}}</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">预约姓名</view>
					<view class="card_line_content">{{orderInfo?.orderExtraVo?.reservationName}}</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">预约时间</view>
					<view class="card_line_content">{{dayjs(orderInfo?.reservationTime).format('MM月DD日 HH:mm')}}</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">预约服务</view>
					<view class="card_line_content">{{orderTypes[orderInfo?.orderType]?.small_type}}</view>
				</view>
			</view>
			<view style="margin-top: 7rpx" class="card">
				<view class="card_line">
					<view class="card_line_title">车辆颜色</view>
					<view class="card_line_content">{{orderInfo?.orderExtraVo?.carColor}}</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">车辆型号</view>
					<view class="card_line_content">{{orderInfo?.orderExtraVo?.carTypeName}}</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line" style="height: 144rpx">
					<view style="display: flex; height: 96rpx">
						<image style="width: 96rpx; border-radius: 50%; height: 96rpx" src="https://cdn.uviewui.com/uview/album/1.jpg"></image>
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
			</view>
			<view style="margin-top: 7rpx" class="card">
				<view class="card_line" v-for='item in orderInfo?.paymentRecordVos'>
					<view class="card_line_title">{{item.serviceName}}</view>
					<view class="card_line_content">+{{item.service_price}}</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">实付款</view>
					<view class="card_line_content" style="color: #ea0000; font-weight: bold">¥{{orderInfo?.orderPayMoney}}</view>
				</view>
			</view>
			<view style="margin-top: 7rpx" class="card">
				<view class="card_line">
					<view class="card_line_title">订单编号</view>
					<view class="card_line_content" style="margin-left: 32rpx">{{orderInfo?.orderNo}}</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line" >
					<view class="card_line_title">订单时间</view>
					<view class="card_line_content" style="margin-left: 32rpx">{{dayjs(orderInfo?.createdTime).format('YYYY-MM-DD HH:mm:ss')}}</view>
				</view>
			</view>
			<view class="service_item_card" style="margin-top: 19rpx" @click="goWish">
				<view class="service_img">
					<image src="../../static/images/index/maintenance.png" mode="aspectFill"></image>
				</view>
				<view class="content">
					<text class="title">车辆精洗服务</text>
					<text class="description">为您的爱车提供最佳的外观和内部清洁效果789798454656578978978978797789798797</text>
				</view>
			</view>
			<view class="service_item_card" style="margin-top: 19rpx" @click="goWish">
				<view class="service_img">
					<image src="../../static/images/index/maintenance.png" mode="aspectFill"></image>
				</view>
				<view class="content">
					<text class="title">车辆大保养服务</text>
					<text class="description">为您的爱车提供最佳的外观和内部清洁效果789798454656578978978978797789798797</text>
				</view>
			</view>
			<view class="menu">
				<UserMenu title="开发票" description="立即开票" :onClick="openInvoice" />
			</view>
			<view class="menu">
				<UserMenu title="评价服务" description="立即评价" :onClick="open" />
			</view>
			<InsuranceTips></InsuranceTips>
		</view>
		<view v-else><OpenInvoice :isShowInvoice='isInvoice' :order_no='order_no' /></view>
	</view>
	
	<view>
		<u-popup :show="show" @close="close" @open="open" :round="16">
			<view style="background: linear-gradient(180deg, #ecfbec 0%, #ffffff 26%, #ffffff 100%); border-radius: 16rpx 1rpx 0 0">
				<h1 style="height: 96rpx; line-height: 96rpx; padding: 0 32rpx; border-bottom: 1rpx solid #e7e7e7">评价服务</h1>
				<view style="height: 384rpx; padding: 16rpx">
					<u--textarea placeholder="预设文本" count :maxlength="500" height="352rpx" border="none"></u--textarea>
				</view>
				<view style="border-top: 1rpx solid #e7e7e7; height: 112rpx; display: flex; align-items: center">
					<view style="flex: 1; text-align: center" @click="close">取消</view>
					<view style="width: 1rpx; height: 56rpx; background-color: #e7e7e7"></view>
					<view style="flex: 1; text-align: center">发送</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import LicensePlateSelection from '../../components/license_plate_selection/license_plate_selection.vue';
import UserMenu from '../../components/user_menu/user_menu.vue';
import dayjs from 'dayjs'
import InsuranceTips from '../../components/insurance_tips/insurance_tips.vue';
import OpenInvoice from '@/components/open_invoice/open_invoice.vue'
import { getOrderPaymentRecord } from '../../api/index.js';
import { onLoad } from '@dcloudio/uni-app';
import {orderTypes} from '../../static/js/types.js'
const {order_no} = defineProps(['order_no']);
const show = ref(false);
const isInvoice = ref(false);
const orderInfo = ref({});
const close = () => {
	show.value = false;
};
const open = () => {
	show.value = true;
};

const openInvoice = () => {
	isInvoice.value = true;
};
const leftClick = () => {
	if (isInvoice.value) {
		isInvoice.value = false;
	} else {
		uni.navigateBack();
	}
};
onLoad(async () => {
	const info = await getOrderPaymentRecord(order_no);
	console.log(info);
	orderInfo.value = info.data;
});
const callServicer =()=>{
	wx.makePhoneCall({
	  phoneNumber: orderInfo.value.servicerVo.servicerPhone
	})
}
const goWish= ()=>{
	uni.navigateTo({
		url:`/pages/wish/wish?order_no=${order_no}` 
	})
}
</script>

<style lang="scss">
.card {
	border-radius: 16rpx;
	display: flex;
	flex-direction: column;
	background-color: white;
	padding: 0 32rpx;

	.card_line {
		height: 96rpx;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.size_box {
		height: 1rpx;
		background-color: #e7e7e7;
	}
}

.service_item_card {
	height: 192rpx;
	border-radius: 16rpx;
	display: flex;
	padding: 0 32rpx;
	background-color: white;
	align-items: center;

	.service_img {
		width: 208rpx;
		height: 140rpx;
		flex-shrink: 0;
		border-radius: 24rpx;
		overflow: hidden;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.content {
		flex: 1;
		display: flex;
		flex-direction: column;
		height: 140rpx;
		justify-content: space-around;
		margin-left: 24rpx;
		overflow: hidden;

		.title {
			font-size: 36rpx;
		}

		.description {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			-webkit-box-orient: vertical;
			text-overflow: ellipsis;
			font-size: 26rpx;
			color: rgba(0, 0, 0, 0.5);
		}
	}
}

.menu {
	margin-top: 19rpx;
	background-color: white;
	border-radius: 16rpx;
}



button::after {
	border: none;
}
</style>
