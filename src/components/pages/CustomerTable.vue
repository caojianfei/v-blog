<template>
  <div>
    <h1>fasdfd</h1>
    <el-card>
      <div class="tableContainer">
        <el-table v-bind="dataOption.tableAttributes">
          <el-table-column
            v-for="(column, index) in dataOption.tableColumnAttributes"
            v-bind="column"
            v-bind:key="index"
          >
            <template slot-scope="scope">
              <component
                v-if="column.solt !== undefined"
                :is="column.solt"
                :scope="scope"
              ></component>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "CustomerTable",
  props: {
    filter: {
      type: Object,
      default: function() {
        return {};
      }
    },
    dataOption: {
      type: Object,
      required: true
    } // {tableAttributes: {}, tableColumnAttributes: {}}
  },
  created() {
    console.log(this.dataOption);
  }
};
</script>

<style scoped></style>
