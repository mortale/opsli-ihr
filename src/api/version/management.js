import request from "@/utils/request";
import api, { headers } from "../api";
const { baseOpsTestUrl } = require("@/config/settings");

export function getSprint(params) {
  return request({
    url: `${baseOpsTestUrl}${api.sprint}`,
    method: "get",
    params,
    headers,
  });
}

export function postSprint(data) {
  return request({
    url: `${baseOpsTestUrl}${api.sprint}`,
    method: "post",
    data,
    headers,
  });
}

export function getSprintStep(id, params) {
  return request({
    url: `${baseOpsTestUrl}${api.sprint}${id}/step/`,
    method: "get",
    params,
    headers,
  });
}

export function postSprintStep(id, data) {
  return request({
    url: `${baseOpsTestUrl}${api.sprint}${id}/step/`,
    method: "post",
    data,
    headers,
  });
}

export function getAppLication(params) {
  return request({
    url: `${baseOpsTestUrl}${api.application}`,
    method: "get",
    params,
    headers,
  });
}
