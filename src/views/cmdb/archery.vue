<script>
import dayjs from "dayjs";
import { getArchery } from "@/api/cmdb/archery";
import TablePage from "./components/tablePage.vue";
export default {
  name: "archery",
  components: {
    TablePage,
  },
  data() {
    return {
      fetch: getArchery,
      tableColumns: [
        { label: "地区", columnName: "zone", align: "center" },
        {
          label: "实例名称",
          columnName: "name",
          align: "center",
        },
        {
          label: "host",
          columnName: "host",
          align: "center",
        },
        { label: "库", columnName: "instance", align: "center" },
        { label: "跳转", columnName: "jump_to", align: "center" },
        {
          label: "创建日期",
          columnName: "created_date",
          formatter: (row, column, cellValue, index) =>
            dayjs(cellValue).format("YYYY-M-D HH:mm:ss"),
          align: "center",
        },
      ],
    };
  },
};
</script>

<template>
  <table-page :tableColumns="tableColumns" :fetch="fetch"></table-page>
</template>


 