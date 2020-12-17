import http from "./client";

export function getComments(query = {}) {
  const url = "/admin/comments";
  return http.get(url, { params: query });
}

export function auditComment(id, state) {
  const url = `/admin/comment/${id}?state=${state}`;
  return http.put(url);
}

export function deleteComment(id) {
  const url = `/admin/comment/${id}`;
  return http.delete(url);
}
