<template>
	<view style="min-height: 100vh; background: #F6F7F8;padding:32rpx; ">
		<view class="card" style="background: linear-gradient(180deg, #FCF0F3 0%, #FFFFFF 26%, #FFFFFF 100%);">
			<view class="card_line">
				<text>预约地点</text>
			</view>
			<view class="size_box" />
			<view class="card_line">
				<text>预约姓名</text>
			</view>
			<view class="size_box" />
			<view class="card_line">
				<text>手机号码</text>
			</view>
			<view class="size_box" />
			<view class="card_line">
				<text>预约时间</text>
			</view>
			<view class="size_box" />
			<view class="card_line">
				<text>预约服务</text>
			</view>
		</view>
		<view class="card" style="margin-top: 16rpx;">
			<view class="card_line" style="height: 144rpx;">
				<view style="display: flex;height: 96rpx;">
					<up-image width="96rpx" height="96rpx" src="https://cdn.uviewui.com/uview/album/1.jpg"
						shape="circle"></up-image>
					<view style="display: flex;flex-direction: column;margin-left: 16rpx;">
						<text style="font-size: 32rpx;">刘师傅</text>
						<text style="font-size: 28rpx; color: rgba(0, 0, 0, 0.4);margin-top: 8rpx;">驾驶年龄 - 10年</text>
					</view>
				</view>
				<u-icon name="arrow-right" size="48rpx"	></u-icon>
			</view>
		</view>
	</view>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.card{
	border-radius: 16rpx;
	background-color: white;
	padding-left: 32rpx;
	.size_box{
		background-color: #e7e7e7;
		height: 1rpx;
	}
	.card_line{
		height: 96rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding-right: 32rpx;
	}
}
</style>
