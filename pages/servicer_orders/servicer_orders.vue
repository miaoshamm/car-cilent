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
						<text v-if="punchList[0].punchTime" style="font-size: 32rpx; color: #7787a2">{{ isTimeLess('7:30', dayjs(punchList[0].punchTime).format('HH:mm')) ? '打卡成功' : '超出打卡时间' }}</text>
						<text v-else style="font-size: 32rpx; color: #7787a2">请按时打卡</text>
						<text
							v-if="punchList[0].punchTime"
							:style="{
								fontSize: '32rpx',
								color: '#7787A2',
								marginTop: '8rpx',
								marginLeft: '16rpx',
								color: isTimeLess('7:30', dayjs(punchList[0].punchTime).format('HH:mm')) ? '##449656' : '#BA431B'
							}"
						>
							{{punchList[0].punchTime && dayjs(punchList[0].punchTime).format('HH:mm') }}
						</text>
					</view>
				</view>
				<view @click="clockIn(punchIn)">
					<image v-if="punchList[0].punchTime" src="../../static/images/servicer/success.png" mode="widthFix" style="width: 100rpx"></image>
					<image v-else src="../../static/images/servicer/clockIn.png" mode="widthFix" style="width: 100rpx"></image>
				</view>
			</view>
			<view  class="clockInCard" v-if="punchList[0].punchStatus !== 'NOTCHECKED'">
				<view class="left">
					<view style="display: flex; flex-direction: column">
						<text style="font-size: 36rpx">下班打卡</text>
						<text style="font-size: 32rpx; color: #7787a2; margin-top: 8rpx">19:00</text>
					</view>
					<view>
						<text v-if="punchList[1].punchTime" style="font-size: 32rpx; color: #7787a2">{{ isTimeLess('19:00', dayjs(punchList[1].punchTime).format('HH:mm')) ? '打卡成功' : '超出打卡时间' }}</text>
						<text v-else style="font-size: 32rpx; color: #7787a2">请按时打卡</text>
						<text
							v-if="punchList[1].punchTime"
							:style="{
								fontSize: '32rpx',
								color: '#7787A2',
								marginTop: '8rpx',
								marginLeft: '16rpx',
								color: isTimeLess('19:00', dayjs(punchList[1].punchTime).format('HH:mm')) ? '##449656' : '#BA431B'
							}"
						>
							{{ dayjs(punchList[1].punchTime).format('HH:mm') }}
						</text>
					</view>
				</view>
				<view @click="clockIn(punchOut)">
					<image v-if="punchList[1].punchTime" src="../../static/images/servicer/success.png" mode="widthFix" style="width: 100rpx"></image>
					<image v-else src="../../static/images/servicer/clockIn.png" mode="widthFix" style="width: 100rpx"></image>
				</view>
			</view>
			<view style="padding: 16rpx">
				<servicerOrderCard v-for="item in orderList" />
			</view>
		</view>
		<Tabbar :value="0" />
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { onShow } from '@dcloudio/uni-app';
import { getServicerPunch,getPunchIn,getPunchOut,getOrderByServicer } from '../../api/index.js';
import dayjs from 'dayjs';
import Tabbar from '@/components/tabbar/tabbar.vue';
import servicerOrderCard from '../../components/servicer_orderr_card/servicer_orderr_card.vue';
const userInfo = JSON.parse(uni.getStorageSync('userInfo'));
const punchList = ref();
const orderList = ref([])
const clockIn =async (type)=>{
	if(type==='punchIn'){
		const info = await getPunchIn(userInfo.userNo)
		console.log(info);
	}else{
		await getPunchOut(userInfo.userNo)
		console.log(info);
	}
}
function isTimeLess(timeStr1, timeStr2) {
	let timeTimestamp1 = new Date(timeStr1).getTime();
	let timeTimestamp2 = new Date(timeStr2).getTime();
	return timeTimestamp1 < timeTimestamp2;
}
const findPunchInfo = async ()=>{
	const punchInfo = await getServicerPunch(userInfo.userNo);
	console.log(punchInfo.data);
	punchList.value = punchInfo.data;
}
const findServiceOrderList = async ()=>{
	let arr = [];
	const idList = userInfo.servicerId.split(',')
	for(let i=0; i < idList.length ;i++){
		const list = await getOrderByServicer(idList[i]);
		arr.push(list.data);
	}
	orderList.value = arr;
}
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
