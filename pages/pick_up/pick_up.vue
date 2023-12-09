<template>
	<view style="min-height: 100vh; background: #f6f7f8; display: flex; flex-direction: column;">
		<u-navbar @leftClick="leftClick" title="预约接送服务" titleStyle="font-size:36rpx" placeholder
			safeAreaInsetTop></u-navbar>
		<view style="position: relative;flex: 1;">
			<view style="padding: 32rpx;">
				<view class="card" style="background: linear-gradient(180deg, #ECFBEC 0%, #FFFFFF 26%, #FFFFFF 100%)">
					<view class="card_line" style="min-height: 96rpx">
						<text style="width: 130rpx;">预约地点</text>
						<view
							style="display:flex; align-items: center;min-height: 96rpx;flex: 1;justify-content: flex-end;overflow: hidden;"
							@click="openMap">
							<text>{{ subscribeInfo.location.name }}</text>
							<image src="../../static/images/order/location.png" mode="widthFix"
								style="width: 24rpx; margin-left: 12rpx"> </image>
						</view>
					</view>
					<view class="size_box" />
					<view class="card_line" style="justify-content: flex-start">
						<text style="margin-right: 32rpx">预约姓名</text>
						<input type="text" placeholder="请输入姓名" v-model="subscribeInfo.userName" />
					</view>
					<view class="size_box" />
					<view class="card_line" style="justify-content: flex-start">
						<text style="margin-right: 32rpx">手机号码</text>
						<input type="text" placeholder="请输入手机号" v-model="subscribeInfo.phone" />
					</view>
					<view class="size_box" />
					<view class="card_line">
						<text>预约时间</text>
						<view @click="
				          () => {
				            subscribeInfo.time = getTimestamp();
				            subscribeInfo.timeShow = true;
				          }
				        " style="display: flex; align-items: center; color: rgba(0, 0, 0, 0.4)">
							<text>{{ formatTime(subscribeInfo.time) }}</text>
							<u--icon name="arrow-right" size="32rpx"></u--icon>
						</view>
					</view>
					<view class="size_box" />
					<view class="card_line">
						<text>预约服务</text>
						<view @click="subscribeInfo.serviceShow = true"
							style="display: flex; align-items: center; color: rgba(0, 0, 0, 0.4)">
							<text>{{ subscribeInfo.service }}</text>
							<u--icon name="arrow-right" size="32rpx"></u--icon>
						</view>
					</view>
				</view>
				<view style="background-color: white;padding: 0 32rpx;border-radius: 16rpx;">
					<ChooseEmploy :isShow='isShowServiceList' :open='openServiceList' :close='serviceListClose'
						servicerType='TRANSFER' @change='serviceInfoChange'></ChooseEmploy>
				</view>
				<InsuranceTips />
			</view>
		</view>
		<PriceBtn type='pay' :price='subscribeInfo.price' @callback='payCallback' />
	</view>
	<u-datetime-picker v-model="subscribeInfo.time" :formatter="formatter" :minDate="nowTime"
		@cancel="subscribeInfo.timeShow = false" @confirm="onChangeTime" :show="subscribeInfo.timeShow"
		mode="datetime"></u-datetime-picker>
	<u-picker :show="subscribeInfo.serviceShow" keyName='label' :columns="columns" @confirm="serviceTypeChange"
		@cancel="subscribeInfo.serviceShow = false" :closeOnClickOverlay='true'></u-picker>
</template>

<script setup>
	import {
		reservationTravelOrder
	} from '../../api/index.js'
	import {
		ref,
		reactive
	} from "vue";
	import dayjs from "dayjs";
	import {
		onShow,
		onUnload
	} from "@dcloudio/uni-app";
	import InsuranceTips from "../../components/insurance_tips/insurance_tips.vue";
	import ChooseEmploy from "../../components/choose_employee/choose_employee.vue";
	import PriceBtn from '../../components/price_btn/price_btn.vue'
	import {
		request
	} from '../../utils/request.js';
	const chooseLocation = requirePlugin("chooseLocation");
	const key = "GZABZ-OGULD-YPK4O-HWK6T-4B6KV-NBFJX"; //使用在腾讯位置服务申请的key
	const referer = "城市生活"; //调用插件的app的名
	const isShowServiceList = ref(false);
	const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
	const subscribeInfo = reactive({
		userName: "",
		phone: "",
		price: 0,
		time: "选择预约时间",
		service: "选择预约服务",
		serviceType: '',
		timeShow: false,
		serviceShow: false,
		location: {},
		servicerInfo: {}
	});
	const openMap = () => {
		uni.navigateTo({
			url: "plugin://chooseLocation/index?key=" + key + "&referer=" + referer,
		});
	};
	const onChangeTime = (e) => {
		subscribeInfo.time = e.value;
		subscribeInfo.timeShow = false;
	};
	const serviceTypeChange = (e) => {
		subscribeInfo.service = e.value[0].label;
		subscribeInfo.serviceType = e.value[0].id;
		subscribeInfo.serviceShow = false;
	};
	const openServiceList = () => {
		isShowServiceList.value = true;
	}
	const serviceListClose = () => {
		isShowServiceList.value = false;
	}
	const leftClick = () => {
		if (isShowServiceList.value) {
			isShowServiceList.value = false;
		} else {
			uni.navigateBack();
		}
	};
	const serviceInfoChange = (value) => {
		subscribeInfo.servicerInfo = value;
	}
	const placeOrder = async () => {
		const orderInfo = await reservationTravelOrder({
			address: subscribeInfo.location.address,
			addressType: "TRANSFER",
			latitude: subscribeInfo.location.latitude,
			longitude: subscribeInfo.location.longitude,
			name: subscribeInfo.location.name,
			phone: subscribeInfo.phone,
			userName: subscribeInfo.userName,
			reservationTime: dayjs(subscribeInfo.time).format('YYYY-MM-DD HH:mm:ss'),
			servicerId: subscribeInfo.servicerInfo.id,
			userId: userInfo.id,
			orderType: subscribeInfo.serviceType
		});
		uni.navigateTo({
			url: `/pages/order_detail_pick_up/order_detail_pick_up?order_no=${orderInfo.message}`
		})
	}

	const payCallback = () => {
		placeOrder()
	}


	onShow(async () => {
		const location = chooseLocation.getLocation();
		console.log(location);
		if (location) {
			const locationLength = await uni.request({
				url: `https://apis.map.qq.com/ws/distance/v1/matrix?from=${location.latitude+','+location.longitude}&to=23.118306,113.364176&mode=driving&key=GZABZ-OGULD-YPK4O-HWK6T-4B6KV-NBFJX`,
				method: "GET",
				header:'Content-Type:application/json'
			})
			if(locationLength.data.result.rows[0].elements[0].distance < 5000) {
					subscribeInfo.location = location ;
			}else{
				subscribeInfo.location = '距离超出，重新选择' ;
			}

		}
		
	});
	onUnload(() => {
		chooseLocation.setLocation(null);
	});
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
	const columns = reactive(
		[
			[{
				id: 'TRANSFER',
				label: '接送'
			}, {
				id: 'TRANSFER_PICK_UP',
				label: '只接'
			}, {
				id: 'TRANSFER_DROP_OFF',
				label: '只送'
			}]
		]
	);
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
</script>

<style lang="scss" scoped>
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
		}
	}
</style>