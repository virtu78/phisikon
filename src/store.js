import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import firebase from 'firebase';
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    imumkitems:{},
    phisikon:{},
    
  },
  getters: {
    //getter for imumk items  
    getimumk: state => {      
      return  state.phisikon
    },
    getSubject: state => {      
      return  state.phisikon.map(item => item.subject);
    },
    getGenre: state => {      
      return  state.phisikon.map(item => item.genre);
    },
    getGrade: state => {      
      return  state.phisikon.map(item => item.grade);
    },
    getTitle: state => {      
      return  state.phisikon.map(item => item.title);
    },
    getPrice: state => {      
      return  state.phisikon.map(item => item.price);
    },
    getPriceBonus: state => {      
      return  state.phisikon.map(item => item.priceBonus);
    },
    
    },  
  mutations: {
    SET_IMUMK_ITEMS: (state, imumkitems) => {
      state.imumkitems = imumkitems;
    },
    SET_PHISIKON_DATA:   (state, phisikon) => {
      state.phisikon = phisikon;
    }, 
  },  
  actions: {  
    initImumkItems : function ({commit}){      
      axios.post('http://krapipl.imumk.ru:8082/api/mobilev1/update')
      .then((response) => {
       // console.log(response.data, this)        
        commit('SET_IMUMK_ITEMS', response.data.items)     
      }).catch(error => {
        console.log(error);
      })
    },
    initPhisikonData : function ({commit}){      
      firebase.database().ref().once('value').then(snapshot => {
        var data = snapshot.val();            
         commit('SET_PHISIKON_DATA', data);         
      });
    }
  }
})






