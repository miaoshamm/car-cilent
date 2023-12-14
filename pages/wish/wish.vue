<template>
	<u-navbar @leftClick="leftClick" safeAreaInsetTop title="预约车辆维保"></u-navbar>
	<view v-show="!serviceShow">
		<view class="wrapper wrapper-t">
			<License type="input" :licensePlate="info.carNo" @plateNumber="getPlateNumber" />
			<view class="car-info">
				<u--form ref="uForm" class="car-form" labelPosition="left" :model="info" :rules="rules" labelWidth="80"
					errorType="toast">
					<view class="box">
						<u-form-item label="手机号码" prop="phone" borderBottom>
							<u--input v-model="info.phone" border="none" placeholder="请输入手机号(必填)"></u--input>
							<button class="get-phone" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">一键获取手机号</button>
						</u-form-item>
						<u-form-item label="预约姓名" prop="userName" borderBottom>
							<u--input v-model="info.userName" border="none" placeholder="请输入预约姓名"></u--input>
						</u-form-item>
						<u-form-item label="车辆颜色" prop="carColor" borderBottom>
							<u--input v-model="info.carColor" border="none" placeholder="请输入车辆颜色"></u--input>
						</u-form-item>
						<u-form-item label="维保时间" prop="reservationTime" borderBottom @click="timeShow = true">
							<u--input disabled v-model="info.reservationTime" disabledColor="#ffffff" placeholder="请选择维保时间"
								border="none"></u--input>
							<template #right>
								<u-icon name="arrow-right"></u-icon>
							</template>
						</u-form-item>
						<u-form-item label="车辆型号" prop="carTypeName" borderBottom @click="modelShow = true">
							<u--input disabled v-model="info.carTypeName" disabledColor="#ffffff" placeholder="请选择车辆型号(必填)"
								border="none"></u--input>
							<template #right>
								<u-icon name="arrow-right"></u-icon>
							</template>
						</u-form-item>
						<u-form-item label="预约服务" borderBottom>
							<u--input disabled disabledColor="#ffffff" border="none"></u--input>
						</u-form-item>
						<u-form-item borderBottom v-for="item in info.washService" :key="item.id" @click="goService">
							<view class="service">
								<image :src="item?.serviceImageUrl" mode=""></image>
								<view class="text">
									<text class="name">{{item?.serviceName}}</text>
									<text class="price">¥ {{item?.servicePrice}}</text>
								</view>
							</view>
							<template #right>
								<u-icon name="arrow-right"></u-icon>
							</template>
						</u-form-item>
						<u-form-item>
							<view class="add-service">
								<up-button @click="goService" customStyle="border:none;" color="#449656" iconColor="#449656"
									:plain="true" :hairline="false" icon="plus" text="增添服务"></up-button>
							</view>
						</u-form-item>
					</view>
				</u--form>
			</view>
			<Insurance type="wish" />
		</view>
		<PriceBtn type="pay" :price="info.total" @callback="createOrder" />
		<u-datetime-picker :formatter="formatter" :minDate="nowTime" @cancel="timeShow = false" @confirm="checkTime"
			:show="timeShow" mode="datetime" confirmColor="#449656" ref="datetimePickerRef"></u-datetime-picker>
		<u-picker confirmColor="#449656" @cancel="modelShow = false" @confirm="checkModel" :show="modelShow"
			:columns="modelColumns"></u-picker>
	</view>
	<Service v-show="serviceShow" :list="serviceList" @confirm="serviceConfirm" @show="checkServiceShow" />
</template>

