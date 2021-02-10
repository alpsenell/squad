import Vue from 'vue';
import VueRouter from 'vue-router';
import SquadSelection from '../components/pages/SquadSelection.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'SquadSelection',
    component: SquadSelection,
  },
  // {
  //   path: '/preview',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component() {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue');
  //   },
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
