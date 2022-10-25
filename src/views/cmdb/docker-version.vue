<script>
import dayjs from "dayjs";
import { getDockerVersion } from "@/api/cmdb/docker-version";
import TablePage from "./components/tablePage.vue";
export default {
  name: "docker-version",
  components: {
    TablePage,
  },
  data() {
    return {
      fetch: getDockerVersion,
      tableColumns: [
        { label: "App", columnName: "app", align: "center" },
        { label: "Cloud", columnName: "env", align: "center" },
        { label: "Host", columnName: "host", align: "center" },
        {
          label: "Version",
          columnName: "version",
          align: "center",
        },
        {
          label: "	修改日期",
          columnName: "modified_date",
          formatter: (row, column, cellValue, index) =>
            dayjs(cellValue).format("YYYY-M-D HH:mm:ss"),
          align: "center",
        },
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


 