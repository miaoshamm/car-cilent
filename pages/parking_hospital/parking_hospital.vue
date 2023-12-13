<template>
	<view style="min-height: 100vh; background: #f6f7f8; display: flex; flex-direction: column" class="wrapper-p">
		<u-navbar :autoBack="true" title="预约代客泊车" titleStyle="font-size:36rpx" placeholder safeAreaInsetTop></u-navbar>
		<view style="flex: 1; padding: 32rpx; position: relative; overflow: scroll">
			<LicensePlateSelection type="input" @plateNumber="" />
			<u--form ref="formRef" class="car-form" labelPosition="left" :model="subscribeInfo" :rules="rules" labelWidth="100" errorType="toast">
				<view class="card" style="margin-top: 19rpx">
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
					<u-form-item label="预约时间" prop="reservationTime" borderBottom @click="timeShow = true">
						<u--input disabled v-model="subscribeInfo.reservationTime" disabledColor="#ffffff" placeholder="请选择预约时间" border="none"></u--input>
						<template #right>
							<u-icon name="arrow-right"></u-icon>
						</template>
					</u-form-item>
					<u-form-item v-if="locationType === 'OPTIONAL'" label="预约地点" prop="location" borderBottom>
						<template #right>
							<view style="display: flex; align-items: center" @click="openMap">
								<text>{{ subscribeInfo?.location?.name }}</text>
								<image src="../../static/images/order/location.png" mode="widthFix" style="width: 32rpx; margin-left: 8rpx"></image>
							</view>
						</template>
					</u-form-item>
					<u-form-item label="帮忙取车" prop="isHelpGet" borderBottom>
						<view style="width: 100%; display: flex; justify-content: flex-end">
							<u-switch v-model="subscribeInfo.isHelpGet" @change="" activeColor="#449656"></u-switch>
						</view>
					</u-form-item>
				</view>
				<view class="card" style="margin-top: 19rpx">
					<u-form-item label="车辆颜色" prop="carColor" borderBottom>
						<u--input v-model="subscribeInfo.carColor" border="none" placeholder="请输入车辆颜色"></u--input>
					</u-form-item>
					<u-form-item label="车辆型号" prop="carTypeName" borderBottom @click="subscribeInfo.isShowCarType = true">
						<u--input disabled v-model="subscribeInfo.carTypeName" disabledColor="#ffffff" placeholder="请选择车辆型号" border="none"></u--input>
						<template #right>
							<u-icon name="arrow-right"></u-icon>
						</template>
					</u-form-item>
				</view>
			</u--form>
			<view style="padding: 0 32rpx; background-color: white; border-radius: 16rpx">
				<ChooseEmployee
					servicerType="VALET"
					:isShow="isSHowChooseDriver"
					:open="
						() => {
							isSHowChooseDriver = true;
						}
					"
					:close="
						() => {
							isSHowChooseDriver = false;
						}
					"
					@change="servicerChange"
				/>
			</view>
			<InsuranceTips />
		</view>
		<PriceBtn @callback="placeAnOrder" type="subscribe" :price="45" />
	</view>

	<u-datetime-picker
		:formatter="formatter"
		:minDate="nowTime"
		@cancel="timeShow = false"
		@confirm="onChangeTime"
		:show="timeShow"
		mode="datetime"
		confirmColor="#449656"
		ref="datetimePickerRef"
	></u-datetime-picker>
	<u-picker
		:show="subscribeInfo.isShowCarType"
		:closeOnClickOverlay="true"
		:columns="carTypeColumns"
		@confirm="carTypeChange"
		@cancel="subscribeInfo.isShowCarType = false"
	></u-picker>
</template>

