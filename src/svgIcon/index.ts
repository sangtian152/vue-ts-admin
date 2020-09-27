import { Component, Watch, Vue } from 'vue-property-decorator'
import svgIcon from "@/components/svgIcon/index.vue";

Vue.component("svg-icon", svgIcon);
// const requireAll = (requireContext: any) => requireContext.keys()
const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext: any) => {
  return requireContext.keys().map(requireContext);
};
requireAll(req);