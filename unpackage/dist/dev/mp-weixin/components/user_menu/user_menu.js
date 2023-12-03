"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
const _sfc_main = {
  __name: "user_menu",
  props: {
    title: String,
    pageUrl: String
  },
  setup(__props) {
    const props = __props;
    const menuClick = () => {
      common_vendor.index.navigateTo({
        url: props.pageUrl
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(props.title),
        b: common_vendor.p({
          name: "arrow-right",
          color: "#C0C3CD",
          size: "28"
        }),
        c: common_vendor.o(menuClick)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zikn/Project/parking-client/components/user_menu/user_menu.vue"]]);
wx.createComponent(Component);
