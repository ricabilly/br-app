import { call as loginCall } from '@/apicalls/login.js';
import { nonEmpty } from "@/util/utils";
import { API_URL } from '..';

const state = {
  user: {},
  isLoading: false,
  
};

const mutations = {
  updateUser(state, user) {
    state.user = user;
  },
  updateJWT(state, jwt) {
    state.user.jwt = jwt;
  }
}

const actions = {
  login({ commit }, username, password) {
    if(nonEmpty(state.user)) {
      alert("Already logged in!")
      return
    }
    let credentials = btoa(username + ":" + password);
    let user;
    try {
      user = loginCall(API_URL, credentials);
    } catch (error) {
      alert("Failed to log in!");
      return
    }
    commit('updateUser', user);
  },
  logout({ commit }) {
    commit('updateUser', {});
  }
}

const getters = {
  loggedIn: (state) => {
    return state.user && Object.keys(state.user).length > 0;
  },
  user: (state) => {
    return state.user;
  }
}

export const userModule = {
  state: state,
  mutations: mutations,
  actions: actions,
  getters: getters,
}