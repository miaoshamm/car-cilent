<template>
	<view class="page">
		<u-navbar title="录入车辆信息" :autoBack="true" titleStyle="font-size:36rpx" placeholder safeAreaInsetTop></u-navbar>
		<view class="main">
			<view class="upload">
				<view v-if="orderType === 'parking'" class="upload_title"
					style="padding-bottom: 20rpx;border-bottom: 1rpx solid #E7E7E7;">泊车位置</view>
				<view v-if="orderType === 'parking'"
					style="height: 85rpx;display: flex;align-items: center;justify-content: space-between;">
					<text @click="openMap">{{uploadList.location.address ? uploadList.location.address : '点击获取位置'}}</text>
					<image src="../../static/images/order/location.png" mode="widthFix" style="width: 32rpx;"></image>
				</view>
				<view v-if="orderType === 'pickUp'" class="upload_title">接车视频</view>
				<view v-if="orderType === 'parking'" class="upload_title">泊车视频</view>
				<view class="upload_list">
					<view v-if="uploadList.pickUpVideo" class="video">
						<video :src="uploadList.pickUpVideo"></video>
					</view>
					<view v-else class="upload_box" @click="uploadVideo">
						<u-icon name="plus" color="#999" size="28"></u-icon>
					</view>
				</view>
			</view>
			<view class="upload">
				<view v-if="orderType == 'pickUp'" class="upload_title">接车照片</view>
				<view v-if="orderType == 'parking'" class="upload_title">泊车照片</view>
				<view class="upload_list">
					<view class="pick_images" v-for="url in uploadList.pickUpimages">
						<image :src="url" mode="widthFix"></image>
					</view>
					<view class="upload_box" @click="uploadImages"><u-icon name="plus" color="#999" size="28"></u-icon></view>
				</view>
			</view>
			<view v-if="orderType === 'pickUp'" class="upload">
				<view class="upload_title">接车单</view>
				<view class="upload_list">
					<view class="pick_images" v-if="uploadList.pickUpOrderImage">
						<image :src="uploadList.pickUpOrderImage" mode="widthFix"></image>
					</view>
					<view v-else class="upload_box" @click="uploadOrderImage"><u-icon name="plus" color="#999" size="28"></u-icon>
					</view>
				</view>
			</view>
		</view>
		<view style="height: 128rpx; background-color: white; box-sizing: border-box; padding: 20rpx 32rpx">
			<view style="
					background-color: #449656;
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
					color: white;
					font-size: 32rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				" @click="submit">
				上传信息
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		wxUploadFile
	} from '@/utils/cos.js';
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		inputCarRecord,
		inputParkingRecord
	} from '../../api/index.js'
	const {
		orderType,
		orderNo
	} = defineProps(['orderType', 'orderNo'])
	const chooseLocation = requirePlugin('chooseLocation');
	const key = 'GZABZ-OGULD-YPK4O-HWK6T-4B6KV-NBFJX'; //使用在腾讯位置服务申请的key
	const referer = '城市生活'; //调用插件的app的名
	const uploadList = ref({
		pickUpVideo: '',
		pickUpimages: [],
		pickUpOrderImage: '',
		location: {},
	});
	const openMap = () => {
		uni.navigateTo({
			url: 'plugin://chooseLocation/index?key=' + key + '&referer=' + referer
		});
	};
	const uploadVideo = async () => {
		const res = await uni.chooseMedia();
		if (res.type !== 'video') {
			uni.showToast({
				icon: 'none',
				title: '只允许上传视频'
			});
			return;
		}
		const result = await wxUploadFile(res.tempFiles[0].tempFilePath, 'images');
		uploadList.value.pickUpVideo = result;
	};
	const uploadImages = async () => {
		const res = await uni.chooseMedia();
		if (res.type !== 'image') {
			uni.showToast({
				icon: 'none',
				title: '只允许上传图片'
			});
			return;
		}
		const result = await wxUploadFile(res.tempFiles[0].tempFilePath, 'images');
		uploadList.value.pickUpimages.push(result);
	}
	const uploadOrderImage = async () => {
		const res = await uni.chooseMedia();
		if (res.type !== 'image') {
			uni.showToast({
				icon: 'none',
				title: '只允许上传图片'
			});
			return;
		}
		const result = await wxUploadFile(res.tempFiles[0].tempFilePath, 'images');
		uploadList.value.pickUpOrderImage = result;
	}
	const submit = async () => {

		let info;
		if (orderType === 'pickUp') {
			info = await inputCarRecord({
				orderNo: orderNo,
				receiveImages: uploadList.value.pickUpimages.join(','),
				receiveUrl: uploadList.value.pickUpOrderImage,
				receiveVideoUrl: uploadList.value.pickUpVideo
			})
		}
		if (orderType === 'parking') {
			info = await inputParkingRecord({
				orderNo: orderNo,
				receiveImages: uploadList.value.pickUpimages.join(','),
				receiveVideoUrl: uploadList.value.pickUpVideo,
				addressType: 'OPTIONAL',
				address: uploadList.value.location.address,
				latitude: uploadList.value.location.latitude,
				longitude: uploadList.value.location.longitude,
			})
		}
		if (info.code === '200') {
			uni.redirectTo({
				url: '/pages/order_detail_parking/order_detail_parking'
			})
		}

	}
	onShow(async () => {
		const location = chooseLocation.getLocation();
		if (location) {
			uploadList.value.location = location
		}
	});
</script>

<style lang="scss" scoped>
	.page {
		height: 100vh;
		display: flex;
		flex-direction: column;

		.main {
			flex: 1;
			background-color: #f6f7f8;
			padding: 32rpx;
			overflow-y: scroll;

			.upload {
				background-color: white;
				padding: 24rpx 32rpx;
				margin-bottom: 19rpx;

				.upload_list {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					flex-wrap: wrap;
					padding-top: 24rpx;

					.upload_box {
						background-color: #f3f3f3;
						width: 160rpx;
						height: 160rpx;
						display: flex;
						align-items: center;
						justify-content: center;
					}

					.pick_images {
						width: 160rpx;
						height: 160rpx;
						margin-right: 24rpx;
						margin-bottom: 24rpx;

						image {
							width: 100%;
							height: 100%;
						}
					}
				}
			}
		}
	}
</style>