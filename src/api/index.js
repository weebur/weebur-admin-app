import axios from 'axios';
import { message } from 'antd';

const isServer = typeof window === 'undefined';

const clientSideApi = axios.create({
    baseURL: '/api',
    withCredentials: true,
});

clientSideApi.interceptors.response.use(
    function (response) {
        // 2xx 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        // 응답 데이터가 있는 작업 수행
        return response;
    },
    function (error) {
        console.dir(error);
        // 2xx 외의 범위에 있는 상태 코드는 이 함수를 트리거 합니다.
        // 응답 오류가 있는 작업 수행
        message.error(error?.response?.data?.message || '요청을 실패하였습니다.');
        return Promise.reject(error);
    },
);
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
