<template>
  <vab-query-form>
    <vab-query-form-left-panel>
      <slot name="HeaderLeft">&nbsp;</slot>
    </vab-query-form-left-panel>
    <vab-query-form-right-panel>
      <el-form ref="form" :inline="true" @submit.native.prevent>
        <el-form-item>
          <el-input v-model="queryForm.search" placeholder="请输入服务名称" />
        </el-form-item>
        <el-form-item>
          <el-button
            icon="el-icon-search"
            type="primary"
            native-type="submit"
            @click="handleQuery"
          >
            查询
          </el-button>
        </el-form-item>
      </el-form>
    </vab-query-form-right-panel>
  </vab-query-form>
</template>

<script>
export default {
  name: "TableHeader",
  data() {
    return {
      queryForm: {
        search: "",
      },
    };
  },
  methods: {
    handleQuery() {
      try {
        this.$emit("updateParams", this.queryForm, true);
      } catch (error) {}
    },
  },
};
</script>