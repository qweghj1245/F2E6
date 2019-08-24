import Vue from 'vue';
import Vuex from 'vuex';
import api from './modules/api';
import deal from './modules/deal';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    api,
    deal,
  },
});
