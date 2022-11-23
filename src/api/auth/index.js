// 默认是具备所有权限
const data = {
  "/dashboard": ["admin"],
  "/cmdb": ["admin"],
  "/cmdb/cloud": ["admin"],
  "/cmdb/status": ["admin"],
  "/cmdb/zone": ["admin"],
  "/cmdb/environment": ["admin"],
  "/cmdb/machine": ["admin"],
  "/cmdb/modules": ["admin"],
  "/cmdb/application": ["admin"],
  "/cmdb/deployment": ["admin"],
  "/cmdb/mix": ["admin"],
  "/cmdb/archery": ["admin"],
  "/cmdb/alb": ["admin"],
  "/cmdb/clb": ["admin"],
  "/cmdb/deployment-history": ["admin"],
  "/cmdb/docker-version": ["admin"],
  "/publish": ["admin"],
  "/publish/mission": ["admin"],
  "/publish/progress": ["admin"],
  "/publish/jenkins-history": ["admin"],
  "/publish/private-mission": ["admin"],
  "/version": ["admin"],
  "/version/todo-mission": ["admin"],
  "/version/publish-order": ["admin"],
  "/version/datafix": ["admin"],
  "/version/app": ["admin"],
  "/version/history": ["admin"],
  "/version/management": ["admin"],
  "/cmd": ["admin"],
  "/monitor": ["admin"],
  "/management": ["admin"],
};

export function getAuthList() {
  return Promise.resolve({
    success: true,
    msg: "操作成功！",
    code: 200,
    timestamp: +new Date(),
    data,
  });
}
