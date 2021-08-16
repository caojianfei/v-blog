import axios from "axios";
import http from "./client";

export function getFormApiAuth(query = {}) {
  const url = "/admin/upyun/formapi";
  return http.get(url, { params: query });
}

export function uploadImage(formData, bucket) {
  const url = "https://v0.api.upyun.com/" + bucket;
  return axios.post(url, formData);
}
