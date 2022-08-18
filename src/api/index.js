import axios from 'axios';

const isServer = typeof window === 'undefined';

const clientSideApi = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

const serverSideApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    withCredentials: true,
});

export const uploadApi = axios.create({
    baseURL: '/upload',
    withCredentials: true,
});

const api = isServer ? serverSideApi : clientSideApi;

export default api;
