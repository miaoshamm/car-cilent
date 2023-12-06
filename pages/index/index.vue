<template>
	<u-modal @confirm="closeModel" confirmColor="#449656" :show="model.show" :title="model.title"
		:content="model.content"></u-modal>
	<view style="min-height: 100vh; background: #f6f7f8">
		<!-- 顶部导航 -->
		<view class="nav">
			<text class="nav-title">城市生活</text>
		</view>
		<view class="main">
			<u-notice-bar bgColor="#F6F7F8" icon="/static/images/index/notice.svg"
				text="这是一条公告，这是一条公告，这是一条公告，这是，"></u-notice-bar>
			<view class="swiper">
				<u-swiper indicator indicatorMode="line" circular :list="banner" @click="bannerClick"></u-swiper>
			</view>
			<view class="grid">
				<u-grid :border="false" col="5">
					<u-grid-item v-for="(listItem, listIndex) in list" :key="listIndex" @click="goService(listItem.url)">
						<u-icon :name="listItem.name" :size="48"></u-icon>
						<text class="grid-text">{{ listItem.title }}</text>
						<text class="grid-text-small"
							:style="{ opacity: listItem.small != '洗车服务' ? 1 : 0 }">{{ listItem.small }}</text>
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
				<image class="super-bg" src="../../static/images/index/card-bg.png" mode=""></image>
				<view class="super-box">
					<view class="super-title">线上生活超市</view>
					<view class="super-content">
						<view class="super-content-le">
							<image src="/static/images/index/supermarket.png" mode=""></image>
						</view>
						<view class="super-content-ri">
							<view class="super-cotent-title">司美全网最低价</view>
							<view class="super-cotent-small">夏天来了，肉肉藏不住</view>
							<u-button :disabled="true" text="即将上线" shape="circle" color="#449656"></u-button>
						</view>
					</view>
				</view>
			</view>
			<view class="driver">
				<view class="cell-title">
					<u-cell :border="false" :isLink="true" title="精选司机" value="立即泊车"></u-cell>
				</view>
				<view class="grid">
					<u-grid :border="false" col="3">
						<u-grid-item v-for="(listItem, listIndex) in driver" :key="listIndex">
							<u-icon :name="listItem.name" :size="100"></u-icon>
							<text class="grid-text">{{ listItem.title }}</text>
							<text class="grid-text-small">{{ listItem.small }}</text>
						</u-grid-item>
					</u-grid>
				</view>
				<view class="review">
					<view class="review-title">
						<up-avatar :size="32" src="http://run.czjscktd.com/help-thing/lkr.jpg"></up-avatar>
						<text>刘德华</text>
					</view>
					<view class="review-content">
						服务人员态度非常友好，让我感到非常舒适和放松。他们总是微笑着迎接我，耐心地解答我的问题，让我感受到了宾至如归的感觉。下次来泊车时，我一定会再次选择这家店，并向我的朋友和家人推荐。
					</view>
				</view>
			</view>
			<view class="maintenance">
				<view class="cell-title">
					<u-cell :border="false" :isLink="true" title="精选维保服务" va lue="立即保养"></u-cell>
				</view>
				<view class="maintenance-box">
					<image src="/static/images/index/maintenance.png" mode=""></image>
					<view class="tenance-box-ri">
						<text class="title">车辆精洗服务</text>
						<up-text :lines="2" size="13" color="#666" text="为您的爱车提供最佳的外观和内部清洁效果
						为您的爱车提供最佳的外观和内部清洁效果为您的爱车提供最佳的外观和内部清洁效果"></up-text>
						<text class="price">¥99</text>
					</view>
				</view>
				<view class="maintenance-box">
					<image src="/static/images/index/maintenance.png" mode=""></image>
					<view class="tenance-box-ri">
						<text class="title">车辆精洗服务</text>
						<up-text :lines="2" text="为您的爱车提供最佳的外观和内部清洁效果
						为您的爱车提供最佳的外观和内部清洁效果为您的爱车提供最佳的外观和内部清洁效果"></up-text>
						<text class="price">¥99</text>
					</view>
				</view>
				<view class="maintenance-box">
					<image src="/static/images/index/maintenance.png" mode=""></image>
					<view class="tenance-box-ri">
						<text class="title">车辆精洗服务</text>
						<up-text :lines="2" text="为您的爱车提供最佳的外观和内部清洁效果
						为您的爱车提供最佳的外观和内部清洁效果为您的爱车提供最佳的外观和内部清洁效果"></up-text>
						<text class="price">¥99</text>
					</view>
				</view>
			</view>
		</view>
		<Tabbar :value="0" />
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import Tabbar from "@/components/tabbar/tabbar.vue";
	const banner = ref([
		"https://cdn.uviewui.com/uview/swiper/swiper1.png",
		"https://cdn.uviewui.com/uview/swiper/swiper2.png",
		"https://cdn.uviewui.com/uview/swiper/swiper3.png",
	]);
	const list = ref([{
			name: "/static/images/index/grid1.png",
			title: "代客泊车",
			small: "中山六院",
		},
		{
			name: "/static/images/index/grid2.png",
			title: "代客泊车",
			small: "临江大道",
		},
		{
			name: "/static/images/index/grid3.png",
			title: "洗车服务",
			small: "临江大道",
			url: "/pages/wish/wish",
		},
		{
			name: "/static/images/index/grid4.png",
			title: "患者接送",
			small: "中山六院",
			url: "/pages/pick_up/pick_up",
		},
		{
			name: "/static/images/index/grid5.png",
			title: "职工泊车",
			small: "中山六院",
			url: "/pages/staff/staff",
		},
	]);
	const driver = ref([{
			name: "/static/images/index/driver.png",
			title: "黄思亮",
			small: "驾龄：10年",
		},
		{
			name: "/static/images/index/driver.png",
			title: "黄思亮",
			small: "驾龄：10年",
		},
		{
			name: "/static/images/index/driver.png",
			title: "黄思亮",
			small: "驾龄：10年",
		},
		{
			name: "/static/images/index/driver.png",
			title: "黄思亮",
			small: "驾龄：10年",
		},
		{
			name: "/static/images/index/driver.png",
			title: "黄思亮",
			small: "驾龄：10年",
		},
		{
			name: "/static/images/index/driver.png",
			title: "黄思亮",
			small: "驾龄：10年",
		},
	]);
	const model = ref({
		show: true,
		title: "协议声明",
		content: `
		本人同意依据本确认单将车辆交于广东城市实业有限公司代客泊车服务，并愿意在提车前支付相关泊车费、代客泊车费等费用。在此声明，车辆在移交广东城市实业有限公司之前，本人已提醒车主自行收起贵重物品，并将车内物品妥善保管。如有任何遗失，车主将自行承担相应责任。
		同时，本人承诺如在路途接送车过程中发生意外，我将无条件协助广东城市实业有限公司通过保险公司途径进行维修处理。我理解并同意，广东城市实业有限公司对于车辆的安全负有合理的义务，但车主也应自行保管好个人财物，以免造成不必要的损失。
		此外，本人还同意遵守广东城市实业有限公司的相关规定和要求，包括但不限于停车时间限制、停车场规定等。如有违反，我愿意承担相应的法律责任和经济赔偿。
		最后，本人郑重声明以上内容属实，并愿意承担因违反本声明所产生的一切后果。
		`,
	});

	const goService = (url) => {
		uni.navigateTo({
			url,
		});
	};
	const closeModel = () => {
		model.value.show = false;
	};

	const bannerClick = () => {};
