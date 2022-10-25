<script>
import dayjs from "dayjs";
import { getMix, postMix, putMix } from "@/api/cmdb/mix";
import TablePage from "./components/tablePage.vue";
export default {
  name: "mix",
  components: {
    TablePage,
  },
  data() {
    return {
      fetch: getMix,
      tableColumns: [
        { label: "网络模式", columnName: "net_type", align: "center" },
        {
          label: "Cloud",
          columnName: "cloud",
          align: "center",
        },
        {
          label: "名字",
          columnName: "name",
          align: "center",
        },
        { label: "公司名称", columnName: "company_name", align: "center" },
        { label: "实例", columnName: "mysql_host", align: "center" },
        { label: "员工数量", columnName: "staff", align: "center" },
        { label: "加入日期", columnName: "join_date", align: "center" },
        { label: "负责人", columnName: "in_charge", align: "center" },
        { label: "备注", columnName: "remark", align: "center" },
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
      submitFetch: postMix,
      operationId: "",
      form: {
        net_type: "",
        cloud: "",
        name: "",
        company_name: "",
        mysql_host: "",
        staff: 0,
        module: "",
        in_charge: "",
        join_date: "",
        remark: "",
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
      const { url, created_date, modified_date, Mix_id, ...other } =
        rowData.row;
      Object.assign(this.form, other);
      this.submitFetch = putMix;
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
      this.submitFetch = postMix;
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
      custom-class="cmdb-dialog"
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
        <el-form-item label="类型 ip" prop="net_type">
          <el-input v-model="form.net_type" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Cloud" prop="cloud">
          <el-select
            v-model="form.cloud"
            multiple
            filterable
            allow-create
            default-first-option
            placeholder="请输入"
            style="width: 100%"
          ></el-select>
        </el-form-item>
        <el-form-item label="缩写" prop="name">
          <el-input v-model="form.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="公司名称" prop="company_name">
          <el-input v-model="form.company_name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="实例" prop="mysql_host">
          <el-input v-model="form.mysql_host" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="员工数量" prop="staff">
          <el-input v-model="form.staff" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="使用模块" prop="module">
          <el-input v-model="form.module" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="负责人" prop="in_charge">
          <el-input v-model="form.in_charge" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="加入日期" prop="join_date">
          <el-input v-model="form.join_date" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="Remark" prop="remark">
          <el-input
            v-model="form.remark"
            placeholder="请输入"
            type="textarea"
            :rows="5"
          />
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


 