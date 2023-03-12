/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 公共布局导出，已封装成npm，便于此后在线升级，当然也存在一定的弊端，给开发者自定义增加了一定的困难，如果您一定要进行高度自定义，请仔细阅读VIP群文档，layouts本地化篇
 */
import Logo from "zx-layouts/Logo";

import VabQueryForm from "zx-layouts/VabQueryForm";
import VabQueryFormLeftPanel from "zx-layouts/VabQueryForm/VabQueryFormLeftPanel";
import VabQueryFormRightPanel from "zx-layouts/VabQueryForm/VabQueryFormRightPanel";
import VabQueryFormTopPanel from "zx-layouts/VabQueryForm/VabQueryFormTopPanel";
import VabQueryFormBottomPanel from "zx-layouts/VabQueryForm/VabQueryFormBottomPanel";
import Avatar from "zx-layouts/Avatar";
export { default as ErrorLog } from "./error-log.vue";
export { default as ThemeBar } from "zx-layouts/ThemeBar";
import FullScreenBar from "./FullScreenBar";
import SideBar from "./SideBar/index.vue";
import TopBar from "./TopBar/index.vue";
export { default as VabPermissions } from "./Permissions";

const importVabQueryForm = {
  install(Vue) {
    Vue.component("vab-query-form", VabQueryForm);
    Vue.component("vab-query-form-left-panel", VabQueryFormLeftPanel);
    Vue.component("vab-query-form-right-panel", VabQueryFormRightPanel);
    Vue.component("vab-query-form-top-panel", VabQueryFormTopPanel);
    Vue.component("vab-query-form-bottom-panel", VabQueryFormBottomPanel);
  },
};

export {
  Avatar,
  importVabQueryForm as VabQueryForm,
  Logo,
  SideBar,
  FullScreenBar,
  TopBar,
};
export { default as ColorfullIcon } from "zx-layouts/ColorfullIcon";
export { default as RemixIcon } from "zx-layouts/RemixIcon";
export { default as VabDrag } from "zx-layouts/Drag";
export { default as AppMain } from "zx-layouts/AppMain";
export { default as TagsBar } from "zx-layouts/TagsBar";
export { default as Breadcrumb } from "zx-layouts/Breadcrumb";
export { default as NavBar } from "zx-layouts/NavBar";


//AppMain, NavBar,  TagsBar, TopBar 