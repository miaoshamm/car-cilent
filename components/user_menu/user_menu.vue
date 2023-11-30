<template>
	<view class="menu" @click="menuClick">
		<text style="font-size: 36rpx;"><slot></slot>{{props.title}}</text>
		<view>
			<u-icon name="arrow-right" color="#C0C3CD" size="28"></u-icon>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps(['title','pageUrl']);
	const menuClick=()=>{
		uni.navigateTo({
			url:props.pageUrl
		})
	}
</script>

<style>
.menu{
			display: flex;
			height: 104rpx;
			padding: 32rpx;
			justify-content: space-between;
			box-sizing: border-box;
			
		}
</style>