import { createStore } from "vuex";

const state = {
  boulders: [],

};

const mutations = {
  updateBoulders(state, boulders) {
    state.boulders = boulders.length === 0 ? [] : boulders;
  },

}

const actions = {
  loadBoulders({ commit }) {
    let boulders = require("@/data/mockdata.json");
    commit('updateBoulders', boulders);
  }
}

const getters = {
  getBoulders(state) {
    return state.boulders;
  },
  getBoulder: (state) => (id) => {
    return state.boulders.find(el => el.id == id);
  }
}

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {},
});
