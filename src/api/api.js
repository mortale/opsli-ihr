const api = Object.freeze({
  alb: "/api-v2/cmdb/alb/",
  cloud: "/api-v2/cmdb/cloud/",
  environment: "/api-v2/cmdb/enviroment/",
  machine: "/api-v2/cmdb/machine/",
  application: "/api-v2/cmdb/application/",
  deployment: "/api-v2/cmdb/deployment/",
  mix: "/api-v2/cmdb/mix/",
  archery: "/api-v2/cmdb/archery/",
  clb: "/api-v2/cmdb/clb/",
  deploymentHistory: "/api-v2/cmdb/deployment-history/",
  dockerVersion: "/api-v2/cmdb/docker-version/",
  sprint: "/api-v2/version/sprint/",
});

export const headers = {
  Authorization: "token 63c971cf04da43a66a27e33b210de5d30ecdcd99",
  "Content-Type": "application/json",
};

export default api;
