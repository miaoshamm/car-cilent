<template>

	<view style="min-height: 100vh; background: #F6F7F8;padding:32rpx;box-sizing: border-box;">
		<u-navbar title="预约接送服务" @rightClick="rightClick" :autoBack="true" placeholder safeAreaInsetTop>
		</u-navbar>
		<!-- <view class="card" style="background: linear-gradient(180deg, #FCF0F3 0%, #FFFFFF 26%, #FFFFFF 100%);">
			<view class="card_line" style="min-height: 96rpx;">
				<text>预约地点</text>
				<view style="display: flex;align-items: center;" @click="openMap">
					<text>{{subscribeInfo.address}}</text>
					<image src="../../static/images/order/location.png" mode="widthFix" style="width: 24rpx;margin-left: 12rpx;">
					</image>
				</view>
			</view>
			<view class="size_box" />
			<view class="card_line" style="justify-content: flex-start;">
				<text style="margin-right: 32rpx;">预约姓名</text>
				<input type="text" placeholder="请输入姓名" />
			</view>
			<view class="size_box" />
			<view class="card_line" style="justify-content: flex-start;">
				<text style="margin-right: 32rpx;">手机号码</text>
				<input type="text" placeholder="请输入手机号" />
			</view>
			<view class="size_box" />
			<view class="card_line">
				<text>预约时间</text>
				<view @click="()=>{
					subscribeInfo.time = getTimestamp();
					subscribeInfo.timeShow = true;
				}" style="display: flex;align-items: center;color: rgba(0, 0, 0, 0.4);">
					<text>{{formatTime(subscribeInfo.time)}}</text>
					<u--icon name="arrow-right" size="48rpx"></u--icon>
				</view>
			</view>
			<view class="size_box" />
			<view class="card_line">
				<text>预约服务</text>
				<view @click="subscribeInfo.serviceShow = true;"
					style="display: flex;align-items: center;color: rgba(0, 0, 0, 0.4);">
					<text>{{subscribeInfo.service}}</text>
					<u--icon name="arrow-right" size="48rpx"></u--icon>
				</view>
			</view>
		</view>
		<view class="card" style="margin-top: 16rpx;">
			<view class="card_line" style="height: 144rpx;">
				<view style="display: flex;height: 96rpx;">
					<up-image width="96rpx" height="96rpx" src="https://cdn.uviewui.com/uview/album/1.jpg"
						shape="circle"></up-image>
					<view style="display: flex;flex-direction: column;margin-left: 16rpx;">
						<text style="font-size: 32rpx;">刘师傅</text>
						<text style="font-size: 28rpx; color: rgba(0, 0, 0, 0.4);margin-top: 8rpx;">驾驶年龄 - 10年</text>
					</view>
				</view>
				<u-icon name="arrow-right" size="48rpx"></u-icon>
			</view>
		</view>
		<InsuranceTips />
		<u-datetime-picker v-model="subscribeInfo.time" :formatter="formatter" :minDate="nowTime"
			@cancel="subscribeInfo.timeShow = false" @confirm="onChangeTime" :show="subscribeInfo.timeShow"
			mode="datetime"></u-datetime-picker>
		<u-picker :show="subscribeInfo.serviceShow" :columns="columns" @confirm="serviceChange"></u-picker> -->
		<ChooseEmploy></ChooseEmploy>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive
	} from 'vue';
	import dayjs from 'dayjs'
	import {
		onShow,
		onUnload
	} from '@dcloudio/uni-app'
	import InsuranceTips from '../../components/insurance_tips/insurance_tips.vue'
	import ChooseEmploy from '../../components/choose_employee/choose_employee.vue'
	// let res = uni.getSystemInfoSync(); //系统信息
	// let custom = uni.getMenuButtonBoundingClientRect() //胶囊按钮位置信息
	// let navBarHeight = (custom.top - res.statusBarHeight) * 2 + custom.height;
	const chooseLocation = requirePlugin('chooseLocation');
	const key = 'GZABZ-OGULD-YPK4O-HWK6T-4B6KV-NBFJX'; //使用在腾讯位置服务申请的key
	const referer = '城市生活'; //调用插件的app的名
	const subscribeInfo = ref({
		address: '选取位置',
		name: '',
		phone: '',
		time: '选择预约时间',
		service: '选择预约服务',
		timeShow: false,
		serviceShow: false
	})
	const openMap = () => {
		uni.navigateTo({
			url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
		});
	}
	onShow(() => {
		const location = chooseLocation.getLocation();
		subscribeInfo.value.address = location.name;
	})
	onUnload(() => {
		chooseLocation.setLocation(null);
	})
	const onChangeTime = (e) => {
		subscribeInfo.value.time = e.value;
		subscribeInfo.value.timeShow = false;
	}
	const serviceChange = (e) => {
		subscribeInfo.value.service = e.value[0]
		subscribeInfo.value.serviceShow = false;
	}



	//格式化时间戳
	const formatTime = (value) => {
		const time = dayjs(value).format('MM月DD日 hh:mm');
		if (time === 'Invalid Date') {
			return value;
		} else {
			return time;
		}
	}
	//获取当前时间戳
	const getTimestamp = () => {
		const now = new Date();
		const timestamp = now.getTime();
		return timestamp;
	}
	//服务项目
	const columns = reactive([
		['接送', '只接', '只送']
	]);
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