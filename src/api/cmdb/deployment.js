import request from "@/utils/request";
import api, { headers } from "./api";
const { baseOpsTestUrl } = require("@/config/settings");

export function getDeployment(params) {
  return request({
    url: `${baseOpsTestUrl}${api.deployment}`,
    method: "get",
    params,
    headers,
  });
}

export function postDeployment(data) {
  return request({
    url: `${baseOpsTestUrl}${api.deployment}`,
    method: "post",
    data,
    headers,
  });
}

export function putDeployment(data, id) {
  return request({
    url: `${baseOpsTestUrl}${api.deployment}/${id}`,
    method: "put",
    data,
    headers,
  });
}
