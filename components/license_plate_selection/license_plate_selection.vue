<template>
	<view class="card" @click="uni.chooseLicensePlate();">
		<text style="font-size: 32rpx;">输入车牌</text>
		<view v-if='licensePlate.length === 7' class="input">
			<view  class="input_card" >{{licensePlate[0]}}</view>
			<view class="input_card" >{{licensePlate[1]}}</view>
			·
			<view class="input_card" >{{licensePlate[2]}}</view>
			<view class="input_card" >{{licensePlate[3]}}</view>
			<view class="input_card" >{{licensePlate[4]}}</view>
			<view class="input_card" >{{licensePlate[5]}}</view>
			<view class="input_card" >{{licensePlate[6]}}</view>
			<view class="input_card_new">新能源</view> 
		</view>
		<view v-else class="input">
			<view class="input_card" >{{licensePlate[0]}}</view>
			<view class="input_card" >{{licensePlate[1]}}</view>
			·
			<view class="input_card" >{{licensePlate[2]}}</view>
			<view class="input_card" >{{licensePlate[3]}}</view>
			<view class="input_card" >{{licensePlate[4]}}</view>
			<view class="input_card" >{{licensePlate[5]}}</view>
			<view class="input_card" >{{licensePlate[6]}}</view>
			<view class="input_card_new" style="font-size: 32rpx;">{{licensePlate[7]}}</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		licensePlate:String
	})
	const licensePlate =props.licensePlate ?   props.licensePlate.split('') : [];
</script>

<style lang="scss">
.card{
	height: 209rpx;
	border: 1px solid #fff;
	border-radius: 16rpx;
	background:  $linearBgColor;
	box-sizing: border-box;
	padding: 24rpx;
	.input{
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 22rpx;
	}
	.input_card{
		width: 66rpx;
		height: 80rpx;
		background-color: #F6F7F8;
		border-radius: 8rpx;
		font-size: 32rpx;
		color: #3D3D3D;
		font-weight: normal;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.input_card_new{
		width: 66rpx;
		height: 80rpx;
		border: 1px dashed $bgColor;
		box-sizing: border-box;
		background-color: $cardColor;
		border-radius: 8rpx;
		color:$bgColor;
		font-size: 18rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}
</style>