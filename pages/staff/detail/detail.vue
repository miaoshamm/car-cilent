<template>
	<view class="wrapper wrapper-p">
		<view class="title" v-show="!info.status">使用优惠前，请先进行职工认证</view>
		<view class="title" v-show="info.status === 'PROCESS'">正在审核中...</view>
		<view class="title" v-show="info.status === 'NOTPASS'">信息有误，请修改后重新上传</view>
		<view class="title" v-show="info.status === 'PASS'">职工认证信息</view>
		<License :licensePlate="info.carNo" type="input" @plateNumber="getPlateNumber"/>
		<view class="car-info">
			<u--form ref="uForm" class="car-form" labelPosition="left" :model="info" :rules="rules" labelWidth="80">
				<view class="box">
					<u-form-item class="phone-info" label="手机号码" prop="workerPhone" borderBottom>
						<u--input :disabled="disInput" disabledColor="#fff" v-model="info.workerPhone" border="none"
							placeholder="请输入手机号(必填)"></u--input>
						<button v-show="!info.status" class="get-phone" open-type="getPhoneNumber"
							@getphonenumber="getPhoneNumber">一键获取手机号</button>
					</u-form-item>
					<u-form-item label="用户姓名" prop="userName" borderBottom>
						<u--input :disabled="disInput" disabledColor="#fff" v-model="info.userName" border="none"
							placeholder="请输入姓名(必填)"></u--input>
					</u-form-item>
					<u-form-item label="所属部门" prop="workerDepartment" borderBottom>
						<u--input :disabled="disInput" disabledColor="#fff" v-model="info.workerDepartment" border="none"
							placeholder="请输入所属部门(必填)"></u--input>
					</u-form-item>
				</view>
				<view class="box">
					<u-form-item label="车辆颜色" prop="carColor" borderBottom>
						<u--input :disabled="disInput" disabledColor="#fff" v-model="info.carColor" border="none"
							placeholder="请输入车辆颜色(必填)"></u--input>
					</u-form-item>
					<u-form-item label="车辆型号" prop="carTypeName" borderBottom @click="showModel">
						<u--input disabled v-model="info.carTypeName" disabledColor="#ffffff" placeholder="请选择车辆型号(必填)"
							border="none"></u--input>
						<template #right>
							<u-icon name="arrow-right"></u-icon>
						</template>
					</u-form-item>
				</view>
				<view class="box certificate">
					<u-form-item label="工作证" borderBottom>
						<view class="box-img">
							<view class="box-img-info" @click="uploadInfo('cardFrontUrl')">
								<image :src="info.cardFrontUrl ? info.cardFrontUrl : '/static/images/common/card-photo1.png'">
								</image>
								<text>正面照</text>
							</view>
							<view class="box-img-info" @click="uploadInfo('cardBackUrl')">
								<image :src="info.cardBackUrl ? info.cardBackUrl : '/static/images/common/card-photo2.png'">
								</image>
								<text>反面照</text>
							</view>
						</view>
					</u-form-item>
				</view>
				<view class="box certificate">
					<u-form-item label="行驶证" borderBottom>
						<view class="box-img">
							<view class="box-img-info" @click="uploadInfo('licenseUrl')">
								<image :src="info.licenseUrl ? info.licenseUrl : '/static/images/common/card-photo1.png'">
								</image>
								<text>行驶证</text>
							</view>
						</view>
					</u-form-item>
				</view>
			</u--form>
		</view>
	</view>
	<view class="check-btn" v-show="info.status != 'PROCESS'">
		<u-button :text="info.status === 'PASS' ? '重新认证' : '上传认证'" color="#449656"
			@click="info.uploadShow = true"></u-button>
	</view>
	<u-modal showCancelButton confirmColor="#449656" :show="info.uploadShow"
		:content="!info.status ? '确定无误吗？' : '确定重新上传吗？'" @confirm="upload" @cancel="info.uploadShow = false"></u-modal>
	<u-picker confirmColor="#449656" @cancel="modelShow = false" @confirm="checkModel" :show="modelShow"
		:columns="modelColumns"></u-picker>
</template>

