import Vue from "vue";
import Vuex from "vuex";
import {
  state as state1,
  mutations as mutations1,
  actions as actions1,
} from "./modules/users";

import {
  state as state2,
  mutations as mutations2,
  actions as actions2,
} from "./modules/danhmucs";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // ...
  },
  mutations: {
    // ...
  },
  actions: {
    // ...
  },
  modules: {
    users: {
      // namespaced: true, // Enable namespace for authentic store
      state: state1,
      mutations: mutations1,
      actions: actions1,
    },
    danhmucs: {
      // namespaced: true, // Enable namespace for authentic store
      state: state2,
      mutations: mutations2,
      actions: actions2,
    },
  },
});
