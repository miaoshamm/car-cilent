"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  _easycom_u_navbar2();
}
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
if (!Math) {
  (_easycom_u_navbar + ChooseEmploy)();
}
const ChooseEmploy = () => "../../components/choose_employee/choose_employee.js";
const _sfc_main = {
  __name: "pick_up",
  setup(__props) {
    const chooseLocation = requirePlugin("chooseLocation");
    const subscribeInfo = common_vendor.ref({
      address: "选取位置",
      name: "",
      phone: "",
      time: "选择预约时间",
      service: "选择预约服务",
      timeShow: false,
      serviceShow: false
    });
    common_vendor.onShow(() => {
      const location = chooseLocation.getLocation();
      subscribeInfo.value.address = location.name;
    });
    common_vendor.onUnload(() => {
      chooseLocation.setLocation(null);
    });
    common_vendor.reactive([
      ["接送", "只接", "只送"]
    ]);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(_ctx.rightClick),
        b: common_vendor.p({
          title: "预约接送服务",
          autoBack: true,
          placeholder: true,
          safeAreaInsetTop: true
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9304b3b9"], ["__file", "/Users/zikn/Project/parking-client/pages/pick_up/pick_up.vue"]]);
wx.createPage(MiniProgramPage);
