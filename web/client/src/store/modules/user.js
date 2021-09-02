import { call as loginCall } from '@/apicalls/login.js';
import { nonEmpty } from "@/util/utils";
import { API_URL } from '..';

const state = {
  user: null,
  isLoading: false,

};

const mutations = {
  updateUser(state, user) {
    state.user = user;
  },
  updateJWT(state, jwt) {
    state.user.jwt = jwt;
  },
  setError(state, error) {
    state.error = error;
  }
}

const actions = {
  async login({ commit }, username, password) {
    if(nonEmpty(state.user)) {
      alert("Already logged in!")
      return
    }
    let credentials = btoa(username + ":" + password);
    let user = await loginCall(API_URL, credentials);
    if(user == null) {
      commit("setError", "Login failed");
    }
    commit('updateUser', user);
  },
  logout({ commit }) {
    commit('updateUser', null);
  },
  clearError({ commit }) {
    commit("setError", null);
  }
}

const getters = {
  loggedIn: (state) => {
    return state.user != null;
  },
  user: (state) => {
    return state.user;
  },
  loginErrorOccured: (state) => {
    return state.error != null;
  }
}

export const userModule = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
}