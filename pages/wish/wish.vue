<template>
	<u-navbar @leftClick="leftClick" safeAreaInsetTop title="预约车辆维保"></u-navbar>
	<view v-show="!serviceShow">
		<view class="wrapper" style="padding-top: 200rpx;">
			<view @click="check">
				<License :licensePlate="licensePlate" />
			</view>
			<view class="car-info">
				<u--form class="car-form" labelPosition="left" :model="model1" :rules="rules" labelWidth="120">
					<view class="box">
						<u-form-item label="手机号码" prop="info.phone" borderBottom>
							<u--input v-model="info.phone" border="none" placeholder="请输入手机号"></u--input>
						</u-form-item>
						<u-form-item label="维保时间" prop="info.time" borderBottom @click="info.timeShow = true">
							<u--input disabled v-model="info.time" disabledColor="#ffffff" placeholder="请选择维保时间"
								border="none"></u--input>
							<template #right>
								<u-icon name="arrow-right"></u-icon>
							</template>
						</u-form-item>
						<u-form-item label="车辆型号" prop="info.model" borderBottom @click="info.modelShow = true">
							<u--input disabled v-model="info.model" disabledColor="#ffffff" placeholder="请选择车辆型号"
								border="none"></u--input>
							<template #right>
								<u-icon name="arrow-right"></u-icon>
							</template>
						</u-form-item>
						<u-form-item label="预约服务" borderBottom>
							<u--input disabled disabledColor="#ffffff" border="none"></u--input>
						</u-form-item>
						<u-form-item borderBottom v-for="item in checkList" :key="item.id">
							<view class="service">
								<image src="/static/images/wish/service.png" mode=""></image>
								<view class="text">
									<text class="name">精洗</text>
									<text class="price">¥ 45.00</text>
								</view>
							</view>
							<template #right>
								<u-icon name="arrow-right"></u-icon>
							</template>
						</u-form-item>
						<u-form-item>
							<view class="add-service">
								<up-button @click="goService" customStyle="border:none;" color="#DFA0B1" iconColor="#DFA0B1"
									:plain="true" :hairline="false" icon="plus" text="增添服务"></up-button>
							</view>
						</u-form-item>
					</view>
				</u--form>
			</view>
			<Insurance type="wish" />
		</view>
		<PriceBtn :price="45" />
		<u-datetime-picker :formatter="formatter" :minDate="nowTime" @cancel="info.timeShow = false" @confirm="checkTime"
			:show="info.timeShow" mode="datetime"></u-datetime-picker>
		<u-picker @cancel="info.modelShow = false" @confirm="checkModel" :show="info.modelShow" :columns="modelColumns"
			keyName="label"></u-picker>
	</view>
	<Service v-show="serviceShow" type="wish"/>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import License from "@/components/license_plate_selection/license_plate_selection.vue"
	import Insurance from "@/components/insurance_tips/insurance_tips.vue"
	import PriceBtn from "@/components/price_btn/price_btn.vue"
	import Service from "@/components/service/service.vue"
	import dayjs from 'dayjs';
	import {
		onReady
	} from "@dcloudio/uni-app"

	// 车牌号
	let licensePlate = ref("皖GHHHHHN")
	let serviceShow = ref(false)
	const nowTime = Date.now()
	// 信息
	const info = ref({
		phone: "",
		time: "",
		model: "",
		modelId: 0,
		timeShow: false,
		modelShow: false
	})
	// 选择服务列表
	const checkList = ref([{
		id: 1,
		name: "",
		image: "",
		price: ""
	}])

	const modelColumns = ref([
		[{
				id: 1,
				label: "车型一"
			},
			{
				id: 2,
				label: "车型二"
			}
		]
	])

	// 选择时间
	const checkTime = (time) => {
		info.value.time = dayjs(time.value).format("YYYY-MM-DD hh:mm:ss")
		info.value.timeShow = false
	}
	// 选择车型
	const checkModel = (item) => {
		info.value.model = item.value[0].label
		info.value.modelId = item.value[0].id
		info.value.modelShow = false
	}
	
	// 导航跳转
	const leftClick = () => {
		if(serviceShow.value){
			serviceShow.value = false
		}else{
			uni.navigateBack()
		}
	}

	// 显示选项
	const goService = () => {
		serviceShow.value = true
	}

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

	const check = () => {
		wx.chooseLicensePlate({
			success(res) {
				licensePlate.value = res.plateNumber
			}
		})
	}

	// 支付
	const goPay = () => {
		uni.navigateTo({
			url: "/pages/wish/wish_pay/wish_pay"
		})
	}

	onReady(() => {
		// 微信小程序需要用此写法
		datetimePickerRef.value.setFormatter(formatter);
	});
</script>

<style lang="less">
	@import url("../../static/css/index.less");
</style>