<script setup>
	import {
		ref,
		computed
	} from "vue";
	import License from "@/components/license_plate_selection/license_plate_selection.vue";
	import {
		onReady,
		onUnload
	} from "@dcloudio/uni-app"
	import models from "@/static/json/brands.json"
	import {
		employeeCertification,
		getEmployeeCertification,
		getPhone,
		updateCertification
	} from "@/api"
	import {
		wxUploadFile
	} from "@/utils/cos.js"

	const uForm = ref(null);
	// 规则
	const rules = {
		"phone": {
			validator: (rule, value, callback) => {
				return uni.$u.test.mobile(value);
			},
			message: '手机号码不正确',
			trigger: ['change', 'blur'],
		},
		"carColor": {
			required: true,
			message: '请输入车辆颜色',
			trigger: 'blur',
		},
		"carNo": {
			required: true,
			message: '请输入车牌号',
			trigger: 'blur',
		},
		"userName": {
			required: true,
			message: '请输入名称',
			trigger: 'blur',
		},
		"workerDepartment": {
			required: true,
			message: '请输入部门',
			trigger: 'blur',
		}
	}
	// 信息
	const info = ref({
		carNo: "", //车牌号
		workerPhone: "", //电话号码
		userName: "", //姓名
		workerDepartment: "", //所属部门
		carTypeName: "", //车型
		carColor: "", //车辆颜色
		cardFrontUrl: "", //正面照
		cardBackUrl: "", //反面照
		licenseUrl: "" //行驶证
	});
	const modelColumns = ref([]);
	const modelShow = ref(false);

	// 计算属性
	const disInput = computed(() => {
		return info.value.status === 'PROCESS'
	})
	
	// 获取车牌
	const getPlateNumber = (res) => {
		if(info.value.status === 'PASS') return
		info.value.carNo = res
	}

	// 弹窗显示
	const showModel = () => {
		if (info.value.status === 'PROCESS') return
		modelShow.value = true
	}

	// 获取手机号
	const getPhoneNumber = async (res) => {
		try {
			const result = await getPhone(res.target.code)
			if (result.code == 200) {
				info.value.workerPhone = result.data
			}
		} catch (e) {}
	}

	// 上传
	const uploadInfo = (type) => {
		if (info.status === 'PROCESS') return
		uni.chooseImage({
			success: async (res) => {
				let filePath = res.tempFilePaths[0]
				const result = await wxUploadFile(filePath, "images")
				info.value[type] = result
			}
		})
	}

	// 认证
	const upload = async () => {
		uForm.value.validate().then(async res => {
			try {
				info.value.carNo = "粤B66666"
				info.value.carTypeName = info.value.carTypeName[0]
				info.value.userNo = JSON.parse(uni.getStorageSync("userInfo")).userNo

				let result
				// 判断状态
				if (info.value.status === 'NOTPASS') {
					result = await updateCertification(info.value)
				} else {
					result = await employeeCertification(info.value)
				}
				if (result.code == 200) {
					getCertification()
					modelShow.value = false
				}
			} catch (e) {}
		}).catch(err => {
			info.value.uploadShow = false;
		})
	};

	// 选择车型
	const checkModel = (item) => {
		info.value.carTypeName = item.value;
		modelShow.value = false;
	};

	// 获取职工认证状态
	const getCertification = async () => {
		try {
			const userInfo = uni.getStorageSync('userInfo')
			const userNo = userInfo ? JSON.parse(userInfo).userNo : ""
			const result = await getEmployeeCertification(userNo)
			if (result.code == 200) {
				info.value = result.data
				info.value.carColor = result.data.userCarVo.carColor
				info.value.carNo = result.data.userCarVo.carNo
				info.value.carTypeName = result.data.userCarVo.carTypeName
				info.value.workerPhone = userInfo ? JSON.parse(userInfo).phone : ""
			}
		} catch (e) {
			//TODO handle the exception
		}
	}

	onReady(() => {
		modelColumns.value.push(models)
		getCertification()
	})
</script>

<style lang="scss" scoped>
	.box {
		::v-deep .u-form-item__body__right__content__slot.data-v-b4fd400b {
			display: flex !important;
			flex-direction: row !important;
		}
	}

	.get-phone {
		color: $bgColor;
		font-size: 24rpx;
	}
</style>