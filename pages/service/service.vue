<template>
	<view class="wrapper-p">
		<u-navbar placeholder safeAreaInsetTop :title="title === 'wish' ? '预约车辆维保' : ''" :autoBack="true"></u-navbar>
		<u-checkbox-group v-model="checkboxValue1" iconPlacement="right" @change="checkboxChange">
			<view class="check-box">
				<view class="service">
					<image src="/static/images/wish/service.png" mode=""></image>
					<view class="text">
						<text class="name">精洗服务</text>
						<text class="price">¥ 45.00</text>
					</view>
				</view>
				<u-checkbox name="check1" shape="circle" activeColor="#DFA0B1" v-if="title === 'wish'"></u-checkbox>
				<u-radio activeColor="#DFA0B1" v-else></u-radio>
			</view>
			<view class="gift">
				<view class="title">包含赠送项目</view>
				<view class="service">
					<image src="/static/images/wish/service.png" mode=""></image>
					<text class="name">更换机油</text>
				</view>
				<view class="service">
					<image src="/static/images/wish/service.png" mode=""></image>
					<text class="name">更换机油</text>
				</view>
			</view>
			<view class="check-box">
				<view class="service">
					<image src="/static/images/wish/service.png" mode=""></image>
					<view class="text">
						<text class="name">精洗服务</text>
						<text class="price">¥ 45.00</text>
					</view>
				</view>
				<u-checkbox name="" shape="circle" disabled activeColor="#DFA0B1" v-if="title === 'wish'"></u-checkbox>
				<u-radio activeColor="#DFA0B1" v-else></u-radio>
			</view>
			<view class="gift">
				<view class="title">包含赠送项目</view>
				<view class="service">
					<image src="/static/images/wish/service.png" mode=""></image>
					<text class="name">更换机油</text>
				</view>
				<view class="service">
					<image src="/static/images/wish/service.png" mode=""></image>
					<text class="name">更换机油</text>
				</view>
			</view>
		</u-checkbox-group>
		<view class="check-btn">
			<u-button text="确认选择" color="#DFA0B1"></u-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onLoad
	} from "@dcloudio/uni-app"

	const title = ref("")
	const checkboxValue1 = ref([]);

	const checkboxChange = (n) => {
		console.log('change', n);
	};

	onLoad((options) => {
		title.value = options.type
	})
</script>

<style lang="less">
	@import url("@/static/css/index.less");

	.check-box {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 24rpx 32rpx;
		border-bottom: 1px solid #E7E7E7;
	}

	.gift {
		width: 100%;

		.title {
			font-size: 28rpx;
			margin: 8rpx 0 0;
			padding: 0 32rpx;
		}

		.service {
			padding: 24rpx 32rpx;
			border-bottom: 1px solid #E7E7E7;
			width: 100%;

			image {
				width: 48rpx;
				height: 48rpx;
			}

			.name {
				font-size: 32rpx;
			}
		}

	}
</style>