"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  OrderCard();
}
const OrderCard = () => "../../components/order_card/order_card.js";
const _sfc_main = {
  __name: "invoice_list",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          type: "invoice"
        }),
        b: common_vendor.p({
          type: "invoice"
        }),
        c: common_vendor.p({
          type: "invoice"
        }),
        d: common_vendor.p({
          type: "invoice"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/parking-client/pages/invoice_list/invoice_list.vue"]]);
wx.createPage(MiniProgramPage);
