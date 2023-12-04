"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_up_image2 = common_vendor.resolveComponent("up-image");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  (_easycom_up_image2 + _easycom_u_icon2)();
}
const _easycom_up_image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_up_image + _easycom_u_icon)();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: common_vendor.p({
      width: "96rpx",
      height: "96rpx",
      src: "https://cdn.uviewui.com/uview/album/1.jpg",
      shape: "circle"
    }),
    b: common_vendor.p({
      name: "arrow-right",
      size: "48rpx"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-9304b3b9"], ["__file", "/Users/zikn/Project/parking-client/pages/pick_up/pick_up.vue"]]);
wx.createPage(MiniProgramPage);
