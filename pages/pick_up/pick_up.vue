<template>
  <view style="min-height: 100vh; background: #f6f7f8; display: flex; flex-direction: column;">
    <u-navbar @leftClick="leftClick" title="预约接送服务"  titleStyle="font-size:36rpx"  placeholder safeAreaInsetTop></u-navbar>
    <view style="position: relative;flex: 1;">
      <view style="padding: 32rpx;">
				<view class="card" style="background: linear-gradient(180deg, #ECFBEC 0%, #FFFFFF 26%, #FFFFFF 100%)">
				    <view class="card_line" style="min-height: 96rpx">
				      <text>预约地点</text>
				      <view style="display: flex; align-items: center" @click="openMap">
				        <text>{{ subscribeInfo.address }}</text>
				        <image src="../../static/images/order/location.png" mode="widthFix" style="width: 24rpx; margin-left: 12rpx"> </image>
				      </view>
				    </view>
				    <view class="size_box" />
				    <view class="card_line" style="justify-content: flex-start">
				      <text style="margin-right: 32rpx">预约姓名</text>
				      <input type="text" placeholder="请输入姓名" />
				    </view>
				    <view class="size_box" />
				    <view class="card_line" style="justify-content: flex-start">
				      <text style="margin-right: 32rpx">手机号码</text>
				      <input type="text" placeholder="请输入手机号" />
				    </view>
				    <view class="size_box" />
				    <view class="card_line">
				      <text>预约时间</text>
				      <view
				        @click="
				          () => {
				            subscribeInfo.time = getTimestamp();
				            subscribeInfo.timeShow = true;
				          }
				        "
				        style="display: flex; align-items: center; color: rgba(0, 0, 0, 0.4)"
				      >
				        <text>{{ formatTime(subscribeInfo.time) }}</text>
				        <u--icon name="arrow-right" size="32rpx"></u--icon>
				      </view>
				    </view>
				    <view class="size_box" />
				    <view class="card_line">
				      <text>预约服务</text>
				      <view @click="subscribeInfo.serviceShow = true" style="display: flex; align-items: center; color: rgba(0, 0, 0, 0.4)">
				        <text>{{ subscribeInfo.service }}</text>
				        <u--icon name="arrow-right" size="32rpx"></u--icon>
				      </view>
				    </view>
				  </view>
					<view style="background-color: white;padding: 0 32rpx;border-radius: 16rpx;">
						<ChooseEmploy :isShow='isShowServiceList' :open='openServiceList' :close='serviceListClose'></ChooseEmploy>
					</view>
					
					<InsuranceTips />
				</view>
      </view>
		<PriceBtn type='pay' :price='180' url='/pages/order_detail_pick_up/order_detail_pick_up' />
  </view>
	<u-datetime-picker v-model="subscribeInfo.time" :formatter="formatter" :minDate="nowTime"
		@cancel="subscribeInfo.timeShow = false" @confirm="onChangeTime" :show="subscribeInfo.timeShow"
		mode="datetime"></u-datetime-picker>
  <u-picker :show="subscribeInfo.serviceShow" :columns="columns" @confirm="serviceChange"></u-picker>
</template>

<script setup>
import { ref, reactive } from "vue";
import dayjs from "dayjs";
import { onShow, onUnload } from "@dcloudio/uni-app";
import InsuranceTips from "../../components/insurance_tips/insurance_tips.vue";
import ChooseEmploy from "../../components/choose_employee/choose_employee.vue";
import PriceBtn from '../../components/price_btn/price_btn.vue'
const chooseLocation = requirePlugin("chooseLocation");
const key = "GZABZ-OGULD-YPK4O-HWK6T-4B6KV-NBFJX"; //使用在腾讯位置服务申请的key
const referer = "城市生活"; //调用插件的app的名
const isShowServiceList = ref(false);
const subscribeInfo = ref({
  address: "选取位置",
  name: "",
  phone: "",
  time: "选择预约时间",
  service: "选择预约服务",
  timeShow: false,
  serviceShow: false,
});
const openMap = () => {
  uni.navigateTo({
    url: "plugin://chooseLocation/index?key=" + key + "&referer=" + referer,
  });
};
const onChangeTime = (e) => {
  subscribeInfo.value.time = e.value;
  subscribeInfo.value.timeShow = false;
};
const serviceChange = (e) => {
  subscribeInfo.value.service = e.value[0];
  subscribeInfo.value.serviceShow = false;
};
const openServiceList = ()=>{
	isShowServiceList.value = true;
}
const serviceListClose=()=>{
	isShowServiceList.value = false;
}
const leftClick = () => {
  if (isShowServiceList.value) {
    isShowServiceList.value = false;
  } else {
    uni.navigateBack();
  }
};


onShow(() => {
  const location = chooseLocation.getLocation();
  subscribeInfo.value.address =location.name ?  location.name : subscribeInfo.value.address ;
});
onUnload(() => {
  chooseLocation.setLocation(null);
});
//格式化时间戳
const formatTime = (value) => {
  const time = dayjs(value).format("MM月DD日 hh:mm");
  if (time === "Invalid Date") {
    return value;
  } else {
    return time;
  }
};
//获取当前时间戳
const getTimestamp = () => {
  const now = new Date();
  const timestamp = now.getTime();
  return timestamp;
};
//服务项目
const columns = reactive([["接送", "只接", "只送"]]);
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
</script>

<style lang="scss" scoped>
.card {
  border-radius: 16rpx;
  background-color: white;
  padding:0 32rpx;

  .size_box {
    background-color: #e7e7e7;
    height: 1rpx;
  }

  .card_line {
    height: 96rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
