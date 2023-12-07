<template>
	<view style="min-height: 100vh;">
		<u-navbar placeholder safeAreaInsetTop bg-color="#449656">
			<template #left>
				<text style="font-size:36rpx;font-weight: bold;color: white;margin-left: 16rpx;">城市生活</text>
			</template>
		</u-navbar>
		<view class="main">
			<view style="height: 32rpx;"></view>
			<view style="background-color: #FFFFFF;border-top-left-radius:16rpx ;border-top-right-radius:16rpx ;">
				<view class="user">
					<view class="avatar">
						<up-image width="96rpx" height="96rpx" src="https://cdn.uviewui.com/uview/album/1.jpg"
							shape="circle"></up-image>
					</view>
					<view class="user_info">
						<text class="name">微信昵称</text>
						<text class="phone">151****7894 </text>
					</view>
				</view>
				<view class="size_box"></view>
				<view v-if="status === 'user'">
					<UserMenu pageUrl="/pages/evaluate_list/evaluate_list">我的评价</UserMenu>
					<UserMenu pageUrl="/pages/invoice_list/invoice_list">查看发票</UserMenu>
					<UserMenu pageUrl="/pages/privacy_policy/privacy_policy">隐私政策</UserMenu>
					<UserMenu pageUrl="/pages/terms_of_service/terms_of_service">服务条款</UserMenu>
					<UserMenu>在线客服</UserMenu>
					<UserMenu :onClick="openRoleModal">切换角色</UserMenu>
				</view>
				<view v-else>
					<UserMenu>订单提成</UserMenu>
					<UserMenu>请假休假</UserMenu>
					<UserMenu :onClick="openRoleModal">切换角色</UserMenu>
					<UserMenu>公司简介</UserMenu>
					<UserMenu>增加角色</UserMenu>
				</view>
			</view>
		</view>
		<Tabbar :value="index" />
	</view>
	<u-modal :show="isShowRoleModal" title="请输入密钥" showCancelButton @confirm='roleModalConfirm' @cancel="roleModalColse">
		<template #default>
			<u-input v-model="key"></u-input>
		</template>
	</u-modal>
</template>

<script setup>
	import {
		ref
	} from "vue";
	import UserMenu from "../../components/user_menu/user_menu.vue";
	import Tabbar from "@/components/tabbar/tabbar.vue";
	const isShowRoleModal = ref(false);
	const status =ref(uni.getStorageSync("userStatus")) ;
	const key = ref();
	const index = status.value === "servicer" ? 1 : 2;
	const openRoleModal = ()=>{
		isShowRoleModal.value = true;
	}
	const roleModalColse=()=>{
		isShowRoleModal.value = false
	}
	const roleModalConfirm=()=>{
		if(key.value === 'servicer'){
			uni.setStorageSync('userStatus',key.value)
			status.value = key.value
		}
		if(key.value === 'user'){
			uni.setStorageSync('userStatus',key.value)
			status.value = key.value
		}
		uni.reLaunch({
			url:'/pages/servicer_orders/servicer_orders'
		})
		isShowRoleModal.value = false
	}
</script>

<style lang="less" scoped>
	.main {
		background: #449656;

		.user {
			height: 96rpx;
			display: flex;
			align-items: center;
			padding: 48rpx 32rpx;

			.avatar {
				margin-right: 16rpx;
			}

			.user_info {
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.name {
					font-size: 32rpx;
				}

				.phone {
					font-size: 28rpx;
					color: rgba(0, 0, 0, 0.4);
				}
			}
		}

		.size_box {
			height: 8rpx;
			background: #e7e7e7;
		}
	}
</style>