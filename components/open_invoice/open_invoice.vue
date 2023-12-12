<template>
	<view class="invoice_box" v-if="isShowInvoice" style="background: #f6f7f8; flex: 1; padding: 32rpx 16rpx">
		<text style="color: #449656; font-size: 36rpx; font-weight: bold">申请开票</text>
		<view class="invoice_card" style="margin-top: 19rpx; background: linear-gradient(180deg, #ecfbec 0%, #ffffff 26%, #ffffff 100%)">
			<view class="line">
				<text style="font-size: 32rpx">发票详情</text>
			</view>
			<view class="line">
				<text class="title">发票类型</text>
				<radio-group @change="invoiceTypeChange">
					<label style="margin-right: 32rpx">
						<radio value="COMPANY" :checked="invoiceInfo.isOnline === 'COMPANY'" color="#0052D9" />
						<text>单位</text>
					</label>
					<label>
						<radio value="PERSONAL" :checked="invoiceInfo.isOnline === 'PERSONAL'" color="#0052D9" />
						<text>个人/非企业性单位</text>
					</label>
				</radio-group>
			</view>
			<view v-if="invoiceInfo.isOnline === 'PERSONAL'" class="line">
				<text class="title">抬头名称</text>
				<input v-model="invoiceInfo.invoiceHeader" placeholder="必填" style="text-align: end" />
			</view>
			<view v-if="invoiceInfo.isOnline === 'COMPANY'" class="line">
				<text class="title">单位抬头</text>
				<input v-model="invoiceInfo.invoiceHeader" placeholder="必填" style="text-align: end" />
			</view>
			<view v-if="invoiceInfo.isOnline === 'COMPANY'" class="line">
				<text class="title">单位税号</text>
				<input v-model="invoiceInfo.taxNo" placeholder="必填" style="text-align: end" />
			</view>
			<view v-if="invoiceInfo.isOnline === 'COMPANY'" class="line">
				<text class="title">单位号码</text>
				<input v-model="invoiceInfo.companyPhone" placeholder="选填" style="text-align: end" />
			</view>
			<view v-if="invoiceInfo.isOnline === 'COMPANY'" class="line">
				<text class="title">单位地址</text>
				<input v-model="invoiceInfo.companyAddress" placeholder="选填" style="text-align: end" />
			</view>
			<view v-if="invoiceInfo.isOnline === 'COMPANY'" class="line">
				<text class="title">开户银行</text>
				<input v-model="invoiceInfo.accountBank" placeholder="选填" style="text-align: end" />
			</view>
			<view v-if="invoiceInfo.isOnline === 'COMPANY'" class="line">
				<text class="title">银行账号</text>
				<input v-model="invoiceInfo.bankNo" placeholder="选填" style="text-align: end" />
			</view>
		</view>
		<view class="invoice_card" style="margin-top: 16rpx">
			<view class="line">
				<text style="font-size: 32rpx">接收方式</text>
			</view>
			<view class="line">
				<text class="title" style="font-size: 32rpx">电子邮箱</text>
				<input v-model="invoiceInfo.email" placeholder="必填" style="text-align: end" />
			</view>
			<view class="line">
				<text class="title" style="font-size: 32rpx">手机号码</text>
				<input v-model="invoiceInfo.phone" placeholder="必填" style="text-align: end" />
			</view>
		</view>
		<view style="font-size: 28rpx; color: rgba(0, 0, 0, 0.4); text-align: center; line-height: 80rpx">填写邮箱后，发票会自动发送到邮箱里</view>
		<button style="background-color: #449656; height: 88rpx; line-height: 88rpx; color: white; font-size: 32rpx" @click="submit">开票</button>
	</view>
</template>

<script setup>
import UserMenu from '../user_menu/user_menu.vue';
import { ref } from 'vue';
import { applyForInvoice } from '../../api/index.js';
const { isShowInvoice, openInvoice ,order_no} = defineProps(['isShowInvoice', 'openInvoice','order_no']);
console.log(order_no);
const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
const invoiceInfo = ref({
	// 开户银行
	accountBank: '',
	//银行账号
	bankNo: '',
	//单位地址
	companyAddress: '',
	//单位号码
	companyPhone: '',
	//邮箱地址
	email: '',
	//发票抬头
	invoiceHeader: '',
	// 发票图片url
	invoiceImageUrl: '',
	//个人 PERSONAL /单位COMPANY
	isOnline: 'COMPANY',
	//订单编号
	orderNo: '',
	//手机号码
	phone: '',
	//用户id
	userId: userInfo.id,
	//税号
	taxNo: ''
});
const invoiceTypeChange = (e) => {
	console.log(e);
	invoiceInfo.value.isOnline = e.detail.value;
};
const submit = async () => {
	if (invoiceInfo.value.isOnline === 'PERSONAL') {
		const info = await applyForInvoice({
			isOnline: invoiceInfo.value.isOnline,
			email: invoiceInfo.value.email,
			phone: invoiceInfo.value.phone,
			userId:invoiceInfo.value.userId,
			orderNo:order_no
		});
		console.log(info);
	}else{
		const info = await applyForInvoice(invoiceInfo.value)
	}
};
</script>

<style lang="scss">
.invoice_box {
	height: 100%;
	box-sizing: border-box;
	background-color: #f6f7f8;
	.invoice_card {
		border-radius: 16rpx;
		padding-left: 32rpx;
		background-color: white;

		.line {
			height: 96rpx;
			display: flex;
			align-items: center;
			padding-right: 32rpx;
			justify-content: space-between;

			.title {
				font-size: 28rpx;
				color: black;
			}
		}
	}
}
</style>
