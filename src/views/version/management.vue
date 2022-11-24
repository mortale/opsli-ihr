<script>
import { createForm } from "@formily/core";
import {
  FormProvider,
  createSchemaField,
  connect,
  mapProps,
} from "@formily/vue";
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
import debounce from "lodash/debounce";
import TablePage from "../cmdb/components/tablePage.vue";
import {
  getSprint,
  getSprintStep,
  getAppLication,
  postSprintStep,
  postSprint,
} from "@/api/version/management";

const form = createForm();

const ProSelect = connect(
  Select,
  mapProps((p, f) => {
    const { remoteMethod, ...restProps } = p;
    return { ...restProps, remoteMethod: remoteMethod.bind(null, f) };
  })
);

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Space,
    Input,
    Select,
    ProSelect,
    ArrayCollapse,
    FormGrid,
  },
});
// {
//   "status": "string",
//   "remark": "string",
//   "name": "string",
//   "wiki_url": "string",
//   "tester": "string",
//   "alias": "string",
//   "in_charge": "string",
//   "developer": "string"
// }
const schema = {
  type: "object",
  properties: {
    layout: {
      type: "void",
      "x-component": "FormLayout",
      "x-component-props": {
        labelCol: 6,
        wrapperCol: 24,
        layout: "vertical",
      },
      properties: {
        grid: {
          type: "void",
          "x-component": "FormGrid",
          "x-component-props": {
            maxColumns: 2,
            columnGap: 16,
          },
          properties: {
            status: {
              "x-component": "Input",
              "x-decorator": "FormItem",
              title: "status",
            },
            remark: {
              "x-component": "Input",
              "x-decorator": "FormItem",
              title: "remark",
            },
            name: {
              "x-component": "Input",
              "x-decorator": "FormItem",
              title: "name",
            },
            wiki_url: {
              "x-component": "Input",
              "x-decorator": "FormItem",
              title: "wiki_url",
            },
            tester: {
              "x-component": "Input",
              "x-decorator": "FormItem",
              title: "tester",
            },
            alias: {
              "x-component": "Input",
              "x-decorator": "FormItem",
              title: "alias",
            },
            in_charge: {
              "x-component": "Input",
              "x-decorator": "FormItem",
              title: "in_charge",
            },
            developer: {
              "x-component": "Input",
              "x-decorator": "FormItem",
              title: "developer",
            },
          },
        },
      },
    },
  },
};

const transformFormValuies = (id) => {
  return getSprintStep(id).then((res) => {
    if (res.code === 200) {
      const data = res.data?.reduce((acc, next) => {
        const { order, apps, ...props } = next;
        acc[order - 1] = { ...props, apps: apps.split(",") };
        return acc;
      }, []);
      return { id, data };
    }
    return { id };
  });
};

const remoteMethod = debounce(function (field, query) {
  if (query !== "") {
    getAppLication({ search: query }).then((res) => {
      if (res.code === 200) {
        const options = res.data.results.map(({ name }) => ({
          label: name,
          value: name,
        }));
        field.setDataSource(options);
      }
    });
  } else {
    field.setDataSource([]);
  }
}, 1000);

const schema1 = {
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
        id: {
          "x-component": "Input",
          "x-decorator": "FormItem",
          title: "迭代号",
          "x-component-props": {
            disabled: true,
          },
        },
      },
    },
    data: {
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
          layout: {
            type: "void",
            "x-component": "FormLayout",
            "x-component-props": {
              labelCol: 6,
              wrapperCol: 24,
              layout: "vertical",
            },
            properties: {
              act: {
                type: "string",
                title: "类型",
                enum: [
                  {
                    label: "应用发布",
                    value: "publish",
                  },
                  {
                    label: "mgirate",
                    value: "mgirate",
                  },
                  {
                    label: "datafix",
                    value: "datafix",
                  },
                ],
                "x-decorator": "FormItem",
                "x-component": "Select",
                "x-component-props": {
                  style: "max-width:300px",
                },
              },
              apps: {
                type: "string",
                title: "application",
                "x-decorator": "FormItem",
                "x-component": "ProSelect",
                enum: [],
                "x-component-props": {
                  remoteMethod,
                  multiple: true,
                  clearable: true,
                  filterable: true,
                  remote: true,
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
    return {
      form,
      schema,
      schema1,
      visible: false,
      visible1: false,
      isLoading: false,
      fetch: getSprint,
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
      const { url } = rowData.row;
      const urlObj = new URL(url);
      const matchResult = urlObj.pathname?.match(/sprint\/(\d+)/);
      if (matchResult) {
        this.open1(matchResult[1]);
      }
    },

    open() {
      this.form.reset();
      this.visible = true;
    },

    closed() {
      this.visible = false;
    },

    sumbit() {
      this.form.submit().then((result) => {
        postSprint(result).then((res) => {
          if (res.code === 200) {
            this.closed();
          }
        });
      });
    },

    open1(stepId) {
      // 当弹窗未打开时需要获取step数据再塞到表单中
      transformFormValuies(stepId).then((values) => {
        this.visible1 = true;
        this.form.setValues(values);
      });
    },

    closed1() {
      this.visible1 = false;
    },

    sumbit1() {
      this.form.submit().then((result) => {
        const { id } = result;
        const data = result.data?.map(({ apps, ...el }, i) => ({
          order: i + 1,
          apps: apps.toString(),
          ...el,
        }));
        postSprintStep(id, data).then((res) => {
          if (res.code === 200) {
            this.closed1();
          }
        });
      });
    },
  },
};
</script>

<template>
  <div style="height: 100%">
    <table-page :tableColumns="tableColumns" :fetch="fetch">
      <template #HeaderLeft>
        <el-button type="primary" @click="open">创建</el-button>
      </template>

      <el-dialog title="创建" :visible.sync="visible" @closed="closed">
        <FormProvider
          :form="form"
          style="display: block; max-height: 550px; overflow: scroll"
        >
          <SchemaField :schema="schema" />
        </FormProvider>

        <template #footer>
          <span>
            <el-button @click="closed">取消</el-button>
            <el-button type="primary" @click="sumbit">提交</el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog title="部署步骤" :visible.sync="visible1" @closed="closed1">
        <FormProvider
          :form="form"
          style="display: block; max-height: 550px; overflow: scroll"
        >
          <SchemaField :schema="schema1" />
        </FormProvider>

        <template #footer>
          <span>
            <el-button @click="closed1">取消</el-button>
            <el-button type="primary" @click="sumbit1">提交</el-button>
          </span>
        </template>
      </el-dialog>
    </table-page>
  </div>
</template>


 