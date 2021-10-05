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
        <span class="font-weight-bold font-italic">Hack Ideas</span>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
};
</script>
