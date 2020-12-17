<template>
  <el-card>
    <el-form :inline="true" :model="form" size="mini">
      <el-form-item label="分类名称">
        <el-input v-model="form.name" placeholder="分类名称" />
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-search" type="primary" @click="onSubmit"
          >查询
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button icon="el-icon-plus" type="danger" @click="handleCreate"
          >添加
        </el-button>
      </el-form-item>
    </el-form>

    <el-table
      v-loading="loading"
      :data="categories"
      style="width: 100%;"
      :border="false"
      size="medium"
      :fit="true"
    >
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="标签名称"></el-table-column>
      <el-table-column prop="description" label="标签描述"></el-table-column>
      <el-table-column prop="createdAt" label="创建时间"></el-table-column>
      <el-table-column prop="updatedAt" label="更新时间"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑
          </el-button>
          &nbsp;
          <el-popconfirm
            title="确定删除该标签？"
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
    <el-dialog :title="dialog.title" :visible.sync="dialog.visible">
      <el-form
        :model="dialog.form"
        :rules="dialog.rules"
        ref="editForm"
        label-width="100"
      >
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="dialog.form.name"></el-input>
        </el-form-item>
        <el-form-item label="标签描述" prop="description">
          <el-input type="textarea" :rows="2" v-model="dialog.form.description">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="submitEdit('editForm')"
          >确 定
        </el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
import { getTags, deleteTag, editTag, createTag } from "../../../apis";

export default {
  name: "Tags",
  data() {
    return {
      categories: [],
      page: 1,
      pageSize: 10,
      total: 0,
      form: {
        name: ""
      },
      loading: false,
      dialog: {
        visible: false,
        title: "",
        form: {
          id: 0,
          name: "",
          description: ""
        },
        rules: {
          name: [
            { required: true, message: "请输入分类名称", trigger: "blur" }
          ],
          description: [
            { required: true, message: "请输入分类描述", trigger: "blur" }
          ]
        }
      }
    };
  },
  mounted() {
    this.getTags({});
  },
  methods: {
    onSubmit() {
      this.getTags({ name: this.form.name });
    },
    handleSizeChange(val) {
      this.pageSize = val;
      this.getTags({});
    },
    handleCurrentChange(val) {
      this.page = val;
      this.getTags({});
    },
    handleEdit(index, row) {
      this.dialog.visible = true;
      this.dialog.title = "编辑标签";
      this.dialog.form.name = row.name;
      this.dialog.form.id = row.id;
      this.dialog.form.description = row.description;
    },
    handleCreate() {
      this.dialog.visible = true;
      this.dialog.form.id = 0;
      this.dialog.form.name = "";
      this.dialog.form.description = "";
    },
    handleDelete(row) {
      deleteTag(row.id)
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
    submitEdit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const {
            dialog: {
              form: { id, name, description }
            }
          } = this;
          let result, actionName;
          if (id > 0) {
            actionName = "修改";
            result = editTag(id, { name, description });
          } else {
            actionName = "添加";
            result = createTag({ name, description });
          }
          result
            .then(res => {
              const { code, message } = res;
              if (code !== 0) {
                this.$message.error(message || actionName + "失败");
              } else {
                this.$message.success(actionName + "成功");
                this.getTags({});
                this.dialog.visible = false;
              }
            })
            .catch(() => {
              this.$message.error("操作失败");
            });
        } else {
          return false;
        }
      });
    },
    getTags(query) {
      this.loading = true;
      const { page, pageSize } = this;
      query.page = page;
      query.pageSize = pageSize;
      getTags(query)
        .then(res => {
          // console.log(res);
          const { code, message, data } = res;
          if (code !== 0) {
            this.$message.error(message || "标签列表获取失败");
            return;
          }
          const { list, page, pageSize, total } = data;
          this.categories = list;
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
