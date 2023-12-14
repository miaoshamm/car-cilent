<template>
	<view class="page">
		<u-navbar title="录入车辆信息" :autoBack="true" titleStyle="font-size:36rpx" placeholder safeAreaInsetTop></u-navbar>
		<view class="main">
			<view class="upload">
				<view class="upload_title">接车视频</view>
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
				<view class="upload_title">接车照片</view>
				<view class="upload_list">
					<view class="pick_images" v-for="url in uploadList.pickUpimages">
						<image :src="url" mode="widthFix"></image>
					</view>
					<view class="upload_box" @click="uploadImages"><u-icon name="plus" color="#999" size="28"></u-icon></view>
				</view>
			</view>
			<view class="upload">
				<view class="upload_title">接车单</view>
				<view class="upload_list">
					<view class="pick_images" v-if="uploadList.pickUpOrderImage">
						<image :src="uploadList.pickUpOrderImage" mode="widthFix"></image>
					</view>
					<view v-else  class="upload_box" @click="uploadOrderImage"><u-icon name="plus" color="#999" size="28"></u-icon></view>
				</view>
			</view>
		</view>
		<view style="height: 128rpx; background-color: white; box-sizing: border-box; padding: 20rpx 32rpx">
			<view
				style="
					background-color: #449656;
					width: 100%;
					height: 100%;
					border-radius: 8rpx;
					color: white;
					font-size: 32rpx;
					display: flex;
					justify-content: center;
					align-items: center;
				"
				@click="startOff"
			>
				上传信息
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { wxUploadFile } from '@/utils/cos.js';
const uploadList = ref({
	pickUpVideo: '',
	pickUpimages: [],
	pickUpOrderImage:''
});
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
const uploadImages=async ()=>{
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
const uploadOrderImage=async ()=>{
	const res = await uni.chooseMedia();
	if (res.type !== 'image') {
		uni.showToast({
			icon: 'none',
			title: '只允许上传图片'
		});
		return;
	}
	const result = await wxUploadFile(res.tempFiles[0].tempFilePath, 'images');
	uploadList.value.pickUpOrderImage= result;
}
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
		.upload {
			background-color: white;
			padding: 24rpx 32rpx;
			margin-bottom: 19rpx;
			.upload_list {
				display: grid;
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