"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u__form2 = common_vendor.resolveComponent("u--form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  (_easycom_u__input2 + _easycom_u_form_item2 + _easycom_u_icon2 + _easycom_u__form2 + _easycom_u_button2)();
}
const _easycom_u__input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u__form = () => "../../node-modules/uview-plus/components/u-form/u-form.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
if (!Math) {
  (_easycom_u__input + _easycom_u_form_item + _easycom_u_icon + _easycom_u__form + _easycom_u_button)();
}
const _sfc_main = {
  __name: "wish",
  setup(__props) {
    const info = common_vendor.ref({
      phone: "",
      time: "",
      model: ""
    });
    const check = () => {
      common_vendor.wx$1.chooseLicensePlate({
        success(res) {
          console.log(res);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(check),
        b: common_vendor.o(($event) => info.value.phone = $event),
        c: common_vendor.p({
          border: "none",
          placeholder: "请输入手机号",
          modelValue: info.value.phone
        }),
        d: common_vendor.sr("item1", "1528e4c0-1,1528e4c0-0"),
        e: common_vendor.p({
          label: "手机号码",
          prop: "info.phone",
          borderBottom: true
        }),
        f: common_vendor.o(($event) => info.value.time = $event),
        g: common_vendor.p({
          disabled: true,
          disabledColor: "#ffffff",
          placeholder: "请选择维保时间",
          border: "none",
          modelValue: info.value.time
        }),
        h: common_vendor.p({
          name: "arrow-right"
        }),
        i: common_vendor.sr("item1", "1528e4c0-3,1528e4c0-0"),
        j: common_vendor.o(($event) => {
          _ctx.showSex = true;
          _ctx.hideKeyboard();
        }),
        k: common_vendor.p({
          label: "维保时间",
          prop: "info.time",
          borderBottom: true
        }),
        l: common_vendor.o(($event) => info.value.model = $event),
        m: common_vendor.p({
          disabled: true,
          disabledColor: "#ffffff",
          placeholder: "请选择车辆型号",
          border: "none",
          modelValue: info.value.model
        }),
        n: common_vendor.p({
          name: "arrow-right"
        }),
        o: common_vendor.p({
          label: "车辆型号",
          prop: "info.model"
        }),
        p: common_vendor.sr("form1", "1528e4c0-0"),
        q: common_vendor.p({
          labelPosition: "left",
          model: _ctx.model1,
          rules: _ctx.rules,
          labelWidth: "120"
        }),
        r: common_vendor.p({
          text: "立即支付",
          type: "primary",
          color: "#DFA0B1"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zikn/Project/parking-client/pages/wish/wish.vue"]]);
wx.createPage(MiniProgramPage);
