import { uploadApi } from './index';

export const upload = (formData) => {
    return uploadApi.post('', formData);
};
