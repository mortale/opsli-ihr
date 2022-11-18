// 默认是具备所有权限
const data = {
  "/dashboard": ["admin"],
  "/cmdb/cloud": [],
  "/cmdb/status": [],
  "/cmdb/zone": [],
  "/cmdb/environment": [],
  "/cmdb/machine": [],
  "/cmdb/modules": [],
  "/cmdb/application": [],
  "/cmdb/deployment": [],
  "/cmdb/mix": [],
  "/cmdb/archery": [],
  "/cmdb/alb": [],
  "/cmdb/clb": [],
  "/cmdb/deployment-history": [],
  "/cmdb/docker-version": [],
  "/publish/mission": [],
  "/publish/progress": [],
  "/publish/jenkins-history": [],
  "/publish/private-mission": [],
  "/version/todo-mission": [],
  "/version/publish-order": [],
  "/version/datafix": [],
  "/version/app": [],
  "/version/history": [],
  "/cmd": [],
  "/monitor": [],
  "/management": [],
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
