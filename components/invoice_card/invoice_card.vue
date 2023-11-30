<template>
	<view class="invoice_card">
		<view class="top">
			<view class="invoice_type">
			<view class="invoice_type_img">
				<up-image width="64rpx" height="64rpx" src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle"></up-image>
			</view>
			<text>代客泊车</text>
			</view>
			<view class="invoice_status">已开票</view>
		</view>
		<view class="size_box"></view>
		<view class="invoice_main">
			<view class="invoice_time">
				<text class="invoice_title">开票时间:</text>
				<text class="invoice_content">2034 / 10 / 17 16:41</text>
			</view>
			<view class="invoice_service_info">
				<view>
					<text class="invoice_title">服务人员:</text>
					<text class="invoice_content">张三</text>
				</view>
				<view>
					<text class="invoice_title">服务人员:</text>
					<text class="invoice_content">张三</text>
				</view>
				<view>
					<text class="invoice_title">服务人员:</text>
					<text class="invoice_content">张三</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps();
	
</script>

<style lang="scss" scoped>
.invoice_card{
		height: 328rpx;
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
			.invoice_type{
				display: flex;
				align-items: center;
				.invoice_type_img{
					margin-right: 16rpx;
				}
			}
		}
		.size_box{
			height: 1rpx;
			background-color: #E7E7E7;
		}
		.invoice_main{
			flex:1;
			padding-top: 32rpx;
			.invoice_time{
				display: flex;
				flex-direction: column;
			}
			.invoice_title{
				font-size: 28rpx;
				color: rgba(0, 0, 0, 0.6);
			}
			.invoice_content{
				font-size: 32rpx;
			}
			.invoice_service_info{
				display: flex;
				justify-content: space-around;
				view{
					display: flex;
					flex-direction: column;
					
				}
			}
		}
	}
</style>