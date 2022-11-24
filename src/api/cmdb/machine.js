import request from "@/utils/request";
import api, { headers } from "../api";
const { baseOpsTestUrl } = require("@/config/settings");

export function getMachine(params) {
  return request({
    url: `${baseOpsTestUrl}${api.machine}`,
    method: "get",
    params,
    headers,
  });
}

export function postMachine(data) {
  return request({
    url: `${baseOpsTestUrl}${api.machine}`,
    method: "post",
    data,
    headers,
  });
}

export function putMachine(data, id) {
  return request({
    url: `${baseOpsTestUrl}${api.machine}/${id}`,
    method: "put",
    data,
    headers,
  });
}
