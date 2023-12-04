"use strict";
const common_vendor = require("../../../../common/vendor.js");
common_vendor.Schema.warning = function() {
};
const _sfc_main = {
  name: "u-form",
  mixins: [common_vendor.mpMixin, common_vendor.mixin, common_vendor.props$15],
  provide() {
    return {
      uForm: this
    };
  },
  data() {
    return {
      formRules: {},
      // 规则校验器
      validator: {},
      // 原始的model快照，用于resetFields方法重置表单时使用
      originalModel: null
    };
  },
  watch: {
    // 监听规则的变化
    rules: {
      immediate: true,
      handler(n) {
        this.setRules(n);
      }
    },
    // 监听属性的变化，通知子组件u-form-item重新获取信息
    propsChange(n) {
      var _a;
      if ((_a = this.children) == null ? void 0 : _a.length) {
        this.children.map((child) => {
          typeof child.updateParentData == "function" && child.updateParentData();
        });
      }
    },
    // 监听model的初始值作为重置表单的快照
    model: {
      immediate: true,
      handler(n) {
        if (!this.originalModel) {
          this.originalModel = common_vendor.index.$u.deepClone(n);
        }
      }
    }
  },
  computed: {
    propsChange() {
      return [
        this.errorType,
        this.borderBottom,
        this.labelPosition,
        this.labelWidth,
        this.labelAlign,
        this.labelStyle
      ];
    }
  },
  created() {
    this.children = [];
  },
  methods: {
    // 手动设置校验的规则，如果规则中有函数的话，微信小程序中会过滤掉，所以只能手动调用设置规则
    setRules(rules) {
      if (Object.keys(rules).length === 0)
        return;
      if (Object.keys(this.model).length === 0) {
        common_vendor.index.$u.error("设置rules，model必须设置！如果已经设置，请刷新页面。");
        return;
      }
      this.formRules = rules;
      this.validator = new common_vendor.Schema(rules);
    },
    // 清空所有u-form-item组件的内容，本质上是调用了u-form-item组件中的resetField()方法
    resetFields() {
      this.resetModel();
    },
    // 重置model为初始值的快照
    resetModel(obj) {
      this.children.map((child) => {
        const prop = child == null ? void 0 : child.prop;
        const value = common_vendor.index.$u.getProperty(this.originalModel, prop);
        common_vendor.index.$u.setProperty(this.model, prop, value);
      });
    },
    // 清空校验结果
    clearValidate(props) {
      props = [].concat(props);
      this.children.map((child) => {
        if (props[0] === void 0 || props.includes(child.prop)) {
          child.message = null;
        }
      });
    },
    // 对部分表单字段进行校验
    async validateField(value, callback, event = null) {
      this.$nextTick(() => {
        const errorsRes = [];
        value = [].concat(value);
        this.children.map((child) => {
          const childErrors = [];
          if (value.includes(child.prop)) {
            const propertyVal = common_vendor.index.$u.getProperty(
              this.model,
              child.prop
            );
            const propertyChain = child.prop.split(".");
            const propertyName = propertyChain[propertyChain.length - 1];
            const rule = this.formRules[child.prop];
            if (!rule)
              return;
            const rules = [].concat(rule);
            for (let i = 0; i < rules.length; i++) {
              const ruleItem = rules[i];
              const trigger = [].concat(ruleItem == null ? void 0 : ruleItem.trigger);
              if (event && !trigger.includes(event))
                continue;
              const validator = new common_vendor.Schema({
                [propertyName]: ruleItem
              });
              validator.validate(
                {
                  [propertyName]: propertyVal
                },
                (errors, fields) => {
                  var _a;
                  if (common_vendor.index.$u.test.array(errors)) {
                    errorsRes.push(...errors);
                    childErrors.push(...errors);
                  }
                  child.message = ((_a = childErrors[0]) == null ? void 0 : _a.message) ? childErrors[0].message : null;
                }
              );
            }
          }
        });
        typeof callback === "function" && callback(errorsRes);
      });
    },
    // 校验全部数据
    validate(callback) {
      if (Object.keys(this.formRules).length === 0) {
        common_vendor.index.$u.error("未设置rules，请看文档说明！如果已经设置，请刷新页面。");
        return;
      }
      return new Promise((resolve, reject) => {
        this.$nextTick(() => {
          const formItemProps = this.children.map(
            (item) => item.prop
          );
          this.validateField(formItemProps, (errors) => {
            if (errors.length) {
              this.errorType === "toast" && common_vendor.index.$u.toast(errors[0].message);
              reject(errors);
            } else {
              resolve(true);
            }
          });
        });
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {};
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "D:/parking-client/node_modules/uview-plus/components/u-form/u-form.vue"]]);
wx.createComponent(Component);
