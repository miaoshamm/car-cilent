<template>
	<view class="wrapper-p">
		<u-radio-group v-model="checkboxValue" iconPlacement="right" @change="checkboxChange">
			<view :style="{flex:1,background:checkboxValue.indexOf(item.id) != -1 ? '#EAFAEA' : '' }" v-for="item in serviceList" :key="item.id">
				<view class="check-box">
					<view class="service">
						<image :src="item.addressImageUrl" mode=""></image>
						<view class="text">
							<text class="name">{{item.address}}</text>
						</view>
					</view>
					<u-radio :name="item.id" shape="circle" activeColor="#449656"></u-radio>
				</view>
			</view>
		</u-radio-group>
		<view class="check-btn">
			<u-button text="确认选择" color="#449656" @click="show = true"></u-button>
		</view>
		<u-modal showCancelButton confirmColor="#449656" :show="show" title="确定选择此地点吗？" @confirm="confirm" @cancel="show = false"></u-modal>
	</view>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import {
		onLoad
	} from "@dcloudio/uni-app";
	import {getLocations} from "@/api"
	
	let checkboxValue = ref("")
	let mutexValue = ref(null)
	const serviceList = ref([])
	const infoList = ref([])
	const show = ref(false)
	
	// 确认选择
	const confirm = () => {
		
	}
	
	// 改变选项时
	const checkboxChange = (check) => {
		checkboxValue.value = check
	};

	// 获取所有服务
	const allService = async () => {
		try {
			const result = await getLocations('PRESERVE')
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