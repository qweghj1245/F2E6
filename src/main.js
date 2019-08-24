import Vue from 'vue';
import VCalendar from 'v-calendar';
import App from './App.vue';
import router from './router';
import store from './store/index';

Vue.config.productionTip = false;

Vue.use(VCalendar, {
  firstDayOfWeek: 2,
});

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
