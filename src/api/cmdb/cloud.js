import request from "@/utils/request";
import api, { headers } from "./api";
const { baseOpsTestUrl } = require("@/config/settings");

export function getCloud(params) {
  return request({
    url: `${baseOpsTestUrl}${api.cloud}`,
    method: "get",
    params,
    headers,
  });
}

export function postCloud(data) {
  return request({
    url: `${baseOpsTestUrl}${api.cloud}`,
    method: "post",
    data,
    headers,
  });
}
