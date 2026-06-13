import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

// Matches
export const getMatches = (params) => api.get('/matches', { params }).then(r => r.data);
export const getMatch = (id) => api.get(`/matches/${id}`).then(r => r.data);
export const createMatch = (data) => api.post('/matches', data).then(r => r.data);
export const updateMatch = (id, data) => api.put(`/matches/${id}`, data).then(r => r.data);
export const deleteMatch = (id) => api.delete(`/matches/${id}`).then(r => r.data);
export const getScorecard = (id, innings) => api.get(`/matches/${id}/scorecard/${innings}`).then(r => r.data);

// Players
export const getPlayers = (params) => api.get('/players', { params }).then(r => r.data);
export const getPlayer = (id) => api.get(`/players/${id}`).then(r => r.data);
export const createPlayer = (data) => api.post('/players', data).then(r => r.data);
export const updatePlayer = (id, data) => api.put(`/players/${id}`, data).then(r => r.data);

// Upload
export const uploadImage = (file) => {
  const formData = new FormData();
  formData.append('image', file);
  return api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }).then(r => r.data);
};

export default api;
