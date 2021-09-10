import { createStore } from "vuex";
import VuexPersistence from 'vuex-persist';
import { userModule } from "./modules/user";
import { bouldersModule } from "./modules/boulders";

export const API_URL = "http://localhost:8084";

const state = {
  isLoading: false,
  success: null,
}

const mutations = {
  setLoading(state, bool) {
    state.isLoading = bool;
  },
  setSuccess(state, bool) {
    state.success = bool;
  },
}

const actions = {
  startLoading({ commit }) {
    commit("setLoading", true);
  },
  stopLoading({ commit }) {
    commit("setLoading", false);
  },
  setSuccess({ commit }, bool) {
    commit("setSuccess", bool);
  },
}

const getters = {
  isLoading(state) {
    return state.isLoading;
  },
  operationSuccess: (state) => {
    return state.success == true;
  }
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["user", "boulders"],
})

export default createStore({
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
  modules: {
    user: userModule,
    boulders: bouldersModule
  },
  plugins: [vuexLocal.plugin],
});
