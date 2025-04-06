import axios from 'axios';

// Configure base URL for all requests
axios.defaults.baseURL = 'http://localhost:5001';

const API_URL = '/api/items';
const AUTH_URL = '/api/auth';

const api = {
  getItems: async () => {
    console.log('Making request to:', API_URL);
    const response = await axios.get(API_URL);
    console.log('Response:', {
      status: response.status,
      data: response.data
    });
    return response;
  },
  getItemById: async (id) => {
    return await axios.get(`${API_URL}/${id}`);
  },
  createItem: async (data) => {
    return await axios.post(API_URL, data);
  },
  placeBid: async (itemId, amount) => {
    return await axios.post(`${API_URL}/${itemId}/bid`, { amount });
  },
  login: async (email, password) => {
    return await axios.post(`${AUTH_URL}/login`, { email, password });
  },
  register: async (username, email, password) => {
    return await axios.post(`${AUTH_URL}/register`, { username, email, password });
  },
  getCurrentUser: async () => {
    return await axios.get(`${AUTH_URL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
  }
};

export default api;