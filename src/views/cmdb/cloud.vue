<script>
import dayjs from "dayjs";
import { getCloud, postCloud } from "@/api/cmdb/cloud";
import TablePage from "./components/tablePage.vue";
export default {
  name: "cloud",
  components: {
    TablePage,
  },
  data() {
    return {
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
      visible: false,
      isLoading: false,
      form: {
        name: "",
        update_order_id: "",
      },
      formRules: {
        name: [{ required: true, message: "该字段必填", trigger: "blur" }],
        update_order_id: [
          { required: true, message: "该字段必填", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    toggleVisible() {
      this.visible = !this.visible;
    },
    async sumbit() {
      const result = await this.$refs.form.validate();
      if (result) {
        postCloud(this.form).then((res) => {
          if (res.code === 200) {
            this.toggleVisible();
          }
        });
      }
    },
  },
};
</script>

<template>
  <table-page :tableColumns="tableColumns" :fetch="fetch">
    <template #HeaderLeft>
      <el-button type="primary" @click="toggleVisible">创建</el-button>
    </template>
    <el-dialog title="创建" :visible.sync="visible">
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
        <el-form-item label="update_order_id" prop="update_order_id">
          <el-input v-model="form.update_order_id" placeholder="请输入" />
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


 