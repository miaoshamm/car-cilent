<template>
	<view class="wrapper">
		<view class="box-wrapper">
			 <view class="box-title" style="border: none;">订单提成</view>
			 <view class="price">￥128</view>
		</view>
		<servicerOrderCard type="royalty"/>
	</view>
</template>

<script setup>
	import {onLoad} from "@dcloudio/uni-app"
	import servicerOrderCard from '@/components/servicer_orderr_card/servicer_orderr_card.vue'

	// 获取订单提成
	const getRoyalty = async () => {
		try {
			const result = await getAbsent(userNo.value)
			if (result.code == 200) {
			}
		} catch (e) {
		}
	}
	
	onLoad(() => {
		getRoyalty()
	})
</script>

<style>

</style>
