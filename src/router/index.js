import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MapaVue from '../views/Map.vue'
import Graficas from '../views/Graficas.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/mapa',
    name: 'Mapa',
    component: MapaVue
  },
  {
    path: '/graficas',
    name: 'Graficas',
    component: Graficas
  }
]

const router = new VueRouter({
  routes
})

export default router
