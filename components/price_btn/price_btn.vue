<template>
  <view class="pay-box">
    <view class="pay-box-row1">
      <view class="pay-price">
        <text class="price">￥{{ props.price.toFixed(2) }}</text>
        <text class="price-info" v-show="props.type != 'pay'">停车费：8 元/小时</text>
      </view>
      <text class="price-btn" v-if="props.type === 'detail'">费用明细</text>
      <u-button
        v-else-if="props.type === 'subscribe'"
        :customStyle="{ width: '250rpx', margin: 0 }"
        text="确认预约"
        color="#449656"
        @click="goPay"
      ></u-button>
      <u-button
        v-else
        :customStyle="{ width: '250rpx', margin: 0 }"
        text="立即支付"
        color="#449656"
        @click="goPay"
      ></u-button>
    </view>
    <view class="pay-box-row2" v-if="props.type === 'detail'">
      <u-button
        :customStyle="{ width: '330rpx' }"
        plain
        text="查看交接车位置"
        color="#449656"
        @click="goPay"
      ></u-button>
      <u-button
        :customStyle="{ width: '330rpx' }"
        text="到达取车位置"
        color="#449656"
        @click="goPay"
      ></u-button>
    </view>
  </view>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["price", "url", "type"]);
const emit = defineEmits(["callback"]);

const goPay = () => {
  emit("callback", "success");
};
</script>

<style lang="scss" scoped>
.pay-box {
  width: 100vw;
  padding: 18rpx 40rpx 30rpx 28rpx;
  position: fixed;
  bottom: 0;
  background: #fff;
  box-sizing: border-box;

  .pay-box-row1 {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .price-btn {
      color: $price;
      font-size: 24rpx;
      text-decoration: underline;
    }

    .pay-price {
      display: flex;
      flex-direction: column;
      .price {
        color: $price;
        font-size: 48rpx;
        font-weight: bold;
      }
      .price-info {
        color: $infoColor;
        font-size: 24rpx;
      }
    }
  }

  .pay-box-row2 {
    display: flex;
    justify-content: space-between;
    margin: 12rpx 0 0;
    .u-button.data-v-461e713c {
      width: 330rpx;
      margin: 0;
    }
  }
}
</style>
