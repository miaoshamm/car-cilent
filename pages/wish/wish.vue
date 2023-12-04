<template>
	<view class="wrapper">
		<view @click="check">
			<License :licensePlate="licensePlate" />
		</view>
		<view class="car-info">
			<u--form class="car-form" labelPosition="left" :model="model1" :rules="rules" labelWidth="120">
				<u-form-item label="手机号码" prop="info.phone" borderBottom>
					<u--input v-model="info.phone" border="none" placeholder="请输入手机号"></u--input>
				</u-form-item>
				<u-form-item label="维保时间" prop="info.time" borderBottom @click="info.timeShow = true">
					<u--input disabled v-model="info.time" disabledColor="#ffffff" placeholder="请选择维保时间" border="none"></u--input>
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
						<up-button @click="goService" customStyle="border:none;" color="#DFA0B1" iconColor="#DFA0B1" :plain="true" :hairline="false"
							icon="plus" text="增添服务"></up-button>
					</view>
				</u-form-item>
			</u--form>
		</view>
		<view class="clause">
			<up-text iconStyle="width:18rpx;margin:0 10rpx 0 0;" size="24rpx" prefixIcon="/static/images/wish/clause.svg"
				text="车辆维保条款" color="#F2995F"></up-text>
			<up-text size="24rpx" text="查看计费规则" decoration="underline" color="#DFA0B1" align="right"></up-text>
		</view>
	</view>
	<view class="pay-box">
		<text class="price">￥45.00</text>
		<u-button text="立即支付" color="#DFA0B1" @click="goPay"></u-button>
	</view>
	<u-datetime-picker :formatter="formatter" :minDate="nowTime" @cancel="info.timeShow = false" @confirm="checkTime" :show="info.timeShow"
		mode="datetime"></u-datetime-picker>
	<u-picker @cancel="info.modelShow = false" @confirm="checkModel" :show="info.modelShow" :columns="modelColumns"
		keyName="label"></u-picker>
</template>

<script setup>
	import { ref } from 'vue';
	import License from "@/components/license_plate_selection/license_plate_selection.vue"
	import dayjs from 'dayjs';
	import {onReady} from "@dcloudio/uni-app"

	// 车牌号
	let licensePlate = ref("皖GHHHHHN")
	const nowTime = Date.now()
	// 信息
	const info = ref({
		phone: "",
		time: "",
		model: "",
		modelId:0,
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
	
	// 跳转
	const goService = () => {
		uni.navigateTo({
			url:"/pages/service/service?type=wish",
		})
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
			url:"/pages/wish/wish_pay/wish_pay"
		})
	}
	
	onReady(() => {
	  // 微信小程序需要用此写法
	  datetimePickerRef.value.setFormatter(formatter);
	});
</script>

<style lang="less">
	@import url("../../static/css/index.less");
	// 服务条款
	.clause {
		display: flex;
		margin: 16rpx 0 0;
	}

</style>