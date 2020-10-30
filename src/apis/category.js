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
  if (name === "" || name === undefined || name === null) {
    throw new Error("名称不能为空");
  }

  const url = `/admin/categories/${name}`;
  return http.get(url);
}
