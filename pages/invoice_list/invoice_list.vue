<template>
	<view class="main">
		<InvoiceCard></InvoiceCard>
		<InvoiceCard></InvoiceCard>
		<InvoiceCard></InvoiceCard>
		<InvoiceCard></InvoiceCard>
		<InvoiceCard></InvoiceCard>
		<InvoiceCard></InvoiceCard>
	</view>
</template>

<script setup>
	import InvoiceCard from '../../components/invoice_card/invoice_card.vue'
</script>

<style lang="scss" scoped>
.main{
	padding: 0 16rpx;
	padding-top: 32rpx;
	background-color: #E7E7E7;
	height: 100vh;
	
}
</style>