<script setup>
import LicensePlateSelection from '../../components/license_plate_selection/license_plate_selection.vue';
import ChooseEmployee from '../../components/choose_employee/choose_employee.vue';
import InsuranceTips from '../../components/insurance_tips/insurance_tips.vue';
import { onLoad, onShow, onUnload } from '@dcloudio/uni-app';
import { ref, reactive } from 'vue';
import dayjs from 'dayjs';
import { onReady } from '@dcloudio/uni-app';
import { reservationParkOrder, getPhone } from '../../api/index.js';
import brandsList from '../../static/json/brands.json';
import PriceBtn from '@/components/price_btn/price_btn.vue';
const chooseLocation = requirePlugin('chooseLocation');
const key = 'GZABZ-OGULD-YPK4O-HWK6T-4B6KV-NBFJX'; //使用在腾讯位置服务申请的key
const referer = '城市生活'; //调用插件的app的名
const formRef = ref();
const { locationType } = defineProps(['locationType']);
const isSHowChooseDriver = ref(false);
const datetimePickerRef = ref(null);
const nowTime = Date.now();
const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
const timeShow = ref(false);
const openMap = () => {
	uni.navigateTo({
		url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
	});
};
const subscribeInfo = ref({
	userName: '',
	phone: '',
	licensePlate: '',
	location: { name: '获取位置' },
	reservationTime: '',
	carTypeName: [],
	carColor: '',
	servoicerInfo: {},
	serviceShow: false,
	isHelpGet: true,
	isShowCarType: false
});
const carTypeColumns = reactive([brandsList]);
const openChooseCarType = () => {
	subscribeInfo.value.isShowCarType = true;
};
const servicerChange = (value) => {
	subscribeInfo.value.servoicerInfo = value;
};
const placeAnOrder = async () => {
	formRef.value.validate().then(async (res) => {
		if (!subscribeInfo.value.licensePlate) {
			uni.showToast({
				icon: 'none',
				title: '请选择车牌'
			});
			return;
		}
		if (!subscribeInfo.value.location.address && locationType === 'OPTIONAL') {
			uni.showToast({
				icon: 'none',
				title: '请先选择预约地点'
			});
			return;
		}
		if (res) {
			const orderInfo = await reservationParkOrder({
				userId: userInfo.id,
				addressType: locationType,
				userName: subscribeInfo.value.userName,
				phone: subscribeInfo.value.phone,
				orderType: subscribeInfo.value.isHelpGet ? 'HELP_SAVE_AND_RETRIEVE' : 'HELP_SAVE_ASK_OF',
				reservationTime: dayjs(subscribeInfo.value.reservationTime).format('YYYY-MM-DD HH:mm:ss'),
				carTypeName: subscribeInfo.value.carTypeName.toString(),
				carColor: subscribeInfo.value.carColor,
				servicerId: subscribeInfo.value.servoicerInfo.id,
				carNo: subscribeInfo.value.licensePlate,
				address: locationType === 'OPTIONAL' && subscribeInfo.value.location.address,
				latitude: locationType === 'OPTIONAL' && subscribeInfo.value.location.latitude,
				longitude: locationType === 'OPTIONAL' && subscribeInfo.value.location.longitude
			});
			orderInfo.data.orderNo &&
				uni.navigateTo({
					url: `/pages/order_detail_parking/order_detail_parking?order_no=${orderInfo.data.orderNo}`
				});
		}
	});
};

const getPhoneNumber = async (e) => {
	if (e.detail.code) {
		const info = await getPhone(e.detail.code);
		subscribeInfo.value.phone = info.data;
	}
};

const onChangeTime = (e) => {
	subscribeInfo.value.reservationTime = dayjs(e.value).format('YYYY-MM-DD hh:mm:ss');
	timeShow.value = false;
};
const helpGetChange = (value) => {
	subscribeInfo.value.isHelpGet = value;
};
const carTypeChange = (value) => {
	subscribeInfo.value.carTypeName = value.value;
	subscribeInfo.value.isShowCarType = false;
};
const licensePlateChange = (number) => {
	subscribeInfo.value.licensePlate = number;
};
const timeChange = () => {
	subscribeInfo.value.timeShow = true;
};

//格式化时间戳
const formatTime = (value) => {
	const time = dayjs(value).format('MM月DD日 hh:mm');
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
const columns = reactive([['接送', '只接', '只送']]);
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
	userName: [
		{
			required: false
		}
	],
	reservationTime: [
		{
			required: false
		}
	],
	isHelpGet: [
		{
			required: false
		}
	],
	carColor: [
		{
			required: false
		}
	],
	carTypeName: [
		{
			required: false
		}
	]
};

onLoad(() => {
	subscribeInfo.value.phone = userInfo.phone;
});

onShow(async () => {
	const location = chooseLocation.getLocation();
	if (location) {
		const locationLength = await uni.request({
			url: `https://apis.map.qq.com/ws/distance/v1/matrix?from=${
				location.latitude + ',' + location.longitude
			}&to=23.118306,113.364176&mode=driving&key=GZABZ-OGULD-YPK4O-HWK6T-4B6KV-NBFJX`,
			method: 'GET',
			header: 'Content-Type:application/json'
		});
		if (locationLength.data.result.rows[0].elements[0].distance < 10000) {
			console.log(location, 'location');
			subscribeInfo.value.location = location;
		} else {
			uni.showToast({
				icon: 'none',
				title: '选择地点需要10公里内'
			});
		}
	}
});
onUnload(() => {
	chooseLocation.setLocation(null);
	subscribeInfo.location = { name: '选择位置' };
});

onReady(() => {
	// 微信小程序需要用此写法
	datetimePickerRef.value.setFormatter(formatter);
});
</script>

<style lang="scss" scoped>
.card-driver {
	display: flex;
	justify-content: space-between;
	padding: 24rpx 0;

	.driver-info {
		display: flex;

		image {
			width: 96rpx;
			height: 96rpx;
			margin: 0 16rpx 0 0;
		}

		.driver-text {
			display: flex;
			flex-direction: column;

			text {
				&:nth-of-type(1) {
					font-size: 32rpx;
					margin: 0 0 8rpx;
				}

				&:nth-of-type(2) {
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
		button {
			background-color: transparent;
			padding: 0;
			margin: 0;
			font-size: 28rpx;
			color: #449656;
		}
		.label {
			font-size: 28rpx;
		}

		.check {
			display: flex;
			font-size: 24rpx;
			color: $textColor;

			.check-text {
				margin: 0 22rpx 0 0;
			}
		}
	}
}
::v-deep .u-form-item__body__right__content__slot.data-v-b4fd400b {
	height: 76rpx;
	display: flex !important;
	flex-direction: row !important;
}
</style>
