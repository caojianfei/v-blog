<script>
export default {
  name: "CustomerTable",
  props: {
    table: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      list: [
        { id: 1, name: "小王" },
        { id: 2, name: "小刘" }
      ]
    };
  },
  render(h) {
    const {
      table: { tableProps, columnsProps },
      list
    } = this;

    console.log("tableProps", tableProps);

    const elTableProps = {
      props: { ...tableProps, data: list }
    };

    return (
      <el-table {...elTableProps}>
        {columnsProps.map(column => {
          const props = { ...column };
          const scopedSlots = {};
          if (typeof column.render === "function") {
            scopedSlots.default = scope => column.render(h, scope);
          }
          if (typeof column.renderHeader === "function") {
            scopedSlots.header = scope => column.renderHeader(h, scope);
          }
          const columnProps = {
            props,
            scopedSlots
          };
          return <el-table-column {...columnProps} />;
        })}
      </el-table>
    );
  }
};
</script>
