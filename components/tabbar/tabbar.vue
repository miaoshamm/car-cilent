<template>
	<u-tabbar :border="false" activeColor="#449656" :value="value1"
		:fixed="true" :placeholder="true" :safeAreaInsetBottom="false">
		<u-tabbar-item text="首页" @click="click1">
			<template #active-icon>
				<image style="width: 44rpx;height: 40rpx;margin: 0 0 6rpx" src="/static/images/tabbar/index-active.png">
				</image>
			</template>
			<template #inactive-icon>
				<image style="width: 44rpx;height: 40rpx;margin: 0 0 6rpx" src="/static/images/tabbar/index.png"></image>
			</template>
		</u-tabbar-item>
		<u-tabbar-item text="我的订单" @click="click1">
			<template #active-icon>
				<image style="width: 36rpx;height: 40rpx;margin:0 0 6rpx" src="/static/images/tabbar/orders-active.png">
				</image>
			</template>
			<template #inactive-icon>
				<image style="width: 36rpx;height: 40rpx;margin:0 0 6rpx" src="/static/images/tabbar/orders.png"></image>
			</template>
		</u-tabbar-item>
		<u-tabbar-item text="个人中心" @click="click1">
			<template #active-icon>
				<image style="width: 32rpx;height: 42rpx;margin:0 0 6rpx" src="/static/images/tabbar/account-active.png">
				</image>
			</template>
			<template #inactive-icon>
				<image style="width: 32rpx;height: 42rpx;margin:0 0 6rpx" src="/static/images/tabbar/account.png"></image>
			</template>
		</u-tabbar-item>
	</u-tabbar>
</template>

<script setup>
	import { ref,defineProps } from 'vue';
	const props = defineProps({
		value:Number
	})
	const value1 = props.value
	
	const click1 = (index) => {
		let url = ""
		if (index === 0) {
			url = "/pages/index/index"
		} else if (index === 1) {
			url = "/pages/orders/orders"
		} else {
			url = "/pages/account/account"
		}
		uni.switchTab({
			url
		})
	}
</script>

<style>
</style>