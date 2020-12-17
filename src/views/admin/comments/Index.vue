<template>
  <el-card>
    <el-form :inline="true" :model="form" size="mini">
      <el-form-item label="评论名称">
        <el-input v-model="form.articleId" placeholder="" />
      </el-form-item>
      <el-form-item label="评论状态">
        <el-input v-model="form.state" placeholder="" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="onSubmit"
          >查询
        </el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="comments"
      style="width: 100%;"
      :border="false"
      size="medium"
      :fit="true"
      @cell-click="onCellClick"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="articleTitle" label="所属文章"></el-table-column>
      <el-table-column prop="nickname" label="评论人"></el-table-column>
      <el-table-column prop="email" label="email"></el-table-column>
      <el-table-column prop="state" label="状态"></el-table-column>
      <el-table-column
        prop="content"
        label="评论内容"
        min-width="200"
        :formatter="formatContent"
      >
        <template slot-scope="scope">
          <div v-html="formatContent(scope.row)"></div>
        </template>
      </el-table-column>
      <el-table-column prop="createAt" label="创建时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!--          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"-->
          <!--            >审核-->
          <!--          </el-button>-->
          &nbsp;
          <el-popconfirm
            title="确定删除该评论？"
            @onConfirm="handleDelete(scope.row)"
          >
            <el-button slot="reference" size="mini" type="danger"
              >删除
            </el-button>
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

    <el-dialog title="评论详情" :visible.sync="dialogVisible" width="30%">
      <div v-html="comment.html"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >驳回</el-button
        >
        <el-button type="primary" @click="dialogVisible = false"
          >通过</el-button
        >
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
import { auditComment, deleteComment, getComments } from "@/apis";

export default {
  name: "Comments",
  data() {
    return {
      comments: [],
      page: 1,
      pageSize: 10,
      total: 0,
      form: {
        state: "",
        articleId: 0
      },
      loading: false,
      comment: {},
      dialogVisible: false
    };
  },
  mounted() {
    console.log(auditComment);
    this.getComments();
  },
  methods: {
    onSubmit() {
      this.getComments();
    },
    onCellClick(row) {
      row.html = this.$markDown.render(row.content);
      this.comment = row;
      this.dialogVisible = true;
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getComments();
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getComments();
    },
    handleDelete(row) {
      deleteComment(row.id)
        .then(res => {
          const { code, message } = res;
          if (code !== 0) {
            this.$message.error(message || "删除失败");
          } else {
            this.$message.success("删除成功");
            this.getTags({});
          }
        })
        .catch(() => {
          this.$message.error("操作失败");
        });
    },
    getComments() {
      this.loading = true;
      let query = {};
      const {
        page,
        pageSize,
        form: { articleId, state }
      } = this;
      query.page = page;
      query.pageSize = pageSize;
      if (articleId > 0) {
        query.articleId = articleId;
      }
      if (state === 0 || state === 1) {
        query.state = state;
      }
      getComments(query)
        .then(res => {
          // console.log(res);
          const { code, message, data } = res;
          if (code !== 0) {
            this.$message.error(message || "评论列表获取失败");
            return;
          }
          const { list, page, pageSize, total } = data;
          this.comments = list;
          this.page = page;
          this.pageSize = pageSize;
          this.total = total;
        })
        .catch(err => {
          console.log(err);
          this.$message.error("请求出错啦");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    formatContent(row) {
      const content = row.content.substring(0, 50);
      return this.$markDown.render(content);
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
