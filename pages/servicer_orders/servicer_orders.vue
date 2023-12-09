<template>
	<view style="display: flex;flex-direction: column;height: 100vh;background-color: #449656;">
		<u-navbar placeholder safeAreaInsetTop bg-color="#449656">
			<template #left>
				<text style="font-size:36rpx;font-weight: bold;color: white;margin-left: 16rpx;">城市生活</text>
			</template>
		</u-navbar>
		<view style="height: 14rpx;" />
		<view class="main">
			<view class="clockInCard">
				<view class="left">
					<view style="display: flex;flex-direction: column;">
						<text style="font-size: 36rpx;">上班打卡</text>

						<text style="font-size: 32rpx;color: #7787A2;margin-top: 8rpx;">7:30</text>

					</view>
					<view>
						<text v-if="workTime"
							style="font-size: 32rpx;color: #7787A2;">{{isTimeLess('7:30',dayjs(workTime).format('HH:mm'))?'打卡成功':'超出打卡时间'}}</text>
						<text v-else style="font-size: 32rpx;color: #7787A2;">请按时打卡</text>
						<text v-if="workTime"
							:style="{fontSize: '32rpx',color: '#7787A2',marginTop: '8rpx', marginLeft:'16rpx',color:isTimeLess('7:30',dayjs(workTime).format('HH:mm')) ? '##449656':'#BA431B'}">{{dayjs(workTime).format('HH:mm')}}</text>
					</view>

				</view>
				<view @click="workClockIn">
					<image v-if="workTime" src="../../static/images/servicer/success.png" mode="widthFix" style="width: 100rpx;">
					</image>
					<image v-else src="../../static/images/servicer/clockIn.png" mode="widthFix" style="width: 100rpx;"></image>
				</view>
			</view>
			<view v-if="workTime" class="clockInCard">
				<view class="left">
					<view style="display: flex;flex-direction: column;">
						<text style="font-size: 36rpx;">下班打卡</text>
						<text style="font-size: 32rpx;color: #7787A2;margin-top: 8rpx;">19:00</text>
					</view>
					<view>
						<text v-if="outTime"
							style="font-size: 32rpx;color: #7787A2;">{{isTimeLess('19:00',dayjs(outTime).format('HH:mm'))?'打卡成功':'超出打卡时间'}}</text>
						<text v-else style="font-size: 32rpx;color: #7787A2;">请按时打卡</text>
						<text v-if="outTime"
							:style="{fontSize: '32rpx',color: '#7787A2',marginTop: '8rpx', marginLeft:'16rpx',color:isTimeLess('19:00',dayjs(outTime).format('HH:mm')) ? '##449656':'#BA431B'}">{{dayjs(outTime).format('HH:mm')}}</text>
					</view>
			
				</view>
				<view @click="outClickIn">
					<image v-if="outTime" src="../../static/images/servicer/success.png" mode="widthFix" style="width: 100rpx;">
					</image>
					<image v-else src="../../static/images/servicer/clockIn.png" mode="widthFix" style="width: 100rpx;"></image>
				</view>
			</view>
			<view style="padding: 16rpx;">
				<servicerOrderCard />
				<servicerOrderCard />
				<servicerOrderCard />
				<servicerOrderCard />
				<servicerOrderCard />
			</view>
		</view>
		<Tabbar :value="0" />
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import dayjs from 'dayjs'
	import Tabbar from "@/components/tabbar/tabbar.vue"
	import servicerOrderCard from '../../components/servicer_orderr_card/servicer_orderr_card.vue'
	const workTime = ref()
	const outTime = ref();
	const workClockIn = () => {
		const date = (new Date()).getTime();
		workTime.value = date;
	}
	const outClickIn=()=>{
		const date = (new Date()).getTime();
		outTime.value = date;
	}

	function isTimeLess(timeStr1, timeStr2) {
		// 将两个时间转换为时间戳
		let timeTimestamp1 = new Date(timeStr1).getTime()
		let timeTimestamp2 = new Date(timeStr2).getTime()
		// 比较两个时间戳
		return timeTimestamp1 < timeTimestamp2
	}
</script>

<style lang="scss" scoped>
	.main {
		flex: 1;
		background-color: #F6F7F8;
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		overflow: hidden;
		overflow-y: scroll;

		.clockInCard {
			padding: 32rpx;
			height: 212rpx;
			background-color: white;
			display: flex;
			justify-content: space-between;
			align-items: flex-end;
			box-sizing: border-box;

			.left {
				height: 100%;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
			}
		}
	}
</style>