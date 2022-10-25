<script>
export default {
  name: "TableMain",
  props: {
    dataSource: Array,
    tableColumns: Array,
  },
  methods: {
    rowClick(row, event, column) {
      this.$emit("row-click", row, event, column);
    },
  },
};
</script>

<style lang="scss" scoped>
.cmdb-table {
  ::v-deep .el-table__fixed-right {
    height: 100% !important;
  }
}
</style>

<template>
  <div style="height: 100%">
    <el-table
      class="cmdb-table"
      :data="dataSource"
      height="100%"
      @row-click="rowClick"
    >
      <template v-for="item in tableColumns">
        <el-table-column
          v-if="item.type === 'operator'"
          :prop="item.columnName"
          :key="item.columnName"
          :label="item.label"
          :align="item.align"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              v-for="btn in item.operators"
              :key="btn.key"
              :type="btn.type"
              @click="btn.click(scope)"
            >
              {{ btn.text }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column
          v-if="item.type === 'tag'"
          :prop="item.columnName"
          :key="item.columnName"
          :label="item.label"
          :formatter="item.formatter"
          :align="item.align"
          min-width="150px"
        >
          <template slot-scope="scope">
            <el-tag :type="item.tagType(scope)">
              {{ scope.row[item.columnName] }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-else
          :prop="item.columnName"
          :key="item.columnName"
          :label="item.label"
          :formatter="item.formatter"
          :align="item.align"
          min-width="150px"
        ></el-table-column>
      </template>
    </el-table>
  </div>
</template>

