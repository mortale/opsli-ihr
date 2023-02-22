<script>
import dayjs from "dayjs";
import { getAlb } from "@/api/cmdb/alb";
import TablePage from "./components/tablePage.vue";
export default {
  name: "alb",
  components: {
    TablePage,
  },
  data() {
    return {
      fetch: getAlb,
      tableColumns: [
        { label: "Zone", columnName: "zone", align: "center" },
        { label: "App", columnName: "app", align: "center" },
        { label: "listener_id", columnName: "listener_id", align: "center" },
        { label: "group_id", columnName: "group_id", align: "center" },
        {
          label: "Status",
          columnName: "current_status",
          formatter: (row, column, cellValue, index) => cellValue?.toString(),
          align: "center",
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
        {
          label: "操作",
          align: "center",
          type: "operator",
          operators: [ "edit","delete"],
        },
      ],
    };
  },
  methods: {
    editClick() {
      console.log('edit')
    },
    rowClick(row, column, event) {
    },
  },
};
</script>

<template>
  <div style="height: 100%">
    <table-page
      :tableColumns="tableColumns"
      :fetch="fetch"
      @row-click="rowClick"
    >
    <template #HeaderLeft>
      <el-button type="primary" @click="toggleVisible">创建</el-button>
    </template>
    </table-page>
  </div>
</template>


 