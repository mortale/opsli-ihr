<template>
  <el-dialog 
  :title="title" 
  :visible.sync="visible"
  @close="close"
  :show-close='false'
  >
    <FormProvider :form="form">
        <SchemaField :schema="schema" />
    </FormProvider>
    <div slot="footer" class="dialog-footer">
    <el-button @click="close">取消</el-button>
    <el-button type="primary" :loading="loading" @click="onOk">{{ okText }}</el-button>
  </div>
  </el-dialog> 
</template>

<script>
import { createForm } from "@formily/core";
import {
  FormProvider,
  createSchemaField,
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

const SchemaField = createSchemaField({
  components: {
    FormLayout,
    FormItem,
    Space,
    Input,
    Select,
    ArrayCollapse,
    FormGrid,
  }
});
const form = createForm();
export default {
    components: {
    FormProvider,
    ...SchemaField,
    },
    props: {
        title: String,
        okText: String,
        visible: Boolean,
        schema: Object
    },
    data() {
        return {
            form,
            loading:false,
        }
    },
    methods: {
        close() {
            if (!this.loading) {
                this.$emit('close')
            }
        },
        onOk() {
            const callback = (res) => {
                res.finally(() => {
                    this.loading = false
                })
            }
            form.submit().then((result) => { 
                this.loading = true
                this.$emit('okEffect', callback ,result)
            })
         
        }
  }
}
</script>