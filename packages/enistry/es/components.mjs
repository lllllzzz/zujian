import * as t from "./components2.mjs";
import { Button as s } from "./components3.mjs";
const n = {
  install: (o) => {
    for (let e in t)
      o.use(t[e]);
  }
};
export {
  s as Button,
  n as default
};
