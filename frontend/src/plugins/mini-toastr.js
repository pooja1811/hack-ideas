import Vue from "vue";

import $toast from "mini-toastr";
$toast.init();

// Add miniToastr to all Vue instances
Vue.prototype.$toast = $toast;

export default $toast;
