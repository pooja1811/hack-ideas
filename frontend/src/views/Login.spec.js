import Login from "./Login.vue";
import { createLocalVue, shallowMount } from "@vue/test-utils";
import Vuetify from "vuetify";
import Vuex from "vuex";

let wrapper;
let setUserDetails = jest.fn();

const getWrapper = (options = {}, storeConfig = {}) => {
  const localVue = createLocalVue();
  const vuetify = new Vuetify();
  localVue.use(Vuex);

  return shallowMount(Login, {
    localVue,
    vuetify,
    store: new Vuex.Store(storeConfig),
    ...options,
  });
};
const $router = {
  push: jest.fn(),
};

describe("Login", () => {
  beforeEach(() => {
    wrapper = getWrapper(
      { mocks: { $router } },
      {
        modules: {
          users: { namespaced: true, mutations: { setUserDetails } },
        },
      }
    );
  });

  describe("when user id is not given", () => {
    it("should disable the submit button", () => {
      expect(wrapper.find("v-btn-stub").props("disabled")).toBe(true);
    });
  });

  describe("when user id values are given", () => {
    it("should show the validation messages as per the value", () => {
      const [validationFn] = wrapper.find("v-text-field-stub").vm.rules;
      expect(validationFn("")).toBe("This field is required");
      expect(validationFn()).toBe("This field is required");
      expect(validationFn(1)).toBe(true);
      expect(validationFn(10)).toBe(true);
    });
  });

  describe("when valid user id igiven", () => {
    it("should redirect the user to hacks page", async () => {
      wrapper.find("v-text-field-stub").vm.$emit("input", 1);
      await wrapper.vm.$nextTick();
      wrapper.find("v-btn-stub").vm.$emit("click");
      await wrapper.vm.$nextTick();
      expect(setUserDetails).toHaveBeenCalledWith(expect.anything(), {
        userId: 1,
      });
      expect($router.push).toHaveBeenCalledWith({ name: "Hacks" });
    });
  });
});
