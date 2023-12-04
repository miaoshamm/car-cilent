<template>
	<view class="wrapper">
		<view class="title">请稍等，正在确定维保地点</view>
		<License :licensePlate="licensePlate" />
		<view class="car-info">
			<u--form class="car-form" labelPosition="left" :model="model1" :rules="rules" labelWidth="120">
				<view class="box">
					<u-form-item label="手机号码" prop="info.phone" borderBottom>
						<u--input v-model="info.phone" border="none" placeholder="请输入手机号"></u--input>
					</u-form-item>
					<u-form-item label="用户姓名" prop="info.phone" borderBottom>
						<u--input v-model="info.phone" border="none" placeholder="请输入姓名"></u--input>
					</u-form-item>
					<u-form-item label="所属部门" prop="info.phone" borderBottom>
						<u--input v-model="info.phone" border="none" placeholder="请输入所属部门"></u--input>
					</u-form-item>
				</view>
				<view class="box">
					<u-form-item label="车辆颜色" prop="info.phone" borderBottom>
						<u--input v-model="info.phone" border="none" placeholder="请输入车辆颜色"></u--input>
					</u-form-item>
					<u-form-item label="车辆型号" prop="info.time" borderBottom @click="info.timeShow = true">
						<u--input disabled v-model="info.time" disabledColor="#ffffff" placeholder="选择车型"
							border="none"></u--input>
						<template #right>
							<u-icon name="arrow-right"></u-icon>
						</template>
					</u-form-item>
				</view>
				<view class="box">
					<u-form-item class="certificate" label="工作证" prop="info.phone" borderBottom>
						<view class="box-img">
							<view class="box-img-info">
								<image></image>
								<text>正面照</text>
							</view>
							<view class="box-img-info">
								<image></image>
								<text>反面照</text>
							</view>
						</view>
					</u-form-item>
				</view>
				<view class="box">
					<u-form-item label="行驶证" prop="info.phone" borderBottom>
					</u-form-item>
				</view>
			</u--form>
		</view>
	</view>
	<view class="check-btn">
		<u-button text="上传认证" color="#DFA0B1"></u-button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import License from "@/components/license_plate_selection/license_plate_selection.vue"
	let licensePlate = ref("皖GHHHHHN")
	// 信息
	const info = ref({
		phone: "",
		time: "",
		model: "",
		modelId: 0,
		timeShow: false,
		modelShow: false
	})
</script>

<style lang="less">
	@import url("@/static/css/index.less");
</style>