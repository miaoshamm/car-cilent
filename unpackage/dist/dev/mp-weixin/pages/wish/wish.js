"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_u__form2 = common_vendor.resolveComponent("u--form");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_datetime_picker2 = common_vendor.resolveComponent("u-datetime-picker");
  const _easycom_u_picker2 = common_vendor.resolveComponent("u-picker");
  (_easycom_u__input2 + _easycom_u_form_item2 + _easycom_u_icon2 + _easycom_up_button2 + _easycom_u__form2 + _easycom_u_button2 + _easycom_u_datetime_picker2 + _easycom_u_picker2)();
}
const _easycom_u__input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u__form = () => "../../node-modules/uview-plus/components/u-form/u-form.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_datetime_picker = () => "../../node-modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
const _easycom_u_picker = () => "../../node-modules/uview-plus/components/u-picker/u-picker.js";
if (!Math) {
  (License + _easycom_u__input + _easycom_u_form_item + _easycom_u_icon + _easycom_up_button + _easycom_u__form + Insurance + _easycom_u_button + _easycom_u_datetime_picker + _easycom_u_picker)();
}
const License = () => "../../components/license_plate_selection/license_plate_selection.js";
const Insurance = () => "../../components/insurance_tips/insurance_tips.js";
const _sfc_main = {
  __name: "wish",
  setup(__props) {
    let licensePlate = common_vendor.ref("皖GHHHHHN");
    const nowTime = Date.now();
    const info = common_vendor.ref({
      phone: "",
      time: "",
      model: "",
      modelId: 0,
      timeShow: false,
      modelShow: false
    });
    const checkList = common_vendor.ref([{
      id: 1,
      name: "",
      image: "",
      price: ""
    }]);
    const modelColumns = common_vendor.ref([
      [
        {
          id: 1,
          label: "车型一"
        },
        {
          id: 2,
          label: "车型二"
        }
      ]
    ]);
    const checkTime = (time) => {
      info.value.time = common_vendor.dayjs(time.value).format("YYYY-MM-DD hh:mm:ss");
      info.value.timeShow = false;
    };
    const checkModel = (item) => {
      info.value.model = item.value[0].label;
      info.value.modelId = item.value[0].id;
      info.value.modelShow = false;
    };
    const goService = () => {
      common_vendor.index.navigateTo({
        url: "/pages/service/service?type=wish"
      });
    };
    const formatter = (type, value) => {
      if (type === "year") {
        return `${value}年`;
      }
      if (type === "month") {
        return `${value}月`;
      }
      if (type === "day") {
        return `${value}日`;
      }
      if (type === "hour") {
        return `${value}时`;
      }
      if (type === "minute") {
        return `${value}分`;
      }
      return value;
    };
    const check = () => {
      common_vendor.wx$1.chooseLicensePlate({
        success(res) {
          licensePlate.value = res.plateNumber;
        }
      });
    };
    const goPay = () => {
      common_vendor.index.navigateTo({
        url: "/pages/wish/wish_pay/wish_pay"
      });
    };
    common_vendor.onReady(() => {
      datetimePickerRef.value.setFormatter(formatter);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          licensePlate: common_vendor.unref(licensePlate)
        }),
        b: common_vendor.o(check),
        c: common_vendor.o(($event) => info.value.phone = $event),
        d: common_vendor.p({
          border: "none",
          placeholder: "请输入手机号",
          modelValue: info.value.phone
        }),
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
        i: common_vendor.o(($event) => info.value.timeShow = true),
        j: common_vendor.p({
          label: "维保时间",
          prop: "info.time",
          borderBottom: true
        }),
        k: common_vendor.o(($event) => info.value.model = $event),
        l: common_vendor.p({
          disabled: true,
          disabledColor: "#ffffff",
          placeholder: "请选择车辆型号",
          border: "none",
          modelValue: info.value.model
        }),
        m: common_vendor.p({
          name: "arrow-right"
        }),
        n: common_vendor.o(($event) => info.value.modelShow = true),
        o: common_vendor.p({
          label: "车辆型号",
          prop: "info.model",
          borderBottom: true
        }),
        p: common_vendor.p({
          disabled: true,
          disabledColor: "#ffffff",
          border: "none"
        }),
        q: common_vendor.p({
          label: "预约服务",
          borderBottom: true
        }),
        r: common_vendor.f(checkList.value, (item, k0, i0) => {
          return {
            a: "5e506610-13-" + i0 + "," + ("5e506610-12-" + i0),
            b: item.id,
            c: "5e506610-12-" + i0 + ",5e506610-1"
          };
        }),
        s: common_vendor.p({
          name: "arrow-right"
        }),
        t: common_vendor.p({
          borderBottom: true
        }),
        v: common_vendor.o(goService),
        w: common_vendor.p({
          customStyle: "border:none;",
          color: "#DFA0B1",
          iconColor: "#DFA0B1",
          plain: true,
          hairline: false,
          icon: "plus",
          text: "增添服务"
        }),
        x: common_vendor.p({
          labelPosition: "left",
          model: _ctx.model1,
          rules: _ctx.rules,
          labelWidth: "120"
        }),
        y: common_vendor.p({
          type: "wish"
        }),
        z: common_vendor.o(goPay),
        A: common_vendor.p({
          text: "立即支付",
          color: "#DFA0B1"
        }),
        B: common_vendor.o(($event) => info.value.timeShow = false),
        C: common_vendor.o(checkTime),
        D: common_vendor.p({
          formatter,
          minDate: common_vendor.unref(nowTime),
          show: info.value.timeShow,
          mode: "datetime"
        }),
        E: common_vendor.o(($event) => info.value.modelShow = false),
        F: common_vendor.o(checkModel),
        G: common_vendor.p({
          show: info.value.modelShow,
          columns: modelColumns.value,
          keyName: "label"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "D:/parking-client/pages/wish/wish.vue"]]);
wx.createPage(MiniProgramPage);
