
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.API_BASE_URL || 'http://localhost:3001/api',
    withCredentials: true 
});

api.interceptors.request.use((config) => {
    config.headers['Accept'] = 'application/json'; 
    return config;
}, (error) => {
    return Promise.reject(error);
});


api.interceptors.response.use((response) => {
    console.log('Response Headers:', response.headers); 
    return response;
}, (error) => {

    if (error.response) {
        console.log('Response Headers (Error):', error.response.headers); 
    }
    return Promise.reject(error);
});
export default api;

