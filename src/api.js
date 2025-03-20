import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8090',
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Connection': 'close'
  }
});

export default api;