</script>

<style lang="scss" scoped>
	::v-deep .u-cell__title-text.data-v-b4243719 {
		font-size: 36rpx;
		font-weight: bold;
	}

	.nav {
		height: 208rpx;
		background: $bgColor;
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
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		position: relative;
		top: -30rpx;
		overflow: hidden;
		padding: 0 32rpx;
		background: #f6f7f8;

		.swiper {
			margin: 24rpx auto;
			border-radius: 32rpx;
			overflow: hidden;
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
				color: $bgColor;
			}
		}

		.supermarket {
			padding: 30rpx 24rpx 24rpx;
			border-radius: 24rpx;
			margin: 18rpx 0 0;
			position: relative;

			.super-bg {
				position: absolute;
				top: -20rpx;
				left: -30rpx;
				z-index: 0;
				width: 108%;
				height: 116%;
			}

			.super-box {
				position: relative;
				z-index: 100;

				.super-title {
					font-size: 30rpx;
					color: $bgColor;
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
							color: rgba(0, 0, 0, 0.5);
						}
					}
				}
			}
		}

		.driver {
			.grid {
				.grid-text {
					margin: -20rpx 0 0;
				}
			}
		}

		.review {
			margin: 82rpx 0 0;
			padding: 30rpx 24rpx;
			background: #fff;
			border-radius: 32rpx;

			.review-title {
				display: flex;
				align-items: center;

				text {
					font-size: 26rpx;
					margin: 0 0 0 24rpx;
				}
			}

			.review-content {
				font-size: 26rpx;
				margin: 12rpx 0 0;
			}
		}

		.maintenance {
			.maintenance-box {
				display: flex;
				padding: 24rpx;
				box-sizing: border-box;
				border-radius: 24rpx;
				background: #fff;
				box-shadow: 0px 8px 20px 0px rgba(0, 0, 0, 0.06);
				margin: 0 0 24rpx;

				image {
					width: 208rpx;
					height: 256rpx;
				}

				.tenance-box-ri {
					flex: 1;
					margin: 0 0 0 24rpx;

					.title {
						font-size: 36rpx;
						font-weight: bold;
						margin: 0 0 16rpx;
						display: block;
						color: #000;
					}

					.price {
						font-size: 44rpx;
						font-weight: bold;
						margin: 36rpx 0 0;
						display: block;
					}
				}
			}
		}

		.cell-title {
			margin: 46rpx 0 0;
		}
	}
</style>