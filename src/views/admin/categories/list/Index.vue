<template>
  <!--  <el-card class="box-card">-->
  <!--    <div class="searchForm">-->
  <!--      <el-form :inline="true" :model="formInline">-->
  <!--        <el-form-item label="分类名称">-->
  <!--          <el-input v-model="formInline.user" placeholder="分类名称"></el-input>-->
  <!--        </el-form-item>-->
  <!--        <el-form-item>-->
  <!--          <el-button type="primary" @click="onSubmit">查询</el-button>-->
  <!--        </el-form-item>-->
  <!--      </el-form>-->
  <!--    </div>-->
  <!--    <div class="listTable">-->
  <!--      <el-table-->
  <!--        :data="tableData"-->
  <!--        style="width: 100%;"-->
  <!--        :border="true"-->
  <!--        size="medium"-->
  <!--        :fit="true"-->
  <!--      >-->
  <!--        <el-table-column fixed prop="id" label="ID"> </el-table-column>-->
  <!--        <el-table-column prop="name" label="分类名称"></el-table-column>-->
  <!--        <el-table-column prop="description" label="分类描述"> </el-table-column>-->
  <!--        <el-table-column prop="createdAt" label="创建时间"></el-table-column>-->
  <!--        <el-table-column prop="updatedAt" label="更新时间"> </el-table-column>-->
  <!--        <el-table-column label="操作">-->
  <!--          <template slot-scope="scope">-->
  <!--            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"-->
  <!--              >编辑</el-button-->
  <!--            >-->
  <!--            <el-button-->
  <!--              size="mini"-->
  <!--              type="danger"-->
  <!--              @click="handleDelete(scope.$index, scope.row)"-->
  <!--              >删除</el-button-->
  <!--            >-->
  <!--          </template>-->
  <!--        </el-table-column>-->
  <!--      </el-table>-->
  <!--    </div>-->
  <!--    <div class="tablePagination">-->
  <!--      <el-pagination-->
  <!--        style=""-->
  <!--        @size-change="handleSizeChange"-->
  <!--        @current-change="handleCurrentChange"-->
  <!--        :current-page="currentPage4"-->
  <!--        :page-sizes="[100, 200, 300, 400]"-->
  <!--        :page-size="100"-->
  <!--        layout="total, sizes, prev, pager, next, jumper"-->
  <!--        :total="400"-->
  <!--      >-->
  <!--      </el-pagination>-->
  <!--    </div>-->
  <!--  </el-card>-->
  <CustomerTable v-bind:table="table"></CustomerTable>
</template>

<script>
import CustomerTable from "../../../../components/pages/CustomerTable";

export default {
  components: {
    CustomerTable
  },
  data() {
    return {
      table: {
        tableProps: {
          border: true
        },
        columnsProps: [
          { prop: "id", label: "ID" },
          {
            prop: "name",
            label: "名字"
          },
          {
            label: "操作",
            render: (h, { row }) => {
              return (
                <el-button onclick={() => this.onEdit(row)}>编辑</el-button>
              );
            },
            renderHeader: (h, { row }) => {
              console.log(row);
              return <input />;
            }
          }
        ]
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    onEdit(e) {
      console.log("onEdit", e.id);
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
