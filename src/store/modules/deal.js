/* eslint-disable */
import { service } from '../../lib/roomService';
import moment from 'moment';
const state = {
  bed: '',
  count: 0,
  allService: [],
  roomDetail: [],
  parseTime: [],
  viewTime: {},
  load: false,
};

const getters = {
  dealTime(state) {
    return (date) => {
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      const dt = date.getDay();
      return {
        dt,
        month: m,
        date: d,
        defaultRange: `${y}-${m.toString().padStart(2, '0')}`,
        range: `${y}-${m.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`,
      };
    }
  },
};

const actions = {
  roomParseTime({commit}, get) {
    const start = this.getters.dealTime(get.start);
    const end = this.getters.dealTime(get.end);
    const range = [];
    const bigMonth = [1, 3, 5, 7, 8, 10, 12];
    if (end.month === start.month) {
      const detect = end.date - start.date;
      for (let i = 0; i < detect; i += 1) {
        const allDate = start.date + i;
        const storage = start.defaultRange.split('-').concat(allDate.toString().padStart(2, '0')).join('-');
        range.push(storage);
      }
    } else if (end.month > start.month) {
      const startDetect = (start.month === 2 ? 28 : (bigMonth.includes(start.month) ? 31 : 30)) - start.date;
      let storage;
      for (let i = 0; i <= startDetect; i++) {
        const allDate = start.date + i;
        storage = start.defaultRange.split('-').concat(allDate.toString().padStart(2, '0')).join('-');
        range.push(storage);
      }
      for (let i = 1; i < end.date; i++) {
        const allDate = end.date - i;
        storage = end.defaultRange.split('-').concat(allDate.toString().padStart(2, '0')).join('-');
        range.push(storage);
      }
    }
    let count = 0;
    range.forEach(d => {
      const a = moment(d);
      const n = a.day();
      if (n === 0 || n === 6) {
        count++;
      }
    });
    commit('timeForView', {start: start.range, end: end.range, count, timeLength: range.length})
    commit('parsedTime', range);
  },
};

const mutations = {
  changeImage(state, way) {
    switch (way) {
      case 'add':
        if (state.count + 1 >= 3) return;
        state.count += 1;
        break;
      case 'detect':
        if (state.count - 1 < 0) return;
        state.count -= 1;
        break;
      default:
        state.count = 0;
        break;
    }
  },
  roomStyle(state, bed) {
    if (bed.length === 1) {
      switch (bed[0]) {
        case 'Single':
          state.bed = '單人床';
          break;
        case 'Small Double':
          state.bed = '兩張單人床';
          break;
        case 'Double':
          state.bed = '雙人床';
          break;
        case 'Queen':
          state.bed = '加大雙人床';
          break;
        default:
          break;
      }
    } else if (bed.length === 2) {
      switch (bed[0]) {
        case 'Double':
          state.bed = '兩張雙人床';
          break;
        case 'Queen':
          state.bed = '兩張加大雙人床';
          break;
        default:
          break;
      }
    }
    return '';
  },
  roomDetail(state, detail) {
    const fiveString = [];    
    detail.split(':').forEach(d => {
      const splitString = d.split('.');
      fiveString.push(...splitString);
    });
    let allString = fiveString.map(d => {
      return d.padEnd(d.length + 1, '.');
    });
    allString.splice(-1, 1);
    state.roomDetail = allString;
  },
  roomService(state, srv) {
    const amenitiesObject = srv;
    const amenitiesArray = Object.keys(srv);
    const storage = [[], []];
    const result = [[], []];
    amenitiesArray.forEach(d => {
      if (amenitiesObject[d]) {
        storage[0].push(d);
      } else {
        storage[1].push(d);
      }
    });
    result[0].push(...service.filter(s => {
      return storage[0].includes(s.eng);
    }));
    result[1].push(...service.filter(s => {
      return storage[1].includes(s.eng);
    }));
    state.allService = result;
  },
  parsedTime(state, time) {
    state.parseTime = time;
  },
  timeForView(state, time) {
    state.viewTime = Object.assign({}, time);
  },
  loading(state, load) {
    state.load = load;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
