import Vue from "vue";
import {
  configElementUi,
  configErrorHandler,
  configRightMouseMenu,
  vuetify,
  i18n,
  configVeeValidate,
} from "@/base/config";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

configErrorHandler();
configElementUi();
configRightMouseMenu();
configVeeValidate();

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
