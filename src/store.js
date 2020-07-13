import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    imumkitems:{},
  },
  getters: {
    //getter for imumk items  
    getimumk: state => {      
      return  state.imumkitems
    },
    getSubject: state => {      
      return  state.imumkitems.map(item => item.subject);
    },
    getGenre: state => {      
      return  state.imumkitems.map(item => item.genre);
    },
    getGrade: state => {      
      return  state.imumkitems.map(item => item.grade);
    },
    getTitle: state => {      
      return  state.imumkitems.map(item => item.title);
    },
    getPrice: state => {      
      return  state.imumkitems.map(item => item.price);
    },
    getPriceBonus: state => {      
      return  state.imumkitems.map(item => item.priceBonus);
    },
    
    },  
  mutations: {
    SET_IMUMK_ITEMS: (state, imumkitems) => {
      state.imumkitems = imumkitems;
    },    
  },  
  actions: {  
    initImumkItems : function ({commit}){      
      axios.post('http://krapipl.imumk.ru:8082/api/mobilev1/update')
      .then((response) => {
        console.log(response.data, this)     
        commit('SET_IMUMK_ITEMS', response.data.items)     
      }).catch(error => {
        console.log(error);
      })
    }
  }
})






