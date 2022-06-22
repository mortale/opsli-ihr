<script>
import { getList } from "@/api/alb";
import TableHeader from "./components/header.vue";
import TableFooter from "./components/footer.vue";
import TableMain from "./components/main.vue";
export default {
  name: "ComprehensiveTable",
  components: {
    TableHeader,
    TableFooter,
    TableMain,
  },
  data() {
    return {
      total: 0,
      dataSource:[],
      params: {
        search: "",
        page: 1,
        page_size: 20,
      },
    };
  },
  created() {
    this.fetchData()
  },
  methods: {
    updateParams(otherParams,resetPage) {
        const pageParams = {}
        if(resetPage){
            pageParams.page = 1
        }
      Object.assign(this.params, otherParams,pageParams);
      this.fetchData(pageParams)
    },
    fetchData() {
      getList(this.params).then(({code,data})=>{
          const {count,results} = data
          this.total = count
          this.dataSource = results || []

      })
    },
  },
};
</script>

<style scoped>
.common-layout-container {
  background-color: #fff;
  height: 100%;
}
</style>

<template>
  <el-container class="common-layout-container">
    <el-header>
      <table-header @updateParams="updateParams"></table-header>
    </el-header>
    <el-main class="common-layout-main">
      <table-main
      :dataSource="dataSource"
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
  </el-container>
</template>


 