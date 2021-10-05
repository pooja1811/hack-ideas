<template>
  <v-row class="ml-4 mr-4 mt-5">
    <v-col cols="12">
      <div>
        <v-alert
          color="red lighten-2"
          dark
          icon="mdi-alert-circle"
          border="top"
          prominent
        >
          Page Not Found. Goto
          <router-link
            class="routerLink"
            :to="{
              name: 'Hacks',
            }"
          >
            Hacks
          </router-link>
          page
        </v-alert>
      </div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "NotFound",
};
</script>
