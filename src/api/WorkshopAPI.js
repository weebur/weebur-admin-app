import api from './';

export const fetchWorkshop = async (workshopId) => {
    return api.get(`/workshops/${workshopId}`).then((res) => res.data);
};

export const createWorkshop = async (workshop) => {
    return api.post('/workshops', workshop).then((res) => res.data);
};
