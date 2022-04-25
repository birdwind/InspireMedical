import Vue from "vue";
import {
  configElementUi,
  configErrorHandler,
  configJsonCSV,
  configRightMouseMenu,
  configVeeValidate,
  i18n,
  vuetify,
} from "@/base/config";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import filter from "@/base/filter";

Vue.config.productionTip = false;

configErrorHandler();
configElementUi();
configRightMouseMenu();
configVeeValidate();
filter();
configJsonCSV();

// Vue.prototype.$store = store;
new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
