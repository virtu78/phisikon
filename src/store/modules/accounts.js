import firebase from 'firebase';

  const state = {
    acunte:[],

  };
  const getters = {
    getAcunte(state)  {
      return state.acunte;
    }   

  };
 const mutations = {
    SET_ACUNTE: (state, acunte) => {
      state.acunte = acunte;
    },

  };
  const actions = {
    getAcunte ({commit})  {
      firebase.firestore().collection('accounts')
      .get()
      .then(querySnapshot => {
        let data = querySnapshot.docs.map(doc => doc.data())
        commit('SET_ACUNTE', data);
        
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