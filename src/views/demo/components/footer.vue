<template>
  <el-pagination
    :background="true"
    :current-page="page"
    layout="total, sizes, prev, pager, next, jumper"
    :page-size="page_size"
    :page-sizes="[10, 20, 50, 100]"
    :total="total"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
  ></el-pagination>
</template>

<script>
export default {
  name: "TableFooter",
  props: ["page", "page_size", "total"],
  methods: {
    handleCurrentChange(val) {
      this.$emit("updateParams", { page: val });
    },
    handleSizeChange(val) {
      this.$emit("updateParams", { page_size: val });
    },
  },
};
</script>