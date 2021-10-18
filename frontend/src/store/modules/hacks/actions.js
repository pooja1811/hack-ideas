import toast from "../../../plugins/mini-toastr";

export const actions = {
  async getAllHacks({ commit }) {
    try {
      const response = await fetch("/api/hacks/all");
      const data = await response.json();
      commit("setAllHacks", data);
    } catch (error) {
      toast.error("Error in fetching Hacks");
    }
  },

  async addHack({ dispatch }, hackData) {
    try {
      await fetch("/api/hacks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hackData),
      });
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
      await fetch(`/api/hacks/${hackId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hackData),
      });
      toast.success("Hack updated successfully");
      dispatch("getAllHacks");
    } catch (error) {
      toast.error("Error in updating hack");
    }
  },
};
