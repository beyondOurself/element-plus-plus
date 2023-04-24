var Be = Object.defineProperty;
var Ve = Object.getOwnPropertySymbols;
var we = Object.prototype.hasOwnProperty, De = Object.prototype.propertyIsEnumerable;
var Ae = (a, r, o) => r in a ? Be(a, r, { enumerable: !0, configurable: !0, writable: !0, value: o }) : a[r] = o, ye = (a, r) => {
  for (var o in r || (r = {}))
    we.call(r, o) && Ae(a, o, r[o]);
  if (Ve)
    for (var o of Ve(r))
      De.call(r, o) && Ae(a, o, r[o]);
  return a;
};
import { ref as w, watchEffect as pe, unref as s, computed as ue, resolveComponent as g, openBlock as u, createElementBlock as V, createElementVNode as F, withDirectives as G, createBlock as E, withCtx as A, createVNode as D, Fragment as U, renderList as X, createCommentVNode as x, createTextVNode as q, toDisplayString as j, pushScopeId as ke, popScopeId as Oe, nextTick as xe, inject as Ce, watch as se, resolveDirective as Ne, renderSlot as de, normalizeClass as he, vShow as Z, provide as Fe, useSlots as Me, createSlots as Re } from "vue";
import { ElMessage as Ie } from "element-plus";
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
const ge = (a) => {
  const r = [], o = [], d = (l = []) => {
    const c = l.map((b) => b.width), p = Math.max(...c);
    l.forEach((b) => {
      const { labelEl: $ } = b;
      $.style.width = `${p}px`;
    });
  }, i = () => {
    if (a) {
      const l = a.querySelectorAll(".el-form-item__label");
      if (l && l.length) {
        let c = 0;
        l.forEach((p, b) => {
          p.style.width = "initial", p.style.whiteSpace = "nowrap";
          const { x: $ = 0, width: B = 0 } = p.getBoundingClientRect(), N = { x: $, width: B, labelEl: p };
          b === 0 && (c = $), $ === c ? r.push(N) : o.push(N);
        });
      }
    }
  };
  fe && clearTimeout(fe), fe = setTimeout(() => {
    i(), d(r), d(o);
  }, 50);
}, Ee = {
  /**
   * 表单自动左对齐
   */
  align: {
    created(a) {
      window.addEventListener("resize", () => {
        ge(a);
      });
    },
    mounted(a) {
      ge(a);
    },
    unmounted(a) {
      window.removeEventListener("resize", ge(a));
    }
  },
  /**
   * 表格自动高度
   */
  height: (a, { value: r = 65, arg: o = "" }) => {
    if (a) {
      const { y: d = 0 } = a.getBoundingClientRect();
      a.style.height = `calc(100vh - ${d + r}px)`;
    }
  }
};
const W = (a, r) => {
  const o = a.__vccOpts || a;
  for (const [d, i] of r)
    o[d] = i;
  return o;
}, Se = { class: "bsgoal-base-form" }, Ue = { class: "base_form" }, Pe = { key: 1 }, Le = {
  name: "BsgoalBaseForm"
}, ze = /* @__PURE__ */ Object.assign(Le, {
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
  setup(a, { expose: r, emit: o }) {
    const d = a, i = w(null), l = Ee.align, c = w({});
    pe(() => {
      const { configOptions: h, values: f } = d, T = s(h), m = s(f);
      T.forEach((y) => {
        const { value: k = "", prop: O = "", type: M = "" } = y;
        [e.INPUT, e.INPUT_TEXT_AREA].includes(M), c.value[O] = m[O] || k;
      });
    });
    const p = ue(() => {
      const { configOptions: h } = d;
      return s(h).map((m) => {
        let { rules: y = !1, label: k = "" } = m;
        const O = { required: !0, message: `${k}不能为空`, trigger: "blur" };
        return y && (typeof y == "boolean" ? y = [O] : Array.isArray(y) ? y = [O, ...y] : y = [O, y]), m.rules = y, m;
      });
    }), b = (h = "", f = "", T = "") => {
      if (!T)
        switch (h) {
          case e.INPUT:
          case e.INPUT_TEXT_AREA:
            return `请输入${f}`;
          case e.SELECT:
          case e.DATE:
          case e.WEEK:
          case e.MONTH:
          case e.YEAR:
          case e.DATE_TIME:
          case e.TIME:
            return `请选择${f}`;
          case e.DATE_RANGE:
          case e.DATE_TIME_RANGE:
            return ["开始日期", "结束日期"];
          case e.TIME_RANGE:
            return ["开始时间", "结束时间"];
          case e.MONTH_RANGE:
            return ["开始月份", "结束月份"];
        }
      return T;
    }, $ = (h = "", f = "") => {
      if (!f)
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
      return f;
    }, B = () => {
      const h = s(c), { configOptions: f } = d, T = s(f);
      for (const m of T) {
        const { type: y = "", range: k = [], prop: O = "" } = m;
        if (y.endsWith("range") && k && k.length === 2) {
          const { 0: M = "", 1: P = "" } = h[O], { 0: I = "", 1: S = "" } = k;
          h[I] = M, h[S] = P;
        }
      }
      return o("on-form", h), h;
    }, N = () => {
      i.value.resetFields(), o("on-clear", c.value);
    }, C = (h, f) => {
      const T = {
        type: h,
        prop: f,
        value: c.value[f] || ""
      };
      o("on-change", T);
    };
    return r({
      triggerOperationClear: N,
      triggerOperationForm: B,
      validateForm: (h = () => {
      }) => {
        i.value.validate((f = !1, T = {}) => {
          if (f) {
            const m = B();
            h(m);
          } else {
            h(!1), console.log("field", T);
            const m = Object.keys(T)[0], {
              [m]: {
                0: { message: y = "" }
              }
            } = T;
            Ie.error(y);
          }
        });
      }
    }), (h, f) => {
      const T = g("el-input"), m = g("el-input-number"), y = g("el-radio"), k = g("el-radio-group"), O = g("el-option"), M = g("el-select"), P = g("el-slider"), I = g("el-switch"), S = g("el-date-picker"), K = g("el-time-picker"), ee = g("el-checkbox"), le = g("el-checkbox-group"), te = g("el-form-item"), ie = g("el-col"), me = g("el-row"), ve = g("el-form");
      return u(), V("div", Se, [
        F("div", Ue, [
          G((u(), E(ve, {
            ref_key: "EL_FORM_REF",
            ref: i,
            "label-suffix": ":",
            model: c.value
          }, {
            default: A(() => [
              D(me, null, {
                default: A(() => [
                  (u(!0), V(U, null, X(s(p), ({
                    label: L = "",
                    prop: v = "",
                    type: n = "text",
                    placeholder: _ = "",
                    readonly: z = !1,
                    clearable: ce = !0,
                    rows: re = 2,
                    min: _e = 1,
                    max: oe = 10,
                    range: J = [],
                    format: Y = "",
                    rules: Q = []
                  } = {}, ae) => (u(), E(ie, {
                    key: ae,
                    xs: 24,
                    sm: 24,
                    md: a.medium
                  }, {
                    default: A(() => [
                      D(te, {
                        label: L,
                        prop: v,
                        rules: Q
                      }, {
                        default: A(() => [
                          z ? (u(), V("div", Pe, j(c.value[v]), 1)) : (u(), V(U, { key: 0 }, [
                            n === s(e).INPUT ? (u(), E(T, {
                              key: 0,
                              modelValue: c.value[v],
                              "onUpdate:modelValue": (t) => c.value[v] = t,
                              placeholder: b(n, L, _),
                              clearable: ce,
                              onChange: (t) => C(n, v)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "onChange"])) : x("", !0),
                            n === s(e).INPUT_TEXT_AREA ? (u(), E(T, {
                              key: 1,
                              modelValue: c.value[v],
                              "onUpdate:modelValue": (t) => c.value[v] = t,
                              type: "textarea",
                              rows: re,
                              clearable: ce,
                              placeholder: b(n, L, _),
                              onChange: (t) => C(n, v)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rows", "clearable", "placeholder", "onChange"])) : x("", !0),
                            n === s(e).INPUT_NUMBER ? (u(), E(m, {
                              key: 2,
                              modelValue: h.num,
                              "onUpdate:modelValue": f[0] || (f[0] = (t) => h.num = t),
                              min: _e,
                              max: oe,
                              onChange: C
                            }, null, 8, ["modelValue", "min", "max"])) : x("", !0),
                            n === s(e).RADIO ? (u(), E(k, {
                              key: 3,
                              modelValue: c.value[v],
                              "onUpdate:modelValue": (t) => c.value[v] = t,
                              onChange: (t) => C(n, v)
                            }, {
                              default: A(() => [
                                (u(!0), V(U, null, X(J, (t, H) => (u(), E(y, {
                                  key: H,
                                  label: t.value
                                }, {
                                  default: A(() => [
                                    q(j(t.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["label"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])) : x("", !0),
                            n === s(e).SELECT ? (u(), E(M, {
                              key: 4,
                              modelValue: c.value[v],
                              "onUpdate:modelValue": (t) => c.value[v] = t,
                              placeholder: b(n, L, _),
                              onChange: (t) => C(n, v)
                            }, {
                              default: A(() => [
                                (u(!0), V(U, null, X(J, (t, H) => (u(), E(O, {
                                  key: H,
                                  label: t.label,
                                  value: t.value
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "placeholder", "onChange"])) : x("", !0),
                            n === s(e).SLIDER ? (u(), E(P, {
                              key: 5,
                              modelValue: c.value[v],
                              "onUpdate:modelValue": (t) => c.value[v] = t,
                              min: _e,
                              max: oe,
                              onChange: (t) => C(n, v)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "onChange"])) : x("", !0),
                            n === s(e).SWITCH ? (u(), E(I, {
                              key: 6,
                              modelValue: c.value[v],
                              "onUpdate:modelValue": (t) => c.value[v] = t,
                              "active-value": J[0] || !0,
                              "inactive-value": J[1] || !1,
                              onChange: (t) => C(n, v)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "active-value", "inactive-value", "onChange"])) : x("", !0),
                            [s(e).DATE, s(e).MONTH, s(e).YEAR, s(e).DATE_TIME].includes(
                              n
                            ) ? (u(), E(S, {
                              key: 7,
                              modelValue: c.value[v],
                              "onUpdate:modelValue": (t) => c.value[v] = t,
                              format: $(n, Y),
                              "value-format": $(n, Y),
                              type: n,
                              placeholder: b(n, L, _),
                              onChange: (t) => C(n, v)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "format", "value-format", "type", "placeholder", "onChange"])) : x("", !0),
                            [
                              s(e).DATE_RANGE,
                              s(e).MONTH_RANGE,
                              s(e).DATE_TIME_RANGE
                            ].includes(n) ? (u(), E(S, {
                              key: 8,
                              modelValue: c.value[v],
                              "onUpdate:modelValue": (t) => c.value[v] = t,
                              type: n,
                              "value-format": $(n, Y),
                              "start-placeholder": b(n, L, _)[0],
                              "end-placeholder": b(n, L, _)[1],
                              onChange: (t) => C(n, v)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "value-format", "start-placeholder", "end-placeholder", "onChange"])) : x("", !0),
                            [s(e).TIME].includes(n) ? (u(), E(K, {
                              key: 9,
                              modelValue: c.value[v],
                              "onUpdate:modelValue": (t) => c.value[v] = t,
                              "arrow-control": "",
                              "value-format": $(n, Y),
                              placeholder: b(n, L, _),
                              onChange: (t) => C(n, v)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "value-format", "placeholder", "onChange"])) : x("", !0),
                            [s(e).TIME_RANGE].includes(n) ? (u(), E(K, {
                              key: 10,
                              modelValue: c.value[v],
                              "onUpdate:modelValue": (t) => c.value[v] = t,
                              "is-range": "",
                              "value-format": $(n, Y),
                              "start-placeholder": b(n, L, _)[0],
                              "end-placeholder": b(n, L, _)[1],
                              onChange: (t) => C(n, v)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "value-format", "start-placeholder", "end-placeholder", "onChange"])) : x("", !0),
                            [s(e).CHECKBOX].includes(n) ? (u(), E(le, {
                              key: 11,
                              modelValue: c.value[v],
                              "onUpdate:modelValue": (t) => c.value[v] = t,
                              onChange: (t) => C(n, v)
                            }, {
                              default: A(() => [
                                (u(!0), V(U, null, X(J, (t, H) => (u(), E(ee, {
                                  key: H,
                                  label: t.value
                                }, {
                                  default: A(() => [
                                    q(j(t.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["label"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])) : x("", !0),
                            [].includes(n) ? (u(), V(U, { key: 12 }, [], 64)) : x("", !0)
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
            [s(l)]
          ])
        ])
      ]);
    };
  }
}), Ye = /* @__PURE__ */ W(ze, [["__scopeId", "data-v-8c079baa"]]);
const He = { class: "bsgoal-base-table-content" }, Ge = { class: "bas_tabl_content" }, je = {
  name: "BsgoalBaseTableContent"
}, We = /* @__PURE__ */ Object.assign(je, {
  props: {
    data: {
      type: [String, Number, Object, Number, Boolean],
      default: ""
    }
  },
  setup(a) {
    return (r, o) => (u(), V("div", He, [
      F("div", Ge, j(a.data), 1)
    ]));
  }
}), Xe = /* @__PURE__ */ W(We, [["__scopeId", "data-v-a66a56ec"]]);
/*! Element Plus v2.3.3 */
var Ke = {
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
const qe = (a) => (ke("data-v-05353ff7"), a = a(), Oe(), a), Je = { class: "bsgoal-base-table-pagination" }, Qe = { class: "base_table_pagination" }, Ze = /* @__PURE__ */ qe(() => /* @__PURE__ */ F("span", null, "总数", -1)), et = {
  name: "BsgoalBaseTablePagination"
}, tt = /* @__PURE__ */ Object.assign(et, {
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
  setup(a, { emit: r }) {
    const o = (l = 0) => {
      r("on-size-change", l);
    }, d = (l = 1) => {
      r("on-current-change", l);
    }, i = w(1);
    return (l, c) => {
      const p = g("el-pagination"), b = g("el-config-provider");
      return u(), V("div", Je, [
        F("div", Qe, [
          D(b, { locale: s(Ke) }, {
            default: A(() => [
              D(p, {
                background: "",
                layout: "total, sizes, prev, pager, next, jumper",
                "current-page": i.value,
                "onUpdate:currentPage": c[0] || (c[0] = ($) => i.value = $),
                "page-sizes": a.pageSizes,
                "page-size": a.pageSize,
                total: a.total,
                onSizeChange: o,
                onCurrentChange: d
              }, {
                next: A(() => [
                  Ze
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
}), at = /* @__PURE__ */ W(tt, [["__scopeId", "data-v-05353ff7"]]), nt = (a = null, { expression: r = 65, arg: o = {} } = {}) => {
  const d = s(a);
  if (d) {
    const i = d.querySelector(".el-table");
    i && xe(() => {
      const { y: l = 0 } = i.getBoundingClientRect();
      i.style.height = `calc(100vh - ${l + r}px)`;
    });
  }
}, be = (a = Promise.resolve(), r = null, o = w(!1), d = w(null)) => {
  const i = w("");
  return o.value = !0, a.then((l = {}) => {
    const { data: c = {}, message: p = "" } = l;
    d.value = c, i.value = p, r && r(!0, c), o.value = !1;
  }).catch((l = {}) => {
    if (typeof l == "object") {
      const { message: c = "" } = l;
      i.value = c;
    } else
      i.value = l;
    r(!1, l), o.value = !1;
  }).finally(() => {
    o.value = !1;
  }), { data: d, message: i, loading: o };
};
const lt = { class: "bsgoal-base-table" }, ot = { class: "base_table" }, ut = {
  key: 0,
  class: "base_table_menu"
}, st = {
  name: "BsgoalBaseTable"
}, ct = /* @__PURE__ */ Object.assign(st, {
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
  setup(a, { expose: r }) {
    const o = a, d = ue(() => {
      const { configOptions: m = [], operation: y = !1, operationWidth: k = 0 } = o, O = s(m), M = [];
      return y && M.push({
        label: "操作",
        fixed: "right",
        prop: "operation",
        width: k
      }), [...O, ...M];
    }), i = w(null), l = Ce("transferFoldStatus");
    pe(() => {
      const m = l ? l.value : !1;
      nt(i, { arg: m });
    });
    const c = w(1), p = w(10), b = w(0), $ = w({}), B = w(o.loading), N = w(o.data), C = w({}), R = () => {
      const { fetch: m, call: y, mapProps: k } = o, O = $.value, M = c.value, P = p.value, I = ye({}, O), S = s(k);
      I[S.currentPage] = M, I[S.pageSize] = P, be(m(I), y, B, C);
    };
    se(C, (m) => {
      const { mapProps: y } = o, k = s(y);
      N.value = m[k.rows], b.value = m[k.total];
    });
    const h = (m = {}) => {
      $.value = m, c.value = 1, R();
    }, f = (m = 1) => {
      c.value = m;
    }, T = (m = 10) => {
      p.value = m;
    };
    return se([c, p], () => {
      R();
    }), r({
      refreshList: h
    }), (m, y) => {
      const k = g("el-table-column"), O = g("el-table"), M = Ne("loading");
      return u(), V("div", lt, [
        F("div", ot, [
          m.$slots.menu ? (u(), V("div", ut, [
            de(m.$slots, "menu", {}, void 0, !0)
          ])) : x("", !0),
          F("div", {
            ref_key: "EL_TABLE_WRAP_REF",
            ref: i
          }, [
            G((u(), E(O, {
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
                a.selection ? (u(), E(k, {
                  key: 0,
                  fixed: "left",
                  type: "selection",
                  width: "40"
                })) : x("", !0),
                (u(!0), V(U, null, X(s(d), ({ prop: P = "", label: I = "", align: S = "center", width: K = "", fixed: ee = !1 } = {}, le) => (u(), E(k, {
                  key: le,
                  label: I,
                  align: S,
                  width: K,
                  fixed: ee,
                  "min-width": `${I.length * 14 + 24}px`
                }, {
                  default: A(({ row: te }) => [
                    de(m.$slots, P, { row: te }, () => [
                      D(Xe, {
                        data: te[P]
                      }, null, 8, ["data"])
                    ], !0)
                  ]),
                  _: 2
                }, 1032, ["label", "align", "width", "fixed", "min-width"]))), 128))
              ]),
              _: 3
            }, 8, ["data", "header-cell-style"])), [
              [M, B.value]
            ])
          ], 512),
          D(at, {
            total: b.value,
            onOnCurrentChange: f,
            onOnSizeChange: T
          }, null, 8, ["total"])
        ])
      ]);
    };
  }
}), $e = /* @__PURE__ */ W(ct, [["__scopeId", "data-v-05083aef"]]);
const rt = {
  name: "BsgoalBaseLine"
}, _t = /* @__PURE__ */ Object.assign(rt, {
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
    return (r, o) => (u(), V("div", {
      class: he(["bsgoal-base-line", { "bsgoal-base-line__vertical": a.vertical }])
    }, [
      F("div", {
        class: he(["base_line", { base_line__vertical: a.vertical }])
      }, null, 2)
    ], 2));
  }
}), Te = /* @__PURE__ */ W(_t, [["__scopeId", "data-v-b52ba9cb"]]);
/*! Element Plus Icons Vue v2.1.0 */
var ne = (a, r) => {
  let o = a.__vccOpts || a;
  for (let [d, i] of r)
    o[d] = i;
  return o;
}, dt = {
  name: "ArrowDown"
}, it = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, mt = /* @__PURE__ */ F(
  "path",
  {
    fill: "currentColor",
    d: "M831.872 340.864 512 652.672 192.128 340.864a30.592 30.592 0 0 0-42.752 0 29.12 29.12 0 0 0 0 41.6L489.664 714.24a32 32 0 0 0 44.672 0l340.288-331.712a29.12 29.12 0 0 0 0-41.728 30.592 30.592 0 0 0-42.752 0z"
  },
  null,
  -1
  /* HOISTED */
), vt = [
  mt
];
function ft(a, r, o, d, i, l) {
  return u(), V("svg", it, vt);
}
var gt = /* @__PURE__ */ ne(dt, [["render", ft], ["__file", "arrow-down.vue"]]), ht = {
  name: "ArrowLeft"
}, pt = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, Et = /* @__PURE__ */ F(
  "path",
  {
    fill: "currentColor",
    d: "M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a29.12 29.12 0 0 0 41.728 0 30.592 30.592 0 0 0 0-42.752L339.264 511.936l311.872-319.872a30.592 30.592 0 0 0 0-42.688 29.12 29.12 0 0 0-41.728 0z"
  },
  null,
  -1
  /* HOISTED */
), bt = [
  Et
];
function Tt(a, r, o, d, i, l) {
  return u(), V("svg", pt, bt);
}
var Vt = /* @__PURE__ */ ne(ht, [["render", Tt], ["__file", "arrow-left.vue"]]), At = {
  name: "ArrowRight"
}, yt = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, xt = /* @__PURE__ */ F(
  "path",
  {
    fill: "currentColor",
    d: "M340.864 149.312a30.592 30.592 0 0 0 0 42.752L652.736 512 340.864 831.872a30.592 30.592 0 0 0 0 42.752 29.12 29.12 0 0 0 41.728 0L714.24 534.336a32 32 0 0 0 0-44.672L382.592 149.376a29.12 29.12 0 0 0-41.728 0z"
  },
  null,
  -1
  /* HOISTED */
), Ct = [
  xt
];
function $t(a, r, o, d, i, l) {
  return u(), V("svg", yt, Ct);
}
var Bt = /* @__PURE__ */ ne(At, [["render", $t], ["__file", "arrow-right.vue"]]), wt = {
  name: "ArrowUp"
}, Dt = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, kt = /* @__PURE__ */ F(
  "path",
  {
    fill: "currentColor",
    d: "m488.832 344.32-339.84 356.672a32 32 0 0 0 0 44.16l.384.384a29.44 29.44 0 0 0 42.688 0l320-335.872 319.872 335.872a29.44 29.44 0 0 0 42.688 0l.384-.384a32 32 0 0 0 0-44.16L535.168 344.32a32 32 0 0 0-46.336 0z"
  },
  null,
  -1
  /* HOISTED */
), Ot = [
  kt
];
function Nt(a, r, o, d, i, l) {
  return u(), V("svg", Dt, Ot);
}
var Ft = /* @__PURE__ */ ne(wt, [["render", Nt], ["__file", "arrow-up.vue"]]), Mt = {
  name: "Delete"
}, Rt = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, It = /* @__PURE__ */ F(
  "path",
  {
    fill: "currentColor",
    d: "M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"
  },
  null,
  -1
  /* HOISTED */
), St = [
  It
];
function Ut(a, r, o, d, i, l) {
  return u(), V("svg", Rt, St);
}
var Pt = /* @__PURE__ */ ne(Mt, [["render", Ut], ["__file", "delete.vue"]]), Lt = {
  name: "Search"
}, zt = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 1024 1024"
}, Yt = /* @__PURE__ */ F(
  "path",
  {
    fill: "currentColor",
    d: "m795.904 750.72 124.992 124.928a32 32 0 0 1-45.248 45.248L750.656 795.904a416 416 0 1 1 45.248-45.248zM480 832a352 352 0 1 0 0-704 352 352 0 0 0 0 704z"
  },
  null,
  -1
  /* HOISTED */
), Ht = [
  Yt
];
function Gt(a, r, o, d, i, l) {
  return u(), V("svg", zt, Ht);
}
var jt = /* @__PURE__ */ ne(Lt, [["render", Gt], ["__file", "search.vue"]]);
const Wt = { class: "bsgoal-base-search-operation" }, Xt = {
  name: "BsgoalBaseSearchOperation"
}, Kt = /* @__PURE__ */ Object.assign(Xt, {
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
  setup(a, { emit: r }) {
    const o = w(!1), d = () => {
      o.value = !s(o), r("on-fold", o.value);
    };
    return (i, l) => {
      const c = g("el-button"), p = g("el-icon");
      return u(), V("div", Wt, [
        D(c, {
          type: "primary",
          icon: s(jt),
          onClick: l[0] || (l[0] = (b) => i.$emit("on-search"))
        }, {
          default: A(() => [
            q("搜索")
          ]),
          _: 1
        }, 8, ["icon"]),
        D(c, {
          icon: s(Pt),
          onClick: l[1] || (l[1] = (b) => i.$emit("on-clear"))
        }, {
          default: A(() => [
            q("清空")
          ]),
          _: 1
        }, 8, ["icon"]),
        a.fold ? (u(), V("div", {
          key: 0,
          class: "operation_fold",
          style: { color: "var(--el-color-primary)" },
          onClick: d
        }, [
          q(j(o.value ? "收起" : "展开"), 1),
          D(p, { color: "#409EFC" }, {
            default: A(() => [
              G(D(s(Ft), null, null, 512), [
                [Z, o.value]
              ]),
              G(D(s(gt), null, null, 512), [
                [Z, !o.value]
              ])
            ]),
            _: 1
          })
        ])) : x("", !0)
      ]);
    };
  }
}), qt = /* @__PURE__ */ W(Kt, [["__scopeId", "data-v-b5796be8"]]);
const Jt = { class: "bsgoal-base-search" }, Qt = { class: "base_search" }, Zt = { key: 1 }, ea = {
  name: "BsgoalBaseSearch"
}, ta = /* @__PURE__ */ Object.assign(ea, {
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
  setup(a, { emit: r }) {
    const o = a, d = w(null), i = Ee.align, l = w({});
    pe(() => {
      const { configOptions: f } = o;
      s(f).forEach((m) => {
        const { value: y = "", prop: k = "", type: O = "" } = m;
        [e.INPUT, e.INPUT_TEXT_AREA].includes(O), l.value[k] = y;
      });
    });
    const c = ue(() => {
      const { configOptions: f } = o, T = s(f), m = {
        type: e.OPERATION
      };
      return [...T, m];
    }), p = (f = "", T = "", m = "") => {
      if (!m)
        switch (f) {
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
    }, b = (f = "", T = "") => {
      if (!T)
        switch (f) {
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
    }, $ = () => {
      const f = s(l), { configOptions: T } = o, m = s(T);
      for (const y of m) {
        const { type: k = "", range: O = [], prop: M = "" } = y;
        if (k.endsWith("range") && O && O.length === 2) {
          const { 0: P = "", 1: I = "" } = f[M], { 0: S = "", 1: K = "" } = O;
          f[S] = P, f[K] = I;
        }
      }
      r("on-search", f);
    };
    xe(() => {
      $();
    });
    const B = () => {
      d.value.resetFields(), r("on-clear", l.value);
    }, N = Ce("transferFoldStatus"), C = w(!1), R = (f = !1) => {
      C.value = f, N && (N.value = f), r("on-fold", C);
    }, h = (f, T) => {
      $();
      const m = {
        type: f,
        prop: T,
        value: l.value[T] || ""
      };
      r("on-change", m);
    };
    return (f, T) => {
      const m = g("el-input"), y = g("el-input-number"), k = g("el-radio"), O = g("el-radio-group"), M = g("el-option"), P = g("el-select"), I = g("el-slider"), S = g("el-switch"), K = g("el-date-picker"), ee = g("el-time-picker"), le = g("el-checkbox"), te = g("el-checkbox-group"), ie = g("el-form-item"), me = g("el-col"), ve = g("el-row"), L = g("el-form");
      return u(), V("div", Jt, [
        F("div", Qt, [
          G((u(), E(L, {
            ref_key: "EL_FORM_REF",
            ref: d,
            "label-suffix": ":",
            "show-message": !1,
            model: l.value
          }, {
            default: A(() => [
              D(ve, null, {
                default: A(() => [
                  (u(!0), V(U, null, X(s(c), ({
                    label: v = "",
                    prop: n = "",
                    type: _ = "text",
                    placeholder: z = "",
                    readonly: ce = !1,
                    clearable: re = !0,
                    rows: _e = 2,
                    min: oe = 1,
                    max: J = 10,
                    range: Y = [],
                    format: Q = ""
                  } = {}, ae) => G((u(), E(me, {
                    key: ae,
                    xs: 24,
                    sm: 12,
                    md: a.medium
                  }, {
                    default: A(() => [
                      D(ie, {
                        label: v,
                        prop: n
                      }, {
                        default: A(() => [
                          ce ? (u(), V("div", Zt, j(l.value[n]), 1)) : (u(), V(U, { key: 0 }, [
                            _ === s(e).INPUT ? (u(), E(m, {
                              key: 0,
                              modelValue: l.value[n],
                              "onUpdate:modelValue": (t) => l.value[n] = t,
                              placeholder: p(_, v, z),
                              clearable: re,
                              onChange: (t) => h(_, n)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "placeholder", "clearable", "onChange"])) : x("", !0),
                            _ === s(e).INPUT_TEXT_AREA ? (u(), E(m, {
                              key: 1,
                              modelValue: l.value[n],
                              "onUpdate:modelValue": (t) => l.value[n] = t,
                              type: "textarea",
                              rows: _e,
                              clearable: re,
                              placeholder: p(_, v, z),
                              onChange: (t) => h(_, n)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rows", "clearable", "placeholder", "onChange"])) : x("", !0),
                            _ === s(e).INPUT_NUMBER ? (u(), E(y, {
                              key: 2,
                              modelValue: f.num,
                              "onUpdate:modelValue": T[0] || (T[0] = (t) => f.num = t),
                              min: oe,
                              max: J,
                              onChange: h
                            }, null, 8, ["modelValue", "min", "max"])) : x("", !0),
                            _ === s(e).RADIO ? (u(), E(O, {
                              key: 3,
                              modelValue: l.value[n],
                              "onUpdate:modelValue": (t) => l.value[n] = t,
                              onChange: (t) => h(_, n)
                            }, {
                              default: A(() => [
                                (u(!0), V(U, null, X(Y, (t, H) => (u(), E(k, {
                                  key: H,
                                  label: t.value
                                }, {
                                  default: A(() => [
                                    q(j(t.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["label"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])) : x("", !0),
                            _ === s(e).SELECT ? (u(), E(P, {
                              key: 4,
                              modelValue: l.value[n],
                              "onUpdate:modelValue": (t) => l.value[n] = t,
                              placeholder: p(_, v, z),
                              onChange: (t) => h(_, n)
                            }, {
                              default: A(() => [
                                (u(!0), V(U, null, X(Y, (t, H) => (u(), E(M, {
                                  key: H,
                                  label: t.label,
                                  value: t.value
                                }, null, 8, ["label", "value"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "placeholder", "onChange"])) : x("", !0),
                            _ === s(e).SLIDER ? (u(), E(I, {
                              key: 5,
                              modelValue: l.value[n],
                              "onUpdate:modelValue": (t) => l.value[n] = t,
                              min: oe,
                              max: J,
                              onChange: (t) => h(_, n)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "min", "max", "onChange"])) : x("", !0),
                            _ === s(e).SWITCH ? (u(), E(S, {
                              key: 6,
                              modelValue: l.value[n],
                              "onUpdate:modelValue": (t) => l.value[n] = t,
                              "active-value": Y[0] || !0,
                              "inactive-value": Y[1] || !1,
                              onChange: (t) => h(_, n)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "active-value", "inactive-value", "onChange"])) : x("", !0),
                            [s(e).DATE, s(e).MONTH, s(e).YEAR, s(e).DATE_TIME].includes(
                              _
                            ) ? (u(), E(K, {
                              key: 7,
                              modelValue: l.value[n],
                              "onUpdate:modelValue": (t) => l.value[n] = t,
                              format: b(_, Q),
                              "value-format": b(_, Q),
                              type: _,
                              placeholder: p(_, v, z),
                              onChange: (t) => h(_, n)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "format", "value-format", "type", "placeholder", "onChange"])) : x("", !0),
                            [
                              s(e).DATE_RANGE,
                              s(e).MONTH_RANGE,
                              s(e).DATE_TIME_RANGE
                            ].includes(_) ? (u(), E(K, {
                              key: 8,
                              modelValue: l.value[n],
                              "onUpdate:modelValue": (t) => l.value[n] = t,
                              type: _,
                              "value-format": b(_, Q),
                              "start-placeholder": p(_, v, z)[0],
                              "end-placeholder": p(_, v, z)[1],
                              onChange: (t) => h(_, n)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "type", "value-format", "start-placeholder", "end-placeholder", "onChange"])) : x("", !0),
                            [s(e).TIME].includes(_) ? (u(), E(ee, {
                              key: 9,
                              modelValue: l.value[n],
                              "onUpdate:modelValue": (t) => l.value[n] = t,
                              "arrow-control": "",
                              "value-format": b(_, Q),
                              placeholder: p(_, v, z),
                              onChange: (t) => h(_, n)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "value-format", "placeholder", "onChange"])) : x("", !0),
                            [s(e).TIME_RANGE].includes(_) ? (u(), E(ee, {
                              key: 10,
                              modelValue: l.value[n],
                              "onUpdate:modelValue": (t) => l.value[n] = t,
                              "is-range": "",
                              "value-format": b(_, Q),
                              "start-placeholder": p(_, v, z)[0],
                              "end-placeholder": p(_, v, z)[1],
                              onChange: (t) => h(_, n)
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "value-format", "start-placeholder", "end-placeholder", "onChange"])) : x("", !0),
                            [s(e).CHECKBOX].includes(_) ? (u(), E(te, {
                              key: 11,
                              modelValue: l.value[n],
                              "onUpdate:modelValue": (t) => l.value[n] = t,
                              onChange: (t) => h(_, n)
                            }, {
                              default: A(() => [
                                (u(!0), V(U, null, X(Y, (t, H) => (u(), E(le, {
                                  key: H,
                                  label: t.value
                                }, {
                                  default: A(() => [
                                    q(j(t.label), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["label"]))), 128))
                              ]),
                              _: 2
                            }, 1032, ["modelValue", "onUpdate:modelValue", "onChange"])) : x("", !0),
                            [].includes(_) ? (u(), V(U, { key: 12 }, [], 64)) : x("", !0),
                            [s(e).OPERATION].includes(_) ? (u(), E(qt, {
                              key: 13,
                              fold: ae >= 7,
                              onOnSearch: $,
                              onOnClear: B,
                              onOnFold: R
                            }, null, 8, ["fold"])) : x("", !0)
                          ], 64))
                        ]),
                        _: 2
                      }, 1032, ["label", "prop"])
                    ]),
                    _: 2
                  }, 1032, ["md"])), [
                    [Z, ae < 7 || _ === s(e).OPERATION || ae >= 7 && C.value]
                  ])), 128))
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["model"])), [
            [s(i)]
          ])
        ]),
        D(Te)
      ]);
    };
  }
}), aa = /* @__PURE__ */ W(ta, [["__scopeId", "data-v-c4e64d40"]]);
const na = { class: "bsgoal-base-search-table" }, la = { class: "base_search_table" }, oa = {
  name: "BsgoalBaseSearchTable"
}, ua = /* @__PURE__ */ Object.assign(oa, {
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
    const r = a, o = w(!1);
    Fe("transferFoldStatus", o);
    const d = s(r.configOptions), i = ue(() => d), l = ue(() => d), c = Me(), p = w(Object.keys(c)), b = w(null), $ = (B) => {
      b.value.refreshList(B);
    };
    return (B, N) => (u(), V("div", na, [
      F("div", la, [
        D(aa, {
          "config-options": s(i),
          onOnSearch: $,
          onOnClear: $
        }, null, 8, ["config-options"]),
        D($e, {
          ref_key: "BSGOAL_BASE_TABLE_REF",
          ref: b,
          operationWidth: a.operationWidth,
          "config-options": s(l),
          data: a.tableData,
          selection: a.selection,
          operation: a.operation,
          fetch: a.fetch,
          call: a.call
        }, Re({ _: 2 }, [
          X(p.value, (C) => ({
            name: C,
            fn: A(({ row: R = {} }) => [
              de(B.$slots, C, { row: R }, void 0, !0)
            ])
          }))
        ]), 1032, ["operationWidth", "config-options", "data", "selection", "operation", "fetch", "call"])
      ])
    ]));
  }
}), sa = /* @__PURE__ */ W(ua, [["__scopeId", "data-v-9ec9045a"]]);
const ca = { class: "bsgoal-base-tree-fold" }, ra = {
  name: "BsgoalBaseTreeFold"
}, _a = /* @__PURE__ */ Object.assign(ra, {
  props: ["modelValue"],
  emits: ["update:modelValue"],
  setup(a, { emit: r }) {
    let o = w(!0);
    const d = () => {
      o.value = !o.value, r("update:modelValue", o.value);
    };
    return (i, l) => {
      const c = g("el-icon");
      return u(), V("div", ca, [
        F("div", {
          class: he(["base_tree_fold", { "base_tree_fold--hide": !s(o) }]),
          onClick: d
        }, [
          D(c, { color: "#fff" }, {
            default: A(() => [
              G(D(s(Vt), null, null, 512), [
                [Z, s(o)]
              ]),
              G(D(s(Bt), null, null, 512), [
                [Z, !s(o)]
              ])
            ]),
            _: 1
          })
        ], 2)
      ]);
    };
  }
}), da = /* @__PURE__ */ W(_a, [["__scopeId", "data-v-b5171812"]]);
const ia = { class: "bsgoal-base-tree" }, ma = { class: "base_tree" }, va = { class: "base_tree_main" }, fa = {
  name: "BsgoalBaseTree"
}, ga = /* @__PURE__ */ Object.assign(fa, {
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
  setup(a, { emit: r }) {
    const o = a, d = Ee.height, i = w(""), l = w(null);
    se(i, (B) => {
      l.value.filter(B);
    });
    const c = (B, N) => B ? N.label.includes(B) : !0, p = w(!0), b = (B, N, C, R) => {
      r("on-click", B, N, C, R);
    }, $ = async (B, N, C) => {
      if (B.level === 0) {
        const R = await C.initNode(B);
        return N(R || []);
      } else {
        const R = await C.lazyLoad(B);
        N(R || []);
      }
    };
    return (B, N) => {
      const C = g("el-input"), R = g("el-tree");
      return u(), V("div", ia, [
        G((u(), V("div", ma, [
          G(F("div", va, [
            D(C, {
              modelValue: i.value,
              "onUpdate:modelValue": N[0] || (N[0] = (h) => i.value = h),
              class: "base_tree_main_input",
              placeholder: "输入关键字过滤"
            }, null, 8, ["modelValue"]),
            D(R, {
              ref_key: "EL_TREE_REF",
              ref: l,
              lazy: "",
              "highlight-current": "",
              "empty-text": "暂无数据",
              load: (h, f) => $(h, f, o),
              "expand-on-click-node": !1,
              props: a.treeProps,
              "filter-node-method": c,
              onNodeClick: b
            }, null, 8, ["load", "props"])
          ], 512), [
            [Z, p.value]
          ]),
          G(D(Te, { vertical: "" }, null, 512), [
            [Z, p.value]
          ]),
          D(da, {
            modelValue: p.value,
            "onUpdate:modelValue": N[1] || (N[1] = (h) => p.value = h)
          }, null, 8, ["modelValue"])
        ])), [
          [s(d), a.gasket]
        ])
      ]);
    };
  }
}), ha = /* @__PURE__ */ W(ga, [["__scopeId", "data-v-35fba25c"]]);
const pa = { class: "bsgoal-base-dialog" }, Ea = { class: "base_dialog" }, ba = { class: "base_dialog_header" }, Ta = { class: "base_dialog_content" }, Va = { class: "base_dialog_footer" }, Aa = {
  name: "BsgoalBaseDialog"
}, ya = /* @__PURE__ */ Object.assign(Aa, {
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
  setup(a, { emit: r }) {
    const o = a, d = w(o.modelValue.value), i = () => {
      d.value = !1;
    }, l = () => {
      d.value = !1, r("on-confirm");
    };
    return se(
      () => o.modelValue,
      (c) => {
        d.value = c;
      }
    ), se(d, (c) => {
      r("update:modelValue", c);
    }), (c, p) => {
      const b = g("el-button"), $ = g("el-dialog");
      return u(), V("div", pa, [
        F("div", Ea, [
          D($, {
            modelValue: d.value,
            "onUpdate:modelValue": p[0] || (p[0] = (B) => d.value = B),
            "custom-class": "bsgoal_base_dialog_main"
          }, {
            header: A(() => [
              F("div", ba, j(a.title), 1)
            ]),
            footer: A(() => [
              F("span", Va, [
                D(b, { onClick: i }, {
                  default: A(() => [
                    q(j(a.cancelTxt), 1)
                  ]),
                  _: 1
                }),
                D(b, {
                  type: "primary",
                  onClick: l
                }, {
                  default: A(() => [
                    q(j(a.confirmTxt), 1)
                  ]),
                  _: 1
                })
              ])
            ]),
            default: A(() => [
              F("div", Ta, [
                de(c.$slots, "default", {}, void 0, !0)
              ])
            ]),
            _: 3
          }, 8, ["modelValue"])
        ])
      ]);
    };
  }
}), xa = /* @__PURE__ */ W(ya, [["__scopeId", "data-v-435caf75"]]), wa = e, Da = be, ka = {
  install(a, r = {}) {
    const { exclude: o = [] } = r, d = {
      BsgoalBaseForm: Ye,
      BsgoalBaseTable: $e,
      BsgoalBaseLine: Te,
      BsgoalBaseSearchTable: sa,
      BsgoalBaseTree: ha,
      BsgoalBaseDialog: xa
    };
    for (const [i, l] of Object.entries(d))
      o.includes(i) || a.component(i, l);
  },
  enumType: e,
  useFetch: be
};
export {
  wa as EnumType,
  ka as default,
  Da as useFetchApi
};
//# sourceMappingURL=index.mjs.map
