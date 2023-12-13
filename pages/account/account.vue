<template>
  <view style="min-height: 100vh">
    <view class="nav">
    			<text class="nav-title">城市生活</text>
    		</view>
    <view class="main">
      <view style="height: 32rpx"></view>
      <view style="background-color: #ffffff; border-top-left-radius: 16rpx; border-top-right-radius: 32rpx">
        <view class="user">
          <view class="avatar">
            <view style="width: 96rpx; height: 96rpx; border-radius: 50%; overflow: hidden">
              <button open-type="chooseAvatar" style="height: 100%; width: 100%" @chooseavatar="onChooseAvatar">
                <image v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" mode="widthFix"></image>
                <open-data v-else type="userAvatarUrl" style="height: 100%; width: 100%"></open-data>
              </button>
            </view>
          </view>
          <view class="user_info">
            <text @click="isShowNickNameModal = true">{{ userInfo?.nickName }}</text>
            <text v-if="userInfo.phone" class="phone">{{phone}}</text>
            <button v-else open-type="getPhoneNumber" @getphonenumber="handlePhone">一键获取手机号</button>
          </view>
        </view>
        <view class="size_box"></view>
        <view v-if="status === 'user'">
          <UserMenu pageUrl="/pages/evaluate_list/evaluate_list">我的评价</UserMenu>
          <UserMenu pageUrl="/pages/invoice_list/invoice_list">查看发票</UserMenu>
          <UserMenu pageUrl="/pages/service_rules/service_rules?type=PRIVACY">隐私政策</UserMenu>
          <UserMenu pageUrl="/pages/service_rules/service_rules?type=SERVE">服务条款</UserMenu>
          <UserMenu>在线客服</UserMenu>
          <UserMenu :onClick="openRoleModal">切换角色</UserMenu>
        </view>
        <view v-else>
          <UserMenu pageUrl='/pages/account/royalty/royalty'>订单提成</UserMenu>
          <UserMenu pageUrl='/pages/account/holiday/holiday'>请假休假</UserMenu>
          <UserMenu :onClick="openSwtchUserModal">切换角色</UserMenu>
          <UserMenu pageUrl='/pages/account/company/company'>公司简介</UserMenu>
          <UserMenu >增加角色</UserMenu>
        </view>
      </view>
    </view>
    <Tabbar :value="index" />
  </view>
  <u-modal :show="isShowRoleModal" title="请输入密钥" showCancelButton @confirm="roleModalConfirm" @cancel="roleModalColse">
    <template #default>
      <u-input v-model="key"></u-input>
    </template>
  </u-modal>
  <u-modal :show="isShowNickNameModal" title="修改昵称" showCancelButton @confirm="onChangeNickName" @cancel="isShowNickNameModal = false">
    <template #default>
      <input type="nickname" v-model="nickName" style="width: 100%" placeholder="请输入昵称" />
    </template>
  </u-modal>
	<u-modal :show="isShowSwitchUserModal" title="是否切换成用户" showCancelButton @confirm="switchUser" @cancel="isShowSwitchUserModal = false" ></u-modal>
	<u-modal :show="isShowSwitchServiceModal" title="是否切换成服务人员" showCancelButton @confirm="roleModalConfirm" @cancel="isShowSwitchServiceModal = false" ></u-modal>
</template>

<script setup>
import { ref ,computed} from "vue";
import { getPhone, putUserInfo,validateRole } from "../../api/index.js";
import UserMenu from "../../components/user_menu/user_menu.vue";
import Tabbar from "@/components/tabbar/tabbar.vue";
const isShowRoleModal = ref(false);
const isShowNickNameModal = ref(false);
const isShowSwitchUserModal = ref(false);
const isShowSwitchServiceModal = ref(false);
const status = ref(uni.getStorageSync("userStatus"));
const key = ref();
const nickName = ref("");
const index = status.value === "servicer" ? 1 : 2;
const userInfo = ref(JSON.parse(uni.getStorageSync("userInfo")));
const userKey = uni.getStorageSync('userKey')
const phone = computed(() => {
	const number = userInfo.value.phone
	return number.substr(0,3)+"****"+number.substr(7);
})
const openRoleModal = () => {
  userKey ? (isShowSwitchServiceModal.value = true) : (isShowRoleModal.value = true);
};
const roleModalColse = () => {
  userKey ? (isShowSwitchServiceModal.value = false) : (isShowRoleModal.value = false);
};
const roleModalConfirm = async () => {
  if (userKey) {
    switchServicer();
    return;
  }
	console.log('123456');
  const info = await validateRole({
    secretKey: key.value,
    userNo: userInfo.value.userNo,
  });
  if (info.code === "200") {
    uni.setStorageSync("userKey", true);
    switchServicer();
  } else {
    uni.showToast({
      icon: "none",
      title: "密钥错误",
    });
    roleModalColse();
  }
  key.value = "";
};
const handlePhone = async (e) => {
  if (e.detail.code) {
    const phoneInfo = await getPhone(e.detail.code);
    const phone = phoneInfo.message;
    let obj = JSON.parse(uni.getStorageSync("userInfo"));
    obj.phone = phone;
    putUserInfo(obj);
    uni.setStorageSync("userInfo", JSON.stringify(obj));
    userInfo.value = obj;
  }
};
const onChooseAvatar = (e) => {
  const avatarUrl = e.detail.avatarUrl;
  let obj = JSON.parse(uni.getStorageSync("userInfo"));
  obj.avatarUrl = avatarUrl;
  userInfo.value = obj;
  putUserInfo(obj);
  uni.setStorageSync("userInfo", JSON.stringify(obj));
};
const onChangeNickName = (e) => {
  userInfo.value.nickName = nickName.value;
  putUserInfo(userInfo.value);
  isShowNickNameModal.value = false;
};
const openSwtchUserModal = () => {
  isShowSwitchUserModal.value = true;
};
const switchUser = () => {
  uni.setStorageSync("userStatus", "user");
  uni.reLaunch({
    url: "/pages/index/index",
  });
};
const switchServicer = () => {
  uni.setStorageSync("userStatus", "servicer");
  uni.reLaunch({
    url: "/pages/servicer_orders/servicer_orders",
  });
};

</script>

<style lang="less" scoped>
.main {
  background: #449656;
	position: relative;
	top: -56rpx;

  .user {
    height: 96rpx;
    display: flex;
    // align-items: center;
    padding: 48rpx 32rpx;

    .avatar {
      margin-right: 16rpx;
    }

    .user_info {
      display: flex;
      flex-direction: column;
      padding: 6rpx 0;
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
button {
  background-color: transparent;
  border: none;
  padding: 0;
  font-size: 28rpx;
  color: #449656;
  margin: 0;
  display: flex;
  height: 32rpx;
  align-items: center;
}
button::after {
  border: none;
}
</style>
