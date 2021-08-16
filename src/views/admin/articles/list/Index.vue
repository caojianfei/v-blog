<template>
  <el-card>
    <el-form :inline="true" :model="form" size="mini">
      <el-form-item label="分类">
        <el-select
          v-model="form.categoryId"
          filterable
          clearable
          reserve-keyword
          placeholder="输入关键字搜索分类"
          :loading="loading"
        >
          <el-option
            v-for="item in categories"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="form.title" placeholder="文章标题" />
      </el-form-item>
      <el-form-item label="类型">
        <el-select v-model="form.type" placeholder="请选择文章类型">
          <el-option label="全部" value="all"></el-option>
          <el-option label="已发布" value="published"></el-option>
          <el-option label="草稿" value="draft"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="onSubmit"
          >查询</el-button
        >
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-plus" type="danger" @click="handleCreate"
          >添加</el-button
        >
      </el-form-item>
    </el-form>

    <el-table
      v-loading="listLoading"
      :data="articles"
      style="width: 100%;"
      :border="false"
      size="medium"
      :fit="true"
    >
      <el-table-column prop="id" width="50" label="ID"> </el-table-column>
      <el-table-column prop="title" label="文章标题">
        <template slot-scope="scope">
          <router-link
            target="_blank"
            style="text-decoration:none;color:#00BCD4;"
            :to="`/post/${scope.row.id}?preview=1`"
            >{{ scope.row.title }}</router-link
          >
        </template>
      </el-table-column>
      <el-table-column
        prop="category.name"
        width="80"
        label="文章分类"
      ></el-table-column>
      <el-table-column prop="isDraft" width="80" label="是否发布">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.isDraft === 0" size="mini" type="success"
            >是</el-tag
          >
          <el-tag v-else size="mini" type="warning">否</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="publishedAt" label="发布时间"> </el-table-column>
      <el-table-column prop="createdAt" label="创建时间"> </el-table-column>
      <el-table-column prop="updatedAt" label="更新时间"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="() => handleUpdate(scope.row.id)"
            >编辑</el-button
          >
          &nbsp;
          <el-popconfirm
            title="确定删除该文章？"
            @confirm="handleDelete(scope.row.id)"
          >
            <el-button slot="reference" size="mini" type="danger"
              >删除</el-button
            >
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      class="tablePagination"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[5, 10, 15, 20, 25]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :pager-count="5"
      :hide-on-single-page="false"
      background
    >
    </el-pagination>
  </el-card>
</template>

<script>
import { searchCategories, getArticles, deleteArticle } from "../../../../apis";
export default {
  name: "Index",
  data() {
    return {
      categories: [],
      loading: false,
      form: {
        categoryId: "",
        title: "",
        type: "all"
      },
      listLoading: false,
      articles: [],
      page: 1,
      pageSize: 10,
      total: 0
    };
  },
  mounted() {
    this.getArticles();
    this.searchCategories();
  },
  methods: {
    searchCategories(query) {
      this.loading = true;
      searchCategories(query)
        .then(res => {
          const {
            code,
            data: { list }
          } = res;
          if (code === 0) {
            this.categories = list ?? [];
          }
        })
        .finally(() => (this.loading = false));
    },
    onSubmit() {
      this.getArticles();
    },
    handleCreate() {
      this.$router.push("articles/create");
    },
    handleUpdate(id) {
      this.$router.push("articles/update/" + id);
    },
    handleDelete(id) {
      deleteArticle(id).then(res => {
        const { code, message } = res;
        if (code !== 0) {
          this.$message.error(message);
        } else {
          this.$message.success("文章删除成功");
          this.getArticles();
        }
      });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getArticles();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getArticles({});
    },
    getArticles() {
      const query = this.formatQueryParam();
      let param = {};
      const { categoryId, title, isDraft, page, pageSize } = query;
      if (categoryId > 0) {
        param.categoryId = categoryId;
      }
      if (title !== undefined && title !== null && title.length > 0) {
        param.title = title;
      }
      if (isDraft === 0 || isDraft === 1) {
        param.isDraft = isDraft;
      }
      if (page > 0) {
        param.page = page;
      }
      if (pageSize > 0) {
        param.pageSize = pageSize;
      }
      getArticles(param)
        .then(res => {
          const { code, data } = res;
          if (code === 0) {
            const { list, page, pageSize, total } = data;
            this.articles = list;
            this.page = page;
            this.pageSize = pageSize;
            this.total = total;
          }
        })
        .finally(() => (this.listLoading = false));
    },
    formatQueryParam() {
      const { categoryId, title, type } = this.form;
      let param = {};
      if (categoryId > 0) {
        param.categoryId = categoryId;
      }
      if (title !== undefined && title.length > 0) {
        param.title = title;
      }
      if (type === "published" || type === "draft") {
        param.isDraft = type === "published" ? 0 : 1;
      }
      param.page = this.page;
      param.pageSize = this.pageSize;
      return param;
    },
    viewArticle(id) {
      this.$router.push(`/post/${id}`);
    }
  }
};
</script>

<style scoped>
.tablePagination {
  width: 100%;
  text-align: center;
  margin-top: 10px;
}
</style>
