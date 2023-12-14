<template>
	<view class="page">
		<u-navbar :autoBack="true" title="选择司机" titleStyle="font-size:36rpx" placeholder safeAreaInsetTop></u-navbar>
		<view class="main">
			<view @click="change(info)" class="card_line" :style="{ backgroundColor: selectId === info.id && '#EAFAEA' }" v-for="(info, index) in list">
				<view style="display: flex; height: 96rpx">
					<view style="width: 96rpx; height: 96rpx">
						<up-image width="96rpx" height="96rpx" :src="info?.drivingUrl" shape="circle"></up-image>
					</view>
					<view style="display: flex; flex-direction: column; margin-left: 16rpx">
						<text style="font-size: 32rpx">{{ info.userName }}</text>
						<text style="font-size: 28rpx; color: rgba(0, 0, 0, 0.4); margin-top: 8rpx">驾驶年龄 - {{ info?.drivingAge }}年</text>
					</view>
				</view>
				<label class="radio">
					<radio color="#449656" :checked="selectId === info.id" />
				</label>
			</view>
		</view>
		<view class="chooseButton">
			<button @click="back">确定选择</button>
		</view>
	</view>
</template>

<script setup>
import { getServicerByType } from '../../api/index.js';
import { onShow } from '@dcloudio/uni-app';
import { ref } from 'vue';

const list = ref([]);
const selectId = ref();

const change = (info) => {
	selectId.value = info.id;
	getApp().globalData.parkingDriverInfo = info;
};
const back=()=>{
	uni.navigateBack()
}
onShow(async () => {
	const info = getApp().globalData.parkingDriverInfo;
	getServicerByType('VALET').then((res) => {
		list.value = res.data;
		if(!info.id){
			selectId.value = res.data[0].id;
		}else{
			selectId.value =  info.id;
		}
		
	});
});

</script>

<style lang="scss" scoped>
.page {
	height: 100vh;
	display: flex;
	flex-direction: column;
	background-color: #f6f7f8;
	.main {
		flex: 1;
		.card_line {
			display: flex;
			align-items: center;
			height: 144rpx;
			justify-content: space-between;
			padding: 0 32rpx;
			background-color: white;
			border-bottom: 1rpx solid #e7e7e7;
		}

	}
	.chooseButton {
		height: 128rpx;
		padding: 20rpx 32rpx;
		background-color: white;
		box-shadow: 0px 6px 30px 5px rgba(0, 0, 0, 0.05), 0px 16px 24px 2px rgba(0, 0, 0, 0.04), 0px 8px 10px -5px rgba(0, 0, 0, 0.08);
		box-sizing: border-box;
		button {
			background-color: $bgColor;
			height: 100%;
			color: white;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
		}
	}
}
</style>
