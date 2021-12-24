import axios from 'axios';

const api = axios.create({
    baseURL: '/api',
    timeout: 5000,
    withCredentials: true,
});

export const serverSideApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    withCredentials: true,
});

export default api;
