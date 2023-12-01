<template>
	<view style="min-height: 100vh; background: #F6F7F8;">
		<view class="nav">
			<text class="nav-title">城市服务代客泊车小程序</text>
		</view>
		<view class="main">
			<view class="user">
				<view class="avatar">
					<up-image width="96rpx" height="96rpx" src="https://cdn.uviewui.com/uview/album/1.jpg" shape="circle"></up-image>
				</view>
				<view class="user_info">
					<text class="name" >微信昵称</text>
					<text class="phone">151****7894	</text>
				</view>
			</view>
			<view class="size_box"></view>
			<UserMenu pageUrl='/pages/evaluate_list/evaluate_list'>我的评价</UserMenu>
			<UserMenu pageUrl='/pages/invoice_list/invoice_list'>查看发票</UserMenu>
			<UserMenu pageUrl='/pages/privacy_policy/privacy_policy'>隐私政策</UserMenu>
			<UserMenu pageUrl='/pages/terms_of_service/terms_of_service'>服务条款</UserMenu>
			<UserMenu>在线客服</UserMenu>
			<UserMenu>切换角色</UserMenu>			
		</view>
		<u-tabbar style="height: 128rpx;border-top: 4px solid #eee;" :border="false" activeColor="#DFA0B1" :value="value1"
			:fixed="true" :placeholder="true" :safeAreaInsetBottom="false">
			<u-tabbar-item text="首页" @click="click1">
				<template #active-icon>
					<image style="width: 44rpx;height: 40rpx;margin: 0 0 6rpx" src="/static/images/tabbar/index-active.png">
					</image>
				</template>
				<template #inactive-icon>
					<image style="width: 44rpx;height: 40rpx;margin: 0 0 6rpx" src="/static/images/tabbar/index.png"></image>
				</template>
			</u-tabbar-item>
			<u-tabbar-item text="我的订单" @click="click1">
				<template #active-icon>
					<image style="width: 36rpx;height: 40rpx;margin:0 0 6rpx" src="/static/images/tabbar/orders-active.png">
					</image>
				</template>
				<template #inactive-icon>
					<image style="width: 36rpx;height: 40rpx;margin:0 0 6rpx" src="/static/images/tabbar/orders.png"></image>
				</template>
			</u-tabbar-item>
			<u-tabbar-item text="个人中心" @click="click1">
				<template #active-icon>
					<image style="width: 32rpx;height: 42rpx;margin:0 0 6rpx" src="/static/images/tabbar/account-active.png">
					</image>
				</template>
				<template #inactive-icon>
					<image style="width: 32rpx;height: 42rpx;margin:0 0 6rpx" src="/static/images/tabbar/account.png"></image>
				</template>
			</u-tabbar-item>
		</u-tabbar>
	</view>
</template>

<script setup>
	import {ref} from 'vue';
	import UserMenu from '../../components/user_menu/user_menu.vue'
	const value1 = ref(2)
	const click1 = (index) => {
		let url = ""
		if(index === 0){
			url = "/pages/index/index"
		}else if(index === 1){
			url = "/pages/orders/orders"
		}else{
			url = "/pages/account/account"
		}
		uni.switchTab({
			url
		})
	}
</script>

<style lang="scss" scoped>
	@import url("../../static/css/index.scss");
	.nav {
		height: 208rpx;
		background: #DFA0B1;
		display: flex;
		align-items: center;
	
		.nav-title {
			font-size: 32rpx;
			font-weight: 500;
			color: #fff;
			margin: 48rpx 0 0 60rpx;
		}
	}
	.main{
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		position: relative;
		top: -30rpx;
		overflow: hidden;
		
		background: #F6F7F8;
		.user{
			margin: 48rpx 0;
			height: 96rpx	;
			display: flex;
			align-items: center;
			padding: 0 32rpx;
			.avatar{
				margin-right: 16rpx;
			}
			.user_info{
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				.name{
					font-size: 32rpx;
				}
				.phone{
					font-size: 28rpx;
					color: rgba(0, 0, 0, 0.4);
				}
			}
		}
		.size_box{
			height: 8rpx;
			background: #E7E7E7;
		}
		
	}
</style>