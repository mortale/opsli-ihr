import store from "@/store";

const dict = {
  0: false,
  1: true,
};

/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description all模式渲染后端返回路由
 * @param constantRoutes
 * @returns {*}
 */
export function filterAllRoutes(constantRoutes) {
  return constantRoutes.filter((route) => {
    if (route.component) {
      if (route.component === "Layout") {
        route.component = (resolve) => require(["@/layouts"], resolve);
      } else if (route.component === "EmptyLayout") {
        route.component = (resolve) =>
          require(["@/layouts/EmptyLayout"], resolve);
      } else {
        let path = "views/" + route.component;
        if (
          new RegExp("^/views/.*$").test(route.component) ||
          new RegExp("^views/.*$").test(route.component)
        ) {
          path = route.component;
        } else if (new RegExp("^/.*$").test(route.component)) {
          path = "views" + route.component;
        } else if (new RegExp("^@views/.*$").test(route.component)) {
          path = route.component.slice(1);
        } else {
          path = "views/" + route.component;
        }
        route.component = (resolve) => require([`@/${path}`], resolve);
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAllRoutes(route.children);
    }
    if (route.children && route.children.length === 0) {
      delete route.children;
    }

    // 翻译字典
    if (
      "[object Boolean]" !== Object.prototype.toString.call(route.alwaysShow)
    ) {
      route.alwaysShow = dict[route.alwaysShow];
    }
    return true;
  });
}

/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 判断当前路由是否包含权限
 * @param permissions
 * @param route
 * @returns {boolean|*}
 */
function hasPermission(permissions, route, currentPath) {
  if (route.path === "/") return true;
  const roles = store.getters["user/accessToken"].split(".");
  if (roles?.length) {
    const pathAuths = permissions[currentPath] || [];
    return roles.some((el) => pathAuths.includes(el));
  }
}

/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description intelligence模式根据permissions数组拦截路由
 * @param routes
 * @param permissions
 * @returns {[]}
 */
export function filterAsyncRoutes(routes, permissions, perPath = "") {
  const finallyRoutes = [];
  routes.forEach((route) => {
    const item = { ...route };
    const curentPath = perPath + route.path;
    if (hasPermission(permissions, item, curentPath)) {
      if (item.children) {
        item.children = filterAsyncRoutes(
          item.children,
          permissions,
          curentPath + (perPath ? "/" : "")
        );
      }
      finallyRoutes.push(item);
    }
  });
  return finallyRoutes;
}
