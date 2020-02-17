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
  <CustomerTable v-bind:dataOption="dataOption"></CustomerTable>
</template>

<script>
import CustomerTable from "../../../../components/pages/CustomerTable";
import Slot from "../../../../components/pages/Slot";

export default {
  components: {
    CustomerTable,
    // eslint-disable-next-line vue/no-unused-components
    Slot
  },
  data() {
    return {
      dataOption: {
        tableAttributes: {
          data: [
            {
              date: "2016-05-03",
              name: "王小虎",
              province: "上海",
              city: "普陀区",
              address: "上海市普陀区金沙江路 1518 弄",
              zip: 200333
            },
            {
              date: "2016-05-02",
              name: "王小虎",
              province: "上海",
              city: "普陀区",
              address: "上海市普陀区金沙江路 1518 弄",
              zip: 200333
            }
          ],
          border: true
        },
        tableColumnAttributes: [
          { prop: "date", label: "时间", solt: Slot },
          {
            prop: "name",
            label: "名字"
            //       solt: `<template slot-scope="scope">
            //   <el-popover trigger="hover" placement="top">
            //     <p>姓名: {{ scope.row.name }}</p>
            //     <p>住址: {{ scope.row.address }}</p>
            //     <div slot="reference" class="name-wrapper">
            //       <el-tag size="medium">{{ scope.row.name }}</el-tag>
            //     </div>
            //   </el-popover>
            // </template>`
          }
        ]
      },
      tableData: [
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-02",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-08",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-06",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        },
        {
          date: "2016-05-07",
          name: "王小虎",
          province: "上海",
          city: "普陀区",
          address: "上海市普陀区金沙江路 1518 弄",
          zip: 200333
        }
      ],
      formInline: {
        user: "",
        region: ""
      },
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4
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
