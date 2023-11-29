"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_notice_bar2 = common_vendor.resolveComponent("u-notice-bar");
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_grid_item2 = common_vendor.resolveComponent("u-grid-item");
  const _easycom_u_grid2 = common_vendor.resolveComponent("u-grid");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_u_tabbar_item2 = common_vendor.resolveComponent("u-tabbar-item");
  const _easycom_u_tabbar2 = common_vendor.resolveComponent("u-tabbar");
  (_easycom_u_notice_bar2 + _easycom_u_swiper2 + _easycom_u_icon2 + _easycom_u_grid_item2 + _easycom_u_grid2 + _easycom_u_button2 + _easycom_u_cell2 + _easycom_u_tabbar_item2 + _easycom_u_tabbar2)();
}
const _easycom_u_notice_bar = () => "../../node-modules/uview-plus/components/u-notice-bar/u-notice-bar.js";
const _easycom_u_swiper = () => "../../node-modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_grid_item = () => "../../node-modules/uview-plus/components/u-grid-item/u-grid-item.js";
const _easycom_u_grid = () => "../../node-modules/uview-plus/components/u-grid/u-grid.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_cell = () => "../../node-modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_u_tabbar_item = () => "../../node-modules/uview-plus/components/u-tabbar-item/u-tabbar-item.js";
const _easycom_u_tabbar = () => "../../node-modules/uview-plus/components/u-tabbar/u-tabbar.js";
if (!Math) {
  (_easycom_u_notice_bar + _easycom_u_swiper + _easycom_u_icon + _easycom_u_grid_item + _easycom_u_grid + _easycom_u_button + _easycom_u_cell + _easycom_u_tabbar_item + _easycom_u_tabbar)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const value1 = common_vendor.ref(0);
    const banner = common_vendor.ref([
      "https://cdn.uviewui.com/uview/swiper/swiper1.png",
      "https://cdn.uviewui.com/uview/swiper/swiper2.png",
      "https://cdn.uviewui.com/uview/swiper/swiper3.png"
    ]);
    const list = common_vendor.ref([
      {
        name: "/static/images/index/grid1.png",
        title: "代客泊车",
        small: "中山六院"
      },
      {
        name: "/static/images/index/grid2.png",
        title: "代客泊车",
        small: "临江大道"
      },
      {
        name: "/static/images/index/grid3.png",
        title: "洗车服务",
        small: "洗车服务"
      },
      {
        name: "/static/images/index/grid4.png",
        title: "患者接送",
        small: "中山六院"
      },
      {
        name: "/static/images/index/grid5.png",
        title: "职工泊车",
        small: "中山六院"
      }
    ]);
    common_vendor.ref([
      {
        name: "/static/images/index/grid1.png",
        title: "代客泊车",
        small: "中山六院"
      },
      {
        name: "/static/images/index/grid1.png",
        title: "代客泊车",
        small: "中山六院"
      },
      {
        name: "/static/images/index/grid1.png",
        title: "代客泊车",
        small: "中山六院"
      }
    ]);
    const bannerClick = () => {
    };
    const click1 = (index) => {
      let url = "";
      if (index === 0) {
        url = "/pages/index/index";
      } else if (index === 1) {
        url = "/pages/orders/orders";
      } else {
        url = "/pages/account/account";
      }
      common_vendor.index.switchTab({
        url
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          bgColor: "#F6F7F8",
          icon: "/static/images/index/notice.svg",
          text: "这是一条公告，这是一条公告，这是一条公告，这是，"
        }),
        b: common_vendor.o(bannerClick),
        c: common_vendor.p({
          indicator: true,
          indicatorMode: "line",
          circular: true,
          list: banner.value
        }),
        d: common_vendor.f(list.value, (listItem, listIndex, i0) => {
          return {
            a: "1cf27b2a-4-" + i0 + "," + ("1cf27b2a-3-" + i0),
            b: common_vendor.p({
              name: listItem.name,
              size: 48
            }),
            c: common_vendor.t(listItem.title),
            d: common_vendor.t(listItem.small),
            e: listItem.small != "洗车服务" ? 1 : 0,
            f: listIndex,
            g: "1cf27b2a-3-" + i0 + ",1cf27b2a-2"
          };
        }),
        e: common_vendor.p({
          border: false,
          col: "5"
        }),
        f: common_vendor.p({
          disabled: true,
          text: "即将上线",
          shape: "circle",
          color: "#DFA0B1"
        }),
        g: common_vendor.p({
          border: false,
          isLink: true,
          title: "精选司机",
          value: "立即泊车"
        }),
        h: common_vendor.f(list.value, (listItem, listIndex, i0) => {
          return {
            a: "1cf27b2a-9-" + i0 + "," + ("1cf27b2a-8-" + i0),
            b: common_vendor.p({
              name: listItem.name,
              size: 48
            }),
            c: common_vendor.t(listItem.title),
            d: common_vendor.t(listItem.small),
            e: listIndex,
            f: "1cf27b2a-8-" + i0 + ",1cf27b2a-7"
          };
        }),
        i: common_vendor.p({
          border: false,
          col: "3"
        }),
        j: common_vendor.o(click1),
        k: common_vendor.p({
          text: "首页"
        }),
        l: common_vendor.o(click1),
        m: common_vendor.p({
          text: "我的订单"
        }),
        n: common_vendor.o(click1),
        o: common_vendor.p({
          text: "个人中心"
        }),
        p: common_vendor.p({
          border: false,
          activeColor: "#DFA0B1",
          value: value1.value,
          fixed: true,
          placeholder: true,
          safeAreaInsetBottom: false
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "D:/parking-client/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
