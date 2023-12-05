"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "insurance_tips",
  setup(__props) {
    const navigateBillRule = () => {
      common_vendor.index.navigateTo({
        url: "/pages/bill_rule/bill_rule"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(navigateBillRule)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zikn/Project/parking-client/components/insurance_tips/insurance_tips.vue"]]);
wx.createComponent(Component);
