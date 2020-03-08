import http from "./client";

export function getArticles(query = {}) {
  const url = "/admin/articles";
  return http.get(url, { params: query });
}

export function createTag(data) {
  const url = "/admin/article";
  return http.post(url, data);
}

export function editTag(id, data) {
  const url = `/admin/article/${id}`;
  return http.post(url, data);
}

export function deleteTag(id) {
  const url = `/admin/article/${id}`;
  return http.delete(url);
}

export function showTag(id) {
  const url = `/admin/article/${id}`;
  return http.get(url);
}
