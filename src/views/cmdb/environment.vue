<script>
import dayjs from "dayjs";
import {
  getEnvironment,
  postEnvironment,
  putEnvironment,
} from "@/api/cmdb/environment";
import TablePage from "./components/tablePage.vue";
export default {
  name: "environment",
  components: {
    TablePage,
  },
  data() {
    return {
      fetch: getEnvironment,
      tableColumns: [
        { label: "名称", columnName: "name", align: "center" },
        {
          label: "创建日期",
          columnName: "created_date",
          formatter: (row, column, cellValue, index) =>
            dayjs(cellValue).format("YYYY-M-D HH:mm:ss"),
          align: "center",
        },
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
      submitFetch: postEnvironment,
      operationId: "",
      form: {
        name: "",
        default_dingtalk_url: "",
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
      this.submitFetch = putEnvironment;
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
      this.submitFetch = postEnvironment;
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
        label-width="25%"
        @submit.native.prevent
      >
        <el-form-item label="名字" prop="name">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="default_dingtalk_url" prop="default_dingtalk_url">
          <el-input v-model="form.default_dingtalk_url" placeholder="请输入" />
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


 