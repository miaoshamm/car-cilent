<template>
	<view style="min-height: 100vh; background: #f6f7f8; display: flex; flex-direction: column">
		<u-navbar @leftClick="leftClick" title="预约接送服务" titleStyle="font-size:36rpx" placeholder safeAreaInsetTop></u-navbar>
		<view style="position: relative; flex: 1">
			<view style="padding: 32rpx">
				<u--form ref="formRef" class="car-form" labelPosition="left" :model="subscribeInfo" :rules="rules" labelWidth="100" errorType="toast">
					<view class="card" style="margin-top: 19rpx; background: linear-gradient(180deg, #ecfbec 0%, #ffffff 26%, #ffffff 100%)">
						<u-form-item label="预约地点" prop="location" borderBottom>
							<template #right>
								<view style="display: flex; align-items: center" @click="openMap">
									<text>{{ subscribeInfo?.location?.name }}</text>
									<image src="../../static/images/order/location.png" mode="widthFix" style="width: 32rpx; margin-left: 8rpx"></image>
								</view>
							</template>
						</u-form-item>
						<u-form-item label="手机号码" prop="phone" borderBottom>
							<u--input v-model="subscribeInfo.phone" border="none" placeholder="请输入手机号(必填)"></u--input>
							<template #right>
								<button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" style="font-size: 24rpx; color: #449656; padding: 0; background-color: transparent">
									一键获取手机号
								</button>
							</template>
						</u-form-item>
						<u-form-item label="预约姓名" prop="userName" borderBottom>
							<u--input v-model="subscribeInfo.userName" border="none" placeholder="请输入预约姓名"></u--input>
						</u-form-item>
						<u-form-item label="预约时间" prop="reservationTime" borderBottom @click="subscribeInfo.timeShow = true">
							<u--input disabled v-model="subscribeInfo.reservationTime" disabledColor="#ffffff" placeholder="请选择预约时间" border="none"></u--input>
							<template #right>
								<u-icon name="arrow-right"></u-icon>
							</template>
						</u-form-item>
						<u-form-item label="预约服务" prop="service" borderBottom @click="subscribeInfo.serviceShow = true">
							<text>{{ subscribeInfo.service ? subscribeInfo.service : '选择预约服务' }}</text>
							<template #right>
								<u-icon name="arrow-right"></u-icon>
							</template>
						</u-form-item>
					</view>
				</u--form>
				<view class="card" style="margin-top: 16rpx" @click="goChooseParking">
					<view class="card_line" style="height: 144rpx">
						<view style="display: flex; height: 96rpx">
							<view style="width: 96rpx; height: 96rpx">
								<up-image :src="subscribeInfo?.servoicerInfo?.drivingUrl" width="96rpx" height="96rpx" shape="circle"></up-image>
							</view>
							<view style="display: flex; flex-direction: column; margin-left: 16rpx">
								<text style="font-size: 32rpx">{{ subscribeInfo?.servoicerInfo?.userName }}</text>
								<text style="font-size: 28rpx; color: rgba(0, 0, 0, 0.4); margin-top: 8rpx">驾驶年龄 {{ subscribeInfo?.servoicerInfo?.drivingAge }}年</text>
							</view>
						</view>
						<u-icon name="arrow-right" size="32rpx" color="rgba(0, 0, 0, 0.4)"></u-icon>
					</view>
				</view>

				<InsuranceTips />
			</view>
		</view>
		<PriceBtn type="pay" :price="subscribeInfo.price" @callback="placeOrder" />
	</view>
	<u-datetime-picker
		v-model="subscribeInfo.time"
		:formatter="formatter"
		:minDate="nowTime"
		@cancel="subscribeInfo.timeShow = false"
		@confirm="onChangeTime"
		:show="subscribeInfo.timeShow"
		mode="datetime"
	></u-datetime-picker>
	<u-picker
		:show="subscribeInfo.serviceShow"
		keyName="label"
		:columns="columns"
		@confirm="serviceTypeChange"
		@cancel="subscribeInfo.serviceShow = false"
		:closeOnClickOverlay="true"
	></u-picker>
</template>

