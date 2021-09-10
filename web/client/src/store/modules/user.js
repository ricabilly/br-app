import { call as loginCall } from '@/apicalls/login.js';
import { nonEmpty } from "@/util/utils";
import { API_URL } from '..';

const state = {
  user: null,
  error: null,
  token: null,
};

const mutations = {
  updateUser(state, user) {
    state.user = user;
  },
  updateToken(state, token) {
    state.token = token;
  },
  setError(state, error) {
    state.error = error;
  },
}

const actions = {
  async login({ commit, dispatch }, { username, password }) {
    dispatch("startLoading", null, {root: true});
    if(nonEmpty(state.user)) {
      alert("Already logged in!")
      dispatch("stopLoading", null, {root: true});
      return
    }
    let credentials = btoa(username + ":" + password);
    let jsonData = await loginCall(API_URL, credentials);
    if(!jsonData) {
      commit("setError", "Login failed");
    } else {
      let user = jsonData.user;
      let token = jsonData.token;
      commit('updateUser', user);
      commit('updateToken', token);
    }
    dispatch("stopLoading", null, {root: true});
  },
  logout({ commit }) {
    commit('updateUser', null);
    commit('updateToken', null);
  },
  clearError({ commit }) {
    commit("setError", null);
  },

}

const getters = {
  loggedIn: (state) => {
    return state.user != null;
  },
  getUser: (state) => {
    return state.user;
  },
  errorOccured: (state) => {
    return state.error != null;
  },
  isLoading: (state) => {
    return state.isLoading == true;
  }
}

export const userModule = {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
}