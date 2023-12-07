<template>
	<view class="card" style="margin-top: 16rpx" @click="open">
	  <view class="card_line" style="height: 144rpx">
	    <view style="display: flex; height: 96rpx">
				<view style="width: 96rpx;height: 96rpx;">
					<up-image width="96rpx" height="96rpx" src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle"></up-image>
				</view>
	      <view style="display: flex; flex-direction: column; margin-left: 16rpx">
	        <text style="font-size: 32rpx">刘师傅</text>
	        <text style="font-size: 28rpx; color: rgba(0, 0, 0, 0.4); margin-top: 8rpx">驾驶年龄 - 10年</text>
	      </view>
	    </view>
	    <u-icon name="arrow-right" size="32rpx" color="rgba(0, 0, 0, 0.4)"></u-icon>
	  </view>
	</view>
	<view class="choose_employ" v-if='isShow'>
		<view class="main">
			<view  @click="()=>chooseService(index)" class="card_line" :style="{backgroundColor:serviceIndex === index && '#EAFAEA'}" v-for="(_,index) in 8">
				<view style="display: flex; height: 96rpx">
					<view style="width: 96rpx;height: 96rpx;">
						<up-image width="96rpx" height="96rpx" src="https://cdn.uviewui.com/uview/album/1.jpg"
							shape="circle"></up-image>
					</view>
					<view style="display: flex; flex-direction: column; margin-left: 16rpx">
						<text style="font-size: 32rpx">刘师傅{{index}}</text>
						<text style="font-size: 28rpx; color: rgba(0, 0, 0, 0.4); margin-top: 8rpx">驾驶年龄 - 10年</text>
					</view>
				</view>
				<label class="radio">
					<radio v-if=" serviceIndex === index " color="#449656" :checked=" serviceIndex === index" />
				</label>
			</view>
		</view>
		<view class="chooseButton">
			<button @click="close">确定选择</button>
		</view>
	</view>
</template>

<script setup>
	const {open,isShow,close} = defineProps({isShow:String,close:Function,open:Function()})
	import {
		ref
	} from 'vue';
	const serviceIndex = ref(0);
	const chooseService = (index) => {
		serviceIndex.value = index;
	}
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