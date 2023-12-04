"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_tabbar_item2 = common_vendor.resolveComponent("u-tabbar-item");
  const _easycom_u_tabbar2 = common_vendor.resolveComponent("u-tabbar");
  (_easycom_u_tabbar_item2 + _easycom_u_tabbar2)();
}
const _easycom_u_tabbar_item = () => "../../node-modules/uview-plus/components/u-tabbar-item/u-tabbar-item.js";
const _easycom_u_tabbar = () => "../../node-modules/uview-plus/components/u-tabbar/u-tabbar.js";
if (!Math) {
  (OrderCard + _easycom_u_tabbar_item + _easycom_u_tabbar)();
}
const OrderCard = () => "../../components/order_card/order_card.js";
const _sfc_main = {
  __name: "orders",
  setup(__props) {
    const value1 = common_vendor.ref(1);
    const click1 = (index) => {
      let url = "";
      if (index === 0) {
        url = "/pages/index/index";
      } else if (index === 1) {
        url = "/pages/orders/orders";
      } else {
        url = "/pages/account/account";
      }
      common_vendor.index.switchTab({
        url
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(click1),
        b: common_vendor.p({
          text: "首页"
        }),
        c: common_vendor.o(click1),
        d: common_vendor.p({
          text: "我的订单"
        }),
        e: common_vendor.o(click1),
        f: common_vendor.p({
          text: "个人中心"
        }),
        g: common_vendor.p({
          border: false,
          activeColor: "#DFA0B1",
          value: value1.value,
          fixed: true,
          placeholder: true,
          safeAreaInsetBottom: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1acc51a1"], ["__file", "D:/parking-client/pages/orders/orders.vue"]]);
wx.createPage(MiniProgramPage);
