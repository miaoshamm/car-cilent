<template>
	<view class="card" @click="check">
		<view class="card-le">
			<text class="card-title">输入车牌</text>
			<text class="card-title" v-show="showSubscribe">预约车辆</text>
			<text class="card-title" v-show="showPlate">车牌号码</text>
			<view class="card-le-btn" v-show="showSubscribe">
				<text>联系客服</text>
				<text>取消预约</text>
			</view>
		</view>
		<view class="input">
			<view class="input_card">{{licensePlate[0]}}</view>
			<view class="input_card">{{licensePlate[1]}}</view>
			·
			<view class="input_card">{{licensePlate[2]}}</view>
			<view class="input_card">{{licensePlate[3]}}</view>
			<view class="input_card">{{licensePlate[4]}}</view>
			<view class="input_card">{{licensePlate[5]}}</view>
			<view class="input_card">{{licensePlate[6]}}</view>
			<view class="input_card_new" style="font-size: 32rpx;">{{licensePlate[7]}}</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineEmits,
		defineProps
	} from 'vue';
	import {onLoad} from "@dcloudio/uni-app"

	const props = defineProps(['licensePlate'])
	const emit = defineEmits(['plateNumber'])
	let licensePlate = ref("")
	let showSubscribe = ref(false)
	let showPlate = ref(false)
	
	onLoad(() => {
		if(props.licensePlate){
			licensePlate.value = props.licensePlate
		}
	})

	// 获取车牌
	const check = () => {
		wx.chooseLicensePlate({
			success(res) {
				emit('plateNumber', res.plateNumber)
				licensePlate.value = res.plateNumber;
			},
		});
	};
</script>

<style lang="scss">
	.card {
		height: 209rpx;
		border: 1px solid #fff;
		border-radius: 16rpx;
		background: $linearBgColor;
		box-sizing: border-box;
		padding: 24rpx;
		
		.card-le{
			display: flex;
			justify-content: space-between;
			align-items: center;
			.card-title{
				font-size: 32rpx;
				color: $titleColor;
				font-weight: bold;
			}
			.card-le-btn{
				font-size: 20rpx;
				text{
					text-decoration: underline;
					&:nth-child(1){
						margin: 0 8rpx 0 0;
						color: $bgColor;
					}
					&:nth-child(2){
						color: $infoColor;
					}
				}
			}
		}

		.input {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 22rpx;
		}

		.input_card {
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

		.input_card_new {
			width: 66rpx;
			height: 80rpx;
			border: 1px dashed $bgColor;
			box-sizing: border-box;
			background-color: $cardColor;
			border-radius: 8rpx;
			color: $bgColor;
			font-size: 18rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>