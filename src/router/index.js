import Vue from "vue";
import Vuex from 'vuex'
import Router from 'vue-router'
import Login from "../views/Login";
import Games from "../views/Games";
import Settings from "../views/Settings";
import All from "../views/All";
import Favorites from "../views/Favorites";
import Mine from "../views/Mine";
import Downloaded from "../views/Downloaded";
import Game from "../views/Game";
import Create from "../views/Create";

Vue.use(Vuex)
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
  {
    path: "/",
    name: "Login",
    component: Login,
    props: true
  },
  {
    path: "/games",
    name: "Games",
    component: Games,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/all",
    name: "All",
    component: All,
    props: true,
    meta: {
    requiresAuth: true
     }
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: Favorites,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/mine",
    name: "Mine",
    component: Mine,
    props: true,
    meta: {
      requiresAuth: true
      }
  },
  {
    path: "/downloaded",
    name: "Downloaded",
    component: Downloaded,
    props: true,
    meta: {
    requiresAuth: true
     }
  },
  {
    path: "/game/ :name",
    name: "Game",
    component: Game,
    props: true,
    meta: {
    requiresAuth: true
     }
     },
     {
      path: "/created",
      name: "Create",
      component: Create,
      props: true,
      meta: {
      requiresAuth: true
      }
        
  },
  {
    path: '*',
    redirect:"/"
  }
]
})



