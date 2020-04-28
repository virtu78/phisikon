import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import firebase  from "firebase";
import 'firebase/firestore'
import Vuex from 'vuex';
import { store } from './store.js';

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSave,
  faHeart,
  faEye,
  faPlay,
  faCog,
  faSignOutAlt,
  faArrowLeft,
  faTimesCircle,
  faArrowCircleLeft,
  faArrowCircleRight,
  faTimes,
  faCircle,
  faArrowRight
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import './registerServiceWorker';
Vue.use(Vuex);

let app = '';

//const config = firebase.initializeApp({
 // apiKey: 'AIzaSyDpVzbG6JT7jzxzk-r_rj6Kcmf7OZbXbVM',         
  //projectId: 'bitvaumov-4a5e6',                   
  //authDomain: 'https://bitvaumov-4a5e6.firebaseapp.com',   
 // databaseURL: 'https://bitvaumov-4a5e6.firebaseio.com', 
 // storageBucket: 'bitvaumov-4a5e6.appspot.com',         
  //messagingSenderId: '495086574035' 
//});
const config = firebase.initializeApp({
  apiKey: 'AIzaSyD6U6VoaJwzGDbKedf6j5D6CRDcBY8SZ1Q',
  projectId: 'historical-9258a',
  authDomain:"https://historical-9258a.firebaseio.com",
  databaseURL: "https://historical-9258a.firebaseio.com",
  storageBucket:'historical-9258a.appspot.com',
  messagingSenderId: '287088369617'
    });
 library.add({
  faSave,
  faHeart,
  faEye,
  faPlay,
  faCog,
  faSignOutAlt,
  faArrowLeft,
  faTimesCircle,
  faArrowCircleLeft,
  faArrowCircleRight,
  faTimes,
  faCircle,
  faArrowRight
});


Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
const db = config.firestore()


  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app');
  }






