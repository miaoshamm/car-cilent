<template>
	<view>
		<!-- 顶部导航 -->
		<view class="nav">
			<text class="nav-title">城市服务代客泊车小程序</text>
		</view>
		<view class="main">
			<u-notice-bar bgColor="#F6F7F8" icon="/static/images/index/notice.svg"
				text="这是一条公告，这是一条公告，这是一条公告，这是，"></u-notice-bar>
			<view class="swiper">
				<u-swiper indicator indicatorMode="line" circular :list="banner" @click="bannerClick"></u-swiper>
			</view>
			<view class="grid">
				<u-grid :border="false" col="5">
					<u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex">
						<u-icon :name="listItem.name" :size="48"></u-icon>
						<text class="grid-text">{{listItem.title}}</text>
						<text class="grid-text-small" :style="{opacity: listItem.small != '洗车服务' ? 1 : 0}">{{listItem.small}}</text>
					</u-grid-item>
				</u-grid>
			</view>
			<view class="subscribe">
				<view class="sub-le">
					<text class="sub-le-title">预约车辆：粤 AA63221</text>
					<text class="sub-le-small">预约泊车时间：2023 年 11 月 22 日 00:00</text>
				</view>
				<text class="sub-detail">查看详情</text>
			</view>
			<view class="supermarket">
				<view class="super-title">线上生活超市</view>
				<view class="super-content">
					<view class="super-content-le">
						<image src="/static/images/index/supermarket.png" mode=""></image>
					</view>
					<view class="super-content-ri">
						<view class="super-cotent-title">司美全网最低价</view>
						<view class="super-cotent-small">夏天来了，肉肉藏不住</view>
						<u-button :disabled="true" text="即将上线" shape="circle" color="#DFA0B1"></u-button>
					</view>
				</view>
			</view>
			<view class="driver">
				<view class="driver-title">
					<u-cell :border="false" :isLink="true" title="精选司机" value="立即泊车"></u-cell>
				</view>
				<view class="grid">
					<u-grid :border="false" col="3">
						<u-grid-item v-for="(listItem,listIndex) in list" :key="listIndex">
							<u-icon :name="listItem.name" :size="48"></u-icon>
							<text class="grid-text">{{listItem.title}}</text>
							<text class="grid-text-small">{{listItem.small}}</text>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
		</view>
		<u-tabbar style="height: 128rpx;border-top: 4px solid #eee;" :border="false" activeColor="#DFA0B1" :value="value1"
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
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	const value1 = ref(0)
	const banner = ref([
		'https://cdn.uviewui.com/uview/swiper/swiper1.png',
		'https://cdn.uviewui.com/uview/swiper/swiper2.png',
		'https://cdn.uviewui.com/uview/swiper/swiper3.png',
	])
	const list = ref([{
			name: '/static/images/index/grid1.png',
			title: '代客泊车',
			small: "中山六院"
		},
		{
			name: '/static/images/index/grid2.png',
			title: '代客泊车',
			small: "临江大道"
		},
		{
			name: '/static/images/index/grid3.png',
			title: '洗车服务',
			small: "洗车服务"
		},
		{
			name: '/static/images/index/grid4.png',
			title: '患者接送',
			small: "中山六院"
		},
		{
			name: '/static/images/index/grid5.png',
			title: '职工泊车',
			small: "中山六院"
		}
	])

	const driver = ref([
		{
			name: '/static/images/index/grid1.png',
			title: '代客泊车',
			small: "中山六院"
		},
		{
			name: '/static/images/index/grid1.png',
			title: '代客泊车',
			small: "中山六院"
		},
		{
			name: '/static/images/index/grid1.png',
			title: '代客泊车',
			small: "中山六院"
		},
	])

	const bannerClick = () => {

	}
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

<style lang="scss" scoped>
	@import url("../../static/css/index.scss");
	$color: #DFA0B1;

	.nav {
		height: 208rpx;
		background: #DFA0B1;
		display: flex;
		align-items: center;

		.nav-title {
			font-size: 32rpx;
			font-weight: 500;
			color: #fff;
			margin: 48rpx 0 0 60rpx;
		}
	}

	.main {
		background: #F6F7F8;
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		position: relative;
		top: -30rpx;
		overflow: hidden;
		padding: 0 32rpx;

		.swiper {
			margin: 24rpx auto;
			border-radius: 32rpx;
			overflow: hidden;
		}

		.grid {
			.grid-text {
				font-size: 28rpx;
				margin: 8rpx 0 0;
			}

			.grid-text-small {
				font-size: 20rpx;
				margin: 10rpx 0 0;
			}
		}

		.subscribe {
			display: flex;
			height: 128rpx;
			border-radius: 24rpx;
			background: #fff;
			box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.03);
			justify-content: space-between;
			padding: 0 28rpx;
			margin: 24rpx 0 0;

			.sub-le {
				display: flex;
				flex-direction: column;

				.sub-le-title {
					font-size: 28rpx;
					margin: 24rpx 0 0;
				}

				.sub-le-small {
					font-size: 24rpx;
					margin: 10rpx 0 0;
				}
			}

			.sub-detail {
				font-size: 24rpx;
				margin: 24rpx 0 0;
				color: $color;
			}
		}

		.supermarket {
			padding: 30rpx 24rpx 24rpx;
			background-color: #fff;
			border-radius: 24rpx;
			margin: 18rpx 0 0;

			.super-title {
				font-size: 30rpx;
				color: $color;
				margin: 0 0 34rpx;
			}

			.super-content {
				display: flex;
				justify-content: flex-start;

				.super-content-le {
					width: 208rpx;

					image {
						width: 100%;
						height: 256rpx;
					}
				}

				.super-content-ri {
					margin: 0 0 0 24rpx;

					.super-cotent-title {
						font-size: 28rpx;
						margin: 8rpx 0;
					}

					.super-cotent-small {
						font-size: 26rpx;
						margin: 0 0 76rpx;
						color: rgba(0, 0, 0, .5);
					}
				}
			}
		}

		.driver {
			.driver-title {
				margin: 46rpx 0 24rpx;
			}
		}
	}
</style>