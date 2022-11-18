<script>
import dayjs from "dayjs";
import { getAlb } from "@/api/cmdb/alb";
import TablePage from "./components/tablePage.vue";
export default {
  name: "alb",
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
      popoverPosition: {
        position: "fixed",
        "z-index": 100,
        top: "100px",
        left: "100px",
      },
      popoverContent: {},
      popoverShow: false,
      fetch: getAlb,
      tableColumns: [
        // { label: "ID", columnName: "id" },
        { label: "Zone", columnName: "zone", align: "center" },
        { label: "App", columnName: "app", align: "center" },
        { label: "listener_id", columnName: "listener_id", align: "center" },
        { label: "group_id", columnName: "group_id", align: "center" },
        // {label:"Port",columnName:"id"},
        {
          label: "Status",
          columnName: "current_status",
          formatter: (row, column, cellValue, index) => cellValue?.toString(),
          align: "center",
        },
        // {label:"Console",columnName:"id"},
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
    rowClick(row, column, event) {
      this.popoverContent = {
        ...row,
        hosts: row.deployments.map((el) => el.host).toString(),
      };
      const x = event.clientX > 600 ? event.clientX - 600 : event.clientX;
      this.popoverPosition.top = event.clientY + "px";
      this.popoverPosition.left = x + "px";
      if (!this.popoverShow) {
        this.popoverShow = true;
      }
    },
    copyClick() {
      const inputTest = document.getElementById("copy-container");
      inputTest.value = this.popoverContent.url;
      inputTest.select();
      try {
        document.execCommand("copy");
      } catch (error) {
        console.log(error);
      }
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
    ></table-page>
  </div>
</template>


 