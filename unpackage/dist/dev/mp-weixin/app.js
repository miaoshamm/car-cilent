"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/orders/orders.js";
  "./pages/account/account.js";
  "./pages/invoice_list/invoice_list.js";
  "./pages/wish/wish.js";
  "./pages/evaluate_list/evaluate_list.js";
  "./pages/privacy_policy/privacy_policy.js";
  "./pages/terms_of_service/terms_of_service.js";
  "./pages/order_detail/order_detail.js";
  "./pages/bill_rule/bill_rule.js";
  "./pages/pick_up/pick_up.js";
  "./pages/service/service.js";
  "./pages/wish/wish_pay/wish_pay.js";
  "./pages/staff/staff.js";
}
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return {};
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/parking-client/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  const pinia = common_vendor.createPinia();
  app.use(pinia);
  app.use(common_vendor.uviewPlus);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
