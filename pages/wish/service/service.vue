<template>
	<view class="wrapper-p">
		<u-checkbox-group v-model="checkboxValue" iconPlacement="right" @change="checkboxChange">
			<view :style="{flex:1,background:checkboxValue.indexOf(item.id) != -1 ? '#EAFAEA' : '' }" v-for="item in serviceList" :key="item.id">
				<view class="check-box">
					<view class="service">
						<image :src="item.serviceImageUrl" mode=""></image>
						<view class="text">
							<text class="name">{{item.serviceName}}</text>
							<text class="price">¥ {{item.servicePrice.toFixed(2)}}</text>
						</view>
					</view>
					<u-checkbox :name="item.id" shape="circle" activeColor="#449656" :disabled="mutexValue && mutexValue.indexOf(item.id) != -1"></u-checkbox>
				</view>
				<view class="gift" v-show="item.carDonateServiceVoList">
					<view class="title">包含赠送项目</view>
					<view class="service" v-for="item2 in item.carDonateServiceVoList">
						<image :src="item2.serviceImageUrl" mode=""></image>
						<text class="name">{{item.serviceName}}</text>
					</view>
				</view>
			</view>
		</u-checkbox-group>
		<view class="check-btn">
			<u-button text="确认选择" color="#449656" @click="confirm"></u-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		defineProps,
		defineEmits,
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {getCarServices} from "@/api"
	
	let checkboxValue = ref("")
	let mutexValue = ref(null)
	const serviceList = ref([])
	const props = defineProps(['list']);
	const emit = defineEmits(['confirm']);
	const infoList = ref([])
	
	// 确认选择
	const confirm = () => {
		const result = serviceList.value.filter(item => {
			return checkboxValue.value.indexOf(item.id) != -1
		})
		uni.navigateBack()
		uni.setStorageSync("wishService",JSON.stringify(result))
	}
	
	// 改变选项时
	const checkboxChange = (check) => {
		checkboxValue.value = check
		mutexValue.value = ""
		// 拿到当前选中的选项的互斥项目
		serviceList.value.forEach(item => {
			if(check.indexOf(item.id) != -1){
				mutexValue.value += item.mutexService
			}
		})
	};

	// 获取所有服务
	const allService = async () => {
		try {
			const result = await getCarServices()
			if (result.code == 200) {
				serviceList.value = result.data
			}
		} catch (e) {}
	}
	
	onLoad(() => {
		allService()
	})
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
</style>