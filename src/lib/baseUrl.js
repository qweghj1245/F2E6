/* eslint-disable */
import axios from 'axios';

const roomRequest = axios.create({
  baseURL: process.env.VUE_APP_BASEURL,
});
roomRequest.defaults.headers.common['Authorization'] = `Bearer ${process.env.VUE_APP_TOKEN}`;
roomRequest.defaults.headers.post['Authorization'] = `Bearer ${process.env.VUE_APP_TOKEN}`;
roomRequest.defaults.headers.post['Content-Type'] = 'application/json';
roomRequest.defaults.headers.post['accept'] = 'application/json';

export const apiGetRooms = () => roomRequest.get('/rooms');
export const apiGetRoomById = (id) => roomRequest.get(`/room/${id}`);
export const apiBooking = (id, data) => roomRequest.post(`/room/${id}`, data);
export const apiDelete = () => roomRequest.delete(`/rooms`);
