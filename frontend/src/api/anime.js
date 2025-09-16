import axios from 'axios';

const API_URL = 'http://localhost:5000/api/anime';

export const getAnime = () => axios.get(API_URL);
export const createAnime = (anime) => axios.post(API_URL, anime);
export const deleteAnime = (id) => axios.delete(`${API_URL}/${id}`);
export const updateAnime = (id, updated) => axios.put(`${API_URL}/${id}`, updated);
