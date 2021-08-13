import { createStore } from "vuex";
import VuexPersistence from 'vuex-persist'
import { call as loginCall } from '@/apicalls/login.js';
import { call as boulderCall } from '@/apicalls/editBoulder.js';

const API_URL = "localhost:8084/api";

const state = {
  boulders: [],
  user: null,

};

const mutations = {
  updateBoulders(state, boulders) {
    state.boulders = boulders.length === 0 ? [] : boulders;
  },
  addBoulder(state, boulder) {
    state.boulders.push(boulder);
  },

  updateUser(state, user) {
    state.user = user;
  },
  updateJWT(state, jwt) {
    state.user.jwt = jwt;
  }

}

const actions = {
  loadBoulders({ commit }) {
    let boulders = require("@/data/mockdata.json");
    commit('updateBoulders', boulders);
  },
  addBoulder({ commit }, boulder) {
    let date = new Date().toISOString();
    console.log(date);
    boulder.date = date;
    let newBoulder = boulderCall(API_URL, boulder);
    if(newBoulder != null) {
      commit('addBoulder', newBoulder);
    }
  },

  login({ commit }, username, password) {
    if(state.user != null) {
      alert("Already logged in!")
      return
    }
    let credentials = btoa(username + ":" + password);
    let user = loginCall(API_URL, credentials);
    if(user != null) {
      commit('updateUser', user);
    }
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
  }
}

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => ({user: state.user}),
})

export default createStore({
  state,
  mutations,
  actions,
  getters,
  modules: {},
  plugins: [vuexLocal.plugin],
});
