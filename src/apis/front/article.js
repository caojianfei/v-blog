import http from "../client";

export function getArticleList(param) {
  const { category, tag, title, page, pageSize } = param;
  let query = {};
  if (category > 0) {
    query.category = category;
  }
  if (tag > 0) {
    query.tag = tag;
  }
  if (title !== "" && title !== undefined && title !== null) {
    query.title = title;
  }
  query.page = page > 0 || 1;
  query.pageSize = pageSize > 0 || 10;

  return http.get("/articles", { params: param });
}

export function getArticleInfo(id) {
  return http.get(`/article/${id}`);
}

export function getArticleCommentList(articleId) {
  return http.get("/comments", {
    params: {
      articleId
    }
  });
}

export function addArticleComment(body) {
  return http.post("/comment", body);
}
