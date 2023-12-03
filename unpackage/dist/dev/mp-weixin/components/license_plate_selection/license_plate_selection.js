"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "license_plate_selection",
  props: {
    licensePlate: String
  },
  setup(__props) {
    const props = __props;
    const licensePlate = props.licensePlate.split("");
    console.log(licensePlate);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(licensePlate).length === 7
      }, common_vendor.unref(licensePlate).length === 7 ? {
        b: common_vendor.t(common_vendor.unref(licensePlate)[0]),
        c: common_vendor.t(common_vendor.unref(licensePlate)[1]),
        d: common_vendor.t(common_vendor.unref(licensePlate)[2]),
        e: common_vendor.t(common_vendor.unref(licensePlate)[3]),
        f: common_vendor.t(common_vendor.unref(licensePlate)[4]),
        g: common_vendor.t(common_vendor.unref(licensePlate)[5]),
        h: common_vendor.t(common_vendor.unref(licensePlate)[6])
      } : {
        i: common_vendor.t(common_vendor.unref(licensePlate)[0]),
        j: common_vendor.t(common_vendor.unref(licensePlate)[1]),
        k: common_vendor.t(common_vendor.unref(licensePlate)[2]),
        l: common_vendor.t(common_vendor.unref(licensePlate)[3]),
        m: common_vendor.t(common_vendor.unref(licensePlate)[4]),
        n: common_vendor.t(common_vendor.unref(licensePlate)[5]),
        o: common_vendor.t(common_vendor.unref(licensePlate)[6]),
        p: common_vendor.t(common_vendor.unref(licensePlate)[7])
      }, {
        q: common_vendor.o(($event) => {
          _ctx.uni.chooseLicensePlate();
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/zikn/Project/parking-client/components/license_plate_selection/license_plate_selection.vue"]]);
wx.createComponent(Component);
