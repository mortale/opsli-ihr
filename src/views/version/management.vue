<script>
import { createForm } from "@formily/core";
import { FormProvider, createSchemaField } from "@formily/vue";
import {
  FormLayout,
  FormItem,
  Space,
  Input,
  Select,
  FormGrid,
  ArrayCollapse,
} from "@formily/element";
import dayjs from "dayjs";
import TablePage from "../cmdb/components/tablePage.vue";

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Space,
    Input,
    Select,
    ArrayCollapse,
    FormGrid,
  },
});
export default {
  name: "management",
  components: {
    TablePage,
    FormProvider,
    ...SchemaField,
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
    const form = createForm({ initialValues: { string_array: [{}] } });
    const schema = {
      type: "object",
      properties: {
        grid: {
          type: "void",
          "x-component": "FormGrid",
          "x-component-props": {
            minColumns: 2,
            columnGap: 16,
          },
          properties: {
            input: {
              "x-component": "Input",
              "x-decorator": "FormItem",
              title: "迭代号",
            },
          },
        },
        string_array: {
          type: "array",
          "x-component": "ArrayCollapse",
          "x-decorator": "FormItem",
          items: {
            type: "object",
            "x-component": "ArrayCollapse.Item",
            "x-component-props": {
              title: "发布步骤",
            },
            properties: {
              index: {
                type: "void",
                "x-component": "ArrayCollapse.Index",
              },
              grid1: {
                type: "void",
                "x-component": "FormGrid",
                "x-component-props": {
                  minColumns: 2,
                  columnGap: 16,
                },
                properties: {
                  input: {
                    type: "string",
                    title: "select1",
                    enum: [
                      {
                        label: "应用发布",
                        value: 1,
                      },
                      {
                        label: "mgirate",
                        value: 2,
                      },
                      {
                        label: "datafix",
                        value: 3,
                      },
                    ],
                    "x-decorator": "FormItem",
                    "x-component": "Select",
                  },
                  input2: {
                    type: "string",
                    title: "select2",
                    "x-decorator": "FormItem",
                    "x-component": "Select",
                    "x-reactions": {
                      dependencies: [".input"],
                      fulfill: {
                        schema: {
                          enum: "{{$deps[0] === 1?[{label:1,value:1}]:[]}}",
                        },
                      },
                    },
                  },
                },
              },
              remove: {
                type: "void",
                "x-component": "ArrayCollapse.Remove",
              },
            },
          },
          properties: {
            addition: {
              type: "void",
              title: "添加条目",
              "x-component": "ArrayCollapse.Addition",
            },
          },
        },
      },
    };
    return {
      form,
      schema,
      dialogTitle: "创建",
      visible: false,
      visible1: false,
      isLoading: false,
      fetch: () => Promise.resolve({ data: { results: [{}] } }),
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
        {
          label: "操作",
          align: "center",
          type: "operator",
          operators: [
            {
              key: "edit",
              type: "text",
              text: "部署步骤",
              click: this.editClick,
            },
          ],
        },
      ],
    };
  },
  methods: {
    editClick(rowData) {
      this.toggleVisible1();
    },

    toggleVisible1() {
      this.visible1 = !this.visible1;
    },

    closed() {},

    sumbit() {},
  },
};
</script>

<template>
  <div style="height: 100%">
    <table-page :tableColumns="tableColumns" :fetch="fetch">
      <template #HeaderLeft>
        <el-button type="primary" @click="toggleVisible">创建</el-button>
      </template>

      <el-dialog title="部署步骤" :visible.sync="visible1" @closed="closed">
        <FormProvider :form="form">
          <SchemaField :schema="schema" />
        </FormProvider>

        <template #footer>
          <span>
            <el-button @click="toggleVisible1">取消</el-button>
            <el-button type="primary" @click="sumbit">提交</el-button>
          </span>
        </template>
      </el-dialog>
    </table-page>
  </div>
</template>


 