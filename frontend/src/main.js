import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import toast from "./plugins/mini-toastr.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  toast,
  render: (h) => h(App),
}).$mount("#app");
