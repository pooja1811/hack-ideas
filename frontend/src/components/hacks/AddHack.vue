<template>
  <v-dialog :value="true" width="1000" persistent>
    <v-form v-model="valid" ref="form">
      <v-card color="#f7fafc">
        <v-card-title class="title">Add Hack </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="hackDetails.name"
            color="blue-grey lighten-2"
            label="Title"
            :rules="[(v) => (v || '').length > 0 || 'This field is required']"
            required
          />

          <v-textarea
            v-model="hackDetails.description"
            label="Description"
            rows="1"
            row-height="15"
            auto-grow
            :rules="[(v) => (v || '').length > 0 || 'This field is required']"
            required
          ></v-textarea>

          <v-select
            v-model="hackDetails.tag"
            :items="tags"
            label="Tags"
            :rules="[(v) => (v || '').length > 0 || 'This field is required']"
            required
          ></v-select>
          <v-card-actions no-gutters justify-end>
            <div class="pt-2 pb-2 pl-2 pr-2">
              <v-btn color="info" :disabled="!valid" @click="submit">
                Submit
              </v-btn>

              <v-btn
                class="ml-2"
                color="secondary"
                @click="$emit('close-model')"
              >
                Cancel
              </v-btn>
            </div>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-form>
  </v-dialog>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "AddHack",
  data() {
    return {
      valid: false,
      hackDetails: {},
      tags: [
        "feature",
        "tech",
        "bug",
        "State Sponsored Hackers",
        "Nation Sponsored Hackers",
      ],
    };
  },

  computed: {
    ...mapState("users", ["userDetails"]),
  },

  created() {},

  methods: {
    ...mapActions("hacks", ["addHack"]),
    submit() {
      let hackData = {
        ...this.hackDetails,
        votedBy: [],
        createdBy: this.userDetails.userId,
        creationDate: new Date().toISOString(),
      };

      this.addHack(hackData);
      this.$emit("close-model");
    },
  },
};
</script>
