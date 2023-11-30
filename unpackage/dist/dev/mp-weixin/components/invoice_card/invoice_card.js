"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_image2 = common_vendor.resolveComponent("up-image");
  _easycom_up_image2();
}
const _easycom_up_image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
if (!Math) {
  _easycom_up_image();
}
const _sfc_main = {
  __name: "invoice_card",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          width: "64rpx",
          height: "64rpx",
          src: "https://cdn.uviewui.com/uview/album/1.jpg",
          shape: "circle"
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-3f711375"], ["__file", "/Users/zikn/Project/parking-client/components/invoice_card/invoice_card.vue"]]);
wx.createComponent(Component);
