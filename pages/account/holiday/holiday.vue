<template>
	<view class="wrapper">
		<view class="title" v-show="info.status === 'PROCESS'">正在审核中...</view>
		<view class="title" v-show="info.status === 'PASS'">批准请假</view>
		<view class="box-wrapper">
			<view class="box-title">请假信息</view>
			<u--form ref="uForm" class="car-form" labelPosition="left" :model="info" :rules="rules" labelWidth="100">
				<u-form-item label="开始时间" prop="beginDate" borderBottom @click="checkTimeShow('beginDate')">
					<u--input disabled v-model="info.beginDate" disabledColor="#ffffff" placeholder="请选择开始日期"
						border="none"></u--input>
					<template #right>
						<u-icon name="arrow-right"></u-icon>
					</template>
				</u-form-item>
				<u-form-item label="结束时间" prop="endDate" borderBottom @click="checkTimeShow('endDate')">
					<u--input disabled v-model="info.endDate" disabledColor="#ffffff" placeholder="请选择结束时间"
						border="none"></u--input>
					<template #right>
						<u-icon name="arrow-right"></u-icon>
					</template>
				</u-form-item>
				<u-form-item label="请假事由" prop="absentReason">
					<u--input disabled v-model="info.absentReason" disabledColor="#ffffff" placeholder="请输入请假事由"
						border="none"></u--input>
						<template #right>
							<u-icon name="arrow-right" color="#fff"></u-icon>
						</template>
				</u-form-item>
			</u--form>
		</view>
		<up-button v-if="!info.status" :color="btnColor" text="请假" :disabled="btnColor === '#C5C5C5'"
			@click="modelShow = true"></up-button>
		<u-datetime-picker :formatter="formatter" :minDate="nowTime" @cancel="timeShow = false" @confirm="checkTime"
			:show="timeShow" mode="date" confirmColor="#449656" ref="datetimePickerRef"></u-datetime-picker>
	</view>
	<u-modal showCancelButton confirmColor="#449656" :show="modelShow" title="确定无误吗？" @cancel="modelShow = true"
		@confirm="putUserAbsent"></u-modal>
</template>

<script setup>
	import {
		ref,
		watch
	} from 'vue';
	import dayjs from "dayjs"
	import {
		userAbsent,
		getAbsent
	} from "@/api"
	import {
		onLoad
	} from "@dcloudio/uni-app"

	const nowTime = Date.now();
	const timeShow = ref(false);
	const nowCheckTime = ref("")
	const uForm = ref(null)
	const btnColor = ref("#C5C5C5")
	const modelShow = ref(false)
	const userNo = ref("")

	const info = ref({
		beginDate: "",
		endDate: "",
		absentReason: ""
	})

	const rules = {
		"beginDate": {
			required: true,
			message: '请选择开始时间',
			trigger: 'blur'
		},
		"endDate": {
			required: true,
			message: '请选择结束时间',
			trigger: 'blur'
		},
		"absentReason": {
			required: true,
			message: '请填写请假事由',
			trigger: 'blur'
		}
	}

	// 监听值的变化
	watch(info.value, (newVal) => {
		// 判断是否有值
		const res = Object.keys(newVal).every(key => newVal[key])
		if (res) {
			btnColor.value = "#449656"
		} else {
			btnColor.value = "#C5C5C5"
		}
	})

	// 查看申请
	const getApply = async () => {
		try {
			const result = await getAbsent(userNo.value)
			if (result.code == 200) {
				if (result.data) {
					info.value = result.data
				}
			}
		} catch (e) {
			//TODO handle the exception
		}
	}

	// 提交申请
	const putUserAbsent = async () => {
		try {
			info.value.userNo = userNo.value
			const result = await userAbsent(info.value)
			if (result.code == 200) {
				modelShow.value = false
				getApply()
			}
		} catch (e) {
			//TODO handle the exception
		}
	}

	// 时间弹窗
	const checkTimeShow = (type) => {
		if (!info.value.status) {
			timeShow.value = true
			nowCheckTime.value = type
		}
	}

	// 选择时间
	const checkTime = (time) => {
		info.value[nowCheckTime.value] = dayjs(time.value).format("YYYY-MM-DD");
		timeShow.value = false;
	};

	// 格式化
	const formatter = (type, value) => {
		if (type === "year") {
			return `${value}年`;
		}
		if (type === "month") {
			return `${value}月`;
		}
		if (type === "day") {
			return `${value}日`;
		}
		if (type === "hour") {
			return `${value}时`;
		}
		if (type === "minute") {
			return `${value}分`;
		}
		return value;
	};

	// 获取状态
	onLoad(() => {
		// 获取用户编号
		const userInfo = uni.getStorageSync("userInfo")
		userNo.value = userInfo ? JSON.parse(userInfo).userNo : ""
		getApply()
	})
</script>

<style>

</style>