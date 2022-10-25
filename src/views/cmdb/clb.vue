<script>
import dayjs from "dayjs";
import { getClb } from "@/api/cmdb/clb";
import TablePage from "./components/tablePage.vue";
export default {
  name: "clb",
  components: {
    TablePage,
  },
  created() {
    const closePopover = () => {
      const result = !this.popoverShow;
      this.popoverShow = false;
      return result;
    };
    document.oncontextmenu = function (e) {
      return closePopover();
    };
  },
  data() {
    return {
      fetch: getClb,
      tableColumns: [
        // { label: "ID", columnName: "id" },
        { label: "Zone", columnName: "deployment.zone", align: "center" },
        { label: "App", columnName: "deployment.app", align: "center" },
        { label: "名称", columnName: "name", align: "center" },
        { label: "Host", columnName: "deployment.host", align: "center" },
        { label: "Port", columnName: "deployment.id" },
        {
          label: "Status",
          columnName: "status",
          align: "center",
          type: "tag",
          tagType(scope) {
            const { row } = scope;
            return row.status === "healthy" ? "success" : "danger";
          },
        },
        {
          label: "Current-status",
          columnName: "current_status",
          formatter: (row, column, cellValue, index) => cellValue && "Online",
        },
        {
          label: "创建日期",
          columnName: "created_date",
          formatter: (row, column, cellValue, index) =>
            dayjs(cellValue).format("YYYY-M-D HH:mm:ss"),
          align: "center",
        },
        {
          label: "修改日期",
          columnName: "modified_date",
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
  <div style="height: 100%">
    <table-page :tableColumns="tableColumns" :fetch="fetch"></table-page>
  </div>
</template>


 