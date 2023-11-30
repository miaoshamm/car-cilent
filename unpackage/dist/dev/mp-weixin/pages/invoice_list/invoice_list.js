"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  InvoiceCard();
}
const InvoiceCard = () => "../../components/invoice_card/invoice_card.js";
const _sfc_main = {
  __name: "invoice_list",
  setup(__props) {
    return (_ctx, _cache) => {
      return {};
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2c57b8ef"], ["__file", "D:/parking-client/pages/invoice_list/invoice_list.vue"]]);
wx.createPage(MiniProgramPage);
