<template>
	<view class="menu" @click="menuClick">
		<text style="font-size: 36rpx;"><slot></slot>{{props.title}}</text>
		<view class="right">
			<text>{{props.description}}</text>
			<u-icon name="arrow-right" color="#C0C3CD" size="28"></u-icon>
		</view>
	</view>
</template>

<script setup>
	const props = defineProps({
		title:String,
		pageUrl:String,
		description:String
	});
	const menuClick=()=>{
		if(props.pageUrl){
			uni.navigateTo({
			url:props.pageUrl
		})
		}else{
			props.onClick();
		}
	}
</script>

<style lang="scss" scoped>
.menu{
			display: flex;
			height: 104rpx;
			padding: 32rpx;
			justify-content: space-between;
			box-sizing: border-box;
			.right{
				display: flex;
				font-size: 28rpx;
				color: rgba(0, 0, 0, 0.4);
			}
		}
</style>