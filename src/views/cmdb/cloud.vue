<script>
import dayjs from "dayjs";
import { getCloud, postCloud,putCloud,deleteCloud } from "@/api/cmdb/cloud";
import TablePage from "./components/tablePage.vue";
export default {
  name: "cloud",
  components: {
    TablePage,
  },
  data() {
    return {
      operators: ["create", "edit", "delete"],
      fetch: getCloud,
      tableColumns: [
        { label: "名称", columnName: "name", align: "center" },
        {
          label: "更新日期",
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
      schema: {
        type: "object",
        properties: {
          name: {
            "x-component": "Input",
            "x-decorator": "FormItem",
            title: "name",
          },
        },
      },
    };
  },
  methods: {
    createHandle: (data,callback) => {
      const result =  postCloud(data)
      callback(result);
    },
    editHandle: (data, callback) => {
      const result = putCloud(data)
      callback(result);
    },
    rowDelete: (row, event, column, callback) => {
      const result = deleteCloud(row.row.id)
      callback(result);
    },
  },
};
</script>

<template>
  <table-page 
  :operators="operators"
  :tableColumns="tableColumns" 
  :fetch="fetch"
  :schema="schema"
  @create-handle="createHandle"
  @edit-handle="editHandle"
  @row-delete="rowDelete"
  >
  </table-page>
</template>


 