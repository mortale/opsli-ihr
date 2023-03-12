import Vue from "vue";
import { ColorfullIcon } from "@/layouts/components";

Vue.component("vab-colorful-icon", ColorfullIcon);
const req = import.meta.globEager("./svg/*.svg");
export default req;