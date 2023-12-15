<template>
	<view class="menu" @click="menuClick">
		<text v-show="props.type != 'contact'" style="font-size: 32rpx;">
			<slot></slot>{{props.title}}
		</text>
		<button class="contact" v-show="props.type === 'contact'" open-type="contact">在线客服</button>
		<view class="right">
			<text>{{props.description}}</text>
			<u-icon name="arrow-right" color="#C0C3CD" size="32rpx"></u-icon>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		title: String,
		pageUrl: String,
		description: String,
		onClick: Function,
		type: String
	});
	const menuClick = () => {
		if (props.pageUrl) {
			uni.navigateTo({
				url: props.pageUrl
			})
		} else {
			props.onClick();
		}
	}
</script>

<style lang="scss" scoped>
	.menu {
		display: flex;
		height: 104rpx;
		padding: 32rpx;
		justify-content: space-between;
		box-sizing: border-box;

		.right {
			display: flex;
			font-size: 28rpx;
			color: rgba(0, 0, 0, 0.4);
		}
		
		.contact{
			font-size: 32rpx;
			color: #000;
		}
	}
</style>