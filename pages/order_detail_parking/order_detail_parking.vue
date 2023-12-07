<template>
	<view style="min-height: 100vh; background: #F6F7F8;display: flex;flex-direction:column; ">
		<u-navbar title="订单详情" @leftClick="leftClick" titleStyle="font-size:36rpx" placeholder safeAreaInsetTop></u-navbar>
		<view v-if='isInvoice'  style=" background: #F6F7F8;flex:1;padding: 32rpx 16rpx;">
			<text style="color: #449656; font-size: 36rpx;font-weight: bold;">申请开票</text>
			<up--form :ref='formRef'>
				<view class="invoice_card"
					style="margin-top: 19rpx; background: linear-gradient(180deg, #FCF0F3 0%, #FFFFFF 26%, #FFFFFF 100%);">
					<view class="line">
						<text style="font-size: 32rpx;">发票详情</text>
					</view>
					<view class="line">
						<text class="title">发票类型</text>
						<radio-group name="invoiceType" @change="invoiceTypeChange">
							<label style="margin-right: 32rpx;">
								<radio value="unit" :checked="invoiceType ==='unit'" color="#0052D9" /><text>单位</text>
							</label>
							<label>
								<radio value="personage" :checked="invoiceType ==='personage'" color="#0052D9" /><text>个人/非企业性单位</text>
							</label>
						</radio-group>
					</view>
					<view v-if="invoiceType ==='personage'" class="line">
						<text class="title">抬头名称</text>
						<up-input placeholder="必填" border="border" inputAlign='right'></up-input>
					</view>
					<view v-if="invoiceType ==='unit'" class="line">
						<text class="title">单位抬头</text>
						<up-input placeholder="必填" border="border" inputAlign='right'></up-input>
					</view>
					<view v-if="invoiceType ==='unit'" class="line">
						<text class="title">单位税号</text>
						<up-input placeholder="必填" border="border" inputAlign='right'></up-input>
					</view>
					<view v-if="invoiceType ==='unit'" class="line">
						<text class="title">单位号码</text>
						<up-input placeholder="选填" border="border" inputAlign='right'></up-input>
					</view>
					<view v-if="invoiceType ==='unit'" class="line">
						<text class="title">单位地址</text>
						<up-input placeholder="选填" border="border" inputAlign='right'></up-input>
					</view>
					<view v-if="invoiceType ==='unit'" class="line">
						<text class="title">开户银行</text>
						<up-input placeholder="选填" border="border" inputAlign='right'></up-input>
					</view>
					<view v-if="invoiceType ==='unit'" class="line">
						<text class="title">银行账号</text>
						<up-input placeholder="选填" border="border" inputAlign='right'></up-input>
					</view>
				</view>
				<view class="invoice_card" style="margin-top: 16rpx;">

					<view class="line">
						<text style="font-size: 32rpx;">接收方式</text>
					</view>
					<view class="line">
						<text class="title" style="font-size: 32rpx;">点击邮箱</text>
						<up-input placeholder="必填" border="border" inputAlign='right'></up-input>
					</view>
					<view class="line">
						<text class="title" style="font-size: 32rpx;">手机号码</text>
						<up-input placeholder="必填" border="border" inputAlign='right'></up-input>
					</view>
				</view>
				<view style="font-size: 28rpx;color: rgba(0, 0, 0, 0.4);text-align: center;line-height: 80rpx;">
					填写邮箱后，发票会自动发送到邮箱里
				</view>
				<button style="background-color: #DFA0B1;height: 88rpx;line-height: 88rpx;color: white;font-size: 32rpx;"
					@click="handleInvoice">开票</button>
			</up--form>
		</view>
		<view v-else style="flex:1;padding: 32rpx 16rpx;">
			<text style="color: #449656; font-size: 36rpx;font-weight: bold;">泊车服务已结束</text>
			<view style="margin-top: 19rpx;">
				<LicensePlateSelection licensePlate='粤B12345' />
			</view>
			<view style="margin-top: 7rpx;" class="card">
				<view class="card_line">
					<view class="card_line_title">手机号码</view>
					<view class="card_line_content">15190616041</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">手机号码</view>
					<view class="card_line_content">15190616041</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">手机号码</view>
					<view class="card_line_content">15190616041</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">手机号码</view>
					<view class="card_line_content">15190616041</view>
				</view>
			</view>
			<view style="margin-top: 7rpx;" class="card">
				<view class="card_line">
					<view class="card_line_title">车辆颜色</view>
					<view class="card_line_content">15190616041</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">车辆型号</view>
					<view class="card_line_content">15190616041</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line" style="height: 144rpx;">
					<view style="display: flex;height: 96rpx;">
						<up-image width="96rpx" height="96rpx" src="https://cdn.uviewui.com/uview/album/1.jpg"
							shape="circle"></up-image>
						<view style="display: flex;flex-direction: column;margin-left: 16rpx;">
							<text style="font-size: 32rpx;">刘师傅</text>
							<text style="font-size: 28rpx; color: rgba(0, 0, 0, 0.4);margin-top: 8rpx;">驾驶年龄 - 10年</text>
						</view>
					</view>
					<view class="card_line_content">15190616041</view>
				</view>

			</view>
			<view style="margin-top: 7rpx;" class="card">
				<view class="card_line">
					<view class="card_line_title">泊车服务费</view>
					<view class="card_line_content">+40</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">泊车服务费</view>
					<view class="card_line_content">+40</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">泊车服务费</view>
					<view class="card_line_content">+40</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">泊车服务费</view>
					<view class="card_line_content">+40</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line">
					<view class="card_line_title">实付款</view>
					<view class="card_line_content" style="color:#EA0000;font-weight: bold;">¥80</view>
				</view>
			</view>
			<view style="margin-top: 7rpx;" class="card">
				<view class="card_line" style="justify-content: flex-start;">
					<view class="card_line_title">订单编号</view>
					<view class="card_line_content" style="margin-left: 32rpx;">101231998123123</view>
				</view>
				<view class="size_box"></view>
				<view class="card_line" style="justify-content: flex-start;">
					<view class="card_line_title">订单时间</view>
					<view class="card_line_content" style="margin-left: 32rpx;">2023-11-22 12:22:00</view>
				</view>
			</view>
			<view class="service_item_card" style="margin-top: 19rpx;">
				<view class="service_img">
					<image src='../../static/images/index/maintenance.png' mode="aspectFill"></image>
				</view>
				<view class="content">
					<text class="title">车辆精洗服务</text>
					<text class="description">为您的爱车提供最佳的外观和内部清洁效果789798454656578978978978797789798797</text>
				</view>
			</view>
			<view class="service_item_card" style="margin-top: 19rpx;">
				<view class="service_img">
					<image src='../../static/images/index/maintenance.png' mode="aspectFill"></image>
				</view>
				<view class="content">
					<text class="title">车辆大保养服务</text>
					<text class="description">为您的爱车提供最佳的外观和内部清洁效果789798454656578978978978797789798797</text>
				</view>
			</view>
			<view class="menu">
				<UserMenu title='开发票' description='立即开票' :onClick='openInvoice' />
			</view>
			<view class="menu">
				<UserMenu title='评价服务' description='立即评价' :onClick="open" />
			</view>
			<InsuranceTips></InsuranceTips>
		</view>

	</view>
	<view>
		<u-popup :show="show" @close="close" @open="open" :round="16">
			<view
				style="background: linear-gradient(180deg, #FCF0F3 0%, #FFFFFF 26%, #FFFFFF 100%);border-radius: 16rpx 1rpx 0 0;">
				<h1 style="height: 96rpx;line-height: 96rpx;padding: 0 32rpx;border-bottom: 1rpx solid #E7E7E7;">评价服务</h1>
				<view style="height: 384rpx;padding:16rpx;">
					<u--textarea placeholder="预设文本" count :maxlength='500' height="352rpx" border='none'></u--textarea>
				</view>
				<view style="border-top: 1rpx solid #E7E7E7;height: 112rpx; display: flex;align-items: center;">
					<view style="flex:1;text-align: center;" @click="close">取消</view>
					<view style="width: 1rpx;height: 56rpx;background-color: #E7E7E7;"></view>
					<view style="flex:1;text-align: center;">发送</view>
				</view>
			</view>

		</u-popup>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import LicensePlateSelection from '../../components/license_plate_selection/license_plate_selection.vue'
	import UserMenu from '../../components/user_menu/user_menu.vue'
	import InsuranceTips from '../../components/insurance_tips/insurance_tips.vue'
	const show = ref(false);
	const isInvoice = ref(false);
	const invoiceType = ref('unit');
	const formRef = ref();
	const close = () => {
		show.value = false;
	}
	const open = () => {
		show.value = true;
	}
	const invoiceTypeChange = (e) => {
		console.log(e.detail.value);
		invoiceType.value = e.detail.value;
	}
	const openInvoice = () => {
		isInvoice.value = true;
	}
	const handleInvoice = () => {
		isInvoice.value = false;
		uni.showToast({
			icon: 'none',
			title: '开票成功'
		})
	}
	const leftClick=()=>{
		console.log('12312313');
		if(isInvoice.value){
			isInvoice.value = false;
		}else{
			uni.navigateBack();
		}
	}
