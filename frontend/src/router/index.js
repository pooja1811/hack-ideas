import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/hacks",
    name: "Hacks",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Hacks.vue"),
  },
  {
    path: "*",
    name: "NotFound",
    component: () => import("@/components/common/NotFound.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const userId = localStorage.getItem("userId");
  if (to.name !== "Login" && !userId) next({ name: "Login" });
  else next();
  if (to.name === "Login" && userId) next({ name: "Hacks" });
  else next();
});

export default router;
