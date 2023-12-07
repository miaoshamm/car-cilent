<template>
	<view class="card" @click="navigateDetail">
		<view class="top">
			<view class="card_type">
			<view class="card_type_img">
				<up-image width="64rpx" height="64rpx" src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle"></up-image>
			</view>
			<text>代客泊车</text>
			</view>
			<view class="card_status" v-if=" cardType !== 'evaluate' ">
				<text v-if=" cardType === 'order'" style="color: #449656;font-size: 32rpx;">等待付款</text>
				<text v-if="cardType === 'invoice'" style="color: #449656;font-size: 32rpx;">已开票</text>
			</view>
		</view>
		<view class="size_box"></view>
		<view class="card_main">
			<view class="card_time">
				<text v-if="cardType === 'invoice'" class="card_hint_text">开票时间:</text>
				<text v-if="cardType === 'evaluate'" class="card_hint_text">评价时间:</text>
				<text v-if="cardType === 'order'" class="card_hint_text">服务时间:</text>
				<text class="card_primary_text">2034 / 10 / 17 16:41</text>
			</view>
			<view v-if=" cardType === 'evaluate' " class="card_evaluate_content">
				<text class="card_hint_text">评价内容:</text>
				<text class="card_primary_text">1231564489789564131564565</text>
			</view>
			<view class="card_info">
				<view>
					<text class="card_hint_text">服务人员:</text>
					<text class="card_primary_text">张三</text>
				</view>
				<view>
					<text class="card_hint_text">服务人员:</text>
					<text class="card_primary_text">张三</text>
				</view>
				<view>
					<text class="card_hint_text">服务人员:</text>
					<text class="card_primary_text">张三</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
	const props = defineProps({
		type:String
	});
	// 订单 order 评价 evaluate 发票 invoice 默认订单类型
	const cardType = props.type ? props.type : 'order';
	const navigateDetail=()=>{
		uni.navigateTo({
			url:'/pages/order_detail_parking/order_detail_parking'
		})
	}
</script>

<style lang="scss" scoped>
.card{
		min-height: 328rpx;
		background-color: white;
		border-radius: 16rpx;
		box-sizing: border-box;
		padding: 16rpx 32rpx;
		display: flex;
		flex-direction: column;
		margin-bottom: 16rpx;
		.top{
			display: flex;
			margin-bottom: 16rpx;
			justify-content: space-between;
			align-items: center;
			font-size: 32rpx;
			.card_type{
				display: flex;
				align-items: center;
				.card_type_img{
					margin-right: 16rpx;
				}
			}
		}
		.size_box{
			height: 1rpx;
			background-color: #E7E7E7;
		}
		.card_main{
			flex:1;
			padding-top: 32rpx;
			.card_time{
				display: flex;
				flex-direction: column;
			}
			.card_evaluate_content{
				display: flex;
				flex-direction: column;
				margin: 16rpx 0;
			}
			.card_hint_text{
				font-size: 28rpx;
				color: rgba(0, 0, 0, 0.6);
			}
			.card_primary_text{
				font-size: 32rpx;
			}
			.card_info{
				display: grid;
				  grid-template-columns: repeat(3, 33.33%);
				view{
					display: flex;
					flex-direction: column;
				}
			}
		}
	}
</style>