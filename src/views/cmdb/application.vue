<script>
import dayjs from "dayjs";
import {
  getApplication,
  postApplication,
  putApplication,
} from "@/api/cmdb/application";
import TablePage from "./components/tablePage.vue";
export default {
  name: "application",
  components: {
    TablePage,
  },
  data() {
    return {
      fetch: getApplication,
      tableColumns: [
        { label: "名称", columnName: "name", align: "center" },
        { label: "Developer", columnName: "developer", align: "center" },
        { label: "Http-Port", columnName: "http_port", align: "center" },
        {
          label: "Http_check_url",
          columnName: "http_check_url",
          align: "center",
        },
        {
          label: "Prometheus_url",
          columnName: "prometheus_url",
          align: "center",
        },
        { label: "Online", columnName: "status", align: "center" },
        { label: "Lb", columnName: "lb_status", align: "center" },
        {
          label: "Private",
          columnName: "private_cloud_status",
          align: "center",
        },
        { label: "Remark", columnName: "remark", align: "center" },
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
      submitFetch: postApplication,
      operationId: "",
      form: {
        name: "",
        developer: "",
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
        name: rowData.row.name,
        default_dingtalk_url: rowData.row.default_dingtalk_url,
      });
      this.submitFetch = putApplication;
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
        name: "",
        default_dingtalk_url: "",
      });
      this.submitFetch = postApplication;
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
      <!-- <el-form
        :model="form"
        ref="form"
        label-position="left"
        :rules="formRules"
        label-width="25%"
        @submit.native.prevent
      >
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="default_dingtalk_url" prop="default_dingtalk_url">
          <el-input v-model="form.default_dingtalk_url" placeholder="请输入" />
        </el-form-item>
      </el-form> -->
      <template #footer>
        <span>
          <el-button @click="toggleVisible">取消</el-button>
          <el-button type="primary" @click="sumbit">提交</el-button>
        </span>
      </template>
    </el-dialog>
  </table-page>
</template>


 