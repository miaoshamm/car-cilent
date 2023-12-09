<template>
	<u-navbar @leftClick="leftClick" safeAreaInsetTop title="预约车辆维保"></u-navbar>
	<view v-show="!serviceShow">
		<view class="wrapper wrapper-t">
			<License type="input" :licensePlate="info.carNo" @plateNumber="getPlateNumber" />
			<view class="car-info">
				<u--form ref="uForm" class="car-form" labelPosition="left" :model="info" :rules="rules" labelWidth="100">
					<view class="box">
						<u-form-item label="手机号码" prop="phone" borderBottom>
							<u--input v-model="info.phone" border="none" placeholder="请输入手机号"></u--input>
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
							<u--input disabled v-model="info.carTypeName" disabledColor="#ffffff" placeholder="请选择车辆型号"
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
								<image :src="item.serviceImageUrl" mode=""></image>
								<view class="text">
									<text class="name">{{item.serviceName}}</text>
									<text class="price">¥ {{item.servicePrice.toFixed(2)}}</text>
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
		reservationPreserveOrder
	} from "@/api";
	import models from "@/static/json/brands.json"

	const nowTime = Date.now();
	const datetimePickerRef = ref(null);
	// 信息
	const info = ref({
		carNo: "桂FVE898", //车牌号
		phone: "", //手机号
		reservationTime: "", //预约时间
		carTypeName: "", //车型
		userName: "", //预约姓名
		carColor: "", //车辆颜色
		washService:[],	//维保服务
		total: 0, //支付总价
	});
	// 验证
	const rules = {
		'phone':{
			type:"string",
			required:true,
			message:"请输入手机号"
		},
		'userName':{
			type:"string",
			required:true,
			message:"请输入预约姓名"
		},
		'carColor':{
			type:"string",
			required:true,
			message:"请输入车辆颜色"
		},
		'carTypeName':{
			type:"array",
			required:true,
			message:"请选择车型"
		},
		'reservationTime':{
			type:"string",
			required:true,
			message:"请选择预约时间"
		}
	}
	// 选择服务列表
	const serviceList = ref([]);
	const modelColumns = ref([]);
	const timeShow = ref(false);
	const modelShow = ref(false);
	const serviceShow = ref(false);
	const uForm = ref(null)

	// 下单
	const createOrder = (res) => {		
		if (res === 'success') {
			uni.navigateTo({
				url: `/pages/wish/wish_pay/wish_pay?orderNo=20231209112457841246`
			})
			return
			uForm.value.validate().then(async res => {
				const arr = []
				info.value.carTypeName = info.value.carTypeName[0]
				info.value.washService.forEach(item => {
					arr.push(item.id)
				})
				info.value.washService = arr.join(',')
				info.value.orderType = "PRESERVE"
				info.value.userId = 1001
				const result = await reservationPreserveOrder(info.value)
				if(result.code == 200){
					uni.navigateTo({
						url: `/pages/wish/wish_pay/wish_pay?orderNo=${result.message}`
					})
				}
			})
		}else{
			uni.showToast({
				icon:"error",
				title:'下单失败'
			})
		}
	}

	// 确认选择服务
	const serviceConfirm = (list) => {
		info.value.washService = list
		info.value.total = checkList.value.reduce((total, item) => {
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
				info.value.washService = [result.data[0] ?? null]
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
		info.value.carTypeName = item.value;
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

	onLoad(() => {
		allService()
		modelColumns.value.push(models)
	})
</script>