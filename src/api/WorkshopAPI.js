import api from './';

export const fetchWorkshop = async (workshopId) => {
    return api.get(`/workshops/${workshopId}`).then((res) => res.data);
};

export const createWorkshop = async (workshop) => {
    return api.post('/workshops', workshop).then((res) => res.data);
};

export const updateWorkshop = async (workshopId, workshop) => {
    return api.put(`/workshops/${workshopId}`, workshop).then((res) => res.data);
};

export const removeWorkshop = async (workshopId) => {
    return api.delete(`/workshops/${workshopId}`).then((res) => res.data);
};

export const updateWorkshopDocument = async (workshopId, docType, file, orderIds) => {
    return api
        .put(`/workshops/${workshopId}/documents/${docType}`, file, { params: { orderIds } })
        .then((res) => res.data);
};

export const deleteWorkshopDocument = async (workshopId, docType, key) => {
    return api.delete(`/workshops/${workshopId}/documents/${docType}`, { params: { key } }).then((res) => res.data);
};
