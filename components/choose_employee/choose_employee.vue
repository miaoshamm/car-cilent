<template>
	<view class="card" style="margin-top: 16rpx" @click="open">
	  <view class="card_line" style="height: 144rpx">
	    <view style="display: flex; height: 96rpx">
				<view style="width: 96rpx;height: 96rpx;">
					<up-image width="96rpx" height="96rpx" :src="selectServicer.userAvatar" shape="circle"></up-image>
				</view>
	      <view style="display: flex; flex-direction: column; margin-left: 16rpx">
	        <text style="font-size: 32rpx">{{selectServicer.userName}}</text>
	        <text style="font-size: 28rpx; color: rgba(0, 0, 0, 0.4); margin-top: 8rpx">驾驶年龄 - {{selectServicer.drivingAge}}年</text>
	      </view>
	    </view>
	    <u-icon name="arrow-right" size="32rpx" color="rgba(0, 0, 0, 0.4)"></u-icon>
	  </view>
	</view>
	<view class="choose_employ" v-if='isShow'>
		<view class="main">
			<view  @click="()=>chooseService(info)" class="card_line" :style="{backgroundColor:selectServicer.userNo === info.userNo && '#EAFAEA'}" v-for="(info,index) in serviceList">
				<view style="display: flex; height: 96rpx">
					<view style="width: 96rpx;height: 96rpx;">
						<up-image width="96rpx" height="96rpx" :src="info.userAvatar"
							shape="circle"></up-image>
					</view>
					<view style="display: flex; flex-direction: column; margin-left: 16rpx">
						<text style="font-size: 32rpx">{{info.userName}}</text>
						<text style="font-size: 28rpx; color: rgba(0, 0, 0, 0.4); margin-top: 8rpx">驾驶年龄 - {{info.drivingAge}}年</text>
					</view>
				</view>
				<label class="radio">
					<radio v-if=" selectServicer.userNo === info.userNo " color="#449656" :checked=" selectServicer.userNo === info.userNo" />
				</label>
			</view>
		</view>
		<view class="chooseButton">
			<button @click="close">确定选择</button>
		</view>
	</view>
</template>

<script setup>
	import {getServicerByType} from '../../api/index.js'
	import {onShow} from '@dcloudio/uni-app'
	const {open,isShow,close,servicerType} = defineProps({isShow:String,close:Function,open:Function,servicerType:String})
	import {
		ref
	} from 'vue';
	const chooseService = (info) => {
		selectServicer.value = info;
	}
	const serviceList = ref([]);
	const selectServicer = ref();
	onShow(async ()=>{
		getServicerByType(servicerType).then(res=>{
			serviceList.value = res.data;
			selectServicer.value = res.data[0]
		})
	})
</script>

<style lang="scss" scoped>
	.card{
		background-color: white;
		border-radius: 16rpx;
		.card_line{
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}
	.choose_employ {
		width: 100%;
		height: 100%;
		position: absolute;
		background-color: white;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		z-index: 99;

		.main {
			flex: 1;
			background-color: white;
			display: flex;
			flex-direction: column;

			.card_line {
				display: flex;
				align-items: center;
				height: 144rpx;
				justify-content: space-between;
				padding: 0 32rpx;
				background-color: white;
				border-bottom: 1rpx solid #E7e7e7;
			}
		}

		.chooseButton {
			padding: 20rpx 32rpx;
			background-color: white;
			box-shadow: 0px 6px 30px 5px rgba(0, 0, 0, 0.05), 0px 16px 24px 2px rgba(0, 0, 0, 0.04), 0px 8px 10px -5px rgba(0, 0, 0, 0.08);
			button {
				background-color: $bgColor;
				color: white;
			}
		}
	}
</style>