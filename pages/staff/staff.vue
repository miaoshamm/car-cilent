<template>
	<view class="wrapper">
		<view class="card-auth">
			<view class="service">
				<image :src="userInfo.avatarUrl" mode=""></image>
				<view class="text">
					<text class="name">{{userInfo.nickName}}</text>
					<text class="normal">已认证职工身份</text>
				</view>
			</view>
			<view class="info" @click="showInfo">
				<text class="text">查看信息</text>
				<u-icon name="arrow-right" size="32rpx" color="rgba(0,0,0,.26)"></u-icon>
			</view>
		</view>
		<view class="discounts">
			<view class="dis-title">优惠服务</view>
			<view class="grid">
				<u-grid :border="false" col="5">
					<u-grid-item @click="goParking">
						<u-icon name="/static/images/index/grid1.png" :size="48"></u-icon>
						<text class="grid-text">代客泊车</text>
						<text class="grid-text-small">中山六院</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
	</view>
</template>
<script setup>
	import { ref } from 'vue';
	import {onLoad} from "@dcloudio/uni-app"
	import {getEmployeeCertification} from "@/api"
	const userInfo = ref("")
	
	const goParking = () => {
		uni.navigateTo({
			url:'/pages/parking_hospital/parking_hospital'
		})
	}
	
	// 查看信息
	const showInfo = () => {
		uni.navigateTo({
			url:"/pages/staff/detail/detail"
		})
	};
	
	onLoad(() => {
		userInfo.value = JSON.parse(uni.getStorageSync("userInfo"))
	})

</script>

<style lang="scss" scoped>
	.card-auth {
		background: #fff;
		border-radius: 16rpx;
		display: flex;
		justify-content: space-between;
		padding: 32rpx;

		.info {
			display: flex;
			align-items: center;
			color: rgba(0, 0, 0, 0.4);
			font-size: 24rpx;

			.text {
				margin: 0 22rpx 0 0;
			}
		}
	}

	.discounts {
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx 32rpx;
		margin: 16rpx 0 0;

		.dis-title {
			margin: 0 0 16rpx;
		}
	}
</style>