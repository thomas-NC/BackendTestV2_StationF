import Vue from 'vue'
import Router from 'vue-router'
import Reservation from './views/Reservation.vue'

// on a ici le fichier dans lequel on va pourvoir ajouter des routes au fur et à mesure des améliorations de l'app

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'reservation',
      component: Reservation
    }
  ]
})
