import { createStore } from "vuex";
import { SandboxInstance } from "@/scripts/sandbox";

export default createStore({
  strict: process.env.NODE_ENV !== "production",
  state: {
    sandbox: SandboxInstance,
  },
  mutations: {},
  actions: {},
  modules: {},
});
