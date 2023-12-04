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
  __name: "order_card",
  props: {
    type: String
  },
  setup(__props) {
    const props = __props;
    const cardType = props.type ? props.type : "order";
    const navigateDetail = () => {
      common_vendor.index.navigateTo({
        url: "/pages/order_detail/order_detail"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          width: "64rpx",
          height: "64rpx",
          src: "https://cdn.uviewui.com/uview/album/1.jpg",
          shape: "circle"
        }),
        b: common_vendor.unref(cardType) !== "evaluate"
      }, common_vendor.unref(cardType) !== "evaluate" ? common_vendor.e({
        c: common_vendor.unref(cardType) === "order"
      }, common_vendor.unref(cardType) === "order" ? {} : {}, {
        d: common_vendor.unref(cardType) === "invoice"
      }, common_vendor.unref(cardType) === "invoice" ? {} : {}) : {}, {
        e: common_vendor.unref(cardType) === "invoice"
      }, common_vendor.unref(cardType) === "invoice" ? {} : {}, {
        f: common_vendor.unref(cardType) === "evaluate"
      }, common_vendor.unref(cardType) === "evaluate" ? {} : {}, {
        g: common_vendor.unref(cardType) === "order"
      }, common_vendor.unref(cardType) === "order" ? {} : {}, {
        h: common_vendor.unref(cardType) === "evaluate"
      }, common_vendor.unref(cardType) === "evaluate" ? {} : {}, {
        i: common_vendor.o(navigateDetail)
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5634394a"], ["__file", "D:/parking-client/components/order_card/order_card.vue"]]);
wx.createComponent(Component);
