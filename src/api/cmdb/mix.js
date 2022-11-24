import request from "@/utils/request";
import api, { headers } from "../api";
const { baseOpsTestUrl } = require("@/config/settings");

export function getMix(params) {
  return request({
    url: `${baseOpsTestUrl}${api.mix}`,
    method: "get",
    params,
    headers,
  });
}

export function postMix(data) {
  return request({
    url: `${baseOpsTestUrl}${api.mix}`,
    method: "post",
    data,
    headers,
  });
}

export function putMix(data, id) {
  return request({
    url: `${baseOpsTestUrl}${api.mix}/${id}`,
    method: "put",
    data,
    headers,
  });
}
