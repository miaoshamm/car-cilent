"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  OrderCard();
}
const OrderCard = () => "../../components/order_card/order_card.js";
const _sfc_main = {
  __name: "evaluate_list",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "evaluate"
        }),
        b: common_vendor.p({
          type: "evaluate"
        }),
        c: common_vendor.p({
          type: "evaluate"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zikn/Project/parking-client/pages/evaluate_list/evaluate_list.vue"]]);
wx.createPage(MiniProgramPage);
