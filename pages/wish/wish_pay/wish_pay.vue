<template>
	<u-navbar title="车辆维保服务" @leftClick="leftClick" safeAreaInsetTop></u-navbar>
	<view class="wrapper wrapper-p wrapper-t">
		<view class="title" v-show="!info.geographicLocationVo">请稍等，正在确定维保地点</view>
		<view class="title" v-show="info.geographicLocationVo">请前往维保地点...</view>
		<view class="title" v-show="info.status === 'COMPLETE'">维保服务结束，订单已完成</view>
		<License v-if="info.orderExtraVo?.carNo" :orderId="info.orderNo" :licensePlate="info.orderExtraVo?.carNo"
			type="subscribe" />
		<view class="box">
			<view class="box-info" @click="goMap">
				<text style="width: 180rpx;">维保地点</text>
				<view class="box-location">
					<up-text :lines="1"
						:text="info.geographicLocationVo?.address ? info.geographicLocationVo?.address : '...'"></up-text>
					<image v-show="info.geographicLocationVo" src="/static/images/order/location.png" mode=""></image>
				</view>
			</view>
			<view class="box-info" style="flex-direction: column" v-if="info.geographicLocationVo?.addressImageUrl">
				<text class="box-img-title">门头图片</text>
				<view class="box-img">
					<image v-for="(item,index) in info.geographicLocationVo?.addressImageUrl" :key="index" :src="item" mode="">
					</image>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-info">
				<text>手机号码</text>
				<text>{{info.orderExtraVo?.reservationPhone}}</text>
			</view>
			<view class="box-info">
				<text>预约姓名</text>
				<text>{{info.orderExtraVo?.reservationName}}</text>
			</view>
			<view class="box-info">
				<text>维保时间</text>
				<text>{{info.reservationTime}}</text>
			</view>
		</view>
		<view class="box">
			<view class="box-info">
				<text>车辆颜色</text>
				<text>{{info.orderExtraVo?.carColor}}</text>
			</view>
			<view class="box-info">
				<text>车辆型号</text>
				<text>{{info.orderExtraVo?.carTypeName}}</text>
			</view>
			<view class="box-info" style="flex-direction: column">
				<text>预约维保服务</text>
				<view class="box-service">
					<view class="service-info" v-for="item in info.carServicesVos" :key="item.id">
						<image :src="item.serviceImageUrl"></image>
						<text class="service-name">{{item.serviceName}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="box">
			<view class="box-info" v-for="item in info.carServicesVos" :key="item.id">
				<text>{{item.serviceName}}服务费</text>
				<text>+¥{{item.servicePrice}}</text>
			</view>
			<view class="box-info">
				<text>实付款</text>
				<text style="color: #ea0000; font-size: 32rpx; font-weight: 700">¥{{total}}</text>
			</view>
		</view>
		<view class="box">
			<view class="box-info">
				<text>订单编号</text>
				<text>{{info.orderNo}}</text>
			</view>
			<view class="box-info">
				<text>订单时间</text>
				<text>{{info.createdTime}}</text>
			</view>
		</view>
		<view class="box" v-if="info.status === 'COMPLETE'">
			<view class="box-info">
				<text>开发票</text>
				<view class="check">
					<text>立即开票</text>
					<u-icon name="arrow-right" color="rgba(0, 0, 0, .4)"></u-icon>
				</view>
			</view>
		</view>
		<view class="box" v-if="info.status === 'COMPLETE'">
			<view class="box-info">
				<text>评价服务</text>
				<view class="check">
					<text>立即评价</text>
					<u-icon name="arrow-right" color="rgba(0, 0, 0, .4)"></u-icon>
				</view>
			</view>
		</view>
		<Insurance />
	</view>
	<view class="check-btn" v-show="info.geographicLocationVo">
		<u-button plain text="查看维保地点" color="#449656" @click="goMap"></u-button>
		<u-button v-show="servicerShow" customStyle="margin: 0 0 0 20rpx;" text="车辆维保完成" color="#449656"></u-button>
	</view>
	<view class="check-btn" v-show="info.status === 'COMPLETE'">
		<u-button text="返回首页" color="#449656"></u-button>
	</view>
</template>

<script setup>
	import {
		ref,
		computed
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		getOrderPaymentRecord
	} from "@/api"
	import Insurance from "@/components/insurance_tips/insurance_tips.vue";
	import License from "@/components/license_plate_selection/license_plate_selection.vue";
	import dayjs from "dayjs";

	// 属性--------------------
	const info = ref({})
	const total = ref("")
	const servicerShow = ref(false)

	// 方法---------------------------
	const leftClick = () => {
		uni.redirectTo({
			url: '/pages/index/index'
		})
	}

	// 跳转地点
	const goMap = () => {
		const {
			longitude,
			latitude,
			address
		} = info.value.geographicLocationVo
		wx.openLocation({
			latitude, //维度
			longitude, //经度
			name: address, //目的地定位名称
			scale: 18, //缩放比例
			address //导航详细地址
		});
	}

	// 获取信息
	const getInfo = async (orderNo) => {
		try {
			const result = await getOrderPaymentRecord(orderNo)
			if (result.code == 200) {
				// 格式化数据
				info.value = result.data
				info.value.reservationTime = reservationTime(result.data.reservationTime)
				info.value.createdTime = reservationTime(result.data.createdTime)
				// 判断图片
				if (info.geographicLocationVo) {
					if (info.geographicLocationVo.addressImageUrl) {
						info.geographicLocationVo.addressImageUrl = info.geographicLocationVo.addressImageUrl.split(',')
					}
				}
				// 计算实付款
				if (result.data.carServicesVos.length) {
					total.value = result.data.carServicesVos.reduce((total, item) => total + item.servicePrice, 0)
				}
			} else {
				uni.showToast({
					icon: 'error',
					title: result.message
				})
			}
		} catch (e) {}
	}

	// 生命周期-----------------------
	onLoad((options) => {
		getInfo(options.orderNo)
		// 判断角色
		if (uni.getStorageSync('userStatus') === 'servicer') {
			servicerShow.value = true
		}
	})

	const reservationTime = (time) => {
		return time ? dayjs(time).format("YYYY-MM-DD HH:mm") : ""
	}
</script>

<style lang="less" scoped>
	.box {
		padding: 0 32rpx;
		background: #fff;
		border-radius: 16rpx;
		margin: 8rpx 0 0;

		.box-info {
			display: flex;
			justify-content: space-between;
			font-size: 28rpx;
			padding: 28rpx 0;

			.box-location {
				display: flex;
				align-items: center;

				image {
					width: 24rpx;
					height: 28rpx;
					margin: 0 0 0 12rpx;
				}
			}

			.check {
				display: flex;
				color: rgba(0, 0, 0, 0.4);
				font-size: 28rpx;
			}

			.box-service {
				display: flex;
				margin: 24rpx 0 0;

				.service-info {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;
					margin: 0 32rpx 0 0;

					image {
						width: 96rpx;
						height: 96rpx;
						border-radius: 50%;
					}

					.service-name {
						margin: 8rpx 0 0;
					}
				}
			}

			&:not(:last-child) {
				border-bottom: 1px solid #e7e7e7;
			}

			.box-img-title {
				margin: 0 0 24rpx;
			}

			.box-img {
				display: flex;
				justify-content: space-between;

				image {
					width: 128rpx;
					height: 128rpx;
					overflow: hidden;
					border-radius: 8rpx;
				}
			}
		}
	}
</style>