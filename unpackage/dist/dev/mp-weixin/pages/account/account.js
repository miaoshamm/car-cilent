"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_image2 = common_vendor.resolveComponent("up-image");
  const _easycom_u_tabbar_item2 = common_vendor.resolveComponent("u-tabbar-item");
  const _easycom_u_tabbar2 = common_vendor.resolveComponent("u-tabbar");
  (_easycom_up_image2 + _easycom_u_tabbar_item2 + _easycom_u_tabbar2)();
}
const _easycom_up_image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_tabbar_item = () => "../../node-modules/uview-plus/components/u-tabbar-item/u-tabbar-item.js";
const _easycom_u_tabbar = () => "../../node-modules/uview-plus/components/u-tabbar/u-tabbar.js";
if (!Math) {
  (_easycom_up_image + UserMenu + _easycom_u_tabbar_item + _easycom_u_tabbar)();
}
const UserMenu = () => "../../components/user_menu/user_menu.js";
const _sfc_main = {
  __name: "account",
  setup(__props) {
    const value1 = common_vendor.ref(2);
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
        a: common_vendor.p({
          width: "96rpx",
          height: "96rpx",
          src: "https://cdn.uviewui.com/uview/album/1.jpg",
          shape: "circle"
        }),
        b: common_vendor.p({
          pageUrl: "/pages/invoice_list/invoice_list"
        }),
        c: common_vendor.o(click1),
        d: common_vendor.p({
          text: "首页"
        }),
        e: common_vendor.o(click1),
        f: common_vendor.p({
          text: "我的订单"
        }),
        g: common_vendor.o(click1),
        h: common_vendor.p({
          text: "个人中心"
        }),
        i: common_vendor.p({
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-8cce343a"], ["__file", "/Users/zikn/Project/parking-client/pages/account/account.vue"]]);
wx.createPage(MiniProgramPage);
