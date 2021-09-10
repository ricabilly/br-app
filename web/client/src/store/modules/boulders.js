import { nonEmpty } from "@/util/utils";
import { call as editBoulderCall } from '@/apicalls/editBoulder.js';
import { call as getBouldersCall } from '@/apicalls/getBoulders.js';
import { API_URL } from "..";

const state = {
  boulders: [],
  error: null,
}

const mutations = {
  updateBoulders(state, boulders) {
    state.boulders = boulders.length === 0 ? [] : boulders;
  },
  addBoulder(state, boulder) {
    state.boulders.push(boulder);
  },
  setError(state, err) {
    state.error = err;
  }
}

const actions = {
  async loadBoulders({ commit, dispatch, rootState }) {
    dispatch("startLoading", null, {root: true});
    let boulders = await getBouldersCall(API_URL, rootState.user.token);
    if(nonEmpty(boulders)) {
      commit('updateBoulders', boulders);
    }
    dispatch("stopLoading", null, {root: true});
  },
  async addBoulder({ commit, dispatch, rootState }, boulder) {
    dispatch("startLoading", null, {root: true});
    let newBoulder = await editBoulderCall(API_URL, rootState.user.token, boulder);
    if(nonEmpty(newBoulder)) {
      commit('addBoulder', newBoulder);
    } else {
      dispatch('setError', "ERROR");
      dispatch("stopLoading", null, {root: true});
      return
    }
    dispatch("stopLoading", null, {root: true});
    dispatch("setSuccess", true, {root: true});
  },
  setError({ commit }, err) {
    commit("setError", err);
  }
}

const getters = {
  getBoulders: (state) => (sortBy) => {
    if(state.boulders.length > 1) {
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
      state.boulders.sort(comp);
    }
    return state.boulders;
  },
  getBoulder: (state) => (id) => {
    return state.boulders.find(el => el.id == id);
  },
  errorOccured: (state) => {
    return state.error != null;
  }
}

export const bouldersModule = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
}