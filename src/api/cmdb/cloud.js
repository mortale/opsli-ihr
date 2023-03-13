import request from "@/utils/request";
import api, { headers } from "../api";
import { baseOpsTestUrl } from "@/config/settings";
// 查
export function getCloud(params) {
  return request({
    url: `${baseOpsTestUrl}${api.cloud}`,
    method: "get",
    params,
    headers,
  });
}
// 增
export function postCloud(data) {
  return request({
    url: `${baseOpsTestUrl}${api.cloud}`,
    method: "post",
    data,
    headers,
  });
}
// 改
export function putCloud(data) {
  return request({
    url: `${baseOpsTestUrl}${api.cloud}`,
    method: "put",
    data,
    headers,
  });
}
// 删
export function deleteCloud(id) {
  return request({
    url: `${baseOpsTestUrl}${api.cloud}${id}`,
    method: "delete",
    headers,
  });
}
