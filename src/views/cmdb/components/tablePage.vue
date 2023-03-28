<script>
import TableHeader from "./header.vue";
import TableFooter from "./footer.vue";
import TableMain from "./main.vue";
import FormModal from './form-modal.vue'
import {getFunctionAuth} from '../../../api/auth/function'
const cacheCite = {}
let freeze = false
// 使用接口冻结
const useFreezeFetch = () => {
  freeze = true
}
// 回复接口启用
const closeFreezeFetch = () => {
  freeze = false
}
export default {
  name: "ComprehensiveTable",
  props: {
    fetch: Function,
    tableColumns: Array,
    operators: Array,
    schema: Object,
    createInitialValues: Function
  },
  components: {
    TableHeader,
    TableFooter,
    TableMain,
    FormModal
  },
  data() {
    const _operators = new Set(this.operators ?? [])

  const create =this.auths.includes('create') &&  _operators.has('create')
  const needRefersh = _operators.has('refersh')
  // 无操作列表头
  const tableColumnsWithNoOperators = this.tableColumns.filter((el) => el.type !== 'operator')
  // 操作列表头
    const customOperatorColumn = this.tableColumns.find((el) => el.type === 'operator')

    const customOperators = customOperatorColumn?.operators?.reduce((acc, next) => {
      const { key, click } = next
      _operators.add(key)
      acc[key] = {
        click
      }
      return acc
    }, {})

  const rowOperators = Array.from(_operators).filter((el) => this.auths.includes(el) && el !== 'create')
    return {
      tableColumnsWithNoOperators,
      customOperators: customOperators ?? {},
      auths: [],
      needRefersh,
      refersh:false,
      title: '',
      okText: '确定',
      type:'',
      visible:false,
      create,
      rowOperators,
      total: 0,
      dataSource: [],
      params: {
        search: "",
        page: 1,
        page_size: 20,
      },
    };
  },
  beforeCreate() {
    this.auths = getFunctionAuth.call(this);
  },
  created() {
    this.fetchData();
  },
  beforeDestroy() {
    this.refersh = false
    cacheCite.current?.()
    closeFreezeFetch()
  },
  methods: {
    // 实时刷新触发和停止
    refershChange(value) {
      this.refersh = value
      if (value) {
        const fetchDataWithSetTimeOut = () => {
          this.fetchData().then(() => {
            const count = setTimeout(() => {
              fetchDataWithSetTimeOut()
            }, 3000)
            cacheCite.current = () => {
              clearTimeout(count)
            }
          })
        } 
        fetchDataWithSetTimeOut()
      } else if(cacheCite.current) {
        cacheCite.current()
      }
    },
    // 数据请求参数更新
    updateParams(otherParams, resetPage) {
      const pageParams = {};
      if (resetPage) {
        pageParams.page = 1;
      }
      Object.assign(this.params, otherParams, pageParams);
      this.fetchData();
    },
    // 数据请求
    fetchData() {
      if (freeze) return Promise.resolve()
     return this.fetch(this.params).then(({ code, data }) => {
        const { count, results } = data;
        this.total = count;
        this.dataSource = results || [];
      });
    },
    // 关闭弹窗
    close() {
      this.type = ''
      this.visible = false
      closeFreezeFetch()
    },
    // 启用弹窗
    open() {
      if (this.refersh) {
        useFreezeFetch()
      }
      this.visible = true
    },
    // 行新增
    createClick() {
      this.open()
      this.type = 'create'
      this.title = '创建'
      this.okText = '提交'
    },
    // 行点击
    rowClick(row, event, column) {
      try {
        this.$emit("row-click", row, event, column );
      } catch {}
    },
     // 行编辑
    rowEdit(row, event, column) {
      this.open()
      this.type = 'edit'
      this.title = '修改'
      this.okText = '保存'
      try{
        // this.$refs.formDialog.loadingContent(true)
        Promise.resolve(this.createInitialValues?.(row)).then((res) => {
          if (res) {
            this.$refs.formDialog.setInitialValues(res)
          }
      }).finally(() => {
        // this.$refs.formDialog.loadingContent(false)
      })
    } catch (err) {
        console.error('手动捕获',err)
    } 
    },
    // 弹窗确认事件
    okEffect (cb,res) {
      if (this.type) {
        const execResult = new Promise((r,j) => {
          this.$emit(`${this.type}-handle`, res, (fetchResult) => {
            fetchResult.then(r).catch(j)
          })
        }).then(() => {
          this.$message({
          showClose: true,
          message: `${this.title}成功`,
          type: 'success'
          })
          if (this.type === 'edit') {
           this.fetchData()
          } else if (this.type === 'create') {
            this.updateParams({},true)
          }
          this.close()
        })
        cb(execResult)
      }
    },
    // 行删除
    rowDelete(row, event, column) {
      useFreezeFetch()
      const beforeClose = async (action, instance, done) => {
        if (action === 'confirm') {
          instance.confirmButtonLoading = true;
          const res = await new Promise((r,j) => {
            this.$emit("row-delete", row, event, column, (v) => {
              v.then(r).catch((err) => {
                instance.confirmButtonLoading = false;
                j(err)
              })
            });
          })
          if (res) { 
            done();
          }
          instance.confirmButtonLoading = false;
        } else {
          instance.confirmButtonLoading = false;
          done();
        }
      }
      try {
        this.$alert('确定要进行删除操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          showClose: false,
          showCancelButton:true,
          type: 'warning',
          center: true,
          beforeClose
        }).then(action => {
          this.fetchData()
          this.$message({
          showClose: true,
          message: '删除成功',
          type: 'success'
          });
        }).finally(() => {
          closeFreezeFetch()
        })
      } catch {}
    }
  },
};
</script>

<style lang="scss" >
.cmdb-form {
  display: flex;
  flex-wrap: wrap;
  padding-right: 0;
  > div {
    flex: 0 0 50%;
    margin-right: 0;
    > div:last-child {
      margin-right: 24px;
    }
  }
}

.cmdb-dialog {
  > .el-dialog__body {
    max-height: 70vh;
    overflow: overlay;
  }
}
</style>

<template>
  <el-container style="height: 100%; background: #fff; padding: 16px 24px">
    <el-header height="auto" style="padding: 0">
      <table-header 
        @updateParams="updateParams" 
        :create="create" 
        @create-click="createClick"
        :refersh="refersh"
        @refersh-change="refershChange"
        :needRefersh="needRefersh"
      ></table-header>
    </el-header>
    <el-main style="padding: 0">
      <table-main
        :rowOperators="rowOperators"
        :tableColumns="tableColumnsWithNoOperators"
        :customOperators="customOperators"
        :dataSource="dataSource"
        @row-click="rowClick"
        @row-edit="rowEdit"
        @row-delete="rowDelete"
      ></table-main>
    </el-main>
    <el-footer>
      <table-footer
        :page="params.page"
        :page_size="params.page_size"
        :total="total"
        @updateParams="updateParams"
      ></table-footer>
    </el-footer>
    <slot></slot>
    <form-modal
      ref="formDialog"
      :visible="visible"
      :title="title"
      :okText="okText"
      @close="close"
      @okEffect="okEffect"
      :schema="schema"
    ></form-modal>
  </el-container>
</template>


 