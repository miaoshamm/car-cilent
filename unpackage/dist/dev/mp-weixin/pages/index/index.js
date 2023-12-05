"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_modal2 = common_vendor.resolveComponent("u-modal");
  const _easycom_u_notice_bar2 = common_vendor.resolveComponent("u-notice-bar");
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_grid_item2 = common_vendor.resolveComponent("u-grid-item");
  const _easycom_u_grid2 = common_vendor.resolveComponent("u-grid");
  const _easycom_u_button2 = common_vendor.resolveComponent("u-button");
  const _easycom_u_cell2 = common_vendor.resolveComponent("u-cell");
  const _easycom_up_avatar2 = common_vendor.resolveComponent("up-avatar");
  const _easycom_up_text2 = common_vendor.resolveComponent("up-text");
  const _easycom_u_tabbar_item2 = common_vendor.resolveComponent("u-tabbar-item");
  const _easycom_u_tabbar2 = common_vendor.resolveComponent("u-tabbar");
  (_easycom_u_modal2 + _easycom_u_notice_bar2 + _easycom_u_swiper2 + _easycom_u_icon2 + _easycom_u_grid_item2 + _easycom_u_grid2 + _easycom_u_button2 + _easycom_u_cell2 + _easycom_up_avatar2 + _easycom_up_text2 + _easycom_u_tabbar_item2 + _easycom_u_tabbar2)();
}
const _easycom_u_modal = () => "../../node-modules/uview-plus/components/u-modal/u-modal.js";
const _easycom_u_notice_bar = () => "../../node-modules/uview-plus/components/u-notice-bar/u-notice-bar.js";
const _easycom_u_swiper = () => "../../node-modules/uview-plus/components/u-swiper/u-swiper.js";
const _easycom_u_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_u_grid_item = () => "../../node-modules/uview-plus/components/u-grid-item/u-grid-item.js";
const _easycom_u_grid = () => "../../node-modules/uview-plus/components/u-grid/u-grid.js";
const _easycom_u_button = () => "../../node-modules/uview-plus/components/u-button/u-button.js";
const _easycom_u_cell = () => "../../node-modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_up_avatar = () => "../../node-modules/uview-plus/components/u-avatar/u-avatar.js";
const _easycom_up_text = () => "../../node-modules/uview-plus/components/u-text/u-text.js";
const _easycom_u_tabbar_item = () => "../../node-modules/uview-plus/components/u-tabbar-item/u-tabbar-item.js";
const _easycom_u_tabbar = () => "../../node-modules/uview-plus/components/u-tabbar/u-tabbar.js";
if (!Math) {
  (_easycom_u_modal + _easycom_u_notice_bar + _easycom_u_swiper + _easycom_u_icon + _easycom_u_grid_item + _easycom_u_grid + _easycom_u_button + _easycom_u_cell + _easycom_up_avatar + _easycom_up_text + _easycom_u_tabbar_item + _easycom_u_tabbar)();
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
        small: "临江大道",
        url: "/pages/wish/wish"
      },
      {
        name: "/static/images/index/grid4.png",
        title: "患者接送",
        small: "中山六院",
        url: "/pages/pick_up/pick_up"
      },
      {
        name: "/static/images/index/grid5.png",
        title: "职工泊车",
        small: "中山六院"
      }
    ]);
    const driver = common_vendor.ref([
      {
        name: "/static/images/index/driver.png",
        title: "黄思亮",
        small: "驾龄：10年"
      },
      {
        name: "/static/images/index/driver.png",
        title: "黄思亮",
        small: "驾龄：10年"
      },
      {
        name: "/static/images/index/driver.png",
        title: "黄思亮",
        small: "驾龄：10年"
      },
      {
        name: "/static/images/index/driver.png",
        title: "黄思亮",
        small: "驾龄：10年"
      },
      {
        name: "/static/images/index/driver.png",
        title: "黄思亮",
        small: "驾龄：10年"
      },
      {
        name: "/static/images/index/driver.png",
        title: "黄思亮",
        small: "驾龄：10年"
      }
    ]);
    const model = common_vendor.ref({
      show: true,
      title: "协议声明",
      content: `
		本人同意依据本确认单将车辆交于广东城市实业有限公司代客泊车服务，并愿意在提车前支付相关泊车费、代客泊车费等费用。在此声明，车辆在移交广东城市实业有限公司之前，本人已提醒车主自行收起贵重物品，并将车内物品妥善保管。如有任何遗失，车主将自行承担相应责任。
		同时，本人承诺如在路途接送车过程中发生意外，我将无条件协助广东城市实业有限公司通过保险公司途径进行维修处理。我理解并同意，广东城市实业有限公司对于车辆的安全负有合理的义务，但车主也应自行保管好个人财物，以免造成不必要的损失。
		此外，本人还同意遵守广东城市实业有限公司的相关规定和要求，包括但不限于停车时间限制、停车场规定等。如有违反，我愿意承担相应的法律责任和经济赔偿。
		最后，本人郑重声明以上内容属实，并愿意承担因违反本声明所产生的一切后果。
		`
    });
    const goService = (url) => {
      common_vendor.index.navigateTo({
        url
      });
    };
    const closeModel = () => {
      model.value.show = false;
    };
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
        a: common_vendor.o(closeModel),
        b: common_vendor.p({
          confirmColor: "#DFA0B1",
          show: model.value.show,
          title: model.value.title,
          content: model.value.content
        }),
        c: common_vendor.p({
          bgColor: "#F6F7F8",
          icon: "/static/images/index/notice.svg",
          text: "这是一条公告，这是一条公告，这是一条公告，这是，"
        }),
        d: common_vendor.o(bannerClick),
        e: common_vendor.p({
          indicator: true,
          indicatorMode: "line",
          circular: true,
          list: banner.value
        }),
        f: common_vendor.f(list.value, (listItem, listIndex, i0) => {
          return {
            a: "1cf27b2a-5-" + i0 + "," + ("1cf27b2a-4-" + i0),
            b: common_vendor.p({
              name: listItem.name,
              size: 48
            }),
            c: common_vendor.t(listItem.title),
            d: common_vendor.t(listItem.small),
            e: listItem.small != "洗车服务" ? 1 : 0,
            f: listIndex,
            g: common_vendor.o(($event) => goService(listItem.url), listIndex),
            h: "1cf27b2a-4-" + i0 + ",1cf27b2a-3"
          };
        }),
        g: common_vendor.p({
          border: false,
          col: "5"
        }),
        h: common_vendor.p({
          disabled: true,
          text: "即将上线",
          shape: "circle",
          color: "#DFA0B1"
        }),
        i: common_vendor.p({
          border: false,
          isLink: true,
          title: "精选司机",
          value: "立即泊车"
        }),
        j: common_vendor.f(driver.value, (listItem, listIndex, i0) => {
          return {
            a: "1cf27b2a-10-" + i0 + "," + ("1cf27b2a-9-" + i0),
            b: common_vendor.p({
              name: listItem.name,
              size: 100
            }),
            c: common_vendor.t(listItem.title),
            d: common_vendor.t(listItem.small),
            e: listIndex,
            f: "1cf27b2a-9-" + i0 + ",1cf27b2a-8"
          };
        }),
        k: common_vendor.p({
          border: false,
          col: "3"
        }),
        l: common_vendor.p({
          size: 32,
          src: "http://run.czjscktd.com/help-thing/lkr.jpg"
        }),
        m: common_vendor.p({
          border: false,
          isLink: true,
          title: "精选维保服务",
          va: true,
          lue: "立即保养"
        }),
        n: common_vendor.p({
          lines: 2,
          size: "13",
          color: "#666",
          text: "为您的爱车提供最佳的外观和内部清洁效果\n						为您的爱车提供最佳的外观和内部清洁效果为您的爱车提供最佳的外观和内部清洁效果"
        }),
        o: common_vendor.p({
          lines: 2,
          text: "为您的爱车提供最佳的外观和内部清洁效果\n						为您的爱车提供最佳的外观和内部清洁效果为您的爱车提供最佳的外观和内部清洁效果"
        }),
        p: common_vendor.p({
          lines: 2,
          text: "为您的爱车提供最佳的外观和内部清洁效果\n						为您的爱车提供最佳的外观和内部清洁效果为您的爱车提供最佳的外观和内部清洁效果"
        }),
        q: common_vendor.o(click1),
        r: common_vendor.p({
          text: "首页"
        }),
        s: common_vendor.o(click1),
        t: common_vendor.p({
          text: "我的订单"
        }),
        v: common_vendor.o(click1),
        w: common_vendor.p({
          text: "个人中心"
        }),
        x: common_vendor.p({
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
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"], ["__file", "/Users/zikn/Project/parking-client/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
