<template>
  <vab-query-form>
    <vab-query-form-left-panel>
      <el-button 
        v-show="create" 
        type="primary"
        @click="createClick"
      >创建</el-button>
      <el-switch
        v-show="needRefersh" 
        v-model="refersh"
        style="display: flex;flex-direction: row-reverse;gap: 10px;"
        active-text="实时刷新"
        @change="refershChange"
        >
      </el-switch>
      &nbsp;
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
  props: {
    create: Boolean,
    needRefersh:Boolean,
    refersh: Boolean
  },
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
    createClick() {
      this.$emit("create-click");
    },
    refershChange(v) {
      this.$emit("refersh-change",v);
    }
  },
};
</script>

<style lang="scss" >
.vab-query-form {
  margin-bottom: 0 !important;
}
</style>