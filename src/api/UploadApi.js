import api from './index';

export const uploadFiles = async (file) => {
    return api.put(`/upload/estimates`, file).then((res) => res.data);
};
