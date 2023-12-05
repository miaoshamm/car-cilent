"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_navbar2 = common_vendor.resolveComponent("u-navbar");
  const _easycom_u__input2 = common_vendor.resolveComponent("u--input");
  const _easycom_u_form_item2 = common_vendor.resolveComponent("u-form-item");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_up_button2 = common_vendor.resolveComponent("up-button");
  const _easycom_u__form2 = common_vendor.resolveComponent("u--form");
  const _easycom_u_datetime_picker2 = common_vendor.resolveComponent("u-datetime-picker");
  const _easycom_u_picker2 = common_vendor.resolveComponent("u-picker");
  (_easycom_u_navbar2 + _easycom_u__input2 + _easycom_u_form_item2 + _easycom_u_icon2 + _easycom_up_button2 + _easycom_u__form2 + _easycom_u_datetime_picker2 + _easycom_u_picker2)();
}
const _easycom_u_navbar = () => "../../node-modules/uview-plus/components/u-navbar/u-navbar.js";
const _easycom_u__input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_u_form_item = () => "../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u__form = () => "../../node-modules/uview-plus/components/u-form/u-form.js";
const _easycom_u_datetime_picker = () => "../../node-modules/uview-plus/components/u-datetime-picker/u-datetime-picker.js";
const _easycom_u_picker = () => "../../node-modules/uview-plus/components/u-picker/u-picker.js";
if (!Math) {
  (_easycom_u_navbar + License + _easycom_u__input + _easycom_u_form_item + _easycom_u_icon + _easycom_up_button + _easycom_u__form + Insurance + PriceBtn + _easycom_u_datetime_picker + _easycom_u_picker + Service)();
}
const License = () => "../../components/license_plate_selection/license_plate_selection.js";
const Insurance = () => "../../components/insurance_tips/insurance_tips.js";
const PriceBtn = () => "../../components/price_btn/price_btn.js";
const Service = () => "../../components/service/service.js";
const _sfc_main = {
  __name: "wish",
  setup(__props) {
    let licensePlate = common_vendor.ref("皖GHHHHHN");
    let serviceShow = common_vendor.ref(false);
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
    const leftClick = () => {
      if (serviceShow.value) {
        serviceShow.value = false;
      } else {
        common_vendor.index.navigateBack();
      }
    };
    const goService = () => {
      serviceShow.value = true;
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
    common_vendor.onReady(() => {
      datetimePickerRef.value.setFormatter(formatter);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(leftClick),
        b: common_vendor.p({
          safeAreaInsetTop: true,
          title: "预约车辆维保"
        }),
        c: common_vendor.p({
          licensePlate: common_vendor.unref(licensePlate)
        }),
        d: common_vendor.o(check),
        e: common_vendor.o(($event) => info.value.phone = $event),
        f: common_vendor.p({
          border: "none",
          placeholder: "请输入手机号",
          modelValue: info.value.phone
        }),
        g: common_vendor.p({
          label: "手机号码",
          prop: "info.phone",
          borderBottom: true
        }),
        h: common_vendor.o(($event) => info.value.time = $event),
        i: common_vendor.p({
          disabled: true,
          disabledColor: "#ffffff",
          placeholder: "请选择维保时间",
          border: "none",
          modelValue: info.value.time
        }),
        j: common_vendor.p({
          name: "arrow-right"
        }),
        k: common_vendor.o(($event) => info.value.timeShow = true),
        l: common_vendor.p({
          label: "维保时间",
          prop: "info.time",
          borderBottom: true
        }),
        m: common_vendor.o(($event) => info.value.model = $event),
        n: common_vendor.p({
          disabled: true,
          disabledColor: "#ffffff",
          placeholder: "请选择车辆型号",
          border: "none",
          modelValue: info.value.model
        }),
        o: common_vendor.p({
          name: "arrow-right"
        }),
        p: common_vendor.o(($event) => info.value.modelShow = true),
        q: common_vendor.p({
          label: "车辆型号",
          prop: "info.model",
          borderBottom: true
        }),
        r: common_vendor.p({
          disabled: true,
          disabledColor: "#ffffff",
          border: "none"
        }),
        s: common_vendor.p({
          label: "预约服务",
          borderBottom: true
        }),
        t: common_vendor.f(checkList.value, (item, k0, i0) => {
          return {
            a: "1528e4c0-14-" + i0 + "," + ("1528e4c0-13-" + i0),
            b: item.id,
            c: "1528e4c0-13-" + i0 + ",1528e4c0-2"
          };
        }),
        v: common_vendor.p({
          name: "arrow-right"
        }),
        w: common_vendor.p({
          borderBottom: true
        }),
        x: common_vendor.o(goService),
        y: common_vendor.p({
          customStyle: "border:none;",
          color: "#DFA0B1",
          iconColor: "#DFA0B1",
          plain: true,
          hairline: false,
          icon: "plus",
          text: "增添服务"
        }),
        z: common_vendor.p({
          labelPosition: "left",
          model: _ctx.model1,
          rules: _ctx.rules,
          labelWidth: "120"
        }),
        A: common_vendor.p({
          type: "wish"
        }),
        B: common_vendor.p({
          price: 45
        }),
        C: common_vendor.o(($event) => info.value.timeShow = false),
        D: common_vendor.o(checkTime),
        E: common_vendor.p({
          formatter,
          minDate: common_vendor.unref(nowTime),
          show: info.value.timeShow,
          mode: "datetime"
        }),
        F: common_vendor.o(($event) => info.value.modelShow = false),
        G: common_vendor.o(checkModel),
        H: common_vendor.p({
          show: info.value.modelShow,
          columns: modelColumns.value,
          keyName: "label"
        }),
        I: !common_vendor.unref(serviceShow),
        J: common_vendor.unref(serviceShow),
        K: common_vendor.p({
          type: "wish"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zikn/Project/parking-client/pages/wish/wish.vue"]]);
wx.createPage(MiniProgramPage);
