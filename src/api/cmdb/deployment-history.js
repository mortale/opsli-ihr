import request from "@/utils/request";
import api, { headers } from "../api";
const { baseOpsTestUrl } = require("@/config/settings");

export function getDeploymentHistory(params) {
  return request({
    url: `${baseOpsTestUrl}${api.deploymentHistory}`,
    method: "get",
    params,
    headers,
  });
}

export function postDeploymentHistory(data) {
  return request({
    url: `${baseOpsTestUrl}${api.deploymentHistory}`,
    method: "post",
    data,
    headers,
  });
}

export function putDeploymentHistory(data, id) {
  return request({
    url: `${baseOpsTestUrl}${api.deploymentHistory}/${id}`,
    method: "put",
    data,
    headers,
  });
}
