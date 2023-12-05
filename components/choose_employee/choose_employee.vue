<template>
	<view class="choose_employ">
		<u-navbar title="预约接送服务" titleStyle="font-size:36rpx" @rightClick="rightClick" :autoBack="true" placeholder safeAreaInsetTop>
		</u-navbar>
		<view class="list " ></view>
		<view style="padding: 20rpx 32rpx; background-color: white;" class="button">
			<button>确认选择</button>
		</view>
	</view>
</template>

<script setup>
	const systemInfo = uni.getSystemInfo();
	console.log(systemInfo);
</script>

<style lang="scss" scoped>
	.choose_employ {
		height: 100vh;
		width: 100vw;
		z-index: 99;
		background-color: white;
		box-sizing: border-box;
		position: fixed;
		top: 0;
		left: 0;
		display: flex;
		flex-direction: column;
		padding-bottom: env(safe-area-inset-bottom);
		.list{
			flex:1;
			background-color: #F6F7F8;
		}
		.button{
			
		}
		
	}
</style>