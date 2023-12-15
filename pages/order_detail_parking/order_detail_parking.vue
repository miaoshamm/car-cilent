<template>
	<view style="height: 100vh; background: #f6f7f8; display: flex; flex-direction: column" class="">
		<u-navbar title="订单详情" @leftClick="leftClick" titleStyle="font-size:36rpx" placeholder safeAreaInsetTop></u-navbar>
		<view v-if="!isInvoice" :style="{ flex: 1, padding: '32rpx', position: 'relative', overflow: 'auto' }">
			<text v-if="!isServicer"
				style="color: #449656; font-size: 36rpx; font-weight: bold">{{ orderTypes[orderInfo?.orderType].userStatus[orderInfo.status] }}</text>
			<text v-else
				style="color: #449656; font-size: 36rpx; font-weight: bold">{{ orderTypes[orderInfo?.orderType].serviceStatus[orderInfo.status] }}</text>
			<view style="height: 172rpx" @click="goWish">
				<image src="../../static/images/order/img_home_banner.png" mode="widthFix" style="width: 100%"></image>
			</view>
			<view style="margin-top: 19rpx">
				<LicensePlateSelection type="subscribe" :licensePlate="orderInfo?.orderExtraVo?.carNo" />
			</view>
			<view style="margin-top: 7rpx" class="card">
				<view class="card_line" v-if="isServicer">
					<view class="card_line_title">手机号码</view>
					<view style="display: flex; align-items: center" class="card_line_content"
						@click="callUp(orderInfo.orderExtraVo?.reservationPhone)">
						<image src="../../static/images/order/phone-call.png" mode="widthFix" style="width: 36rpx"></image>
						<text style="color: #449656; margin-left: 8rpx">{{ orderInfo?.orderExtraVo?.reservationPhone }}</text>
					</view>
				</view>
				<view class="card_line" v-else>
					<view class="card_line_title">手机号码</view>
					<view class="card_line_content">{{ orderInfo?.orderExtraVo?.reservationPhone }}</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">预约姓名</view>
					<view class="card_line_content">{{ orderInfo?.orderExtraVo?.reservationName }}</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line" v-if="orderInfo?.geographicLocationVo?.addressType === 'OPTIONAL'">
					<view class="card_line_title" style="width: 130rpx">预约地点</view>
					<view class="card_line_content" style="display: flex; align-items: center">
						<text>{{ orderInfo?.geographicLocationVo?.address }}</text>
						<image src="../../static/images/order/location.png" mode="widthFix"
							style="margin-left: 16rpx; width: 36rpx"></image>
					</view>
				</view>
				<view class="size_box" v-if="orderInfo?.geographicLocationVo?.addressType === 'OPTIONAL'"></view>
				<view class="card_line">
					<view class="card_line_title">预约时间</view>
					<view class="card_line_content">{{ dayjs(orderInfo?.reservationTime).format('MM月DD日 HH:mm') }}</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">预约服务</view>
					<view class="card_line_content">{{ orderTypes[orderInfo?.orderType]?.small_type }}</view>
				</view>
			</view>
			<view style="margin-top: 7rpx" class="card">
				<view class="card_line">
					<view class="card_line_title">车辆颜色</view>
					<view class="card_line_content">{{ orderInfo?.orderExtraVo?.carColor }}</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">车辆型号</view>
					<view class="card_line_content">{{ orderInfo?.orderExtraVo?.carTypeName }}</view>
				</view>
				<view class="size_box" v-if="!isServicer"></view>
				<view class="card_line" style="height: 144rpx" v-if="!isServicer">
					<view style="display: flex; height: 96rpx">
						<image style="width: 96rpx; border-radius: 50%; height: 96rpx"
							src="https://cdn.uviewui.com/uview/album/1.jpg"></image>
						<view style="display: flex; flex-direction: column; margin-left: 16rpx">
							<text style="font-size: 32rpx">{{ orderInfo?.servicerVo?.userName }}</text>
							<text style="font-size: 28rpx; color: rgba(0, 0, 0, 0.4); margin-top: 8rpx">驾驶年龄 -
								{{ orderInfo?.servicerVo?.drivingAge }}年</text>
						</view>
					</view>
					<view class="card_line_content" style="display: flex; align-items: center"
						@click="callUp(orderInfo?.servicerVo?.servicerPhone)">
						<image src="../../static/images/order/phone-call.png" style="width: 36rpx; height: 36rpx" mode="widthFix">
						</image>
						<text style="font-size: 24rpx; color: #449656; margin-left: 8rpx">呼叫泊车员</text>
					</view>
				</view>
			</view>
			<view style="margin-top: 7rpx" class="card">
				<view class="card_line" v-for="item in orderInfo?.paymentRecordVos">
					<view class="card_line_title">{{ item.serviceName }}</view>
					<view class="card_line_content">+{{ item.service_price }}</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">实付款</view>
					<view class="card_line_content" style="color: #ea0000; font-weight: bold">¥{{ orderInfo?.orderPayMoney }}
					</view>
				</view>
			</view>
			<view style="margin-top: 7rpx" class="card">
				<view class="card_line">
					<view class="card_line_title">订单编号</view>
					<view class="card_line_content" style="margin-left: 32rpx">{{ orderInfo?.orderNo }}</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">订单时间</view>
					<view class="card_line_content" style="margin-left: 32rpx">
						{{ dayjs(orderInfo?.createdTime).format('YYYY-MM-DD HH:mm:ss') }}
					</view>
				</view>
			</view>
			<view class="menu" v-if="!isServicer">
				<UserMenu title="开发票" description="立即开票" :onClick="openInvoice" />
			</view>
			<view class="menu" v-if="!isServicer">
				<UserMenu v-if="!myEvaluateContent.evaluateContent" title="评价服务" description="立即评价" :onClick="open" />
				<view v-else style="border-radius: 16rpx;padding: 32rpx;">
					<view style="font-size: 32rpx;">
						我的评价
					</view>
					<view style="font-size: 28rpx;margin-top: 16rpx;">
						{{myEvaluateContent.evaluateContent}}
					</view>

				</view>
			</view>
			<InsuranceTips></InsuranceTips>
		</view>
		<view v-else>
			<OpenInvoice :isShowInvoice="isInvoice" :order_no="order_no" />
		</view>
		<view style="height: 128rpx; background-color: white; box-sizing: border-box; padding: 20rpx 32rpx"
			v-if="isServicer">
			<view v-if="orderInfo.status === 'RESERVATION'" class="head_title" @click="startOff">确认出发</view>
			<view v-if="orderInfo.status === 'RECEIVED_TO_USER'" class="head_title" @click="inputPickUpRecord">录入接车信息</view>
		</view>
	</view>

	<view>
		<u-popup :show="show" @close="close" @open="open" :round="16">
			<view
				style="background: linear-gradient(180deg, #ecfbec 0%, #ffffff 26%, #ffffff 100%); border-radius: 16rpx 1rpx 0 0">
				<h1 style="height: 96rpx; line-height: 96rpx; padding: 0 32rpx; border-bottom: 1rpx solid #e7e7e7">评价服务</h1>
				<view style="height: 384rpx; padding: 16rpx">
					<u--textarea placeholder="预设文本" v-model="evaluateContent" :maxlength="500" height="352rpx"
						border="none"></u--textarea>
				</view>
				<view style="border-top: 1rpx solid #e7e7e7; height: 112rpx; display: flex; align-items: center">
					<view style="flex: 1; text-align: center" @click="close">取消</view>
					<view style="width: 1rpx; height: 56rpx; background-color: #e7e7e7"></view>
					<view style="flex: 1; text-align: center" @click="evaluateOrder">发送</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import LicensePlateSelection from '../../components/license_plate_selection/license_plate_selection.vue';
	import UserMenu from '../../components/user_menu/user_menu.vue';
	import dayjs from 'dayjs';
	import InsuranceTips from '../../components/insurance_tips/insurance_tips.vue';
	import OpenInvoice from '@/components/open_invoice/open_invoice.vue';
	import {
		getOrderPaymentRecord,
		ServicerDestination,
		UserEvaluateOrder,
		getOrderEvaluaContent
	} from '../../api/index.js';
	import {
		onShow
	} from '@dcloudio/uni-app';
	import {
		orderTypes,
		orderStatus
	} from '../../static/js/types.js';
	const myEvaluateContent = ref();
	let plugin = requirePlugin('routePlan');
	const key = 'GZABZ-OGULD-YPK4O-HWK6T-4B6KV-NBFJX'; //使用在腾讯位置服务申请的key
	const referer = '城市生活'; //调用插件的app的名

	const {
		order_no,
		isServicer
	} = defineProps(['order_no', 'isServicer']);
	const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
	const show = ref(false);
	const isInvoice = ref(false);
	const orderInfo = ref({});
	const evaluateContent = ref('')
	const close = () => {
		show.value = false;
	};
	const open = () => {
		show.value = true;
	};

	const openInvoice = () => {
		isInvoice.value = true;
	};
	const leftClick = () => {
		if (isInvoice.value) {
			isInvoice.value = false;
		} else {
			uni.navigateBack();
		}
	};
	const goWish = () => {
		uni.navigateTo({
			url: '/pages/wish/wish'
		});
	};
	const startOff = () => {
		uni.showModal({
			title: '确定出发吗？',
			confirmColor: '#449656',
			success: async (res) => {
				if (res.confirm) {
					const location = await ServicerDestination(order_no, userInfo.userNo);
					if (orderInfo.value.geographicLocationVo.addressType === 'OPTIONAL') {
						wx.openLocation({
							latitude: location.data.latitude, //维度
							longitude: location.data.longitude, //经度
							name: location.data.name ?? location.data.addres, //目的地定位名称
							scale: 18, //缩放比例
							address: location.data.address //导航详细地址
						});
					}
				}
			}
		});
	};
	const inputPickUpRecord = () => {
		uni.navigateTo({
			url: `/pages/input_vehicle/input_vehicle?orderType=pickUp&orderNo=${order_no}`
		})
	}
	const getOrderEvaluateContent = async () => {
		const content = await getOrderEvaluaContent(order_no)
		myEvaluateContent.value = content.data;
	}
	const evaluateOrder = async (orderNo) => {
		if (evaluateContent.value.length < 0) {
			uni.showToast({
				icon: 'none',
				title: '请输入评价内容'
			})
			return;
		}
		const userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		const info = await UserEvaluateOrder({
			evaluateContent: evaluateContent.value,
			orderNo: orderInfo.value.orderNo,
			userNo: userInfo.userNo
		})
		if (info.code === '200') {
			getOrderDetail();
		}
	}
	const getOrderDetail = async () => {
		const info = await getOrderPaymentRecord(order_no);
		orderInfo.value = info.data;
	}
	onShow(async () => {
		getOrderDetail();
		getOrderEvaluateContent()
	});
	const callUp = (phone) => {
		console.log(phone);
		uni.makePhoneCall({
			phoneNumber: phone
		});
	};
</script>

<style lang="scss">
	.card {
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 0 32rpx;

		.card_line {
			height: 96rpx;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.size_box {
			height: 1rpx;
			background-color: #e7e7e7;
		}
	}

	.service_item_card {
		height: 192rpx;
		border-radius: 16rpx;
		display: flex;
		padding: 0 32rpx;
		background-color: white;
		align-items: center;

		.service_img {
			width: 208rpx;
			height: 140rpx;
			flex-shrink: 0;
			border-radius: 24rpx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.content {
			flex: 1;
			display: flex;
			flex-direction: column;
			height: 140rpx;
			justify-content: space-around;
			margin-left: 24rpx;
			overflow: hidden;

			.title {
				font-size: 36rpx;
			}

			.description {
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				font-size: 26rpx;
				color: rgba(0, 0, 0, 0.5);
			}
		}
	}

	.menu {
		margin-top: 19rpx;
		background-color: white;
		border-radius: 16rpx;
	}

	button::after {
		border: none;
	}

	.head_title {
		background-color: #449656;
		width: 100%;
		height: 100%;
		border-radius: 8rpx;
		color: white;
		font-size: 32rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>