<script>
import TableHeader from "./header.vue";
import TableFooter from "./footer.vue";
import TableMain from "./main.vue";
export default {
  name: "ComprehensiveTable",
  props: {
    fetch: Function,
    tableColumns: Array,
  },
  components: {
    TableHeader,
    TableFooter,
    TableMain,
  },
  data() {
    return {
      total: 0,
      dataSource: [],
      params: {
        search: "",
        page: 1,
        page_size: 20,
      },
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    updateParams(otherParams, resetPage) {
      const pageParams = {};
      if (resetPage) {
        pageParams.page = 1;
      }
      Object.assign(this.params, otherParams, pageParams);
      this.fetchData(pageParams);
    },
    fetchData() {
      this.fetch(this.params).then(({ code, data }) => {
        const { count, results } = data;
        this.total = count;
        this.dataSource = results || [];
      });
    },
    rowClick(row, event, column) {
      try {
        this.$emit("row-click", row, event, column);
      } catch {}
    },
  },
};
</script>

<style lang="scss" >
.cmdb-form {
  display: flex;
  flex-wrap: wrap;
  padding-right: 0;
  > div {
    flex: 0 0 50%;
    margin-right: 0;
    > div:last-child {
      margin-right: 24px;
    }
  }
}

.cmdb-dialog {
  > .el-dialog__body {
    max-height: 70vh;
    overflow: overlay;
  }
}
</style>

<template>
  <el-container style="height: 100%; background: #fff; padding: 16px 24px">
    <el-header height="auto" style="padding: 0">
      <table-header @updateParams="updateParams">
        <template #HeaderLeft>
          <slot name="HeaderLeft"></slot>
        </template>
      </table-header>
    </el-header>
    <el-main style="padding: 0">
      <table-main
        :tableColumns="tableColumns"
        :dataSource="dataSource"
        @row-click="rowClick"
      ></table-main>
    </el-main>
    <el-footer>
      <table-footer
        :page="params.page"
        :page_size="params.page_size"
        :total="total"
        @updateParams="updateParams"
      ></table-footer>
    </el-footer>
    <slot></slot>
  </el-container>
</template>


 