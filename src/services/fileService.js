import { upload } from '../api/FileUploadApi';
import { uniqueId } from 'lodash-es';
import dayjs from 'dayjs';
import { updateWorkshopDocument } from '../api/WorkshopAPI';

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

export const uploadWorkshopDocuments = async (docType, blob, fileName, workshopId, orderIds) => {
    const formData = new FormData();

    formData.append(docType, blob, fileName);

    const docs = await updateWorkshopDocument(workshopId, docType, formData, orderIds);

    return docs;
};
