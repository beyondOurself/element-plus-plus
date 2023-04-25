var ye = Object.defineProperty;
var Te = Object.getOwnPropertySymbols;
var xe = Object.prototype.hasOwnProperty, Be = Object.prototype.propertyIsEnumerable;
var Ve = (a, c, o) => c in a ? ye(a, c, { enumerable: !0, configurable: !0, writable: !0, value: o }) : a[c] = o, Ae = (a, c) => {
  for (var o in c || (c = {}))
    xe.call(c, o) && Ve(a, o, c[o]);
  if (Te)
    for (var o of Te(c))
      Be.call(c, o) && Ve(a, o, c[o]);
  return a;
};
import { ref as B, watchEffect as he, unref as s, computed as oe, resolveComponent as g, openBlock as u, createElementBlock as V, createElementVNode as F, withDirectives as G, createBlock as p, withCtx as A, createVNode as D, Fragment as I, renderList as W, createCommentVNode as $, createTextVNode as K, toDisplayString as j, nextTick as Ce, inject as $e, watch as ue, resolveDirective as De, renderSlot as ie, normalizeClass as ge, vShow as Q, provide as ke, useSlots as Oe, createSlots as Ne } from "vue";
import { ElMessage as Fe } from "element-plus";
const e = {
  INPUT: "text",
  INPUT_NUMBER: "number",
  INPUT_TEXT_AREA: "textarea",
  SELECT: "select",
  SLIDER: "slider",
  SWITCH: "switch",
  RADIO: "radio",
  CHECKBOX: "checkbox",
  DATE: "date",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
  DATE_RANGE: "daterange",
  MONTH_RANGE: "monthrange",
  TIME: "time",
  TIME_RANGE: "timerange",
  DATE_TIME: "datetime",
  DATE_TIME_RANGE: "datetimerange",
  OPERATION: "operation"
};
let fe = null;
const ve = (a) => {
  const c = [], o = [], d = (n = []) => {
    const r = n.map((b) => b.width), E = Math.max(...r);
    n.forEach((b) => {
      const { labelEl: y } = b;
      y.style.width = `${E}px`;
    });
  }, _ = () => {
    if (a) {
      const n = a.querySelectorAll(".el-form-item__label");
      if (n && n.length) {
        let r = 0;
        n.forEach((E, b) => {
          E.style.width = "initial", E.style.whiteSpace = "nowrap";
          const { x: y = 0, width: x = 0 } = E.getBoundingClientRect(), N = { x: y, width: x, labelEl: E };
          b === 0 && (r = y), y === r ? c.push(N) : o.push(N);
        });
      }
    }
  };
  fe && clearTimeout(fe), fe = setTimeout(() => {
    _(), d(c), d(o);
  }, 50);
}, Ee = {
  /**
   * 表单自动左对齐
   */
  align: {
    created(a) {
      window.addEventListener("resize", () => {
        ve(a);
      });
    },
    mounted(a) {
      ve(a);
    },
    unmounted(a) {
      window.removeEventListener("resize", ve(a));
    }
  },
  /**
   * 表格自动高度
   */
  height: (a, { value: c = 65, arg: o = "" }) => {
    if (a) {
      const { y: d = 0 } = a.getBoundingClientRect();
      a.style.height = `calc(100vh - ${d + c}px)`;
    }
  }
};
const Me = { class: "bsgoal-base-form" }, Re = { class: "base_form" }, Ue = { key: 1 }, Se = {
  name: "BsgoalBaseForm"
}, Ie = /* @__PURE__ */ Object.assign(Se, {
  props: {
    /**
     * >----------props----------<
     *  {
     *      label:'' //  名称
     *      value:'' //  值
     *      prop:''  //  绑定字段
     *      type:'text'  //  内容组件的类型 : 参照 enumType
     *      placeholder:''  // placeholder 提示文本
     *      readonly: false  // 是否为只读文本
     *      clearable:  true  //是否为可清空
     *  }
     *
     * >----------events----------<
     *
     *  on-form  // 触发查询
     *  on-clear   // 触发清空
     *  on-change  // 触发查询变动
     *  on-fold    // 触发折叠
     */
    configOptions: {
      type: [Array],
      default: () => []
    },
    /**
     * 中屏设备宽度的比例
     */
    medium: {
      type: [Number, String],
      default: 24
    },
    /**
     * 初始值
     */
    values: {
      type: [Object],
      default: () => ({})
    }
  },
  emits: ["on-form", "on-clear", "on-change", "on-fold"],
  setup(a, { expose: c, emit: o }) {
    const d = a, _ = B(null), n = Ee.align, r = B({});
    he(() => {
      const { configOptions: h, values: v } = d, T = s(h), m = s(v);
      T.forEach((C) => {
        const { value: k = "", prop: O = "", type: M = "" } = C;
        [e.INPUT, e.INPUT_TEXT_AREA].includes(M), r.value[O] = m[O] || k;
      });
    });
    const E = oe(() => {
      const { configOptions: h } = d;
      return s(h).map((m) => {
        let { rules: C = !1, label: k = "" } = m;
        const O = { required: !0, message: `${k}不能为空`, trigger: "blur" };
        return C && (typeof C == "boolean" ? C = [O] : Array.isArray(C) ? C = [O, ...C] : C = [O, C]), m.rules = C, m;
      });
    }), b = (h = "", v = "", T = "") => {
      if (!T)
        switch (h) {
          case e.INPUT:
          case e.INPUT_TEXT_AREA:
            return `请输入${v}`;
          case e.SELECT:
          case e.DATE:
          case e.WEEK:
          case e.MONTH:
          case e.YEAR:
          case e.DATE_TIME:
          case e.TIME:
            return `请选择${v}`;
          case e.DATE_RANGE:
          case e.DATE_TIME_RANGE:
            return ["开始日期", "结束日期"];
          case e.TIME_RANGE:
            return ["开始时间", "结束时间"];
          case e.MONTH_RANGE:
            return ["开始月份", "结束月份"];
        }
      return T;
    }, y = (h = "", v = "") => {
      if (!v)
        switch (h) {
          case e.WEEK:
            return "ww";
          case e.DATE:
          case e.DATE_RANGE:
            return "YYYY-MM-DD";
          case e.MONTH:
            return "MM";
          case e.YEAR:
            return "YYYY";
          case e.MONTH_RANGE:
            return "YYYY-MM";
          case e.TIME:
          case e.TIME_RANGE:
            return "HH:mm:ss";
          case e.DATE_TIME:
          case e.DATE_TIME_RANGE:
            return "YYYY-MM-DD HH:mm:ss";
        }
      return v;
    }, x = () => {
      const h = s(r), { configOptions: v } = d, T = s(v);
      for (const m of T) {
        const { type: C = "", range: k = [], prop: O = "" } = m;
        if (C.endsWith("range") && k && k.length === 2) {
          const { 0: M = "", 1: P = "" } = h[O], { 0: U = "", 1: S = "" } = k;
          h[U] = M, h[S] = P;
        }
      }
      return o("on-form", h), h;
    }, N = () => {
      _.value.resetFields(), o("on-clear", r.value);
    }, w = (h, v) => {
      const T = {
        type: h,
        prop: v,
        value: r.value[v] || ""
      };
      o("on-change", T);
    };
    return c({
      triggerOperationClear: N,
      triggerOperationForm: x,
      validateForm: (h = () => {
      }) => {
        _.value.validate((v = !1, T = {}) => {
          if (v) {
            const m = x();
            h(m);
          } else {
            h(!1), console.log("field", T);
            const m = Object.keys(T)[0], {
              [m]: {
                0: { message: C = "" }
              }
            } = T;
            Fe.error(C);
          }
        });
      }
    }), (h, v) => {
      const T = g("el-input"), m = g("el-input-number"), C = g("el-radio"), k = g("el-radio-group"), O = g("el-option"), M = g("el-select"), P = g("el-slider"), U = g("el-switch"), S = g("el-date-picker"), X = g("el-time-picker"), Z = g("el-checkbox"), le = g("el-checkbox-group"), ee = g("el-form-item"), de = g("el-col"), _e = g("el-row"), me = g("el-form");
      return u(), V("div", Me, [
        F("div", Re, [
          G((u(), p(me, {
            ref_key: "EL_FORM_REF",
            ref: _,
            "label-suffix": ":",
            model: r.value
          }, {
            default: A(() => [
              D(_e, null, {
                default: A(() => [
                  (u(!0), V(I, null, W(s(E), ({
                    label: L = "",
                    prop: f = "",
                    type: l = "text",
                    placeholder: i = "",
                    readonly: z = !1,
                    clearable: se = !0,
                    rows: re = 2,
                    min: ce = 1,
                    max: ne = 10,
                    range: q = [],
                    format: Y = "",
                    rules: J = []
                  } = {}, te) => (u(), p(de, {
                    key: te,
                    xs: 24,
                    sm: 24,
                    md: a.medium
                  }, {
                    default: A(() => [
                      D(ee, {
                        label: L,
                        prop: f,
                        rules: J
                      }, {
                        default: A(() => [
                          z ? (u(), V("div", Ue, j(r.value[f]), 1)) : (u(), V(I, { key: 0 }, [
                            l === s(e).INPUT ? (u(), p(T, {
                              key: 0,
                              modelValue: r.value[f],
                              "onUpdate:modelValue": (t) => r.value[f] = t,
                              placeholder: b(l, L, i),
                              clearable: se,
                              onChange: (t) => w(l, f)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "onChange"])) : $("", !0),
                            l === s(e).INPUT_TEXT_AREA ? (u(), p(T, {
                              key: 1,
                              modelValue: r.value[f],
                              "onUpdate:modelValue": (t) => r.value[f] = t,
                              type: "textarea",
                              rows: re,
                              clearable: se,
                              placeholder: b(l, L, i),
                              onChange: (t) => w(l, f)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rows", "clearable", "placeholder", "onChange"])) : $("", !0),
                            l === s(e).INPUT_NUMBER ? (u(), p(m, {
                              key: 2,
                              modelValue: h.num,
                              "onUpdate:modelValue": v[0] || (v[0] = (t) => h.num = t),
                              min: ce,
                              max: ne,
                              onChange: w
                            }, null, 8, ["modelValue", "min", "max"])) : $("", !0),
                            l === s(e).RADIO ? (u(), p(k, {
                              key: 3,
                              modelValue: r.value[f],
                              "onUpdate:modelValue": (t) => r.value[f] = t,
                              onChange: (t) => w(l, f)
                            }, {
                              default: A(() => [
                                (u(!0), V(I, null, W(q, (t, H) => (u(), p(C, {
                                  key: H,
                                  label: t.value
                                }, {
                                  default: A(() => [
                                    K(j(t.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["label"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])) : $("", !0),
                            l === s(e).SELECT ? (u(), p(M, {
                              key: 4,
                              modelValue: r.value[f],
                              "onUpdate:modelValue": (t) => r.value[f] = t,
                              placeholder: b(l, L, i),
                              onChange: (t) => w(l, f)
                            }, {
                              default: A(() => [
                                (u(!0), V(I, null, W(q, (t, H) => (u(), p(O, {
                                  key: H,
                                  label: t.label,
                                  value: t.value
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "placeholder", "onChange"])) : $("", !0),
                            l === s(e).SLIDER ? (u(), p(P, {
                              key: 5,
                              modelValue: r.value[f],
                              "onUpdate:modelValue": (t) => r.value[f] = t,
                              min: ce,
                              max: ne,
                              onChange: (t) => w(l, f)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "onChange"])) : $("", !0),
                            l === s(e).SWITCH ? (u(), p(U, {
                              key: 6,
                              modelValue: r.value[f],
                              "onUpdate:modelValue": (t) => r.value[f] = t,
                              "active-value": q[0] || !0,
                              "inactive-value": q[1] || !1,
                              onChange: (t) => w(l, f)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "active-value", "inactive-value", "onChange"])) : $("", !0),
                            [s(e).DATE, s(e).MONTH, s(e).YEAR, s(e).DATE_TIME].includes(
                              l
                            ) ? (u(), p(S, {
                              key: 7,
                              modelValue: r.value[f],
                              "onUpdate:modelValue": (t) => r.value[f] = t,
                              format: y(l, Y),
                              "value-format": y(l, Y),
                              type: l,
                              placeholder: b(l, L, i),
                              onChange: (t) => w(l, f)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "format", "value-format", "type", "placeholder", "onChange"])) : $("", !0),
                            [
                              s(e).DATE_RANGE,
                              s(e).MONTH_RANGE,
                              s(e).DATE_TIME_RANGE
                            ].includes(l) ? (u(), p(S, {
                              key: 8,
                              modelValue: r.value[f],
                              "onUpdate:modelValue": (t) => r.value[f] = t,
                              type: l,
                              "value-format": y(l, Y),
                              "start-placeholder": b(l, L, i)[0],
                              "end-placeholder": b(l, L, i)[1],
                              onChange: (t) => w(l, f)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "value-format", "start-placeholder", "end-placeholder", "onChange"])) : $("", !0),
                            [s(e).TIME].includes(l) ? (u(), p(X, {
                              key: 9,
                              modelValue: r.value[f],
                              "onUpdate:modelValue": (t) => r.value[f] = t,
                              "arrow-control": "",
                              "value-format": y(l, Y),
                              placeholder: b(l, L, i),
                              onChange: (t) => w(l, f)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "value-format", "placeholder", "onChange"])) : $("", !0),
                            [s(e).TIME_RANGE].includes(l) ? (u(), p(X, {
                              key: 10,
                              modelValue: r.value[f],
                              "onUpdate:modelValue": (t) => r.value[f] = t,
                              "is-range": "",
                              "value-format": y(l, Y),
                              "start-placeholder": b(l, L, i)[0],
                              "end-placeholder": b(l, L, i)[1],
                              onChange: (t) => w(l, f)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "value-format", "start-placeholder", "end-placeholder", "onChange"])) : $("", !0),
                            [s(e).CHECKBOX].includes(l) ? (u(), p(le, {
                              key: 11,
                              modelValue: r.value[f],
                              "onUpdate:modelValue": (t) => r.value[f] = t,
                              onChange: (t) => w(l, f)
                            }, {
                              default: A(() => [
                                (u(!0), V(I, null, W(q, (t, H) => (u(), p(Z, {
                                  key: H,
                                  label: t.value
                                }, {
                                  default: A(() => [
                                    K(j(t.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["label"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])) : $("", !0),
                            [].includes(l) ? (u(), V(I, { key: 12 }, [], 64)) : $("", !0)
                          ], 64))
                        ]),
                        _: 2
                      }, 1032, ["label", "prop", "rules"])
                    ]),
                    _: 2
                  }, 1032, ["md"]))), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])), [
            [s(n)]
          ])
        ])
      ]);
    };
  }
});
const Pe = { class: "bsgoal-base-table-content" }, Le = { class: "bas_tabl_content" }, ze = {
  name: "BsgoalBaseTableContent"
}, Ye = /* @__PURE__ */ Object.assign(ze, {
  props: {
    data: {
      type: [String, Number, Object, Number, Boolean],
      default: ""
    }
  },
  setup(a) {
    return (c, o) => (u(), V("div", Pe, [
      F("div", Le, j(a.data), 1)
    ]));
  }
});
/*! Element Plus v2.3.3 */
var He = {
  name: "zh-cn",
  el: {
    colorpicker: {
      confirm: "确定",
      clear: "清空"
    },
    datepicker: {
      now: "此刻",
      today: "今天",
      cancel: "取消",
      clear: "清空",
      confirm: "确定",
      selectDate: "选择日期",
      selectTime: "选择时间",
      startDate: "开始日期",
      startTime: "开始时间",
      endDate: "结束日期",
      endTime: "结束时间",
      prevYear: "前一年",
      nextYear: "后一年",
      prevMonth: "上个月",
      nextMonth: "下个月",
      year: "年",
      month1: "1 月",
      month2: "2 月",
      month3: "3 月",
      month4: "4 月",
      month5: "5 月",
      month6: "6 月",
      month7: "7 月",
      month8: "8 月",
      month9: "9 月",
      month10: "10 月",
      month11: "11 月",
      month12: "12 月",
      weeks: {
        sun: "日",
        mon: "一",
        tue: "二",
        wed: "三",
        thu: "四",
        fri: "五",
        sat: "六"
      },
      months: {
        jan: "一月",
        feb: "二月",
        mar: "三月",
        apr: "四月",
        may: "五月",
        jun: "六月",
        jul: "七月",
        aug: "八月",
        sep: "九月",
        oct: "十月",
        nov: "十一月",
        dec: "十二月"
      }
    },
    select: {
      loading: "加载中",
      noMatch: "无匹配数据",
      noData: "无数据",
      placeholder: "请选择"
    },
    cascader: {
      noMatch: "无匹配数据",
      loading: "加载中",
      placeholder: "请选择",
      noData: "暂无数据"
    },
    pagination: {
      goto: "前往",
      pagesize: "条/页",
      total: "共 {total} 条",
      pageClassifier: "页",
      page: "页",
      prev: "上一页",
      next: "下一页",
      currentPage: "第 {pager} 页",
      prevPages: "向前 {pager} 页",
      nextPages: "向后 {pager} 页",
      deprecationWarning: "你使用了一些已被废弃的用法，请参考 el-pagination 的官方文档"
    },
    messagebox: {
      title: "提示",
      confirm: "确定",
      cancel: "取消",
      error: "输入的数据不合法!"
    },
    upload: {
      deleteTip: "按 delete 键可删除",
      delete: "删除",
      preview: "查看图片",
      continue: "继续上传"
    },
    table: {
      emptyText: "暂无数据",
      confirmFilter: "筛选",
      resetFilter: "重置",
      clearFilter: "全部",
      sumText: "合计"
    },
    tree: {
      emptyText: "暂无数据"
    },
    transfer: {
      noMatch: "无匹配数据",
      noData: "无数据",
      titles: ["列表 1", "列表 2"],
      filterPlaceholder: "请输入搜索内容",
      noCheckedFormat: "共 {total} 项",
      hasCheckedFormat: "已选 {checked}/{total} 项"
    },
    image: {
      error: "加载失败"
    },
    pageHeader: {
      title: "返回"
    },
    popconfirm: {
      confirmButtonText: "确定",
      cancelButtonText: "取消"
    }
  }
};
const Ge = { class: "bsgoal-base-table-pagination" }, je = { class: "base_table_pagination" }, We = /* @__PURE__ */ F("span", null, "总数", -1), Xe = {
  name: "BsgoalBaseTablePagination"
}, Ke = /* @__PURE__ */ Object.assign(Xe, {
  props: {
    /**
     * 当前页数
     */
    currentPage: {
      type: [Number],
      default: 1
    },
    /**
     * 可选页数集合
     */
    pageSizes: {
      type: [Array],
      default: () => [10, 20, 30, 40, 50, 100]
    },
    /**
     * 每页显示条目个数
     */
    pageSize: {
      type: [Number],
      default: 10
    },
    /**
     * 总条目
     */
    total: {
      type: [Number],
      default: 0
    }
  },
  emits: ["on-size-change", "on-current-change"],
  setup(a, { emit: c }) {
    const o = (n = 0) => {
      c("on-size-change", n);
    }, d = (n = 1) => {
      c("on-current-change", n);
    }, _ = B(1);
    return (n, r) => {
      const E = g("el-pagination"), b = g("el-config-provider");
      return u(), V("div", Ge, [
        F("div", je, [
          D(b, { locale: s(He) }, {
            default: A(() => [
              D(E, {
                background: "",
                layout: "total, sizes, prev, pager, next, jumper",
                "current-page": _.value,
                "onUpdate:currentPage": r[0] || (r[0] = (y) => _.value = y),
                "page-sizes": a.pageSizes,
                "page-size": a.pageSize,
                total: a.total,
                onSizeChange: o,
                onCurrentChange: d
              }, {
                next: A(() => [
                  We
                ]),
                _: 1
              }, 8, ["current-page", "page-sizes", "page-size", "total"])
            ]),
            _: 1
          }, 8, ["locale"])
        ])
      ]);
    };
  }
}), qe = (a = null, { expression: c = 65, arg: o = {} } = {}) => {
  const d = s(a);
  if (d) {
    const _ = d.querySelector(".el-table");
    _ && Ce(() => {
      const { y: n = 0 } = _.getBoundingClientRect();
      _.style.height = `calc(100vh - ${n + c}px)`;
    });
  }
}, pe = (a = Promise.resolve(), c = null, o = B(!1), d = B(null)) => {
  const _ = B("");
  return o.value = !0, a.then((n = {}) => {
    const { data: r = {}, message: E = "" } = n;
    d.value = r, _.value = E, c && c(!0, r), o.value = !1;
  }).catch((n = {}) => {
    if (typeof n == "object") {
      const { message: r = "" } = n;
      _.value = r;
    } else
      _.value = n;
    c(!1, n), o.value = !1;
  }).finally(() => {
    o.value = !1;
  }), { data: d, message: _, loading: o };
};
const Je = { class: "bsgoal-base-table" }, Qe = { class: "base_table" }, Ze = {
  key: 0,
  class: "base_table_menu"
}, et = {
  name: "BsgoalBaseTable"
}, we = /* @__PURE__ */ Object.assign(et, {
  props: {
    /**
     * >----------props----------<
     * {
     *  label: '' // 列名
     *  prop:  '' // 绑定字段
     * }
     * >----------slots----------<
     *
     *  menu: 顶部操作区域
     *  operation: 列表右侧操作区域
     *
     */
    configOptions: {
      type: [Array],
      default: () => []
    },
    /**
     * 表格数据
     */
    data: {
      type: [Array],
      default: () => []
    },
    /**
     * 是否包含多选列
     */
    selection: {
      type: [Boolean],
      default: !1
    },
    /**
     * 是否包含操作列
     */
    operation: {
      type: [Boolean],
      default: !1
    },
    /**
     * 操作列宽度
     */
    operationWidth: {
      type: [String, Number],
      default: 100
    },
    /**
     * 表格 loading 状态
     */
    loading: {
      type: [Boolean],
      default: !1
    },
    /**
     * 请求的 promise
     */
    fetch: {
      type: [Object, Function],
      default: null
    },
    /**
     * 响应的 call
     */
    call: {
      type: [Object, Function],
      default: null
    },
    /**
     * 映射字段
     */
    mapProps: {
      type: [Object],
      default: () => ({
        currentPage: "currentPage",
        pageSize: "pageSize",
        rows: "rows",
        total: "total"
      })
    }
  },
  setup(a, { expose: c }) {
    const o = a, d = oe(() => {
      const { configOptions: m = [], operation: C = !1, operationWidth: k = 0 } = o, O = s(m), M = [];
      return C && M.push({
        label: "操作",
        fixed: "right",
        prop: "operation",
        width: k
      }), [...O, ...M];
    }), _ = B(null), n = $e("transferFoldStatus");
    he(() => {
      const m = n ? n.value : !1;
      qe(_, { arg: m });
    });
    const r = B(1), E = B(10), b = B(0), y = B({}), x = B(o.loading), N = B(o.data), w = B({}), R = () => {
      const { fetch: m, call: C, mapProps: k } = o, O = y.value, M = r.value, P = E.value, U = Ae({}, O), S = s(k);
      U[S.currentPage] = M, U[S.pageSize] = P, pe(m(U), C, x, w);
    };
    ue(w, (m) => {
      const { mapProps: C } = o, k = s(C);
      N.value = m[k.rows], b.value = m[k.total];
    });
    const h = (m = {}) => {
      y.value = m, r.value = 1, R();
    }, v = (m = 1) => {
      r.value = m;
    }, T = (m = 10) => {
      E.value = m;
    };
    return ue([r, E], () => {
      R();
    }), c({
      refreshList: h
    }), (m, C) => {
      const k = g("el-table-column"), O = g("el-table"), M = De("loading");
      return u(), V("div", Je, [
        F("div", Qe, [
          m.$slots.menu ? (u(), V("div", Ze, [
            ie(m.$slots, "menu")
          ])) : $("", !0),
          F("div", {
            ref_key: "EL_TABLE_WRAP_REF",
            ref: _
          }, [
            G((u(), p(O, {
              stripe: "",
              border: "",
              "highlight-current-row": "",
              style: { width: "100%" },
              data: N.value,
              "header-cell-style": {
                fontWeight: "bold",
                backgroundColor: "#EBEEF5",
                color: "rgba(0,0,0,.85)",
                fontSize: "14px"
              }
            }, {
              empty: A(() => []),
              default: A(() => [
                a.selection ? (u(), p(k, {
                  key: 0,
                  fixed: "left",
                  type: "selection",
                  width: "40"
                })) : $("", !0),
                (u(!0), V(I, null, W(s(d), ({ prop: P = "", label: U = "", align: S = "center", width: X = "", fixed: Z = !1 } = {}, le) => (u(), p(k, {
                  key: le,
                  label: U,
                  align: S,
                  width: X,
                  fixed: Z,
                  "min-width": `${U.length * 14 + 24}px`
                }, {
                  default: A(({ row: ee }) => [
                    ie(m.$slots, P, { row: ee }, () => [
                      D(Ye, {
                        data: ee[P]
                      }, null, 8, ["data"])
                    ])
                  ]),
                  _: 2
                }, 1032, ["label", "align", "width", "fixed", "min-width"]))), 128))
              ]),
              _: 3
            }, 8, ["data", "header-cell-style"])), [
              [M, x.value]
            ])
          ], 512),
          D(Ke, {
            total: b.value,
            onOnCurrentChange: v,
            onOnSizeChange: T
          }, null, 8, ["total"])
        ])
      ]);
    };
  }
});
const tt = {
  name: "BsgoalBaseLine"
}, be = /* @__PURE__ */ Object.assign(tt, {
  props: {
    /**
     * 是否为垂直
     */
    vertical: {
      type: [Boolean],
      default: !1
    }
  },
  setup(a) {
    return (c, o) => (u(), V("div", {
      class: ge(["bsgoal-base-line", { "bsgoal-base-line__vertical": a.vertical }])
    }, [
      F("div", {
        class: ge(["base_line", { base_line__vertical: a.vertical }])
      }, null, 2)
    ], 2));
  }
});
/*! Element Plus Icons Vue v2.1.0 */
var ae = (a, c) => {
  let o = a.__vccOpts || a;
  for (let [d, _] of c)
    o[d] = _;
  return o;
}, at = {
  name: "ArrowDown"
}, lt = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, nt = /* @__PURE__ */ F(
  "path",
  {
    fill: "currentColor",
    d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
  },
  null,
  -1
  /* HOISTED */
), ot = [
  nt
];
function ut(a, c, o, d, _, n) {
  return u(), V("svg", lt, ot);
}
var st = /* @__PURE__ */ ae(at, [["render", ut], ["__file", "arrow-down.vue"]]), rt = {
  name: "ArrowLeft"
}, ct = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, it = /* @__PURE__ */ F(
  "path",
  {
    fill: "currentColor",
    d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
  },
  null,
  -1
  /* HOISTED */
), dt = [
  it
];
function _t(a, c, o, d, _, n) {
  return u(), V("svg", ct, dt);
}
var mt = /* @__PURE__ */ ae(rt, [["render", _t], ["__file", "arrow-left.vue"]]), ft = {
  name: "ArrowRight"
}, vt = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, gt = /* @__PURE__ */ F(
  "path",
  {
    fill: "currentColor",
    d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
  },
  null,
  -1
  /* HOISTED */
), ht = [
  gt
];
function Et(a, c, o, d, _, n) {
  return u(), V("svg", vt, ht);
}
var pt = /* @__PURE__ */ ae(ft, [["render", Et], ["__file", "arrow-right.vue"]]), bt = {
  name: "ArrowUp"
}, Tt = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, Vt = /* @__PURE__ */ F(
  "path",
  {
    fill: "currentColor",
    d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
  },
  null,
  -1
  /* HOISTED */
), At = [
  Vt
];
function Ct(a, c, o, d, _, n) {
  return u(), V("svg", Tt, At);
}
var $t = /* @__PURE__ */ ae(bt, [["render", Ct], ["__file", "arrow-up.vue"]]), wt = {
  name: "Delete"
}, yt = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, xt = /* @__PURE__ */ F(
  "path",
  {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  },
  null,
  -1
  /* HOISTED */
), Bt = [
  xt
];
function Dt(a, c, o, d, _, n) {
  return u(), V("svg", yt, Bt);
}
var kt = /* @__PURE__ */ ae(wt, [["render", Dt], ["__file", "delete.vue"]]), Ot = {
  name: "Search"
}, Nt = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, Ft = /* @__PURE__ */ F(
  "path",
  {
    fill: "currentColor",
    d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
  },
  null,
  -1
  /* HOISTED */
), Mt = [
  Ft
];
function Rt(a, c, o, d, _, n) {
  return u(), V("svg", Nt, Mt);
}
var Ut = /* @__PURE__ */ ae(Ot, [["render", Rt], ["__file", "search.vue"]]);
const St = (a, c) => {
  const o = a.__vccOpts || a;
  for (const [d, _] of c)
    o[d] = _;
  return o;
}, It = { class: "bsgoal-base-search-operation" }, Pt = {
  name: "BsgoalBaseSearchOperation"
}, Lt = /* @__PURE__ */ Object.assign(Pt, {
  props: {
    /**
     * 是否显示折叠按钮
     */
    fold: {
      type: [Boolean],
      default: !1
    }
  },
  emits: ["on-fold"],
  setup(a, { emit: c }) {
    const o = B(!1), d = () => {
      o.value = !s(o), c("on-fold", o.value);
    };
    return (_, n) => {
      const r = g("el-button"), E = g("el-icon");
      return u(), V("div", It, [
        D(r, {
          type: "primary",
          icon: s(Ut),
          onClick: n[0] || (n[0] = (b) => _.$emit("on-search"))
        }, {
          default: A(() => [
            K("搜索")
          ]),
          _: 1
        }, 8, ["icon"]),
        D(r, {
          icon: s(kt),
          onClick: n[1] || (n[1] = (b) => _.$emit("on-clear"))
        }, {
          default: A(() => [
            K("清空")
          ]),
          _: 1
        }, 8, ["icon"]),
        a.fold ? (u(), V("div", {
          key: 0,
          class: "operation_fold",
          style: { color: "var(--el-color-primary)" },
          onClick: d
        }, [
          K(j(o.value ? "收起" : "展开"), 1),
          D(E, { color: "#409EFC" }, {
            default: A(() => [
              G(D(s($t), null, null, 512), [
                [Q, o.value]
              ]),
              G(D(s(st), null, null, 512), [
                [Q, !o.value]
              ])
            ]),
            _: 1
          })
        ])) : $("", !0)
      ]);
    };
  }
}), zt = /* @__PURE__ */ St(Lt, [["__scopeId", "data-v-b5796be8"]]);
const Yt = { class: "bsgoal-base-search" }, Ht = { class: "base_search" }, Gt = { key: 1 }, jt = {
  name: "BsgoalBaseSearch"
}, Wt = /* @__PURE__ */ Object.assign(jt, {
  props: {
    /**
     * >----------props----------<
     *  {
     *      label:'' //  名称
     *      value:'' //  值
     *      prop:''  //  绑定字段
     *      type:'text'  //  内容组件的类型 : 参照 enumType
     *      placeholder:''  // placeholder 提示文本
     *      readonly: false  // 是否为只读文本
     *      clearable:  true  //是否为可清空
     *  }
     *
     * >----------events----------<
     *
     *  on-search  // 触发查询
     *  on-clear   // 触发清空
     *  on-change  // 触发查询变动
     *  on-fold    // 触发折叠
     */
    configOptions: {
      type: [Array],
      default: () => []
    },
    /**
     * 中屏设备宽度的比例
     */
    medium: {
      type: [Number, String],
      default: 6
    }
  },
  emits: ["on-search", "on-clear", "on-change", "on-fold"],
  setup(a, { emit: c }) {
    const o = a, d = B(null), _ = Ee.align, n = B({});
    he(() => {
      const { configOptions: v } = o;
      s(v).forEach((m) => {
        const { value: C = "", prop: k = "", type: O = "" } = m;
        [e.INPUT, e.INPUT_TEXT_AREA].includes(O), n.value[k] = C;
      });
    });
    const r = oe(() => {
      const { configOptions: v } = o, T = s(v), m = {
        type: e.OPERATION
      };
      return [...T, m];
    }), E = (v = "", T = "", m = "") => {
      if (!m)
        switch (v) {
          case e.INPUT:
          case e.INPUT_TEXT_AREA:
            return `请输入${T}`;
          case e.SELECT:
          case e.DATE:
          case e.WEEK:
          case e.MONTH:
          case e.YEAR:
          case e.DATE_TIME:
          case e.TIME:
            return `请选择${T}`;
          case e.DATE_RANGE:
          case e.DATE_TIME_RANGE:
            return ["开始日期", "结束日期"];
          case e.TIME_RANGE:
            return ["开始时间", "结束时间"];
          case e.MONTH_RANGE:
            return ["开始月份", "结束月份"];
        }
      return m;
    }, b = (v = "", T = "") => {
      if (!T)
        switch (v) {
          case e.WEEK:
            return "ww";
          case e.DATE:
          case e.DATE_RANGE:
            return "YYYY-MM-DD";
          case e.MONTH:
            return "MM";
          case e.YEAR:
            return "YYYY";
          case e.MONTH_RANGE:
            return "YYYY-MM";
          case e.TIME:
          case e.TIME_RANGE:
            return "HH:mm:ss";
          case e.DATE_TIME:
          case e.DATE_TIME_RANGE:
            return "YYYY-MM-DD HH:mm:ss";
        }
      return T;
    }, y = () => {
      const v = s(n), { configOptions: T } = o, m = s(T);
      for (const C of m) {
        const { type: k = "", range: O = [], prop: M = "" } = C;
        if (k.endsWith("range") && O && O.length === 2) {
          const { 0: P = "", 1: U = "" } = v[M], { 0: S = "", 1: X = "" } = O;
          v[S] = P, v[X] = U;
        }
      }
      c("on-search", v);
    };
    Ce(() => {
      y();
    });
    const x = () => {
      d.value.resetFields(), c("on-clear", n.value);
    }, N = $e("transferFoldStatus"), w = B(!1), R = (v = !1) => {
      w.value = v, N && (N.value = v), c("on-fold", w);
    }, h = (v, T) => {
      y();
      const m = {
        type: v,
        prop: T,
        value: n.value[T] || ""
      };
      c("on-change", m);
    };
    return (v, T) => {
      const m = g("el-input"), C = g("el-input-number"), k = g("el-radio"), O = g("el-radio-group"), M = g("el-option"), P = g("el-select"), U = g("el-slider"), S = g("el-switch"), X = g("el-date-picker"), Z = g("el-time-picker"), le = g("el-checkbox"), ee = g("el-checkbox-group"), de = g("el-form-item"), _e = g("el-col"), me = g("el-row"), L = g("el-form");
      return u(), V("div", Yt, [
        F("div", Ht, [
          G((u(), p(L, {
            ref_key: "EL_FORM_REF",
            ref: d,
            "label-suffix": ":",
            "show-message": !1,
            model: n.value
          }, {
            default: A(() => [
              D(me, null, {
                default: A(() => [
                  (u(!0), V(I, null, W(s(r), ({
                    label: f = "",
                    prop: l = "",
                    type: i = "text",
                    placeholder: z = "",
                    readonly: se = !1,
                    clearable: re = !0,
                    rows: ce = 2,
                    min: ne = 1,
                    max: q = 10,
                    range: Y = [],
                    format: J = ""
                  } = {}, te) => G((u(), p(_e, {
                    key: te,
                    xs: 24,
                    sm: 12,
                    md: a.medium
                  }, {
                    default: A(() => [
                      D(de, {
                        label: f,
                        prop: l
                      }, {
                        default: A(() => [
                          se ? (u(), V("div", Gt, j(n.value[l]), 1)) : (u(), V(I, { key: 0 }, [
                            i === s(e).INPUT ? (u(), p(m, {
                              key: 0,
                              modelValue: n.value[l],
                              "onUpdate:modelValue": (t) => n.value[l] = t,
                              placeholder: E(i, f, z),
                              clearable: re,
                              onChange: (t) => h(i, l)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "onChange"])) : $("", !0),
                            i === s(e).INPUT_TEXT_AREA ? (u(), p(m, {
                              key: 1,
                              modelValue: n.value[l],
                              "onUpdate:modelValue": (t) => n.value[l] = t,
                              type: "textarea",
                              rows: ce,
                              clearable: re,
                              placeholder: E(i, f, z),
                              onChange: (t) => h(i, l)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rows", "clearable", "placeholder", "onChange"])) : $("", !0),
                            i === s(e).INPUT_NUMBER ? (u(), p(C, {
                              key: 2,
                              modelValue: v.num,
                              "onUpdate:modelValue": T[0] || (T[0] = (t) => v.num = t),
                              min: ne,
                              max: q,
                              onChange: h
                            }, null, 8, ["modelValue", "min", "max"])) : $("", !0),
                            i === s(e).RADIO ? (u(), p(O, {
                              key: 3,
                              modelValue: n.value[l],
                              "onUpdate:modelValue": (t) => n.value[l] = t,
                              onChange: (t) => h(i, l)
                            }, {
                              default: A(() => [
                                (u(!0), V(I, null, W(Y, (t, H) => (u(), p(k, {
                                  key: H,
                                  label: t.value
                                }, {
                                  default: A(() => [
                                    K(j(t.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["label"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])) : $("", !0),
                            i === s(e).SELECT ? (u(), p(P, {
                              key: 4,
                              modelValue: n.value[l],
                              "onUpdate:modelValue": (t) => n.value[l] = t,
                              placeholder: E(i, f, z),
                              onChange: (t) => h(i, l)
                            }, {
                              default: A(() => [
                                (u(!0), V(I, null, W(Y, (t, H) => (u(), p(M, {
                                  key: H,
                                  label: t.label,
                                  value: t.value
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "placeholder", "onChange"])) : $("", !0),
                            i === s(e).SLIDER ? (u(), p(U, {
                              key: 5,
                              modelValue: n.value[l],
                              "onUpdate:modelValue": (t) => n.value[l] = t,
                              min: ne,
                              max: q,
                              onChange: (t) => h(i, l)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "onChange"])) : $("", !0),
                            i === s(e).SWITCH ? (u(), p(S, {
                              key: 6,
                              modelValue: n.value[l],
                              "onUpdate:modelValue": (t) => n.value[l] = t,
                              "active-value": Y[0] || !0,
                              "inactive-value": Y[1] || !1,
                              onChange: (t) => h(i, l)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "active-value", "inactive-value", "onChange"])) : $("", !0),
                            [s(e).DATE, s(e).MONTH, s(e).YEAR, s(e).DATE_TIME].includes(
                              i
                            ) ? (u(), p(X, {
                              key: 7,
                              modelValue: n.value[l],
                              "onUpdate:modelValue": (t) => n.value[l] = t,
                              format: b(i, J),
                              "value-format": b(i, J),
                              type: i,
                              placeholder: E(i, f, z),
                              onChange: (t) => h(i, l)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "format", "value-format", "type", "placeholder", "onChange"])) : $("", !0),
                            [
                              s(e).DATE_RANGE,
                              s(e).MONTH_RANGE,
                              s(e).DATE_TIME_RANGE
                            ].includes(i) ? (u(), p(X, {
                              key: 8,
                              modelValue: n.value[l],
                              "onUpdate:modelValue": (t) => n.value[l] = t,
                              type: i,
                              "value-format": b(i, J),
                              "start-placeholder": E(i, f, z)[0],
                              "end-placeholder": E(i, f, z)[1],
                              onChange: (t) => h(i, l)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "value-format", "start-placeholder", "end-placeholder", "onChange"])) : $("", !0),
                            [s(e).TIME].includes(i) ? (u(), p(Z, {
                              key: 9,
                              modelValue: n.value[l],
                              "onUpdate:modelValue": (t) => n.value[l] = t,
                              "arrow-control": "",
                              "value-format": b(i, J),
                              placeholder: E(i, f, z),
                              onChange: (t) => h(i, l)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "value-format", "placeholder", "onChange"])) : $("", !0),
                            [s(e).TIME_RANGE].includes(i) ? (u(), p(Z, {
                              key: 10,
                              modelValue: n.value[l],
                              "onUpdate:modelValue": (t) => n.value[l] = t,
                              "is-range": "",
                              "value-format": b(i, J),
                              "start-placeholder": E(i, f, z)[0],
                              "end-placeholder": E(i, f, z)[1],
                              onChange: (t) => h(i, l)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "value-format", "start-placeholder", "end-placeholder", "onChange"])) : $("", !0),
                            [s(e).CHECKBOX].includes(i) ? (u(), p(ee, {
                              key: 11,
                              modelValue: n.value[l],
                              "onUpdate:modelValue": (t) => n.value[l] = t,
                              onChange: (t) => h(i, l)
                            }, {
                              default: A(() => [
                                (u(!0), V(I, null, W(Y, (t, H) => (u(), p(le, {
                                  key: H,
                                  label: t.value
                                }, {
                                  default: A(() => [
                                    K(j(t.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["label"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])) : $("", !0),
                            [].includes(i) ? (u(), V(I, { key: 12 }, [], 64)) : $("", !0),
                            [s(e).OPERATION].includes(i) ? (u(), p(zt, {
                              key: 13,
                              fold: te >= 7,
                              onOnSearch: y,
                              onOnClear: x,
                              onOnFold: R
                            }, null, 8, ["fold"])) : $("", !0)
                          ], 64))
                        ]),
                        _: 2
                      }, 1032, ["label", "prop"])
                    ]),
                    _: 2
                  }, 1032, ["md"])), [
                    [Q, te < 7 || i === s(e).OPERATION || te >= 7 && w.value]
                  ])), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])), [
            [s(_)]
          ])
        ]),
        D(be)
      ]);
    };
  }
});
const Xt = { class: "bsgoal-base-search-table" }, Kt = { class: "base_search_table" }, qt = {
  name: "BsgoalBaseSearchTable"
}, Jt = /* @__PURE__ */ Object.assign(qt, {
  props: {
    /**
     * >----------props----------<
     * {
     *
     *  label: '' // 列名
     *  prop : '' // 绑定字段
     *
     *
     *  value: '' // 初始值 (查询)
     *  type : '' // 查询组件的类型 (查询)
     *
     *
     *  width: 0  // 列宽度 (表格)
     *
     * }
     *
     * >----------slots----------<
     *
     *  menu: 顶部操作区域
     *  operation: 列表右侧操作区域
     *
     */
    configOptions: {
      type: [Array],
      default: () => []
    },
    /**
     * 表格数据
     */
    tableData: {
      type: [Array],
      default: () => []
    },
    /**
     * 是否多选
     */
    selection: {
      type: [Boolean],
      default: !1
    },
    /**
     * 是否配置操作列
     */
    operation: {
      type: [Boolean],
      default: !1
    },
    /**
     * 操作列宽度
     */
    operationWidth: {
      type: [String, Number],
      default: 100
    },
    /**
     * 请求的 promise
     */
    fetch: {
      type: [Object, Function],
      default: null
    },
    /**
     * 响应的 call
     */
    call: {
      type: [Object, Function],
      default: null
    }
  },
  setup(a) {
    const c = a, o = B(!1);
    ke("transferFoldStatus", o);
    const d = s(c.configOptions), _ = oe(() => d), n = oe(() => d), r = Oe(), E = B(Object.keys(r)), b = B(null), y = (x) => {
      b.value.refreshList(x);
    };
    return (x, N) => (u(), V("div", Xt, [
      F("div", Kt, [
        D(Wt, {
          "config-options": s(_),
          onOnSearch: y,
          onOnClear: y
        }, null, 8, ["config-options"]),
        D(we, {
          ref_key: "BSGOAL_BASE_TABLE_REF",
          ref: b,
          operationWidth: a.operationWidth,
          "config-options": s(n),
          data: a.tableData,
          selection: a.selection,
          operation: a.operation,
          fetch: a.fetch,
          call: a.call
        }, Ne({ _: 2 }, [
          W(E.value, (w) => ({
            name: w,
            fn: A(({ row: R = {} }) => [
              ie(x.$slots, w, { row: R })
            ])
          }))
        ]), 1032, ["operationWidth", "config-options", "data", "selection", "operation", "fetch", "call"])
      ])
    ]));
  }
});
const Qt = { class: "bsgoal-base-tree-fold" }, Zt = {
  name: "BsgoalBaseTreeFold"
}, ea = /* @__PURE__ */ Object.assign(Zt, {
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup(a, { emit: c }) {
    let o = B(!0);
    const d = () => {
      o.value = !o.value, c("update:modelValue", o.value);
    };
    return (_, n) => {
      const r = g("el-icon");
      return u(), V("div", Qt, [
        F("div", {
          class: ge(["base_tree_fold", { "base_tree_fold--hide": !s(o) }]),
          onClick: d
        }, [
          D(r, { color: "#fff" }, {
            default: A(() => [
              G(D(s(mt), null, null, 512), [
                [Q, s(o)]
              ]),
              G(D(s(pt), null, null, 512), [
                [Q, !s(o)]
              ])
            ]),
            _: 1
          })
        ], 2)
      ]);
    };
  }
});
const ta = { class: "bsgoal-base-tree" }, aa = { class: "base_tree" }, la = { class: "base_tree_main" }, na = {
  name: "BsgoalBaseTree"
}, oa = /* @__PURE__ */ Object.assign(na, {
  props: {
    /**
     * 树结构 的下边距
     */
    gasket: {
      type: [String, Number],
      default: 10
    },
    /**
     * 数据
     */
    data: {
      type: [Object, Array],
      default: () => []
    },
    /**
     * 配置
     */
    treeProps: {
      type: [Object],
      default: () => ({
        label: "label",
        children: "children",
        disabled: "disabled",
        isLeaf: "isLeaf",
        class: "class"
      })
    },
    /**
     * 懒加载数据方法
     * () => {
     *   return Promise(resolve =>  resolve([]))
     * }
     */
    lazyLoad: {
      type: [Function],
      default: () => {
      }
    },
    /**
     * 初始化树节点
     * () => {
     *   return Promise(resolve =>  resolve([]))
     * }
     */
    initNode: {
      type: [Function],
      default: () => {
      }
    }
  },
  emits: ["on-click"],
  setup(a, { emit: c }) {
    const o = a, d = Ee.height, _ = B(""), n = B(null);
    ue(_, (x) => {
      n.value.filter(x);
    });
    const r = (x, N) => x ? N.label.includes(x) : !0, E = B(!0), b = (x, N, w, R) => {
      c("on-click", x, N, w, R);
    }, y = async (x, N, w) => {
      if (x.level === 0) {
        const R = await w.initNode(x);
        return N(R || []);
      } else {
        const R = await w.lazyLoad(x);
        N(R || []);
      }
    };
    return (x, N) => {
      const w = g("el-input"), R = g("el-tree");
      return u(), V("div", ta, [
        G((u(), V("div", aa, [
          G(F("div", la, [
            D(w, {
              modelValue: _.value,
              "onUpdate:modelValue": N[0] || (N[0] = (h) => _.value = h),
              class: "base_tree_main_input",
              placeholder: "输入关键字过滤"
            }, null, 8, ["modelValue"]),
            D(R, {
              ref_key: "EL_TREE_REF",
              ref: n,
              lazy: "",
              "highlight-current": "",
              "empty-text": "暂无数据",
              load: (h, v) => y(h, v, o),
              "expand-on-click-node": !1,
              props: a.treeProps,
              "filter-node-method": r,
              onNodeClick: b
            }, null, 8, ["load", "props"])
          ], 512), [
            [Q, E.value]
          ]),
          G(D(be, { vertical: "" }, null, 512), [
            [Q, E.value]
          ]),
          D(ea, {
            modelValue: E.value,
            "onUpdate:modelValue": N[1] || (N[1] = (h) => E.value = h)
          }, null, 8, ["modelValue"])
        ])), [
          [s(d), a.gasket]
        ])
      ]);
    };
  }
});
const ua = { class: "bsgoal-base-dialog" }, sa = { class: "base_dialog" }, ra = { class: "base_dialog_header" }, ca = { class: "base_dialog_content" }, ia = { class: "base_dialog_footer" }, da = {
  name: "BsgoalBaseDialog"
}, _a = /* @__PURE__ */ Object.assign(da, {
  props: {
    /**
     * 弹窗状态
     */
    modelValue: {
      type: [Boolean],
      default: !1
    },
    /**
     * 标题
     */
    title: {
      type: [String],
      default: "标题"
    },
    /**
     * 取消的文本
     */
    cancelTxt: {
      type: [String],
      default: "取消"
    },
    /**
     * 确定的文本
     */
    confirmTxt: {
      type: [String],
      default: "确定"
    }
  },
  emits: ["update:modelValue", "on-confirm"],
  setup(a, { emit: c }) {
    const o = a, d = B(o.modelValue.value), _ = () => {
      d.value = !1;
    }, n = () => {
      d.value = !1, c("on-confirm");
    };
    return ue(
      () => o.modelValue,
      (r) => {
        d.value = r;
      }
    ), ue(d, (r) => {
      c("update:modelValue", r);
    }), (r, E) => {
      const b = g("el-button"), y = g("el-dialog");
      return u(), V("div", ua, [
        F("div", sa, [
          D(y, {
            modelValue: d.value,
            "onUpdate:modelValue": E[0] || (E[0] = (x) => d.value = x),
            "custom-class": "bsgoal_base_dialog_main"
          }, {
            header: A(() => [
              F("div", ra, j(a.title), 1)
            ]),
            footer: A(() => [
              F("span", ia, [
                D(b, { onClick: _ }, {
                  default: A(() => [
                    K(j(a.cancelTxt), 1)
                  ]),
                  _: 1
                }),
                D(b, {
                  type: "primary",
                  onClick: n
                }, {
                  default: A(() => [
                    K(j(a.confirmTxt), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: A(() => [
              F("div", ca, [
                ie(r.$slots, "default")
              ])
            ]),
            _: 3
          }, 8, ["modelValue"])
        ])
      ]);
    };
  }
}), ga = e, ha = pe, Ea = {
  install(a, c = {}) {
    const { exclude: o = [] } = c, d = {
      BsgoalBaseForm: Ie,
      BsgoalBaseTable: we,
      BsgoalBaseLine: be,
      BsgoalBaseSearchTable: Jt,
      BsgoalBaseTree: oa,
      BsgoalBaseDialog: _a
    };
    for (const [_, n] of Object.entries(d))
      o.includes(_) || a.component(_, n);
  },
  enumType: e,
  useFetch: pe
};
export {
  ga as EnumType,
  Ea as default,
  ha as useFetchApi
};
//# sourceMappingURL=index.mjs.map
