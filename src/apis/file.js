import http from "./client";

export function uploadImages(data) {
  const url = "/files/image";
  return http.post(url, data);
}
