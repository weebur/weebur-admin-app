import { upload } from '../api/FileUploadApi';
import { uniqueId } from 'lodash-es';
import dayjs from 'dayjs';

export const uploadFile = async (file) => {
    const fileName = formatFilename(file.name);
    const formData = new FormData();

    formData.append('file', file);
    formData.append('filename', fileName);

    await upload(formData);
};

export const formatFilename = (filename) => {
    const uniqueName = uniqueId(`text-`);
    const extension = filename.split('.').pop();

    return `${dayjs().format('YYYYMMDDHHmmss')}-${uniqueName}.${extension}`;
};
