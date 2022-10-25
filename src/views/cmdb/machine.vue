<script>
import dayjs from "dayjs";
import { getMachine, postMachine, putMachine } from "@/api/cmdb/machine";
import TablePage from "./components/tablePage.vue";
export default {
  name: "machine",
  components: {
    TablePage,
  },
  data() {
    return {
      fetch: getMachine,
      tableColumns: [
        { label: "Console_ip", columnName: "console_ip", align: "center" },
        {
          label: "PrivateIpAddress",
          columnName: "privateipaddress",
          align: "center",
        },
        {
          label: "PublicIpAddress",
          columnName: "publicipaddress",
          align: "center",
        },
        { label: "cpu", columnName: "cpu", align: "center" },
        { label: "memory", columnName: "memory", align: "center" },
        { label: "disk", columnName: "disk", align: "center" },
        { label: "os", columnName: "os", align: "center" },
        { label: "os-version", columnName: "os_version", align: "center" },
        { label: "hostname", columnName: "hostname", align: "center" },
        { label: "zone", columnName: "zone", align: "center" },
        { label: "env", columnName: "environment", align: "center" },
        { label: "tag", columnName: "tag", align: "center" },
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
      submitFetch: postMachine,
      operationId: "",
      form: {
        console_ip: "",
        ipaddress: [],
        publicipaddress: [],
        privateipaddress: [],
        cpu: 0,
        memory: 0,
        disk: "",
        os: "",
        os_version: "",
        hostname: "",
        zone: "",
        environment: "",
        tag: "",
        status: "",
      },
      formRules: {
        name: [{ required: true, message: "该字段必填", trigger: "blur" }],
        default_dingtalk_url: [
          { required: true, message: "该字段必填", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    editClick(rowData) {
      this.dialogTitle = "修改";
      const { url, created_date, modified_date, machine_id, ...other } =
        rowData.row;
      Object.assign(this.form, other);
      this.submitFetch = putMachine;
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
      this.submitFetch = postMachine;
    },
  },
};
</script>

<template>
  <table-page :tableColumns="tableColumns" :fetch="fetch">
    <template #HeaderLeft>
      <el-button type="primary" @click="toggleVisible">创建</el-button>
    </template>
    <el-dialog
      width="70%"
      :title="dialogTitle"
      :visible.sync="visible"
      @closed="closed"
    >
      <el-form
        :model="form"
        ref="form"
        label-position="right"
        :rules="formRules"
        label-width="auto"
        @submit.native.prevent
        class="cmdb-form"
      >
        <el-form-item label="Console ip" prop="console_ip">
          <el-input v-model="form.console_ip" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Ipaddress" prop="ipaddress">
          <el-select
            v-model="form.ipaddress"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入"
            style="width: 100%"
          ></el-select>
        </el-form-item>
        <el-form-item label="Publicipaddress" prop="publicipaddress">
          <el-select
            v-model="form.publicipaddress"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入"
            style="width: 100%"
          ></el-select>
        </el-form-item>
        <el-form-item label="Privateipaddress" prop="privateipaddress">
          <el-select
            v-model="form.privateipaddress"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入"
            style="width: 100%"
          ></el-select>
        </el-form-item>
        <el-form-item label="cpu" prop="cpu">
          <el-input v-model="form.cpu" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="内存" prop="memory">
          <el-input v-model="form.memory" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="disk" prop="disk">
          <el-input v-model="form.disk" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="os" prop="os">
          <el-input v-model="form.os" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="os_version" prop="os_version">
          <el-input v-model="form.os_version" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="主机名" prop="hostname">
          <el-input v-model="form.hostname" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Zone" prop="zone">
          <el-input v-model="form.zone" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Environment" prop="environment">
          <el-input v-model="form.environment" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="标签" prop="tag">
          <el-input v-model="form.tag" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="status" prop="status">
          <el-input v-model="form.status" placeholder="请输入" />
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


 