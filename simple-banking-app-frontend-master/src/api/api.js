import axios from 'axios';

const BASE_URL = 'https://simple-banking-app-backend.herokuapp.com/api/v1';

const API = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
});

export default API;