<script setup>
import { reservationTravelOrder, getTypePrice, getPhone, getServicerByType } from '../../api/index.js';
import { ref, reactive } from 'vue';
import dayjs from 'dayjs';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import InsuranceTips from '../../components/insurance_tips/insurance_tips.vue';
import PriceBtn from '../../components/price_btn/price_btn.vue';
const chooseLocation = requirePlugin('chooseLocation');
const key = 'GZABZ-OGULD-YPK4O-HWK6T-4B6KV-NBFJX'; //使用在腾讯位置服务申请的key
const referer = '城市生活'; //调用插件的app的名
const isShowServiceList = ref(false);
const formRef = ref();
const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
const subscribeInfo = reactive({
	userName: '',
	phone: '',
	price: 0,
	reservationTime: '选择预约时间',
	service: '',
	serviceType: '',
	timeShow: false,
	serviceShow: false,
	location: { name: '选择当前位置' },
	servicerInfo: {}
});
const openMap = () => {
	uni.navigateTo({
		url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
	});
};
const onChangeTime = (e) => {
	subscribeInfo.reservationTime = dayjs(e.value).format('YYYY-MM-DD HH:mm:ss');
	subscribeInfo.timeShow = false;
};
const getPhoneNumber = async (e) => {
	if (e.detail.code) {
		const info = await getPhone(e.detail.code);
		subscribeInfo.phone = info.data;
	}
};
const goChooseParking = () => {
	getApp().globalData.pickUpDriverInfo = subscribeInfo.servicerInfo;
	uni.navigateTo({
		url: '/pages/choose_parking/choose_parking?servicerType=TRANSFER'
	});
};
const serviceTypeChange = async (e) => {
	const priceInfo = await getTypePrice(e.value[0].id);
	subscribeInfo.price = priceInfo.data.price;
	subscribeInfo.service = e.value[0].label;
	subscribeInfo.serviceType = e.value[0].id;
	subscribeInfo.serviceShow = false;
};
const openServiceList = () => {
	isShowServiceList.value = true;
};
const serviceListClose = () => {
	isShowServiceList.value = false;
};
const getPickUpList = async () => {
	if (!subscribeInfo.servoicerInfo?.id) {
		const list = await getServicerByType('TRANSFER');
		subscribeInfo.servoicerInfo = list.data[0];
	} else {
		const info = getApp().globalData.pickUpDriverInfo;
		subscribeInfo.servoicerInfo = info;
	}
};
const leftClick = () => {
	if (isShowServiceList.value) {
		isShowServiceList.value = false;
	} else {
		uni.navigateBack();
	}
};

const placeOrder = async () => {
	if (!subscribeInfo.location.address) {
		uni.showToast({
			icon: 'none',
			title: '请选择预约地点'
		});
		return;
	}
	formRef.value.validate().then(async (res) => {
		const orderInfo = await reservationTravelOrder({
			address: subscribeInfo.location.address,
			addressType: 'TRANSFER',
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
		wx.cloud.callFunction({
			name: 'payment',
			data: {
				outTradeNo: orderInfo.data,
				body: subscribeInfo.serviceType + '-城市服务接送患者',
				subMchId: '1643049307',
				functionName: 'paymentCallback'
			},
			success: (res) => {
				const payment = res.result.payment;
				wx.requestPayment({
					...payment,
					success(res) {
						uni.redirectTo({
							url: `/pages/order_detail_pick_up/order_detail_pick_up?order_no=${orderInfo.data.orderNo}`
						});
						console.log('pay success', res);
					},
					fail(err) {
						console.error('pay fail', err);
					}
				});
			},
			fail: console.error
		});
	});
};

onLoad(() => {
	subscribeInfo.phone = userInfo.phone;
});
onShow(async () => {
	getPickUpList();
	const location = chooseLocation.getLocation();
	if (location) {
		const locationLength = await uni.request({
			url: `https://apis.map.qq.com/ws/distance/v1/matrix?from=${
				location.latitude + ',' + location.longitude
			}&to=23.118306,113.364176&mode=driving&key=GZABZ-OGULD-YPK4O-HWK6T-4B6KV-NBFJX`,
			method: 'GET',
			header: 'Content-Type:application/json'
		});
		if (locationLength.data.result.rows[0].elements[0].distance < 5000) {
			subscribeInfo.location = location;
		} else {
			uni.showToast({
				icon: 'none',
				title: '选择地点需要五公里内'
			});
		}
	}
});
onUnload(() => {
	chooseLocation.setLocation(null);
	subscribeInfo.location = { name: '选择位置' };
});
//格式化时间戳
const formatTime = (value) => {
	const time = dayjs(value).format('MM月DD日 HH:mm');
	if (time === 'Invalid Date') {
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
	[
		{
			id: 'TRANSFER',
			label: '接送'
		},
		{
			id: 'TRANSFER_PICK_UP',
			label: '只接'
		},
		{
			id: 'TRANSFER_DROP_OFF',
			label: '只送'
		}
	]
]);
const rules = {
	phone: [
		{
			required: true,
			message: '请填写手机号'
		},
		{
			pattern: /^1\d{10}$/g,
			transform(value) {
				return String(value);
			},
			message: '请输入正确的手机号'
		}
	],
	service: [
		{
			required: true,
			message: '请选择服务方式'
		}
	]
};
// 格式化
const formatter = (type, value) => {
	if (type === 'year') {
		return `${value}年`;
	}
	if (type === 'month') {
		return `${value}月`;
	}
	if (type === 'day') {
		return `${value}日`;
	}
	if (type === 'hour') {
		return `${value}时`;
	}
	if (type === 'minute') {
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
::v-deep .u-form-item__body__right__content__slot.data-v-b4fd400b {
	height: 76rpx;
	display: flex !important;
	flex-direction: row !important;
}
</style>
