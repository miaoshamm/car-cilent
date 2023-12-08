<template>
	<view style="display: flex;flex-direction: column;height: 100vh;background-color: #449656;">
		<u-navbar placeholder safeAreaInsetTop bg-color="#449656">
			<template #left>
				<text style="font-size:36rpx;font-weight: bold;color: white;margin-left: 16rpx;">城市生活</text>
			</template>
		</u-navbar>
		<view style="height: 14rpx;" />
		<view class="main">
			<view class="clockInCard">
				<view class="left">
					<view style="display: flex;flex-direction: column;">
						<text style="font-size: 36rpx;">上班打卡</text>
					<text style="font-size: 32rpx;color: #7787A2;margin-top: 8rpx;">7:30</text>
					</view>
					<text style="font-size: 32rpx;color: #7787A2;">请按时打卡</text>
				</view>
				<view class="">
					<image src="../../static/images/servicer/clockIn.png" mode="widthFix" style="width: 100rpx;"></image>
				</view>
				
			</view>
			<view style="padding: 16rpx;">
				<servicerOrderCard/>
				<servicerOrderCard/>
				<servicerOrderCard/>
				<servicerOrderCard/>
				<servicerOrderCard/>
			</view>
		</view>
		<Tabbar :value="0" />
	</view>
</template>

<script setup>
	import Tabbar from "@/components/tabbar/tabbar.vue"
	import servicerOrderCard from '../../components/servicer_orderr_card/servicer_orderr_card.vue'
</script>

<style lang="scss" scoped>
.main{
	flex: 1;
	background-color: #F6F7F8;
	border-top-left-radius: 32rpx;
	border-top-right-radius: 32rpx;
	overflow: hidden;
	overflow-y: scroll;
	.clockInCard{
		padding:32rpx;
		height: 212rpx;
		background-color: white;
		display: flex;
		justify-content: space-between;
		align-items: flex-end;
		box-sizing: border-box;
		.left{
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
		}
	}
}
</style>
