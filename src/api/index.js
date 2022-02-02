import axios from 'axios';
import { message } from 'antd';
import Router from 'next/router';

const isServer = typeof window === 'undefined';

const clientSideApi = axios.create({
    baseURL: '/api',
    timeout: 5000,
    withCredentials: true,
});

const serverSideApi = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    timeout: 5000,
    withCredentials: true,
});

const api = isServer ? serverSideApi : clientSideApi;

api.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status === 401) {
            message.warn('로그인이 필요합니다.');
            Router.push('/login');
        }
        return Promise.reject(error);
    },
);

export default api;
