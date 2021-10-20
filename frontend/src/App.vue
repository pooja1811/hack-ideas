<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          class="shrink mr-2"
          contain
          :src="require('./assets/hack-ideas.png')"
          transition="scale-transition"
          width="40"
        />
        <span class="font-weight-bold font-italic" v-if="!userDetails.userId"
          >Hack Ideas</span
        >
        <span class="font-weight-bold font-italic" v-else
          >Welcome User {{ userDetails.userId }}</span
        >
      </div>
      <div class="ml-auto mr-3">
        <v-icon v-if="userDetails.userId" @click="logout"> mdi-logout </v-icon>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { mapMutations, mapState } from "vuex";
export default {
  name: "App",

  data: () => ({
    //
  }),

  created() {
    if (localStorage.getItem("userId")) {
      let userId = parseInt(localStorage.getItem("userId"));
      this.setUserDetails({ userId });
    }
  },

  computed: {
    ...mapState("users", ["userDetails"]),
  },

  methods: {
    ...mapMutations("users", ["setUserDetails"]),
    logout() {
      localStorage.removeItem("userId");
      this.setUserDetails({});
      this.$router.push({
        name: "Login",
      });
    },
  },
};
</script>
