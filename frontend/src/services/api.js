import axios from 'axios';

// Configure base URL for all requests
axios.defaults.baseURL = 'http://localhost:5001'; // Backend server

const API_URL = '/api/items';
const AUTH_URL = '/api/auth';

const api = {
  getItems: async () => {
    const fullUrl = `${axios.defaults.baseURL}${API_URL}`;
    console.log('Making request to full URL:', fullUrl);
    try {
      const response = await axios.get(API_URL);
      console.log('Response:', {
        status: response.status,
        data: response.data,
        config: {
          url: response.config.url,
          baseURL: response.config.baseURL,
          fullPath: `${response.config.baseURL}${response.config.url}`
        }
      });
      return response;
    } catch (error) {
      console.error('Request failed:', {
        message: error.message,
        config: error.config,
        response: error.response
      });
      throw error;
    }
  },
  getItemById: async (id) => {
    return await axios.get(`${API_URL}/${id}`);
  },
  createItem: async (data) => {
    try {
      const response = await axios.post(API_URL, data, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      console.error('Create item error:', error.response?.data || error.message);
      throw error.response?.data || { message: 'Failed to create item' };
    }
  },
  placeBid: async (itemId, amount) => {
    return await axios.post(`${API_URL}/${itemId}/bid`, { amount }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
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