<script setup>
	import {
		ref
	} from "vue";
	import License from "@/components/license_plate_selection/license_plate_selection.vue";
	import Insurance from "@/components/insurance_tips/insurance_tips.vue";
	import PriceBtn from "@/components/price_btn/price_btn.vue";
	import Service from "@/components/service/service.vue";
	import dayjs from "dayjs";
	import {
		onReady,
		onLoad
	} from "@dcloudio/uni-app";
	import {
		getCarServices,
		reservationPreserveOrder,
		getPhone
	} from "@/api";
	import models from "@/static/json/brands.json"

	const nowTime = Date.now();
	const datetimePickerRef = ref(null);
	// 信息
	const info = ref({
		carNo: "", //车牌号
		phone: "", //手机号
		reservationTime: "", //预约时间
		carTypeName: "", //车型
		userName: "", //预约姓名
		carColor: "", //车辆颜色
		washService: [], //维保服务
		total: 0, //支付总价
	});
	// 选择服务列表
	const serviceList = ref([]);
	const timeShow = ref(false);
	const modelColumns = ref([]);
	const modelShow = ref(false);
	const serviceShow = ref(false);
	const uForm = ref(null);
	const serviceId = ref(0)
	// 规则
	const rules = {
		phone: [{
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
		carTypeName:{
			required: true,
			type:"string",
			message: '请输入车型'
		}
	}

	// 获取手机号
	const getPhoneNumber = async (res) => {
		try {
			const result = await getPhone(res.target.code)
			if (result.code == 200) {
				info.value.phone = result.data
			}
		} catch (e) {
			//TODO handle the exception
		}
	}

	// 下单
	const createOrder = (res) => {
		if (res === 'success') {
			uForm.value.validate().then(async res => {
				if (!info.value.carNo) {
					return uni.showToast({
						title: "请输入车牌号",
						icon: "error"
					})
				}
				if (!info.value.washService.length) {
					return uni.showToast({
						title: "请选择维保服务",
						icon: "error"
					})
				}
				const arr = []
				info.value.carTypeName = info.value.carTypeName[0]
				info.value.washService.forEach(item => {
					arr.push(item.id)
				})
				info.value.washService = arr.join(',')
				info.value.orderType = "PRESERVE"
				info.value.userId = JSON.parse(uni.getStorageSync("userInfo")).id
				const result = await reservationPreserveOrder(info.value)
				console.log(result.data);
				if (result.code == 200) {
					wx.cloud.callFunction({
						name: 'payment',
						data: {
							outTradeNo: result.data,
							body: '城市服务维保',
							subMchId: '1643049307',
							functionName: 'paymentCallback'
						},
						success: (res) => {
							const payment = res.result.payment;
							wx.requestPayment({
								...payment,
								success(res) {
									
									uni.navigateTo({
										url: `/pages/wish/wish_pay/wish_pay?orderNo=${result.data.orderNo}`
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
				}
			})
		} else {
			uni.showToast({
				icon: "error",
				title: '下单失败'
			})
		}
	}

	// 确认选择服务
	const serviceConfirm = (list) => {
		info.value.washService = list
		info.value.total = list.reduce((total, item) => {
			return item.servicePrice + total
		}, 0)
	}

	// 服务的显示
	const checkServiceShow = (res) => {
		serviceShow.value = res
	}

	// 获取所有服务
	const allService = async () => {
		try {
			const result = await getCarServices()
			if (result.code == 200) {
				serviceList.value = result.data
				if (serviceId.value) {
					result.data.forEach(item => {
						if (item.id == serviceId.value) {
							info.value.washService = [item]
						}
					})
				} else {
					info.value.washService = [result.data[0] ?? null]
				}
				info.value.total = info.value.washService.reduce((total, item) => {
					return item.servicePrice + total
				}, 0)
			}
		} catch (e) {}
	}

	// 获取车牌
	const getPlateNumber = (res) => {
		info.value.carNo = res
	}

	// 选择时间
	const checkTime = (time) => {
		info.value.reservationTime = dayjs(time.value).format("YYYY-MM-DD hh:mm:ss");
		timeShow.value = false;
	};

	// 选择车型
	const checkModel = (item) => {
		info.value.carTypeName = item.value[0];
		modelShow.value = false;
	};

	// 导航跳转
	const leftClick = () => {
		if (serviceShow.value) {
			serviceShow.value = false;
		} else {
			uni.navigateBack();
		}
	};

	// 显示选项
	const goService = () => {
		serviceShow.value = true;
	};

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

	// 生命周期
	onReady(() => {
		// 微信小程序需要用此写法
		datetimePickerRef.value.setFormatter(formatter);
	});

	onLoad((options) => {
		serviceId.value = options.id
		allService()
		modelColumns.value.push(models)
	})
</script>

<style lang="scss" scoped>
	.box {
		::v-deep .u-form-item__body__right__content__slot.data-v-b4fd400b {
			display: flex !important;
			flex-direction: row !important;
		}
	}

	.add-service {
		width: 100%;
	}
	
	.get-phone{
		font-size: 24rpx;
	}
</style>