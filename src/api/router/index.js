import cmdbChildren from "./cmdb.json";
import publishChildren from "./publish.json";
import versionChildren from "./version.json";
const rootRouterConfig = [
  {
    id: "0-0",
    name: "dashboard",
    path: "dashboard",
    component: "views/index/index",
    meta: {
      title: "Dashboard",
    },
  },
  {
    id: "0-1",
    path: "cmdb",
    name: "cmdb",
    alwaysShow: "1",
    component: "EmptyLayout",
    meta: {
      title: "cmdb",
    },
    children: cmdbChildren,
  },
  {
    id: "0-2",
    path: "publish",
    name: "publish",
    component: "EmptyLayout",
    alwaysShow: "1",
    meta: {
      title: "发布",
    },
    children: publishChildren,
  },
  {
    id: "0-3",
    path: "version",
    name: "version",
    component: "EmptyLayout",
    alwaysShow: "1",
    meta: {
      title: "版本管理",
    },
    children: versionChildren,
  },
  {
    id: "0-4",
    path: "cmd",
    name: "cmd",
    component: "views/index/index",
    meta: {
      title: "CONTROL",
    },
  },
  {
    id: "0-5",
    path: "monitor",
    name: "monitor",
    component: "views/index/index",
    meta: {
      title: "Monitor",
    },
  },
  {
    id: "0-5",
    path: "management",
    name: "management",
    component: "views/index/index",
    meta: {
      title: "账号管理",
    },
  },
];

const data = [
  {
    id: "0",
    redirect: "dashboard",
    path: "/",
    component: "Layout",
    alwaysShow: "0",
    children: rootRouterConfig,
  },
];

export function getRouterList() {
  return Promise.resolve({
    success: true,
    msg: "操作成功！",
    code: 200,
    timestamp: +new Date(),
    data,
  });
}
