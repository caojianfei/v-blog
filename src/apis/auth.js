import http from "./client";

/**
 * 管理后台登录
 * @param param
 */
export function login(param) {
  const url = "/admin/login";
  return http.post(url, { email: param.email, password: param.password });
}
