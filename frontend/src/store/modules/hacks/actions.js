import axios from "../../../axios";
import toast from "../../../plugins/mini-toastr";

export const actions = {
  async getAllHacks({ commit }) {
    try {
      const data = await axios.get(`/api/hacks/all`);
      // const data = [
      //   {
      //     name: "hack1",
      //     description: "hack 1 description",
      //     tag: "feature",
      //     createdBy: 15,
      //     votedBy: [],
      //     creationDate: "2021-10-13",
      //   },
      //   {
      //     name: "hack2",
      //     description: "hack 2 description",
      //     tag: "bug",
      //     createdBy: 20,
      //     votedBy: [1, 2, 3],
      //     creationDate: "2021-10-12",
      //   },
      // ];
      commit("setAllHacks", data);
    } catch (error) {
      toast.error("Error in fetching Hacks");
    }
  },

  async addHack({ dispatch }, hackData) {
    try {
      await axios.post("/api/hacks", hackData);
      toast.success("Hack added successfully");
      dispatch("getAllHacks");
    } catch (error) {
      toast.error("Error in adding hack");
    }
  },

  async editHack({ dispatch }, hackData) {
    try {
      let hackId = hackData.$loki;
      delete hackData.$loki;
      await axios.put(`/api/hacks/${hackId}`, hackData);
      toast.success("Hack updated successfully");
      dispatch("getAllHacks");
    } catch (error) {
      toast.error("Error in updating hack");
    }
  },
};
