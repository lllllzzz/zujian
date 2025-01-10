import { defineComponent as e, computed as s, openBlock as a, createElementBlock as u, normalizeClass as l, renderSlot as p } from "vue";
import "./src/button/style/index.css";
const c = e({ name: "ea-button" }), d = /* @__PURE__ */ e({
  ...c,
  props: {
    type: {},
    size: {}
  },
  setup(o) {
    const t = o, n = s(() => ({ [`ea-button--${t.type}`]: t.type }));
    return (r, m) => (a(), u("button", {
      class: l(["ea-button", n.value])
    }, [
      p(r.$slots, "default")
    ], 2));
  }
});
export {
  d as default
};
