<script>
import dayjs from "dayjs";
import {
  getDeployment,
  postDeployment,
  putDeployment,
} from "@/api/cmdb/deployment";
import TablePage from "./components/tablePage.vue";
export default {
  name: "deployment",
  components: {
    TablePage,
  },
  data() {
    return {
      fetch: getDeployment,
      tableColumns: [
        { label: "ID", columnName: "id", align: "center" },
        { label: "App", columnName: "app", align: "center" },
        { label: "Env", columnName: "environment", align: "center" },
        { label: "Zone", columnName: "zone", align: "center" },
        { label: "Cloud", columnName: "cloud", align: "center" },
        // { label: "Host", columnName: "id", align: "center" },
        { label: "Hostname", columnName: "host", align: "center" },
        // { label: "	Http-Port", columnName: "host", align: "center" },
        // {
        //   label: "创建日期",
        //   columnName: "created_date",
        //   formatter: (row, column, cellValue, index) =>
        //     dayjs(cellValue).format("YYYY-M-D HH:mm:ss"),
        //   align: "center",
        // },
        {
          label: "操作",
          align: "center",
          type: "operator",
          operators: [
            { key: "edit", type: "text", text: "修改", click: this.editClick },
          ],
        },
      ],
      dialogTitle: "创建",
      visible: false,
      isLoading: false,
      submitFetch: postDeployment,
      operationId: "",
      form: {
        app: "",
        environment: "",
        zone: "",
        cloud: "",
        host: "",
      },
      formRules: {
        // name: [{ required: true, message: "该字段必填", trigger: "blur" }],
        // default_dingtalk_url: [
        //   { required: true, message: "该字段必填", trigger: "blur" },
        // ],
      },
    };
  },
  methods: {
    editClick(rowData) {
      this.dialogTitle = "修改";
      Object.assign(this.form, {
        app: rowData.row.app,
        environment: rowData.row.environment,
        zone: rowData.row.zone,
        cloud: rowData.row.cloud,
        host: rowData.row.host,
      });
      this.submitFetch = putDeployment;
      this.toggleVisible();
    },
    toggleVisible() {
      this.visible = !this.visible;
    },
    async sumbit() {
      const result = await this.$refs.form.validate();
      if (result) {
        this.submitFetch(this.form, this.operationId).then((res) => {
          if (res.code === 200) {
            this.toggleVisible();
          }
        });
      }
    },
    closed() {
      this.dialogTitle = "创建";
      Object.assign(this.form, {
        app: "",
        environment: "",
        zone: "",
        cloud: "",
        host: "",
      });
      this.submitFetch = postDeployment;
    },
  },
};
</script>

<template>
  <table-page :tableColumns="tableColumns" :fetch="fetch">
    <template #HeaderLeft>
      <el-button type="primary" @click="toggleVisible">创建</el-button>
    </template>
    <el-dialog :title="dialogTitle" :visible.sync="visible" @closed="closed">
      <el-form
        :model="form"
        ref="form"
        label-position="left"
        :rules="formRules"
        label-width="20%"
        @submit.native.prevent
      >
        <el-form-item label="App" prop="app">
          <el-input v-model="form.app" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Environment" prop="environment">
          <el-input v-model="form.environment" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Zone" prop="zone">
          <el-input v-model="form.zone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Cloud" prop="cloud">
          <el-input v-model="form.cloud" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Host" prop="host">
          <el-input v-model="form.host" placeholder="请输入" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="toggleVisible">取消</el-button>
          <el-button type="primary" @click="sumbit">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </table-page>
</template>


 