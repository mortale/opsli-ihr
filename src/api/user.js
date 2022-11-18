import request from "@/utils/request";
import { urlAddArgsByData } from "@/utils";
const { baseURL, baseOpsTestUrl } = require("@/config/settings");
import { encryptedRsa } from "@/utils/crypto/encrypt-rsa";
import { loginRSA, tokenName } from "@/config/settings";
import Vue from "vue";

export async function login(data) {
  if (loginRSA) {
    // 获得公钥
    let publicKey = Vue.prototype.$getPublicKey();
    // 加密数据
    let encrypted = encryptedRsa(data, publicKey);
    data = {
      encryptData: encrypted,
    };
  }
  return request({
    url: `${baseOpsTestUrl}/api/login`,
    method: "post",
    data,
    headers: {
      Authorization: "token 63c971cf04da43a66a27e33b210de5d30ecdcd99",
      "Content-Type": "application/json",
    },
  });
}

export function getSlipCount(data) {
  return request({
    url: "/system/slipCount",
    method: "get",
    params: data,
  });
}

export function getUserInfo(accessToken) {
  return Promise.resolve({
    success: true,
    msg: "操作成功！",
    code: 200,
    timestamp: 1653899678625,
    data: {
      encryptData: null,
      id: "1465171199435362305",
      createBy: "1",
      createTime: "2021-11-29 12:10:10",
      updateBy: "1465171199435362305",
      updateTime: "2022-03-19 20:02:52",
      version: 14,
      username: "admin",
      realName: "系统管理员",
      mobile: "",
      email: null,
      no: "01001",
      avatar:
        "http://upload.bedebug.com/demo-opsli/20220519/165352554221087203SHWJE.jpg",
      remark: null,
      sign: "eeee",
      roles: ["001"],
      perms: [
        "system_dict_select",
        "system_dict_insert",
        "system_dict_update",
        "system_dict_delete",
        "devops_logs_select",
        "system_dict_setDict",
        "system_tenant_select",
        "system_tenant_insert",
        "system_tenant_update",
        "system_tenant_delete",
        "dev_generator_select",
        "dev_generator_insert",
        "dev_generator_update",
        "dev_generator_delete",
        "dev_generator_create",
        "dev_generator_sync",
        "dev_generator_import",
        "system_area_insert",
        "system_area_select",
        "system_area_update",
        "system_area_delete",
        "devops_sysmonitor_select",
        "system_options_update",
        "system_tenant_enable",
        "system_options_select",
        "system_options_insert",
        "system_options_delete",
        "dev_generator_createMenu",
        "generator_template_select",
        "generator_template_insert",
        "generator_template_update",
        "generator_template_delete",
        "generator_template_import",
        "generator_template_export",
        "generator_template_copy",
        "system_set_tenant_admin",
        "system_user_insert",
        "system_user_update",
        "system_user_delete",
        "system_user_updatePassword",
        "system_user_resetPassword",
        "system_user_enable",
        "system_user_setRole",
        "devops_login_logs_select",
      ],
      izSuperAdmin: false,
      passwordLevel: "2",
      tenantId: "0",
      enableSwitchTenant: "1",
      switchTenantId: null,
      switchTenantUserId: null,
      dataScope: "3",
    },
  });
  return request({
    url: "/api/v1/system/user/getInfo",
    method: "get",
    headers: {
      [tokenName]: accessToken,
    },
  });
}

export function getUserOrg(accessToken) {
  return request({
    url: "/api/v1/system/user/getOrg",
    method: "get",
    headers: {
      [tokenName]: accessToken,
    },
  });
}

export function logout() {
  return request({
    url: "/api/logout",
    method: "get",
  });
}

export function register() {
  return request({
    url: "/register",
    method: "post",
  });
}

export function captcha(uuid) {
  // 请求地址
  let url = "/captcha";
  let data = {
    uuid: uuid,
    timestamp: new Date().getTime(),
  };

  // 转换参数
  let params = Object.keys(data)
    .map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
    })
    .join("&");

  return baseURL + urlAddArgsByData(url, params);
}
