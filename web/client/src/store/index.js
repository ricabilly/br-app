import { createStore } from "vuex";
import {  } from "@/util/filter.js";

const state = {
  boulders: [],

};

const mutations = {
  updateBoulders(state, boulders) {
    state.boulders = boulders.length === 0 ? [] : boulders;
  },
  addBoulder(state, boulder) {
    state.boulders.push(boulder);
  }

}

const actions = {
  loadBoulders({ commit }) {
    let boulders = require("@/data/mockdata.json");
    commit('updateBoulders', boulders);
  },
  addBoulder({ commit }, boulder) {
    boulder.id = generateId();
    boulder.date = new Date().toISOString();
    commit('addBoulder', boulder);
  }
}

const getters = {
  getBoulders: (state) => (sortBy) => {
    let comp;
    switch(sortBy) {
      case "difficulty":
        comp = function (a, b) {
          return +(a.difficulty.slice(1).replace("-", ".")) - (+(b.difficulty.slice(1).replace("-", ".")));
        };
        break;
      case "rating":
        comp = function (a, b) {
          return a.rating - b.rating;
        };
        break;
      case "date":
      default:
        comp = function (a, b) {
          return new Date(a.date) > new Date(b.date) ? 1 : -1;
        };
    }
    return state.boulders.sort(comp);
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

function generateId() {
  return this.state.boulder.length;
}