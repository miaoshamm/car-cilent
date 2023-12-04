"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up__form2 = common_vendor.resolveComponent("up--form");
  const _easycom_up_image2 = common_vendor.resolveComponent("up-image");
  const _easycom_u__textarea2 = common_vendor.resolveComponent("u--textarea");
  const _easycom_u_popup2 = common_vendor.resolveComponent("u-popup");
  (_easycom_up_input2 + _easycom_up__form2 + _easycom_up_image2 + _easycom_u__textarea2 + _easycom_u_popup2)();
}
const _easycom_up_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_up__form = () => "../../node-modules/uview-plus/components/u--form/u--form.js";
const _easycom_up_image = () => "../../node-modules/uview-plus/components/u-image/u-image.js";
const _easycom_u__textarea = () => "../../node-modules/uview-plus/components/u-textarea/u-textarea.js";
const _easycom_u_popup = () => "../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (_easycom_up_input + _easycom_up__form + LicensePlateSelection + _easycom_up_image + UserMenu + InsuranceTips + _easycom_u__textarea + _easycom_u_popup)();
}
const LicensePlateSelection = () => "../../components/license_plate_selection/license_plate_selection.js";
const UserMenu = () => "../../components/user_menu/user_menu.js";
const InsuranceTips = () => "../../components/insurance_tips/insurance_tips.js";
const _sfc_main = {
  __name: "order_detail",
  setup(__props) {
    const show = common_vendor.ref(false);
    const isInvoice = common_vendor.ref(false);
    const invoiceType = common_vendor.ref("unit");
    const formRef = common_vendor.ref();
    const close = () => {
      show.value = false;
    };
    const open = () => {
      show.value = true;
    };
    const invoiceTypeChange = (e) => {
      console.log(e.detail.value);
      invoiceType.value = e.detail.value;
    };
    const openInvoice = () => {
      isInvoice.value = true;
    };
    const handleInvoice = () => {
      isInvoice.value = false;
      common_vendor.index.showToast({
        icon: "none",
        title: "开票成功"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: isInvoice.value
      }, isInvoice.value ? common_vendor.e({
        b: invoiceType.value === "unit",
        c: invoiceType.value === "personage",
        d: common_vendor.o(invoiceTypeChange),
        e: invoiceType.value === "personage"
      }, invoiceType.value === "personage" ? {
        f: common_vendor.p({
          placeholder: "必填",
          border: "border",
          inputAlign: "right"
        })
      } : {}, {
        g: invoiceType.value === "unit"
      }, invoiceType.value === "unit" ? {
        h: common_vendor.p({
          placeholder: "必填",
          border: "border",
          inputAlign: "right"
        })
      } : {}, {
        i: invoiceType.value === "unit"
      }, invoiceType.value === "unit" ? {
        j: common_vendor.p({
          placeholder: "必填",
          border: "border",
          inputAlign: "right"
        })
      } : {}, {
        k: invoiceType.value === "unit"
      }, invoiceType.value === "unit" ? {
        l: common_vendor.p({
          placeholder: "选填",
          border: "border",
          inputAlign: "right"
        })
      } : {}, {
        m: invoiceType.value === "unit"
      }, invoiceType.value === "unit" ? {
        n: common_vendor.p({
          placeholder: "选填",
          border: "border",
          inputAlign: "right"
        })
      } : {}, {
        o: invoiceType.value === "unit"
      }, invoiceType.value === "unit" ? {
        p: common_vendor.p({
          placeholder: "选填",
          border: "border",
          inputAlign: "right"
        })
      } : {}, {
        q: invoiceType.value === "unit"
      }, invoiceType.value === "unit" ? {
        r: common_vendor.p({
          placeholder: "选填",
          border: "border",
          inputAlign: "right"
        })
      } : {}, {
        s: common_vendor.p({
          placeholder: "必填",
          border: "border",
          inputAlign: "right"
        }),
        t: common_vendor.p({
          placeholder: "必填",
          border: "border",
          inputAlign: "right"
        }),
        v: common_vendor.o(handleInvoice),
        w: common_vendor.sr(formRef.value, "616083f0-0"),
        x: formRef.value
      }) : {
        y: common_vendor.p({
          licensePlate: "粤B12345"
        }),
        z: common_vendor.p({
          width: "96rpx",
          height: "96rpx",
          src: "https://cdn.uviewui.com/uview/album/1.jpg",
          shape: "circle"
        }),
        A: common_vendor.p({
          title: "开发票",
          description: "立即开票",
          onClick: openInvoice
        }),
        B: common_vendor.p({
          title: "评价服务",
          description: "立即评价",
          onClick: open
        })
      }, {
        C: common_vendor.p({
          placeholder: "预设文本",
          count: true,
          maxlength: 500,
          height: "352rpx",
          border: "none"
        }),
        D: common_vendor.o(close),
        E: common_vendor.o(close),
        F: common_vendor.o(open),
        G: common_vendor.p({
          show: show.value,
          round: 16
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/parking-client/pages/order_detail/order_detail.vue"]]);
wx.createPage(MiniProgramPage);
