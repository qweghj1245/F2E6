import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Room from './views/Room.vue';

Vue.use(Router);

export default new Router({
  scrollBehavior(to, from, saveTop) {
    if (saveTop) {
      return saveTop;
    }
    return { x: 0, y: 0 };
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/room/:id',
      name: 'room',
      component: Room,
    },
  ],
});
