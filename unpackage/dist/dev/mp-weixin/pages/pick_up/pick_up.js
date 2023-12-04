"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_image2 = common_vendor.resolveComponent("up-image");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_up_image2 + _easycom_u_icon2)();
}
const _easycom_up_image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_up_image + _easycom_u_icon + InsuranceTips)();
}
const InsuranceTips = () => "../../components/insurance_tips/insurance_tips.js";
const _sfc_main = {
  __name: "pick_up",
  setup(__props) {
    const chooseLocation = requirePlugin("chooseLocation");
    const key = "GZABZ-OGULD-YPK4O-HWK6T-4B6KV-NBFJX";
    const referer = "城市生活";
    const address = common_vendor.ref("选取位置");
    const openMap = () => {
      common_vendor.wx$1.navigateTo({
        url: "plugin://chooseLocation/index?key=" + key + "&referer=" + referer
      });
    };
    common_vendor.onShow(() => {
      const location = chooseLocation.getLocation();
      address.value = location.name;
    });
    common_vendor.onUnload(() => {
      chooseLocation.setLocation(null);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(address.value),
        b: common_vendor.o(openMap),
        c: common_vendor.p({
          width: "96rpx",
          height: "96rpx",
          src: "https://cdn.uviewui.com/uview/album/1.jpg",
          shape: "circle"
        }),
        d: common_vendor.p({
          name: "arrow-right",
          size: "48rpx"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-9304b3b9"], ["__file", "/Users/zikn/Project/parking-client/pages/pick_up/pick_up.vue"]]);
wx.createPage(MiniProgramPage);
