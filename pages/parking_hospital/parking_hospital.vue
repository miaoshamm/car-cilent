<template>
	<view style="min-height: 100vh; background: #f6f7f8; display: flex; flex-direction: column;">
		<u-navbar :autoBack='true' title="预约代客泊车" titleStyle="font-size:36rpx" placeholder safeAreaInsetTop></u-navbar>
		<view style="flex: 1; padding: 32rpx;">
			<LicensePlateSelection licensePlate='粤1234554' />
			<view class="card" style="margin-top: 19rpx;">
				<view class="card_line" style="justify-content: flex-start">
					<text class="label" style="margin-right: 32rpx">手机号码</text>
					<input type="text" placeholder="请输入手机号" placeholderStyle="font-size:28rpx" />
				</view>
				<view class="size_box" />
				<view class="card_line" style="justify-content: flex-start">
					<text class="label" style="margin-right: 32rpx">预约姓名</text>
					<input type="text" placeholder="请输入姓名" placeholderStyle="font-size:28rpx" />
				</view>
				<view class="size_box" />
				<view class="card_line">
					<text class="label">预约时间</text>
					<view class="check" @click="
				         () => {
				           subscribeInfo.time = getTimestamp();
				           subscribeInfo.timeShow = true;
				         }
				       " style="display: flex; align-items: center; color: rgba(0, 0, 0, 0.4)">
						<text class="check-text">{{ formatTime(subscribeInfo.time) }}</text>
						<u--icon name="arrow-right" size="32rpx" color="rgba(0,0,0,.26)"></u--icon>
					</view>
				</view>
				<view class="size_box" />
				<view class="card_line">
					<text class="label" style="margin-right: 32rpx">帮忙取车</text>
					<u-switch v-model="subscribeInfo.isHelpGet" @change="" activeColor='#449656'></u-switch>
				</view>
			</view>
			<view class="card" style="margin-top: 19rpx;">
				<view class="card_line" style="justify-content: flex-start">
					<text class="label" style="margin-right: 32rpx">车型颜色</text>
					<input type="text" placeholder="请输入车辆颜色" placeholderStyle="font-size:28rpx" />
				</view>
				<view class="size_box" />
				<view class="card_line" style="justify-content: space-between">
					<text class="label" style="margin-right: 32rpx">车辆型号</text>
					<view class="check">
						<text class="check-text">选择车型</text>
						<u--icon name="arrow-right" size="32rpx" color="rgba(0,0,0,.26)"></u--icon>
					</view>
				</view>
				<view class="size_box" />
				<view class="card-driver">
					<view class="driver-info">
						<image src="@/static/images/wish/service.png" mode=""></image>
						<view class="driver-text">
							<text>刘师傅</text>
							<text>驾驶经验 - 10 年</text>
						</view>
					</view>
					<u--icon name="arrow-right" size="32rpx" color="rgba(0,0,0,.26)"></u--icon>
				</view>
			</view>
		</view>
	</view>
	<PriceBtn type="subscribe" :price="45" url="/pages/wish/wish_pay/wish_pay" />
	<u-datetime-picker ref="datetimePickerRef" confirmColor="#449656" v-model="subscribeInfo.time" :formatter="formatter"
		:minDate="nowTime" @cancel="subscribeInfo.timeShow = false" @confirm="onChangeTime" :show="subscribeInfo.timeShow"
		mode="datetime"></u-datetime-picker>
</template>

<script setup>
	import LicensePlateSelection from '../../components/license_plate_selection/license_plate_selection.vue'
	import {
		ref,
		reactive
	} from 'vue'
	import dayjs from 'dayjs'
	import {
		onReady
	} from "@dcloudio/uni-app";
	import PriceBtn from "@/components/price_btn/price_btn.vue";

	const datetimePickerRef = ref(null);
	const nowTime = Date.now();
	const subscribeInfo = ref({
		name: "",
		phone: "",
		time: "选择预约时间",
		service: "选择预约服务",
		timeShow: false,
		serviceShow: false,
		isHelpGet: false
	});

	const onChangeTime = (e) => {
		subscribeInfo.value.time = e.value;
		subscribeInfo.value.timeShow = false;
	};
	const helpGetChange = (value) => {
		subscribeInfo.value.isHelpGet = value;
	}
	//格式化时间戳
	const formatTime = (value) => {
		const time = dayjs(value).format("MM月DD日 hh:mm");
		if (time === "Invalid Date") {
			return value;
		} else {
			return time;
		}
	};
	//获取当前时间戳
	const getTimestamp = () => {
		const now = new Date();
		const timestamp = now.getTime();
		return timestamp;
	};
	//服务项目
	const columns = reactive([
		["接送", "只接", "只送"]
	]);
	// 格式化
	const formatter = (type, value) => {
		if (type === "year") {
			return `${value}年`;
		}
		if (type === "month") {
			return `${value}月`;
		}
		if (type === "day") {
			return `${value}日`;
		}
		if (type === "hour") {
			return `${value}时`;
		}
		if (type === "minute") {
			return `${value}分`;
		}
		return value;
	};

	onReady(() => {
		// 微信小程序需要用此写法
		datetimePickerRef.value.setFormatter(formatter);
	});
</script>

<style lang="scss" scoped>
	
	.card-driver{
		display: flex;
		justify-content: space-between;
		padding: 24rpx 0;
		.driver-info{
			display: flex;
			image{
				width: 96rpx;
				height: 96rpx;
				margin: 0 16rpx 0 0;
			}
			.driver-text{
				display: flex;
				flex-direction: column;
				text{
					&:nth-of-type(1){
						font-size: 32rpx;
						margin: 0 0 8rpx;
					}
					&:nth-of-type(2){
						font-size: 28rpx;
						color: $textColor;
					}
				}
			}
		}
	}
	
	.card {
		border-radius: 16rpx;
		background-color: white;
		padding: 0 32rpx;

		.size_box {
			background-color: #e7e7e7;
			height: 1rpx;
		}

		.card_line {
			height: 96rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			.label{
				font-size: 28rpx;
			}
			.check{
				display: flex;
				font-size: 24rpx;
				color: $textColor;
				.check-text{
					margin: 0 22rpx 0 0;
				}
			}
		}
	}
</style>