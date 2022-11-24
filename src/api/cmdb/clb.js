import request from "@/utils/request";
import api, { headers } from "../api";
const { baseOpsTestUrl } = require("@/config/settings");

export function getClb(params) {
  return request({
    url: `${baseOpsTestUrl}${api.clb}`,
    method: "get",
    params,
    headers,
  });
}

export function postClb(data) {
  return request({
    url: `${baseOpsTestUrl}${api.clb}`,
    method: "post",
    data,
    headers,
  });
}

export function putClb(data, id) {
  return request({
    url: `${baseOpsTestUrl}${api.clb}/${id}`,
    method: "put",
    data,
    headers,
  });
}
