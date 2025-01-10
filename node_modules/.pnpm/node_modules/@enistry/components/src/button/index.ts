import _Button from "./button.vue";
import type { App, Plugin } from "vue";

// 定义一个类型 SFCWithInstall，它接受一个泛型 T，并扩展了 Plugin 接口
type SFCWithInstall<T> = T & Plugin;
// 定义一个泛型函数 withInstall，它接受一个组件 comp 作为参数
const withInstall = <T>(comp: T) => {
  // 将 comp 转换为 SFCWithInstall<T> 类型，并添加 install 方法
  (comp as SFCWithInstall<T>).install = (app: App) => {
    // 获取组件的名称
    const name = (comp as any).name;
    // 将组件注册到 Vue 应用中
    app.component(name, comp as SFCWithInstall<T>);
  };
  // 返回转换后的组件
  return comp as SFCWithInstall<T>;
};
export const Button = withInstall(_Button);
export default Button;

