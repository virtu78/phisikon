import Vue from 'vue'
import Vuex from 'vuex'
import games from'./modules/games';
import accounts from'./modules/accounts';

Vue.use(Vuex)

export const store = new Vuex.Store({
  modules: {
    games,
    accounts,
}
}); 