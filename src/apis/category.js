import http from "./client";

export function getCategories(query = {}) {
  const url = "/admin/categories";
  return http.get(url, { params: query });
}

export function createCategory(data) {
  const url = "/admin/category";
  return http.post(url, data);
}

export function showCategory(id) {
  const url = `/admin/category/${id}`;
  return http.get(url);
}

export function editCategory(id, data) {
  const url = `/admin/category/${id}`;
  return http.post(url, data);
}

export function deleteCategory(id) {
  const url = `/admin/category/${id}`;
  return http.delete(url);
}

export function searchCategories(name) {
  const url = `/admin/categories/search`;
  return http.get(url, { params: { title: name } });
}
