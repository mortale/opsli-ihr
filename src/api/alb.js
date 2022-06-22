import request from "@/utils/request";
const { baseOpsTestUrl } = require("@/config/settings");

export function getList(params) {
  return request({
    url: `${baseOpsTestUrl}/api-v2/cmdb/alb/`,
    method: "get",
    params,
    headers: {
      Authorization: "token 63c971cf04da43a66a27e33b210de5d30ecdcd99",
      "Content-Type": "application/json",
    },
  });
}
