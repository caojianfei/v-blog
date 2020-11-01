import http from "./client";

export function getArticles(query = {}) {
  const url = "/admin/articles";
  return http.get(url, { params: query });
}

export function createArticle(data) {
  const url = "/admin/article";
  return http.post(url, data);
}

export function editArticle(id, data) {
  const url = `/admin/article/${id}`;
  return http.post(url, data);
}

export function deleteArticle(id) {
  const url = `/admin/article/${id}`;
  return http.delete(url);
}

export function showArticle(id) {
  const url = `/admin/article/${id}`;
  return http.get(url);
}
