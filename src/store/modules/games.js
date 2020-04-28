import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
Vue.use(Vuex);

  const state = {
    games: [],

  };
  const getters = {
    games: state =>  state.games

  };
  const mutations = {
    SET_GAMES (state, games)  {
      state.games = games;
    },

  };
  const actions = {
    initGames: ({commit}) => {
      firebase.firestore().collection('games')
      .get()
      .then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data())
        commit('SET_GAMES', data);
      })
    },
  };
  export default {
    namespaced: true, 
    state,
    getters,
    mutations,
    actions,
  };