import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    timeout: 2000,
    headers: { 'X-Api-Key': process.env.REACT_APP_API_KEY }
});

export default apiClient;

