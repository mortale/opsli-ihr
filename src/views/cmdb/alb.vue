<script>
import dayjs from "dayjs";
import { getAlb,postAlb,putAlb, deleteAlb } from "@/api/cmdb/alb";
import TablePage from "./components/tablePage.vue";
export default {
  name: "alb",
  components: {
    TablePage,
  },
  data() {
    return {
      schema: {
        type: "object",
        properties: {
          input: {
            "x-component": "Input",
            "x-decorator": "FormItem",
            title: "input",
          },
        },
      },
      operators: ["create", 'refersh', "edit", "delete"],
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
      ],
    };
  },
  methods: {
    createHandle: (data,callback) => {
      const result =  postAlb(data)
      callback(result);
    },
    editHandle: (data, callback) => {
      const result = putAlb(data)
      callback(result);
    },
    rowDelete: (row, event, column, callback) => {
      const result = deleteAlb(row.row.id)
      callback(result);
    },
  },
};
</script>

<template>
  <div style="height: 100%">
    <table-page
      :operators="operators"
      :tableColumns="tableColumns"
      :fetch="fetch"
      :schema="schema"
      @create-handle="createHandle"
      @edit-handle="editHandle"
      @row-delete="rowDelete"
    ></table-page>
  </div>
</template>


 