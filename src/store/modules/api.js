/* eslint-disable */ 
import { apiGetRooms, apiGetRoomById, apiBooking, apiDelete } from '../../lib/baseUrl';
const state = {
  rooms: [],
  book: [],
  room: {},
  error: '',
  success: false,
};

const getters = {

};

const actions = {
  getRooms({commit}) {
    commit('loading', true);
    apiGetRooms().then((res) => {
      const storage = res.data.items.map((d) => {
        d.price = `$${d.normalDayPrice}/${d.holidayPrice}`;
        return d;
      });
      commit('roomData', storage);
      commit('loading', false);
    }).catch((e) => {
      console.log(e);
      commit('loading', false);
    });
  },
  getRoomInformation({state, commit}, id) {
    commit('loading', true);
    apiGetRoomById(id).then(async (res) => {
      try {
        await commit('roomInfo', res.data.room[0]);
        await commit('booking', res.data.booking);
        await commit('roomStyle', state.room.descriptionShort.Bed);
        await commit('roomDetail', res.data.room[0].description);
        await commit('roomService', res.data.room[0].amenities);
        await commit('loading', false);
      } catch (error) {
        console.log(error);
        commit('loading', false);
      }
    });
  },
  bookingRooms({commit}, {id, data}) {
    commit('loading', true);
    apiBooking(id, data).then((res) => {
      commit('successs', res.data.success);  
      commit('loading', false);
    }).catch(function (error) {
      if (error.response) {
        commit('errors', error.response.data.message.split('(date)').join(''));
        commit('loading', false);
      }
    });
  },
  deleteRooms({commit}) {
    commit('loading', true);
    apiDelete().then((res) => {
      commit('loading', false);
    }).catch((e) => {
      console.log(e);
      commit('loading', false);
    });
  },
};

const mutations = {
  roomData(state, rooms) {
    state.rooms = rooms;
  },
  roomInfo(state, room) {
    state.room = Object.assign({}, room);
  },
  booking(state, book) {
    // book
    state.book = book;
  },
  errors(state, error) {
    state.error = error;
  },
  successs(state, success) {
    state.success = success;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
