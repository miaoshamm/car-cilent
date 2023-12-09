<template>
	<view v-show="info.status === 'noauth'">
		<view class="wrapper wrapper-p">
			<view class="title" v-show="info.infoStatus === 'normal'">使用优惠前，请先进行职工认证</view>
			<view class="title" v-show="info.infoStatus === 'examine'">已经尽快信息审核中...</view>
			<view class="title" v-show="info.infoStatus === 'error'">信息有误，请修改后重新上传</view>
			<view class="title" v-show="info.infoStatus === 'wait'">职工认证信息</view>
			<License :licensePlate="licensePlate" type="input" />
			<view class="car-info">
				<u--form ref="uForm" class="car-form" labelPosition="left" :model="info" :rules="rules" labelWidth="120">
					<view class="box">
						<u-form-item label="手机号码" prop="phone" borderBottom>
							<u--input v-model="info.phone" border="none" placeholder="请输入手机号"></u--input>
						</u-form-item>
						<u-form-item label="用户姓名" prop="username" borderBottom>
							<u--input v-model="info.username" border="none" placeholder="请输入姓名"></u--input>
						</u-form-item>
						<u-form-item label="所属部门" prop="section" borderBottom>
							<u--input v-model="info.section" border="none" placeholder="请输入所属部门"></u--input>
						</u-form-item>
					</view>
					<view class="box">
						<u-form-item label="车辆颜色" prop="info.color" borderBottom>
							<u--input v-model="info.color" border="none" placeholder="请输入车辆颜色"></u--input>
						</u-form-item>
						<u-form-item label="车辆型号" prop="carTypeName" borderBottom @click="modelShow = true">
							<u--input disabled v-model="info.carTypeName" disabledColor="#ffffff" placeholder="请选择车辆型号"
								border="none"></u--input>
							<template #right>
								<u-icon name="arrow-right"></u-icon>
							</template>
						</u-form-item>
					</view>
					<view class="box certificate">
						<u-form-item label="工作证" borderBottom>
							<view class="box-img">
								<view class="box-img-info" @click="uploadInfo('frontImg')">
									<image :src="info.frontImg ? info.frontImg : '../../static/images/common/card-photo1.png'"></image>
									<text>正面照</text>
								</view>
								<view class="box-img-info" @click="uploadInfo('backImg')">
									<image :src="info.backImg ? info.backImg : '../../static/images/common/card-photo2.png'"></image>
									<text>反面照</text>
								</view>
							</view>
						</u-form-item>
					</view>
					<view class="box certificate">
						<u-form-item label="行驶证" borderBottom>
							<view class="box-img">
								<view class="box-img-info" @click="uploadInfo('runImg')">
									<image :src="info.runImg ? info.runImg : '../../static/images/common/card-photo1.png'"></image>
									<text>行驶证</text>
								</view>
							</view>
						</u-form-item>
					</view>
				</u--form>
			</view>
		</view>
		<view class="check-btn" v-show="info.infoStatus != 'examine'">
			<u-button :text="info.infoStatus === 'wait' ? '重新认证' : '上传认证'" color="#449656"
				@click="info.uploadShow = true"></u-button>
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
	<u-modal showCancelButton confirmColor="#449656" :show="info.uploadShow" content="确定无误吗？" @confirm="upload"
		@cancel="info.uploadShow = false"></u-modal>
	<u-picker confirmColor="#449656" @cancel="modelShow = false" @confirm="checkModel" :show="modelShow"
		:columns="modelColumns"></u-picker>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import License from "@/components/license_plate_selection/license_plate_selection.vue";
	import {
		onReady,
		onUnload
	} from "@dcloudio/uni-app"
	import models from "@/static/json/brands.json"
	import {
		employeeCertification
	} from "@/api"

	let licensePlate = ref("");
	const uForm = ref(null)

	// 规则
	const rules = {
		"phone": {
			type: "string",
			required: true,
			message: '请填写手机号',
		}
	}

	// 信息
	const info = ref({
		carNo: "", //车牌号
		phone: "", //手机号
		userName: "", //姓名
		section: "", //所属部门
		carTypeName: "", //车型
		carColor: "", //车辆颜色
		frontImg:"",	//正面照
		backImg:"",	//反面照
		runImg:""	//行驶证
	});

	const modelColumns = ref([]);
	const modelShow = ref(false);

	// 上传
	const uploadInfo = (type) => {
		uni.chooseImage({
			success(res) {
				info.value[type] = res.tempFilePaths[0]
			}
		})
	}

	// 选择车型
	const checkModel = (item) => {
		info.value.carTypeName = item.value;
		modelShow.value = false;
	};

	// 查看信息
	const showInfo = () => {
		info.value.status = "noauth";
		info.value.infoStatus = 'wait';
	};

	// 认证
	const upload = () => {
		uForm.value.validate().then(res => {
			info.value.infoStatus = 'examine'
			uni.setStorageSync('auth', 'auth')
		}).catch(err => {
			info.value.uploadShow = false;
		})
	};

	onReady(() => {
		modelColumns.value.push(models)
		info.value.status = uni.getStorageSync('auth') ? 'auth' : 'noauth'
	})
	onUnload(() => {
		uni.removeStorageSync('auth')
	})
</script>

<style lang="less">
	.card-auth {
		background: #fff;
		border-radius: 16rpx;
		display: flex;
		justify-content: space-between;
		padding: 32rpx;

		.info {
			display: flex;
			align-items: center;
			color: rgba(0, 0, 0, 0.4);
			font-size: 24rpx;

			.text {
				margin: 0 22rpx 0 0;
			}
		}
	}

	.discounts {
		background: #fff;
		border-radius: 16rpx;
		padding: 24rpx 32rpx;
		margin: 16rpx 0 0;

		.dis-title {
			margin: 0 0 16rpx;
		}
	}
</style>