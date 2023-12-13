<template>
	<view style="min-height: 100vh; background: #F6F7F8;padding: 0 16rpx; padding-top: 32rpx;" >
		<OrderCard type='evaluate' v-for="item in evaluateList" :orderInfo='item' />
	</view>
</template>

<script setup>
	import OrderCard from '../../components/order_card/order_card.vue';
	import {ref} from 'vue'
	import {onShow} from '@dcloudio/uni-app' 
	import {getUserOrderEvaluate} from '../../api/index.js'
	const evaluateList = ref()
	const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
	onShow(async ()=>{
		const list = await getUserOrderEvaluate();
		console.log(list.data);
		evaluateList.value = list.data;
	})
</script>

<style lang="scss">

</style>
