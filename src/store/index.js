/**
 * @copyright chuzhixin 1204505056@qq.com
 * @description 导入所有 vuex 模块，自动加入namespaced:true，用于解决vuex命名冲突，请勿修改。
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const files = import.meta.globEager("./modules/*.js");
const modules = {};

for (const key in files) {
  const components = files[key];
  modules[key.replace(/(\.\/modules\/|\.js)/g, "")] = components.default;
  components.default["namespaced"] = true;
}

const store = new Vuex.Store({
  modules,
});
export default store;
