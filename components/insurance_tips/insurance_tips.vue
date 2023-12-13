<template>
	<view>
		<view class="insurance"
			style="display: flex;justify-content: space-between; align-items: center;margin-top: 19rpx;">
			<view style=" display: flex;align-items: center;">
				<image src="../../static/images/order/insurance.png" style="width: 18rpx; height: 22rpx;"></image>
				<text @click="navigateBillRule('INSURANCE')" style="color: #F2995F; font-size: 24rpx;margin-left: 12rpx;">泊车保险条款</text>
			</view>
			<text @click="navigateBillRule('PRICE')" style="color:#449656;font-size: 24rpx;text-decoration: underline;">查看计费规则</text>
		</view>
		<view class="tips" style="display: flex;margin-top: 19rpx;padding-bottom: 20rpx;" v-if="props.type != 'wish'">
			<image src="../../static/images/order/tips.png" style="width: 20rpx;margin-top: 4rpx;" mode="widthFix"></image>
			<text style="font-size: 20rpx;color: #979797;margin-left: 12rpx;">温馨提示：交车后 10 分钟开始计费，取车服务需要在取车前提前 60 内分钟支付</text>
		</view>
	</view>
</template>

<script setup>
	import {defineProps} from "vue"
	const props = defineProps({
		type:String
	})
	const navigateBillRule=(type)=>{
		uni.navigateTo({
			url:`/pages/service_rules/service_rules?type=${type}`
		})
	}
</script>

<style lang="scss">

</style>