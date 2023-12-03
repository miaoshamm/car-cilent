"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Math) {
  LicensePlateSelection();
}
const LicensePlateSelection = () => "../../components/license_plate_selection/license_plate_selection.js";
const _sfc_main = {
  __name: "order_detail",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          licensePlate: "粤B12345"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zikn/Project/parking-client/pages/order_detail/order_detail.vue"]]);
wx.createPage(MiniProgramPage);
