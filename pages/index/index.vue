<template>
	<u-modal @confirm="closeModel" confirmColor="#449656" :show="model.show" :title="model.title">
		<view v-html="model.content"></view>
		<template #confirmButton>
			<button @getphonenumber="getPhoneNumber" style="background-color: transparent; width: 100%; color: #449656"
				open-type="getPhoneNumber">确认</button>
		</template>
	</u-modal>
	<view style="min-height: 100vh; background: #f6f7f8">
		<!-- 顶部导航 -->
		<view class="nav">
			<text class="nav-title">城市生活</text>
		</view>
		<view class="main">
			<u-notice-bar direction="column" bgColor="#F6F7F8" icon="/static/images/index/notice.svg"
				:text="notice"></u-notice-bar>
			<view class="swiper">
				<u-swiper keyName="bannerImageUrl" indicator indicatorMode="line" circular :list="banner" @click="bannerClick"
					height="306rpx"></u-swiper>
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
			<view class="subscribe" v-for="item in subscribeList" :key="item.id">
				<view class="sub-le">
					<text class="sub-le-title">预约车辆：{{ item.carNo }}</text>
					<text class="sub-le-small">预约泊车时间：{{ dayjs(item.reservationTime).format("YYYY年MM月DD日 HH:mm:ss") }}</text>
				</view>
				<text class="sub-detail" @click="goDetail('order_detail_parking', item.orderNo)">查看详情</text>
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
					<u-cell @click="goDetail('parking_hospital', null)" :border="false" :isLink="true" title="精选司机"
						value="立即泊车"></u-cell>
				</view>
				<view class="grid">
					<u-grid :border="false" col="3">
						<u-grid-item v-for="(listItem, listIndex) in driver" :key="listIndex"
							@click="goDetail('parking_hospital', listItem.id)">
							<image :src="listItem.userAvatar" mode=""></image>
							<text class="grid-driver">{{ listItem.userName }}</text>
							<text class="grid-driver-small">驾龄：{{ listItem.drivingAge }}年</text>
						</u-grid-item>
					</u-grid>
				</view>
				<swiper v-show="evaluate.length">
					<swiper-item v-for="item in evaluate" :key="item.id">
						<view class="review">
							<view class="review-title">
								<up-avatar :size="32" :src="item.avatarUrl"></up-avatar>
								<text>{{ item.userName }}</text>
							</view>
							<view class="review-content">
								{{ item.evaluateContent }}
							</view>
						</view>
					</swiper-item>
				</swiper>
			</view>
			<view class="maintenance">
				<view class="cell-title">
					<u-cell @click="goDetail('wish', null)" :border="false" :isLink="true" title="精选维保服务" va lue="立即保养"></u-cell>
				</view>
				<view class="maintenance-box" v-for="item in carServiceList" :key="item.id" @click="goDetail('wish', item.id)">
					<image :src="item.serviceImageUrl" mode=""></image>
					<view class="tenance-box-ri">
						<text class="title">{{ item.serviceName }}</text>
						<up-text :lines="2" size="13" color="#666" :text="item.serviceDescription"></up-text>
						<text class="price">¥{{ item.servicePrice }}</text>
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
	import dayjs from "dayjs";
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app";
	import {
		getBanner,
		getNotice,
		getServicerByType,
		getUserEvaluate,
		getCarServices,
		login,
		getUserAgreement,
		getUserInfo,
		getPhone,
		putUserInfo,
		getReservationOrder,
		getEmployeeCertification
	} from "@/api";
	let banner = ref([]);
	let notice = ref([]);
	let driver = ref([]);
	let evaluate = ref([]);
	let carServiceList = ref([]);
	let subscribeList = ref([]);
	let list = ref([{
			name: "/static/images/index/grid1.png",
			title: "代客泊车",
			small: "中山六院",
			url: `/pages/parking_hospital/parking_hospital?locationType=DEFAULT`,
		},
		{
			name: "/static/images/index/grid2.png",
			title: "代客泊车",
			small: "临江大道",
			url: "/pages/parking_hospital/parking_hospital?locationType=OPTIONAL",
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
	let model = ref({
		show: true,
		title: "协议声明",
		content: "",
	});

	const getPhoneNumber = async (e) => {
		const userInfo = JSON.parse(uni.getStorageSync("userInfo"));
		if (e.detail.code) {
			const info = await getPhone(e.detail.code);
			userInfo.phone = info.data;
			await putUserInfo(userInfo);
			uni.setStorageSync("userInfo", JSON.stringify(userInfo));
		}
		model.value.show = false;
		uni.setStorageSync("hideIndexModal", true);
	};

	// 获取数据
	const getInfo = async () => {
		try {
			const bannerList = await getBanner();
			const noticeList = await getNotice();
			const servicer = await getServicerByType("VALET");
			const userEvaluate = await getUserEvaluate();
			const carService = await getCarServices();
			// 获取用户编号
			const userNo = uni.getStorageSync("userInfo") ? JSON.parse(uni.getStorageSync("userInfo")).userNo : "";
			const reservationList = await getReservationOrder(userNo);
			if (bannerList.code == 200) {
				banner.value = bannerList.data;
			}
			if (noticeList.code == 200) {
				const arr = [];
				noticeList.data.forEach((item) => {
					arr.push(item.noticeContent);
				});
				notice.value = arr;
			}
			if (servicer.code == 200) {
				driver.value = servicer.data;
			}
			if (userEvaluate.code == 200) {
				evaluate.value = userEvaluate.data;
			}
			if (carService.code == 200) {
				carServiceList.value = carService.data;
			}
			if (reservationList.code == 200) {
				subscribeList.value = reservationList.data;
			}
		} catch (e) {
			//TODO handle the exception
		}
	};

	const getAgreement = async () => {
		try {
			const agreement = await getUserAgreement("WINDOW");
			if (agreement.code == 200) {
				model.value.content = agreement.data.agreementContent;
			}
		} catch (e) {}
	};

	// 跳转
	const goService = async (url) => {
		if (url === "/pages/staff/staff") {
			// 判断职工状态
			let userInfo = uni.getStorageSync("userInfo");
			let userNo = userInfo ? JSON.parse(userInfo).userNo : "";
			const result = await getEmployeeCertification(userNo);
			if (result.code == 200) {
				if (result.data.status != "PASS") {
					uni.navigateTo({
						url: "/pages/staff/detail/detail",
					});
				}
			}
		}
		uni.navigateTo({
			url,
		});
	};

	const bannerClick = (index) => {
		// uni.navigateTo({
		// 	url:banner.value[index].bannerJumpLink
		// })
	};

	// 跳转到详情
	const goDetail = (type, id) => {
		let url = `/pages/${type}/${type}`;
		if (id) {
			url = `/pages/${type}/${type}?id=${id}`;
			if (type === "parking_hospital") {
				url = `/pages/${type}/${type}?serviceId=${id}&locationType=DEFAULT`;
			}
			if (type === "order_detail_parking") {
				url = `/pages/${type}/${type}?order_no=${id}`;
			}
		}
		uni.navigateTo({
			url,
		});
	};
	const getDriverAndOrders = async () => {
		const userInfo = JSON.parse(uni.getStorageSync("userInfo"));
		const reservationList = await getReservationOrder(userInfo.userNo);
		const servicer = await getServicerByType("VALET");
		driver.value = servicer.data;
		subscribeList.value = reservationList.data;
	};

	onShow(async () => {
		getDriverAndOrders();
	});

	onLoad(async () => {
		uni.login({
			success: async (res) => {
				const result = await login({
					authCode: res.code,
				});
				if (result.code == 200) {
					uni.setStorageSync("accessToken", result.data.token);
					const userInfo = await getUserInfo();
					uni.setStorageSync("userInfo", JSON.stringify(userInfo.data));
					if (userInfo.data.servicerId) {
						uni.setStorageSync("userKey", true);
					}
					getDriverAndOrders();
					getInfo();
				}
			},
		});
		const hideIndexModal = uni.getStorageSync("hideIndexModal");
		if (hideIndexModal) {
			model.value.show = false;
		} else {
			getAgreement();
		}

		if (uni.getStorageSync("userStatus") === "servicer") {
			return uni.switchTab({
				url: "/pages/servicer_orders/servicer_orders",
			});
		}
	});
</script>

<style lang="scss" scoped>
	::v-deep .u-cell__title-text.data-v-b4243719 {
		font-size: 36rpx;
		font-weight: bold;
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
			margin: 28rpx 0 0;
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
			margin: 32rpx 10rpx 0;
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
					border-radius: 24rpx;
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