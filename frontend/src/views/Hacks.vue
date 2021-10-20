<template>
  <div>
    <v-row class="ml-4 mr-4">
      <v-col cols="11">
        <div class="mt-5 mb-5 display-1">
          <span class="headTextColor mr-1 font-weight-bold"> Hacks List </span>
        </div>
      </v-col>
      <v-col cols="1">
        <div class="d-flex mt-5 mb-5 mr-5 justify-center">
          <v-btn
            rounded
            large
            color="secondary"
            dark
            @click="showAddModel = true"
          >
            Add a Hack
          </v-btn>
        </div>
      </v-col>
    </v-row>
    <v-row class="ml-4 mr-4">
      <v-col cols="12" v-if="computedHackList.length === 0">
        <div>
          <v-alert
            color="primary"
            dark
            icon="mdi-alert-circle"
            border="left"
            prominent
          >
            No hacks found. Please add a Hack.
          </v-alert>
        </div>
      </v-col>

      <v-col cols="12" v-else>
        <v-data-table
          :headers="headers"
          :items="computedHackList"
          :items-per-page="10"
          class="elevation-1"
        >
          <template #item.creationDate="{ item }">
            {{ item.creationDate | formatDate }}
          </template>
          <template #item.actions="{ item }">
            <v-chip
              v-if="item.upvoteDetails.showUpvote"
              :color="item.upvoteDetails.hasUpvoted ? 'red' : 'success'"
              @click="upvoteHack(item, item.upvoteDetails.hasUpvoted)"
            >
              <v-icon left class="pl-2">
                {{
                  item.upvoteDetails.hasUpvoted
                    ? "mdi-close-circle"
                    : "mdi-clipboard-arrow-up"
                }}
              </v-icon>
            </v-chip>
            <v-chip v-else color="green" text-color="white">
              Created by you
            </v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
    <add-hack v-if="showAddModel" @close-model="showAddModel = false" />
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AddHack from "../components/hacks/AddHack.vue";

export default {
  name: "Hacks",

  components: {
    AddHack,
  },

  data() {
    return {
      showAddModel: false,
      headers: [
        {
          text: "Hack Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Creation Date", value: "creationDate" },
        { text: "Tag", value: "tag" },
        { text: "Votes", value: "votedBy.length" },
        { text: "Actions", value: "actions", sortable: false },
      ],
    };
  },

  computed: {
    ...mapState("users", ["userDetails"]),
    ...mapState("hacks", ["hackList"]),

    computedHackList() {
      return this.hackList.map((item) => {
        item.upvoteDetails = {
          showUpvote: false,
          hasUpvoted: false,
        };
        if (item.createdBy !== this.userDetails.userId) {
          item.upvoteDetails.showUpvote = true;
          if (item.votedBy.includes(this.userDetails.userId)) {
            item.upvoteDetails.hasUpvoted = true;
          }
        }
        return item;
      });
    },
  },

  created() {
    this.getAllHacks();
  },

  filters: {
    formatDate: function (value) {
      if (!value) return "";
      let dateObj = new Date(value);
      let currDate = dateObj.getDate();
      let currMonth = dateObj.getMonth();
      currMonth = currMonth + 1;
      let currYear = dateObj.getFullYear();
      let currHour = dateObj.getHours();
      let currMin = dateObj.getMinutes();
      let currSecond = dateObj.getSeconds();
      return (
        currDate +
        "-" +
        currMonth +
        "-" +
        currYear +
        " " +
        currHour +
        ":" +
        currMin +
        ":" +
        currSecond
      );
    },
  },

  methods: {
    ...mapActions("hacks", ["getAllHacks", "editHack"]),
    upvoteHack(hackDetails, hasUpvoted) {
      let { votedBy } = hackDetails;
      delete hackDetails.upvoteDetails;

      if (hasUpvoted) {
        votedBy = votedBy.filter((item) => item !== this.userDetails.userId);
      } else {
        votedBy.push(this.userDetails.userId);
      }
      this.editHack({ ...hackDetails, votedBy });
    },
  },
};
</script>
