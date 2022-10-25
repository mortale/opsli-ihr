import request from "@/utils/request";
import api, { headers } from "./api";
const { baseOpsTestUrl } = require("@/config/settings");

export function getDockerVersion(params) {
  return request({
    url: `${baseOpsTestUrl}${api.dockerVersion}`,
    method: "get",
    params,
    headers,
  });
}

export function postDockerVersion(data) {
  return request({
    url: `${baseOpsTestUrl}${api.dockerVersion}`,
    method: "post",
    data,
    headers,
  });
}

export function putDockerVersion(data, id) {
  return request({
    url: `${baseOpsTestUrl}${api.dockerVersion}/${id}`,
    method: "put",
    data,
    headers,
  });
}
