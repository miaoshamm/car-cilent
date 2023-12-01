<template>
	<view style="min-height: 100vh; background: #F6F7F8;padding: 0 16rpx; padding-top: 32rpx;">
		<OrderCard type='invoice' />
		<OrderCard type='invoice' />
		<OrderCard type='invoice' />
		<OrderCard type='invoice' />
	</view>
</template>

<script setup>
	import OrderCard from '../../components/order_card/order_card.vue';
</script>

<style lang="scss" scoped>

</style>
