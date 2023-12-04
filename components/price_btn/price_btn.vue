<template>
	<view class="pay-box">
		<text class="price">￥{{props.price.toFixed(2)}}</text>
		<u-button text="立即支付" color="#DFA0B1" @click="goPay"></u-button>
	</view>
</template>

<script setup>
	import {defineProps} from "vue"
	const props = defineProps({
		price:Number
	})
</script>

<style lang="less">
	@import url("../../static/css/index.less");
</style>