import Vue from 'vue';
import App from './App.vue';
import router from "./router";
import Vuex from 'vuex';
import { store } from './store.js';
import firebase  from "firebase";
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
  faArrowRight,
  faSearch,
  faCartArrowDown,
  faToggleOff
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import './registerServiceWorker';
Vue.use(Vuex);

let app = '';
var firebaseConfig = {
  apiKey: "AIzaSyAh9euDC1WEnLBRAiJIAmA3XMKuEimsNeY",
  authDomain: "phisikon-656c0.firebaseapp.com",
  databaseURL: "https://phisikon-656c0.firebaseio.com",
  projectId: "phisikon-656c0",
  storageBucket: "phisikon-656c0.appspot.com",
  messagingSenderId: "785485131346",
  appId: "1:785485131346:web:bb0498f3e400943540f98b",
  measurementId: "G-8PRH7XYZHW"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
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
  faArrowRight,
  faSearch,
  faCartArrowDown,
  faToggleOff

});


Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;



  if (!app) {
    /* eslint-disable no-new */
    app = new Vue({
      store,
      router,
      render: h => h(App)
    }).$mount('#app');
  }






