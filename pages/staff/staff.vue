<template>
	<view v-show="info.status === 'noauth'">
		<view class="wrapper wrapper-p">
			<view class="title" v-show="info.infoStatus === 'wait'">请稍等，正在确定维保地点</view>
			<view class="title" v-show="info.infoStatus === 'examine'">已经尽快信息审核中...</view>
			<view class="title" v-show="info.infoStatus === 'error'">信息有误，请修改后重新上传</view>
			<License :licensePlate="licensePlate" />
			<view class="car-info">
				<u--form class="car-form" labelPosition="left" :model="model1" :rules="rules" labelWidth="120">
					<view class="box">
						<u-form-item label="手机号码" prop="info.phone" borderBottom>
							<u--input v-model="info.phone" border="none" placeholder="请输入手机号"></u--input>
						</u-form-item>
						<u-form-item label="用户姓名" prop="info.username" borderBottom>
							<u--input v-model="info.username" border="none" placeholder="请输入姓名"></u--input>
						</u-form-item>
						<u-form-item label="所属部门" prop="info.section" borderBottom>
							<u--input v-model="info.section" border="none" placeholder="请输入所属部门"></u--input>
						</u-form-item>
					</view>
					<view class="box">
						<u-form-item label="车辆颜色" prop="info.color" borderBottom>
							<u--input v-model="info.color" border="none" placeholder="请输入车辆颜色"></u--input>
						</u-form-item>
						<u-form-item label="车辆型号" prop="info.model" borderBottom @click="info.modelShow = true">
							<u--input disabled v-model="info.model" disabledColor="#ffffff" placeholder="选择车型"
								border="none"></u--input>
							<template #right>
								<u-icon name="arrow-right"></u-icon>
							</template>
						</u-form-item>
					</view>
					<view class="box certificate">
						<u-form-item label="工作证" prop="info.phone" borderBottom>
							<view class="box-img">
								<view class="box-img-info">
									<image src="../../static/images/common/card-photo1.png"></image>
									<text>正面照</text>
								</view>
								<view class="box-img-info">
									<image src="../../static/images/common/card-photo2.png"></image>
									<text>反面照</text>
								</view>
							</view>
						</u-form-item>
					</view>
					<view class="box certificate">
						<u-form-item label="行驶证" prop="info.phone" borderBottom>
							<view class="box-img">
								<view class="box-img-info">
									<image src="../../static/images/common/card-photo1.png"></image>
									<text>行驶证</text>
								</view>
							</view>
						</u-form-item>
					</view>
				</u--form>
			</view>
		</view>
		<view class="check-btn" v-show="info.infoStatus != 'examine'">
			<u-button text="上传认证" color="#DFA0B1" @click="info.uploadShow = true"></u-button>
		</view>
	</view>
	<view v-show="info.status === 'auth'">
		<view class="wrapper">
			<view class="card-auth">
				<view class="service">
					<image src="/static/images/wish/service.png" mode=""></image>
					<view class="text">
						<text class="name">微信昵称</text>
						<text class="normal">已认证职工身份</text>
					</view>
				</view>
				<view class="info" @click="showInfo">
					<text class="text">查看信息</text>
					<u-icon name="arrow-right" size="32rpx" color="rgba(0,0,0,.26)"></u-icon>
				</view>
			</view>
			<view class="discounts">
				<view class="dis-title">优惠服务</view>
				<view class="grid">
					<u-grid :border="false" col="5">
						<u-grid-item>
							<u-icon name="/static/images/index/grid1.png" :size="48"></u-icon>
							<text class="grid-text">代客泊车</text>
							<text class="grid-text-small">中山六院</text>
						</u-grid-item>
					</u-grid>
				</view>
			</view>
		</view>
	</view>
	<u-modal showCancelButton confirmColor="#DFA0B1" :show="info.uploadShow" content='确定无误吗？' @confirm="upload"
		@cancel="info.uploadShow = false"></u-modal>
		<u-picker @cancel="info.modelShow = false" @confirm="checkModel" :show="info.modelShow" :columns="modelColumns"
			keyName="label"></u-picker>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import License from "@/components/license_plate_selection/license_plate_selection.vue"
	let licensePlate = ref("皖GHHHHHN")
	// 信息
	const info = ref({
		phone:"",
		username:"",
		section: "",
		color: "",
		model: "",
		modelId: 0,
		modelShow: false,
		uploadShow: false,
		status:"auth",
		infoStatus:"wait"
	})
	
	const modelColumns = ref([
		[{
				id: 1,
				label: "车型一"
			},
			{
				id: 2,
				label: "车型二"
			}
		]
	])
	
	// 选择车型
	const checkModel = (item) => {
		info.value.model = item.value[0].label
		info.value.modelId = item.value[0].id
		info.value.modelShow = false
	}
	
	// 查看信息
	const showInfo = () => {
		info.value.status = "noauth"
	}

	const upload = () => {
		info.value.uploadShow = false
	}
</script>

<style lang="less">
	@import url("@/static/css/index.less");
	.card-auth{
		background: #fff;
		border-radius: 16rpx;
		display: flex;
		justify-content: space-between;
		padding: 32rpx;
		.info{
			display: flex;
			align-items: center;
			color: rgba(0, 0, 0, .4);
			font-size: 24rpx;
			.text{
				margin: 0 22rpx 0 0;
			}
		}
	}
	.discounts{
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx 32rpx;
		margin: 16rpx 0 0;
		.dis-title{
			margin: 0 0 16rpx;
		}
	}
</style>