import { nonEmpty } from "@/util/utils";
import { call as boulderCall } from '@/apicalls/editBoulder.js';
import { API_URL } from "..";

const state = {
  boulders: [],
  isLoading: false,
  
}

const mutations = {
  updateBoulders(state, boulders) {
    state.boulders = boulders.length === 0 ? [] : boulders;
  },
  addBoulder(state, boulder) {
    state.boulders.push(boulder);
  },
}

const actions = {
  loadBoulders({ commit }) {
    let boulders = require("@/data/mockdata.json");
    commit('updateBoulders', boulders);
  },
  async addBoulder({ commit }, boulder) {
    let date = new Date().toISOString();
    boulder.date = date;
    let newBoulder = await boulderCall(API_URL, boulder);
    if(nonEmpty(newBoulder)) {
      commit('addBoulder', newBoulder);
    }
  },
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
          return b.rating - a.rating;
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
  },
}

export const bouldersModule = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
}