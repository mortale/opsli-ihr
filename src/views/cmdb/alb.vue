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
    <!-- <el-popover
      :popper-options="{ boundariesElement: 'viewport' }"
      :style="popoverPosition"
      :value="popoverShow"
      :width="600"
      trigger="manual"
    >
      <div
        style="
          display: flex;
          justify-content: space-around;
          align-items: center;
        "
      >
        <div>
          <span>{{ popoverContent.app }}：</span>
          <el-link type="success" :underline="false" :href="popoverContent.url">
            {{ popoverContent.url }}
          </el-link>
          <br />
          <span>hosts：</span>
          <el-link type="success" :underline="false">
            {{ popoverContent.hosts }}
          </el-link>
        </div>
        <input
          type="text"
          id="copy-container"
          style="width: 1px; height: 0; padding: 0; border: 0; flex: 0 0"
        />
        <el-button
          icon="el-icon-document-copy"
          type="text"
          @click="copyClick"
        ></el-button>
      </div>
    </el-popover> -->
    <table-page
      :tableColumns="tableColumns"
      :fetch="fetch"
      @row-click="rowClick"
    ></table-page>
  </div>
</template>


 