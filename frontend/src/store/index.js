import Vue from "vue";
import Vuex from "vuex";
import users from "./modules/users";
import hacks from "./modules/hacks";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    users,
    hacks,
  },
});
