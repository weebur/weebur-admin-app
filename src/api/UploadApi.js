import api from './index';

export const uploadFiles = async (file) => {
    return api.put(`/upload/estimates`, file).then((res) => res.data);
};

export const uploadImages = async (files) => {
    return api
        .post(`/upload/images`, files, { headers: { 'content-type': 'multipart/form-data' } })
        .then((res) => res.data);
};
