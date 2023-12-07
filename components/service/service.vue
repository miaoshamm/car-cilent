<template>
	<view class="wrapper-p wrapper-t">
		<u-checkbox-group v-model="checkboxValue1" iconPlacement="right" @change="checkboxChange">
			<view :style="{flex:1,background:checkboxValue1.indexOf(item.name) != -1 ? '#EAFAEA' : ''}" v-for="item in infoList" :key="item.id">
				<view class="check-box">
					<view class="service">
						<image src="/static/images/wish/service.png" mode=""></image>
						<view class="text">
							<text class="name">精洗服务</text>
							<text class="price">¥ 45.00</text>
						</view>
					</view>
					<u-checkbox :name="item.name" shape="circle" activeColor="#449656"></u-checkbox>
				</view>
				<view class="gift" v-show="item.children.length != 0">
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
			</view>
		</u-checkbox-group>
		<view class="check-btn">
			<u-button text="确认选择" color="#449656"></u-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineProps,
		watch
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";

	const props = defineProps(['list']);
	
	watch(() => props.list.value,() => console.log('wtach',props.list))
	
	const checkboxChange = (n) => {
		checkboxValue1.value = n
	};
</script>

<style lang="scss" scoped>	
	.check-box {
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 24rpx 32rpx;
		border-bottom: 1px solid #e7e7e7;
		box-sizing: border-box;
	}

	.gift {
		width: 100%;

		.title {
			font-size: 28rpx;
			margin: 8rpx 0 0;
			padding: 0 32rpx;
			color: #000;
			font-weight: normal;
		}

		.service {
			padding: 24rpx 32rpx;
			border-bottom: 1px solid #e7e7e7;
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