import request from "@/utils/request";
import api, { headers } from "../api";
const { baseOpsTestUrl } = require("@/config/settings");
// 查
export function getAlb(params) {
  return request({
    url: `${baseOpsTestUrl}${api.alb}`,
    method: "get",
    params,
    headers,
  });
}
// 增
export function postAlb(data) {
  return request({
    url: `${baseOpsTestUrl}${api.alb}`,
    method: "post",
    data,
    headers,
  });
}
// 改
export function putAlb(data) {
  return request({
    url: `${baseOpsTestUrl}${api.alb}`,
    method: "put",
    data,
    headers,
  });
}
// 删
export function deleteAlb(id) {
  return request({
    url: `${baseOpsTestUrl}${api.alb}${id}`,
    method: "delete",
    headers,
  });
}
