<template>
	<view class="wrapper">
		<view class="">
			<text class="text-lg text-red-600">54564</text>
		</view>
	</view>
	<view class="pay-box">
		<text class="price">￥45.00</text>
		<u-button text="立即支付" type="primary" color="#DFA0B1"></u-button>
	</view>
</template>

<script setup>

</script>

<style lang="scss">
@import url("../../static/css/index.scss");
.pay-box{
	width: 100vw;
	height: 158rpx;
	display: flex;
	padding: 18rpx 40rpx 0 28rpx;
	position: fixed;
	bottom: 0;
	background: #fff;
	justify-content: space-between;
	box-sizing: border-box;
	.price{
		color: #E34D59;
		font-size: 48rpx;
		font-weight: bold;
	}
	.u-button.data-v-461e713c{
		width: 250rpx;
		margin: 0;
	}
}
</style>
