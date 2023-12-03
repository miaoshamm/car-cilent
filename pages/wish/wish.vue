<template>
	<view class="wrapper">
		<view @click="check">选择车牌号</view>
		<view class="car-info">
			<u--form class="car-form" labelPosition="left" :model="model1" :rules="rules" ref="form1" labelWidth="120">
				<u-form-item label="手机号码" prop="info.phone" borderBottom ref="item1">
					<u--input v-model="info.phone" border="none" placeholder="请输入手机号"></u--input>
				</u-form-item>
				<u-form-item label="维保时间" prop="info.time" borderBottom @click="showSex = true; hideKeyboard()" ref="item1">
					<u--input v-model="info.time" disabled disabledColor="#ffffff" placeholder="请选择维保时间"
						border="none"></u--input>
					<template #right>
						<u-icon name="arrow-right"></u-icon>
					</template>
				</u-form-item>
				<u-form-item label="车辆型号" prop="info.model">
					<u--input v-model="info.model" disabled disabledColor="#ffffff" placeholder="请选择车辆型号"
						border="none"></u--input>
					<template #right>
						<u-icon name="arrow-right"></u-icon>
					</template>
				</u-form-item>
			</u--form>
		</view>
	</view>
	<view class="pay-box">
		<text class="price">￥45.00</text>
		<u-button text="立即支付" type="primary" color="#DFA0B1"></u-button>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const info = ref({
		phone: "",
		time:"",
		model:""
	})

	const check = () => {
		wx.chooseLicensePlate({
			success(res) {
				console.log(res);
			}
		})
	}
</script>

<style lang="scss">
	@import url("../../static/css/index.scss");

	.pay-box {
		width: 100vw;
		height: 158rpx;
		display: flex;
		padding: 18rpx 40rpx 0 28rpx;
		position: fixed;
		bottom: 0;
		background: #fff;
		justify-content: space-between;
		box-sizing: border-box;

		.price {
			color: #E34D59;
			font-size: 48rpx;
			font-weight: bold;
		}

		.u-button.data-v-461e713c {
			width: 250rpx;
			margin: 0;
		}
	}
</style>