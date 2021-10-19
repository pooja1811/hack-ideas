import { createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import { shallowMount } from "@vue/test-utils";
import mainStoreConfig from "./index";
import toast from "../../../plugins/mini-toastr";

jest.mock("../../../plugins/mini-toastr", () => {
  return {
    success: jest.fn(),
    error: jest.fn(),
  };
});

global.fetch = jest.fn();

const storeMock = (storeConfig, config) => {
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let store = new Vuex.Store(storeConfig);
  Object.assign(store, config);

  return { store, localVue };
};

describe("Hacks store", () => {
  let store;
  beforeEach(
    () =>
      (store = storeMock({
        actions: mainStoreConfig.actions,
        mutations: {
          ...mainStoreConfig.mutations,
        },
        state: mainStoreConfig.state(),
      }).store)
  );

  describe("Mutations", () => {
    describe("setting all hacks value", () => {
      it("should set the hacks in the store", () => {
        expect(store.state.hackList).toEqual([]);
        store.commit("setAllHacks", [{ name: "Hack1" }]);
        expect(store.state.hackList).toEqual([{ name: "Hack1" }]);
      });
    });
  });

  describe("Actions", () => {
    describe("getting all hacks", () => {
      it("should GET /api/hacks/all successfully and save the response in the store", async () => {
        fetch.mockImplementationOnce(() =>
          Promise.resolve({
            json: () => Promise.resolve([{ name: "Hack1" }, { name: "Hack2" }]),
          })
        );
        expect(store.state.hackList).toEqual([]);
        await store.dispatch("getAllHacks");
        expect(store.state.hackList).toEqual([
          { name: "Hack1" },
          { name: "Hack2" },
        ]);
      });

      it("should GET api/hacks/all unsuccessfully", async () => {
        fetch.mockImplementationOnce(() =>
          Promise.reject("Error in fetching Hacks")
        );
        expect(store.state.hackList).toEqual([]);
        await store.dispatch("getAllHacks");
        expect(store.state.hackList).toEqual([]);
        expect(toast.error).toHaveBeenCalledWith("Error in fetching Hacks");
      });
    });

    describe("adding new hack", () => {
      it("should POST /api/hacks successfully and show a toast message", async () => {
        await store.dispatch("addHack", [{ name: "Hack1" }]);
        expect(toast.success).toHaveBeenCalledWith("Hack added successfully");
      });

      it("should GET api/hacks/all unsuccessfully and show a toast message", async () => {
        fetch.mockImplementationOnce(() =>
          Promise.reject("Error in adding hack")
        );
        await store.dispatch("addHack", [{ name: "Hack1" }]);
        expect(toast.error).toHaveBeenCalledWith("Error in adding hack");
      });
    });

    describe("updating hack", () => {
      it("should PUT /api/hacks/:hackId successfully and show a toast message", async () => {
        await store.dispatch("editHack", [{ name: "Hack1" }]);
        expect(toast.success).toHaveBeenCalledWith("Hack updated successfully");
      });

      it("should PUT /api/hacks/:hackId unsuccessfully and show a toast message", async () => {
        fetch.mockImplementationOnce(() =>
          Promise.reject("Error in updating hack")
        );
        await store.dispatch("editHack", [{ name: "Hack1" }]);
        expect(toast.error).toHaveBeenCalledWith("Error in updating hack");
      });
    });
  });
});
