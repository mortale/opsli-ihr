import Vue from "vue";
const VabIcon = import.meta.globEager("../../node_modules/zx-icon");
    console.log(VabIcon.default);
Vue.component("vab-icon", VabIcon.default);
