<template>
	<view style="display: flex; flex-direction: column; height: 100vh">
		<!-- 顶部导航 -->
		<view class="nav">
			<text class="nav-title">城市生活</text>
		</view>
		<view class="main">
			<view class="clockInCard">
				<view class="left">
					<view style="display: flex; flex-direction: column">
						<text style="font-size: 36rpx">上班打卡</text>
						<text style="font-size: 32rpx; color: #7787a2; margin-top: 8rpx">7:30</text>
					</view>
					<view>
						<text v-if="punchList[0].punchTime"
							style="font-size: 32rpx; color: #7787a2">{{ punchList[0].punchStatus === 'TIMEOUT' ? '超出打卡时间' : '打卡成功' }}</text>
						<text v-else style="font-size: 32rpx; color: #7787a2">请按时打卡</text>
						<text v-if="punchList[0].punchTime" :style="{
								fontSize: '32rpx',
								color: '#7787A2',
								marginTop: '8rpx',
								marginLeft: '16rpx',
								color: punchList[0].punchStatus === 'TIMEOUT' ? '#BA431B' : '#449656'
							}">
							{{ punchList[0]?.punchTime }}
						</text>
					</view>
				</view>
				<view>
					<image v-if="punchList[0].punchTime" src="../../static/images/servicer/success.png" mode="widthFix"
						style="width: 100rpx"></image>
					<image v-else @click="() => clockIn('punchIn')" src="../../static/images/servicer/clockIn.png" mode="widthFix"
						style="width: 100rpx"></image>
				</view>
			</view>
			<view class="clockInCard" v-if="punchList[0].punchTime || isTimeGreater()">
				<view class="left">
					<view style="display: flex; flex-direction: column">
						<text style="font-size: 36rpx">下班打卡</text>
						<text style="font-size: 32rpx; color: #7787a2; margin-top: 8rpx">19:00</text>
					</view>
					<view>
						<text v-if="punchList[1].punchTime"
							style="font-size: 32rpx; color: #7787a2">{{ punchList[1].punchStatus === 'TIMEOUT' ? '超出打卡时间' : '打卡成功' }}</text>
						<text v-else
							:style="{fontSize: '32rpx', color:isTimeGreater()? '#7787a2' : '#BA431B'}">{{isTimeGreater()?'请按时打卡':'未到打卡时间'}}</text>
						<text v-if="punchList[1].punchTime" :style="{
								fontSize: '32rpx',
								color: '#7787A2',
								marginTop: '8rpx',
								marginLeft: '16rpx',
								color: punchList[1].punchStatus === 'TIMEOUT' ? '#BA431B' : '#449656'
							}">
							{{ punchList[1].punchTime }}
						</text>
					</view>
				</view>
				<view>
					<image v-if="punchList[1].punchTime" src="../../static/images/servicer/success.png" mode="widthFix"
						style="width: 100rpx"></image>
					<image v-else @click="() => clockIn('punchOut')"
						:src="isTimeGreater() ? '../../static/images/servicer/clockIn.png' : '../../static/images/servicer/clockIn-no.png'"
						mode="widthFix" :style="{width: '100rpx'}"></image>
				</view>
			</view>
			<view style="padding: 16rpx">
				<view v-if="orderList.length === 0" style="text-align: center;color: #449656;">
					暂无订单
				</view>
				<servicerOrderCard v-for="item in orderList" :order_info="item" />
			</view>
		</view>
		<Tabbar :value="0" />
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import {
		onShow
	} from '@dcloudio/uni-app';
	import {
		getServicerPunch,
		getPunchIn,
		getPunchOut,
		getOrderByServicer
	} from '../../api/index.js';
	import dayjs from 'dayjs';
	import Tabbar from '@/components/tabbar/tabbar.vue';
	import servicerOrderCard from '../../components/servicer_orderr_card/servicer_orderr_card.vue';
	const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
	const punchList = ref();
	const orderList = ref([]);
	const clockIn = async (type) => {
		let info;
		if (type === 'punchIn') {
			info = await getPunchIn(userInfo.userNo);
		} else {
			if (!isTimeGreater()) {
				uni.showToast({
					icon: 'none',
					title: '请在规定时间内打卡'
				});
				return;
			}
			info = await getPunchOut(userInfo.userNo);
		}
		if (info.code === '200') {
			findPunchInfo();
			uni.showToast({
				icon: 'none',
				title: '打卡成功'
			});
		} else {
			uni.showToast({
				icon: 'none',
				title: '打卡失败'
			});
		}
	};

	const findPunchInfo = async () => {
		const punchInfo = await getServicerPunch(userInfo.userNo);
		punchList.value = punchInfo.data;
	};
	const findServiceOrderList = async () => {
		const list = await getOrderByServicer(userInfo.userNo);
		orderList.value = list.data;
	};
	const isTimeGreater = () => {
		const currentTime = new Date();
		const targetTime = new Date();
		targetTime.setHours(19);
		targetTime.setMinutes(30);
		targetTime.setSeconds(0);

		return currentTime > targetTime;
	};
	onShow(async () => {
		findPunchInfo();
		findServiceOrderList();
	});
</script>

<style lang="scss" scoped>
	.main {
		flex: 1;
		background-color: #f6f7f8;
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		overflow: hidden;
		overflow-y: scroll;
		position: relative;
		top: -26rpx;

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