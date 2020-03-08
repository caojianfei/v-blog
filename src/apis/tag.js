import http from "./client";

export function getTags(query = {}) {
  const url = "/admin/tags";
  return http.get(url, { params: query });
}

export function createTag(data) {
  const url = "/admin/tag";
  return http.post(url, data);
}

export function editTag(id, data) {
  const url = `/admin/tag/${id}`;
  return http.post(url, data);
}

export function deleteTag(id) {
  const url = `/admin/tag/${id}`;
  return http.delete(url);
}

export function showTag(id) {
  const url = `/admin/tag/${id}`;
  return http.get(url);
}
