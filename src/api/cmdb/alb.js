import request from "@/utils/request";
import api, { headers } from "./api";
const { baseOpsTestUrl } = require("@/config/settings");

export function getAlb(params) {
  return request({
    url: `${baseOpsTestUrl}${api.alb}`,
    method: "get",
    params,
    headers,
  });
}
