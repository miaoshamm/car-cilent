<template>
	<view style="min-height: 100vh; background: #f6f7f8; display: flex; flex-direction: column;">
		<u-navbar :autoBack='true' title="预约代客泊车"  titleStyle="font-size:36rpx" placeholder
			safeAreaInsetTop></u-navbar>
		<view style="flex: 1; padding: 32rpx;">
			<LicensePlateSelection licensePlate='粤1234554' />
			<view class="card" style="margin-top: 19rpx;">
				<view class="card_line" style="justify-content: flex-start">
					<text style="margin-right: 32rpx">手机号码</text>
					<input type="text" placeholder="请输入手机号" />
				</view>
				<view class="size_box" />
				<view class="card_line" style="justify-content: flex-start">
					<text style="margin-right: 32rpx">预约姓名</text>
					<input type="text" placeholder="请输入姓名" />
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
				<view class="card_line">
					<text style="margin-right: 32rpx">帮忙取车</text>
					<u-switch v-model="subscribeInfo.isHelpGet" @change="" activeColor='#449656'></u-switch>
				</view>
			</view>
			<view class="card" style="margin-top: 19rpx;">
				<view class="card_line" style="justify-content: flex-start">
					<text style="margin-right: 32rpx">车型颜色</text>
					<input type="text" placeholder="请输入手机号" />
				</view>
				<view class="size_box" />
				<view class="card_line" style="justify-content: flex-start">
					<text style="margin-right: 32rpx">车辆型号</text>
					<input type="text" placeholder="请输入姓名" />
				</view>
				
				
			</view>
		</view>
	</view>
	<u-datetime-picker v-model="subscribeInfo.time" :formatter="formatter" :minDate="nowTime"
		@cancel="subscribeInfo.timeShow = false" @confirm="onChangeTime" :show="subscribeInfo.timeShow"
		mode="datetime"></u-datetime-picker>
</template>

<script setup>
	import LicensePlateSelection from '../../components/license_plate_selection/license_plate_selection.vue'
	import {ref,reactive} from 'vue'
	import dayjs from 'dayjs'
	const subscribeInfo = ref({
	  
	  name: "",
	  phone: "",
	  time: "选择预约时间",
	  service: "选择预约服务",
	  timeShow: false,
	  serviceShow: false,
		isHelpGet:false
	});
	
	
	
	
	
	
	const onChangeTime = (e) => {
	  subscribeInfo.value.time = e.value;
	  subscribeInfo.value.timeShow = false;
	};
	const helpGetChange=(value)=>{
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
	const columns = reactive([["接送", "只接", "只送"]]);
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
	  padding-left: 32rpx;

	  .size_box {
	    background-color: #e7e7e7;
	    height: 1rpx;
	  }
	
	  .card_line {
	    height: 96rpx;
	    display: flex;
	    align-items: center;
	    justify-content: space-between;
	    padding-right: 32rpx;
	  }
	}
</style>