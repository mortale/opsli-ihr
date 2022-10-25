import request from "@/utils/request";
import api, { headers } from "./api";
const { baseOpsTestUrl } = require("@/config/settings");

export function getArchery(params) {
  return request({
    url: `${baseOpsTestUrl}${api.archery}`,
    method: "get",
    params,
    headers,
  });
}

export function postArchery(data) {
  return request({
    url: `${baseOpsTestUrl}${api.archery}`,
    method: "post",
    data,
    headers,
  });
}

export function putArchery(data, id) {
  return request({
    url: `${baseOpsTestUrl}${api.archery}/${id}`,
    method: "put",
    data,
    headers,
  });
}
