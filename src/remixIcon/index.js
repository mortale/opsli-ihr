import Vue from "vue";
import { RemixIcon } from "@/layouts/components";

Vue.component("vab-remix-icon", RemixIcon);
const req = import.meta.globEager("./svg/*.svg");
export default req;