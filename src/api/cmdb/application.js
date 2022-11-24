import request from "@/utils/request";
import api, { headers } from "../api";
const { baseOpsTestUrl } = require("@/config/settings");

export function getApplication(params) {
  return request({
    url: `${baseOpsTestUrl}${api.application}`,
    method: "get",
    params,
    headers,
  });
}

export function postApplication(data) {
  return request({
    url: `${baseOpsTestUrl}${api.application}`,
    method: "post",
    data,
    headers,
  });
}

export function putApplication(data, id) {
  return request({
    url: `${baseOpsTestUrl}${api.application}/${id}`,
    method: "put",
    data,
    headers,
  });
}
