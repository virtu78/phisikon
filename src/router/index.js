import Vue from "vue";
import Vuex from 'vuex'
import Router from 'vue-router'
import Dashboard from "../views/Dashboard";


Vue.use(Vuex)
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    props: true,   
  },  
  {
    path: '*',
    redirect:"/"
  }
]
})



