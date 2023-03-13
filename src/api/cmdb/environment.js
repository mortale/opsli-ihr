import request from "@/utils/request";
import api, { headers } from "../api";
import { baseOpsTestUrl } from "@/config/settings";

export function getEnvironment(params) {
  return request({
    url: `${baseOpsTestUrl}${api.environment}`,
    method: "get",
    params,
    headers,
  });
}

export function postEnvironment(data) {
  return request({
    url: `${baseOpsTestUrl}${api.environment}`,
    method: "post",
    data,
    headers,
  });
}

export function putEnvironment(data, id) {
  return request({
    url: `${baseOpsTestUrl}${api.environment}/${id}`,
    method: "put",
    data,
    headers,
  });
}
