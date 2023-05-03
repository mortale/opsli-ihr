<script>
import Render from "./render.js";
export default {
  name: "TableMain",
  components: { Render },
  props: {
    dataSource: Array,
    tableColumns: Array,
    rowOperators: Array,
    customOperators: Object,
  },
  data() {
    const defaultOperators = {
      edit: {
        click: this.editClick,
      },
      delete: {
        type: "danger",
        click: this.deleteClick,
      },
    };
    const innerOperators = Object.assign(
      {},
      defaultOperators,
      this.customOperators
    );
    return {
      innerOperators,
    };
  },
  methods: {
    // 行点击事件
    rowClick(row, event, column) {
      this.$emit("row-click", row, event, column);
    },
    // 单条数据编辑事件
    editClick(row, event, column) {
      this.$emit("row-edit", row, event, column);
    },
    // 单条数据删除事件
    deleteClick(row, event, column) {
      this.$emit("row-delete", row, event, column);
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
          v-if="item.type === 'tag'"
          :prop="item.columnName"
          :key="item.columnName"
          :label="item.label"
          :formatter="item.formatter"
          :align="item.align"
          :min-width="item.minWidth || '150px'"
        >
          <template slot-scope="scope">
            <el-tag :type="item.tagType(scope)">
              {{ scope.row[item.columnName] }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
          v-else-if="item.type === 'slots'"
          :prop="item.columnName"
          :key="item.columnName"
          :label="item.label"
          :formatter="item.formatter"
          :align="item.align"
          :min-width="item.minWidth || '150px'"
        >
          <template v-if="item.render" slot-scope="scope">
            <Render :column="item" :row="scope.row" :index="scope.$index" :render="item.render"></Render>
          </template>
          <template v-else slot-scope="scope">
            {{ scope.row[item.columnName] }}
          </template>
        </el-table-column>

        <el-table-column
          v-else
          :prop="item.columnName"
          :key="item.columnName"
          :label="item.label"
          :formatter="item.formatter"
          :align="item.align"
          :min-width="item.minWidth || '150px'"
        ></el-table-column>
      </template>

      <template v-if="rowOperators.length">
        <el-table-column
          prop="operator"
          key="operator"
          label="操作"
          align="center"
          fixed="right"
        >
          <template slot-scope="scope">
            <el-button
              v-for="btn in rowOperators"
              :key="btn"
              type="text"
              @click="innerOperators[btn].click(scope)"
            >
              <el-link
                :underline="false"
                :type="innerOperators[btn].type || 'primary'"
                :icon="'el-icon-' + btn"
              ></el-link>
            </el-button>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
