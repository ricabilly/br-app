import { nonEmpty } from "@/util/utils";
import { call as editBoulderCall } from '@/apicalls/editBoulder.js';
import { call as getBouldersCall } from '@/apicalls/getBoulders.js';
import { API_URL } from "..";

const state = {
  boulders: [],
  isLoading: false,
  addBoulderError: null,
  
}

const mutations = {
  updateBoulders(state, boulders) {
    state.boulders = boulders.length === 0 ? [] : boulders;
  },
  addBoulder(state, boulder) {
    state.boulders.push(boulder);
  },
  setAddBoulderError(state, error) {
    state.addBoulderError = error;
  },
}

const actions = {
  async loadBoulders({ commit }) {
    let boulders = await getBouldersCall(API_URL);
    if(nonEmpty(boulders)) {
      commit('updateBoulders', boulders);
    } else {
      commit('setError', "Failed to fetch boulders")
    }
  },
  async addBoulder({ commit }, boulder) {
    let date = new Date().toISOString();
    boulder.date = date;
    let newBoulder = await editBoulderCall(API_URL, boulder);
    if(nonEmpty(newBoulder)) {
      commit('addBoulder', newBoulder);
    } else {
      commit('setAddBoulderError', "Failed to add boulder")
    }
  },
  clearAddBoulderError({ commit }) {
    commit("setAddBoulderError", null);
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
  addBoulderErrorOccured: (state) => {
    return state.addBoulderError != null;
  }
}

export const bouldersModule = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
}