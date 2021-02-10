import Vue from 'vue';
import axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.config.productionTip = false;

window.axios = axios;

new Vue({
  router,
  store,
  vuetify,
  render (h) { return h(App); },
}).$mount('#app');