</script>

<style lang="scss">
	.card {
		border-radius: 16rpx;
		display: flex;
		flex-direction: column;
		background-color: white;
		padding: 0 32rpx;

		.card_line {
			height: 96rpx;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}

		.size_box {
			height: 1rpx;
			background-color: #E7E7E7;
		}
	}

	.service_item_card {
		height: 192rpx;
		border-radius: 16rpx;
		display: flex;
		padding: 0 32rpx;
		background-color: white;
		align-items: center;

		.service_img {
			width: 208rpx;
			height: 140rpx;
			flex-shrink: 0;
			border-radius: 24rpx;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.content {
			flex: 1;
			display: flex;
			flex-direction: column;
			height: 140rpx;
			justify-content: space-around;
			margin-left: 24rpx;
			overflow: hidden;

			.title {
				font-size: 36rpx;
			}

			.description {
				display: -webkit-box;
				-webkit-line-clamp: 2;
				-webkit-box-orient: vertical;
				text-overflow: ellipsis;
				font-size: 26rpx;
				color: rgba(0, 0, 0, 0.5);
			}
		}
	}

	.menu {
		margin-top: 19rpx;
		background-color: white;
		border-radius: 16rpx;
	}

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
			}
		}
	}

	button::after {
		border: none;
	}
</style>