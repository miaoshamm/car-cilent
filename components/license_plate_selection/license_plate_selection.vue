<template>
	<view class="card">
		<view class="card-le">
			<text class="card-title" v-show="type === 'input'" @click="check">输入车牌</text>
			<text class="card-title" v-show="type === 'subscribe'">预约车辆</text>
			<text class="card-title" v-show="type === 'info'">车牌号码</text>
			<view class="card-le-btn">
				<button open-type="contact" style="font-size: 24rpx;margin-right: 16rpx;">联系客服</button>
				<text v-show="type === 'subscribe'" @click="cancel">取消预约</text>
			</view>
		</view>
		<view class="input">
			<view class="input_card">{{ licensePlate &&  licensePlate[0] }}</view>
			<view class="input_card">{{ licensePlate && licensePlate[1] }}</view>
			·
			<view class="input_card">{{licensePlate && licensePlate[2] }}</view>
			<view class="input_card">{{licensePlate && licensePlate[3] }}</view>
			<view class="input_card">{{licensePlate && licensePlate[4] }}</view>
			<view class="input_card">{{licensePlate && licensePlate[5] }}</view>
			<view class="input_card">{{licensePlate && licensePlate[6] }}</view>
			<view v-if=" licensePlate && licensePlate[7]" class="input_card_new" style="font-size: 32rpx">{{
        licensePlate[7]
      }}</view>
			<view v-else class="input_card_new">新能源</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineEmits,
		defineProps,
		computed,
		toRefs
	} from "vue";
	import {
		onShow
	} from "@dcloudio/uni-app";
	import {
		cancelOrder
	} from "@/api"

	const props = defineProps(["licensePlate", "type", "orderId"]);
	const emit = defineEmits(["plateNumber"]);
	const {
		licensePlate,
		type,
		orderId
	} = toRefs(props);

	// 取消预约
	const cancel = async () => {
		try {
			const userId = JSON.parse(uni.getStorageSync("userInfo")).id
			const result = await cancelOrder(userId, orderId.value)
			if (result.code == 200) {
				uni.showToast({
					title: "取消成功",
					success() {
						uni.reLaunch({
							url: '/pages/index/index'
						})
					}
				})
			} else {
				uni.showToast({
					icon: "error",
					title: "取消失败"
				})
			}
		} catch (e) {
			//TODO handle the exception
		}
	};

	// 获取车牌
	const check = () => {
		if (type.value != "input") return;
		wx.chooseLicensePlate({
			success(res) {
				emit("plateNumber", res.plateNumber);
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

		.card-le {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.card-title {
				font-size: 32rpx;
				color: $titleColor;
				font-weight: bold;
			}

			.card-le-btn {
				font-size: 24rpx;
				display: flex;
				align-items: center;

				text {
					text-decoration: underline;

					&:nth-child(1) {
						margin: 0 8rpx 0 0;
						color: $bgColor;
					}

					&:nth-child(2) {
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
			background-color: #f6f7f8;
			border-radius: 8rpx;
			font-size: 32rpx;
			color: #3d3d3d;
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